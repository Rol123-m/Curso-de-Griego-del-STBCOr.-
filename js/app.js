(() => {
'use strict';
const C = window.CONFIG, L = window.LESSONS, KEY = 'stbcor.v2', REP = 'stbcor.reports';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const sha = async t => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))].map(b => b.toString(16).padStart(2, '0')).join('');
const fmtD = (iso, o) => new Date(iso).toLocaleDateString('es', o || { day: 'numeric', month: 'short', year: 'numeric' });
const fmtT = s => { const m = Math.round(s / 60); return m < 60 ? m + ' min' : Math.floor(m / 60) + ' h ' + (m % 60) + ' min'; };
const ago = iso => { if (!iso) return 'Nunca'; const m = (Date.now() - new Date(iso)) / 60000; return m < 1 ? 'Hace un momento' : m < 60 ? `Hace ${Math.floor(m)} min` : m < 1440 ? `Hace ${Math.floor(m / 60)} h` : m < 2880 ? 'Ayer' : fmtD(iso); };

/* ---------- almacenamiento ---------- */
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
let db = read(KEY, { users: {}, session: null });
let cloudTimer = null, cloudBusy = false, cloudLast = 0, cloudLoaded = {};
const save = () => {
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch { toast('No se pudo guardar: almacenamiento lleno o bloqueado.'); }
  if (db.session && C.teacher?.endpoint && !cloudTimer) {
    cloudTimer = setTimeout(() => { cloudTimer = null; syncProgress(false); }, 12000);
  }
};
function cloudJSONP(params) {
  return new Promise((resolve, reject) => {
    const cb = 'stbcCloud_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const script = document.createElement('script');
    const timer = setTimeout(() => { cleanup(); reject(new Error('Tiempo de espera agotado')); }, 15000);
    function cleanup() { clearTimeout(timer); delete window[cb]; script.remove(); }
    window[cb] = data => { cleanup(); resolve(data); };
    script.onerror = () => { cleanup(); reject(new Error('No se pudo contactar con Google Sheets')); };
    script.src = C.teacher.endpoint + '?' + new URLSearchParams({ ...params, callback: cb }).toString();
    document.head.appendChild(script);
  });
}
async function syncProgress(showMessage) {
  if (!db.session || !C.teacher?.endpoint || cloudBusy || !navigator.onLine) return;
  if (Date.now() - cloudLast < 10000 && !showMessage) return;
  cloudBusy = true;
  try {
    const r = await report();
    // Apps Script recibe text/plain para evitar el preflight CORS de JSON.
    // no-cors oculta la respuesta, pero permite entregar el POST a /exec.
    await fetch(C.teacher.endpoint, {
      method: 'POST', mode: 'no-cors', redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(r), keepalive: true
    });
    cloudLast = Date.now();
    if (showMessage) toast('Sincronización enviada a Google Sheets. Comprueba la hoja si es el primer envío.');
  } catch (err) {
    if (showMessage) toast('No se pudo sincronizar. El progreso permanece guardado en este dispositivo.');
  } finally { cloudBusy = false; }
}
let remoteContent = { announcements: [], resources: [], posts: [] }, teacherData = null;
const adminToken = () => localStorage.getItem('stbcor.adminToken') || '';
async function loadContent() {
 try { const d=await cloudJSONP({action:'content'}); if(d?.ok){remoteContent=d;if($('#view'))route();} }
 catch(e){console.warn('Contenido remoto no disponible',e);}
}
async function loadTeacherData(token) {
 const d=await cloudJSONP({action:'teacherData',token});if(!d?.ok)throw new Error(d?.error||'No se pudo cargar el progreso');
 teacherData=d;route();
}
async function adminRequest(action,extra={}) {
 const token=adminToken();if(!token)throw new Error('Introduce el token administrativo.');
 const d=await cloudJSONP({action,token,...extra});if(!d?.ok)throw new Error(d?.error||'Operación no completada.');return d;
}

async function loadCloudProgress() {
  const user = db.session;
  if (!user || !C.teacher?.endpoint || cloudLoaded[user] || !navigator.onLine) return;
  cloudLoaded[user] = true;
  try {
    const result = await cloudJSONP({ action: 'progress', user });
    if (!result?.ok || !result.progress?.detail) return;
    const remote = typeof result.progress.detail === 'string' ? JSON.parse(result.progress.detail) : result.progress.detail;
    if (remote.user !== user || !Array.isArray(remote.lessons)) return;
    const local = me();
    remote.lessons.forEach(x => {
      if (!x.id || x.id < 1 || x.id > L.length) return;
      const p = les(x.id), count = Math.min(L[x.id - 1].pages.length, Number(x.pages) || 0);
      const visited = Array.isArray(x.visited) ? x.visited : Array.from({ length: count }, (_, i) => i);
      visited.forEach(i => { if (Number.isInteger(i) && i >= 0 && i < L[x.id - 1].pages.length && !p.visited.includes(i)) p.visited.push(i); });
      p.done = p.done || !!x.done;
      p.secs = Math.max(p.secs || 0, (Number(x.mins) || 0) * 60);
      p.last = p.last || x.last || null;
    });
    (remote.exams || []).forEach(x => {
      if (x.score != null) {
        const prior = local.exams[x.n]?.score;
        if (prior == null) local.exams[x.n] = { ...(local.exams[x.n] || {}), score: Number(x.score) };
      }
    });
    save();
    if (document.querySelector('#view')) route();
  } catch (err) {
    console.warn('No se pudo recuperar el progreso remoto:', err);
  }
}
const stu = () => C.students.find(s => s.u === db.session);
const isTeacher = () => stu()?.role === 'profesor';
function me() {
  if (!db.users[db.session]) {
    const u = db.users[db.session] = { lessons: {}, exams: {}, log: [], sent: null };
    const old = read('greekCourseProgress', null)?.students?.[stu().id]; // migración de la versión anterior
    old?.lessons?.forEach(l => { if (l.completed) u.lessons[l.id] = { visited: L[l.id - 1].pages.map((_, i) => i), done: true, secs: 0, last: l.lastAccessed }; });
  }
  return db.users[db.session];
}
const les = id => me().lessons[id] || (me().lessons[id] = { visited: [], done: false, secs: 0, last: null });
const log = (t, i) => { const l = me().log; l.unshift({ t, i, at: new Date().toISOString() }); l.length = Math.min(l.length, 40); };
function stats() {
  const ls = L.map(l => { const p = me().lessons[l.id] || {}; const v = (p.visited || []).length; return { id: l.id, done: !!p.done, v, t: l.pages.length, pct: p.done ? 100 : Math.round(v / l.pages.length * 100), secs: p.secs || 0, last: p.last || null }; });
  const done = ls.filter(x => x.done).length;
  return { ls, done, pct: Math.round(done / L.length * 100), secs: ls.reduce((a, x) => a + x.secs, 0), next: ls.find(x => !x.done) };
}

/* ---------- utilidades UI ---------- */
function toast(msg, action, fn) {
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = `<span>${esc(msg)}</span>` + (action ? `<button>${esc(action)}</button>` : '');
  if (action) $('button', t).onclick = () => { fn(); t.remove(); };
  $('#toasts').append(t); setTimeout(() => t.remove(), action ? 12000 : 3800);
}
function dialog(title, body) {
  const d = $('#dlg'); d.innerHTML = `<div class="dh"><h3>${title}</h3><button aria-label="Cerrar" id="dx">&times;</button></div><div class="db">${body}</div>`;
  $('#dx').onclick = () => d.close(); if (!d.open) d.showModal(); return d;
}
const ring = (p, cls = '') => `<div class="ring ${cls}" style="--p:${p}"><b>${p}%</b></div>`;
function download(name, text, type = 'application/json') {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

/* ---------- evaluaciones ---------- */
function examState(e) {
  if (!e.open) return e.url ? { k: 'open', t: 'Disponible' } : { k: 'tbd', t: 'Enlace por publicar' };
  const o = new Date(e.open + 'T00:00:00'), c = new Date(e.close + 'T23:59:59'), now = new Date();
  if (e.abierto || (now >= o && now <= c)) return { k: 'open', t: 'Disponible ahora' };
  if (now < o) return { k: 'soon', t: `Abre en ${Math.ceil((o - now) / 864e5)} días` };
  return { k: 'closed', t: 'Cerrado' };
}
const range = e => { if (!e.open) return `Semana ${e.week} · vence el domingo, 11:59 pm`; const o = new Date(e.open + 'T12:00'), c = new Date(e.close + 'T12:00'); return `${o.getDate()}${o.getMonth() === c.getMonth() ? '' : ' de ' + o.toLocaleDateString('es', { month: 'long' })}–${c.getDate()} de ${c.toLocaleDateString('es', { month: 'long', year: 'numeric' })}`; };
const unseen = () => [...C.announcements, ...(remoteContent.announcements || [])].filter(a => !(db.seen || []).includes(a.id)).length;

/* ---------- informe de progreso ---------- */
async function report() {
  const s = stats(), u = me();
  const r = { v: 2, course: C.course, user: stu().u, name: stu().name, at: new Date().toISOString(), done: s.done, total: L.length, mins: Math.round(s.secs / 60),
    lessons: s.ls.map(x => ({ id: x.id, done: x.done, pages: x.v, visited: [...(u.lessons[x.id]?.visited || [])], of: x.t, mins: Math.round(x.secs / 60), last: x.last })),
    exams: C.exams.map(e => ({ n: e.n, title: e.title, score: u.exams[e.n]?.score ?? null })) };
  r.sig = await sha(JSON.stringify(r) + C.salt); return r;
}
const summary = r => `Progreso del Curso de Griego I (${r.course})\nEstudiante: ${r.name}\nLecciones completadas: ${r.done}/${r.total}\nTiempo de estudio: ${r.mins} min\n` +
  r.exams.map(e => `${e.title}: ${e.score == null ? 'sin nota registrada' : e.score}`).join('\n') + `\nFecha: ${fmtD(r.at)}`;
const fname = r => `progreso_${norm(r.user)}_${r.at.slice(0, 10)}.json`;
const enc = r => 'STBCOR1:' + btoa(unescape(encodeURIComponent(JSON.stringify(r))));
async function dec(txt) {
  const m = String(txt).match(/STBCOR1:([A-Za-z0-9+/=]+)/); if (!m) throw new Error('sin código');
  const r = JSON.parse(decodeURIComponent(escape(atob(m[1])))), { sig, ...rest } = r;
  if (r.v !== 2 || sig !== await sha(JSON.stringify(rest) + C.salt)) throw new Error('firma');
  return r;
}
async function sendDialog() {
  const r = await report(), T = C.teacher, text = summary(r) + '\n\nCódigo de progreso (no lo modifiques):\n' + enc(r);
  const q = `subject=${encodeURIComponent('Progreso Griego I · ' + r.name)}&body=${encodeURIComponent(text)}`;
  const d = dialog('Enviar progreso al profesor', `<p>Se enviará un resumen de tu avance: <b>${r.done}/${r.total}</b> lecciones, <b>${r.mins} min</b> de estudio y las notas que hayas registrado. El mensaje incluye un código que el profesor puede importar.</p>
  <a class="opt" data-a="send" href="https://wa.me/${T.whatsapp}?text=${encodeURIComponent(text)}" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i><span><b>Enviar por WhatsApp</b><small>Abre el chat con ${esc(T.name)}; solo pulsa enviar</small></span></a>
  <a class="opt" data-a="send" href="mailto:${T.email}?${q}"><i class="fas fa-envelope"></i><span><b>Enviar por correo</b><small>Abre tu aplicación de correo con el mensaje listo</small></span></a>
  <a class="opt" data-a="send" href="https://outlook.office.com/mail/deeplink/compose?to=${T.email}&${q}" target="_blank" rel="noopener"><i class="fas fa-globe"></i><span><b>Correo desde el navegador (Outlook)</b><small>Si no tienes una app de correo configurada</small></span></a>
  ${T.endpoint ? '<button class="opt" data-a="endpoint"><i class="fas fa-paper-plane"></i><span><b>Enviar directamente</b><small>Llega a la hoja del profesor</small></span></button>' : ''}
  <button class="opt" data-a="copy"><i class="fas fa-copy"></i><span><b>Copiar el mensaje</b><small>Pégalo donde prefieras (Telegram, SMS…)</small></span></button>
  <button class="opt" data-a="file"><i class="fas fa-download"></i><span><b>Guardar copia (.json)</b><small>Respaldo en tu dispositivo</small></span></button>`);
  const mark = () => { me().sent = new Date().toISOString(); log('Envió su progreso al profesor', 'fa-paper-plane'); save(); };
  $$('.opt', d).forEach(b => b.addEventListener('click', async () => {
    const a = b.dataset.a;
    try {
      if (a === 'send') { mark(); setTimeout(() => { d.close(); route(); }, 400); return; }
      if (a === 'endpoint') { await syncProgress(true); mark(); }
      if (a === 'copy') { await navigator.clipboard.writeText(text); toast('Mensaje copiado ✓'); }
      if (a === 'file') { download(fname(r), JSON.stringify(r, null, 2)); toast('Copia guardada en tus descargas'); }
    } catch { toast('No se pudo completar. Prueba otra opción.'); }
    d.close(); route();
  }));
}
function addReport(r) { const reps = read(REP, {}); if (!reps[r.user] || reps[r.user].at < r.at) reps[r.user] = r; localStorage.setItem(REP, JSON.stringify(reps)); }
function pasteDialog() {
  const d = dialog('Importar código de progreso', '<p>Pega el mensaje que te envió el estudiante (con la línea «STBCOR1:…»).</p><textarea id="pc" rows="6" style="width:100%;border:1px solid var(--line);border-radius:10px;padding:.6rem;font:inherit"></textarea><button class="btn" id="pb">Importar</button>');
  $('#pb').onclick = async () => { try { const r = await dec($('#pc').value); addReport(r); d.close(); toast(`Reporte de ${r.name} importado ✓`); route(); } catch { toast('Código inválido o modificado.'); } };
}
function moreDialog() {
  dialog('Más secciones', NAV.slice(4).concat(isTeacher() ? [PROF] : []).map(n => `<a class="opt" href="#/${n[0]}"><i class="fas ${n[1]}"></i><span><b>${n[2]}</b></span></a>`).join(''));
}
function restore() {
  const i = Object.assign(document.createElement('input'), { type: 'file', accept: '.json,application/json' });
  i.onchange = async () => {
    try {
      const r = JSON.parse(await i.files[0].text());
      if (r.user !== db.session) return toast('Esa copia pertenece a otro usuario.');
      const { sig, ...rest } = r; if (sig !== await sha(JSON.stringify(rest) + C.salt)) return toast('El archivo fue modificado o está dañado.');
      r.lessons.forEach(x => { const l = les(x.id); if (x.done) l.done = true; l.secs = Math.max(l.secs, x.mins * 60); for (let k = 0; k < x.pages; k++) if (!l.visited.includes(k)) l.visited.push(k); l.last = x.last || l.last; });
      r.exams.forEach(x => { if (x.score != null) me().exams[x.n] = { ...(me().exams[x.n] || {}), score: x.score }; });
      save(); toast('Progreso restaurado ✓'); route();
    } catch { toast('No se pudo leer el archivo.'); }
  };
  i.click();
}

/* ---------- vistas ---------- */
const V = {};
V.inicio = () => {
  const s = stats(), nx = s.next, ex = C.exams.map(e => ({ e, st: examState(e) })).find(x => me().exams[x.e.n]?.score == null);
  const first = stu().name.split(' ').filter(w => !/^(rector|prof)/i.test(w))[0];
  return `<div class="banner"><div class="grow"><h2>Bienvenido, ${esc(first)}</h2><p>${nx ? `Tu siguiente paso: Lección ${nx.id} · ${esc(L[nx.id - 1].title)}` : '¡Has completado todas las lecciones!'}</p>
    ${nx ? `<a class="btn sm" style="margin-top:.9rem;background:#f2c96b;color:#0d2742" href="#/leccion/${nx.id}">${nx.v ? 'Continuar' : 'Comenzar'} <i class="fas fa-arrow-right"></i></a>` : ''}</div>${ring(s.pct)}</div>
  <div class="grid g4" style="margin-bottom:1.2rem">
    <div class="card stat"><i class="fas fa-check-double"></i><div><b>${s.done}/${L.length}</b><span>Lecciones completadas</span></div></div>
    <div class="card stat"><i class="fas fa-hourglass-half"></i><div><b>${fmtT(s.secs)}</b><span>Tiempo de estudio</span></div></div>
    <div class="card stat"><i class="fas fa-clipboard-check"></i><div><b>${C.exams.filter(e => me().exams[e.n]?.score != null).length}/${C.exams.length}</b><span>Evaluaciones con nota</span></div></div>
    <div class="card stat"><i class="fas fa-paper-plane"></i><div><b style="font-size:1rem">${me().sent ? ago(me().sent) : 'Pendiente'}</b><span>Último envío al profesor</span></div></div></div>
  <div class="grid g2">
    <div class="card"><h3><i class="fas fa-clipboard-check"></i> Próximo quiz</h3>${ex ? `<p><b>${esc(ex.e.title)}</b> · ${esc(ex.e.topic)}</p><p style="color:var(--mut);margin:.3rem 0 .8rem">${range(ex.e)} · <span class="tag ${ex.st.k}">${ex.st.t}</span></p><a class="btn sec sm" href="#/evaluaciones">Ver evaluaciones</a>` : '<p style="color:var(--mut)">No hay evaluaciones próximas.</p>'}
      <hr style="border:0;border-top:1px solid var(--line);margin:1rem 0"><h3><i class="fas fa-paper-plane"></i> Envía tu progreso</h3><p style="color:var(--mut);font-size:.9rem;margin-bottom:.8rem">Compártelo con el profesor cuando termines una lección o antes de cada evaluación.</p><button class="btn sm" data-act="send">Enviar al profesor</button></div>
    <div class="card"><h3><i class="fas fa-bullhorn"></i> Último anuncio</h3>${(a => a ? `<p><b>${esc(a.title)}</b></p><p style="color:var(--mut);font-size:.9rem;margin:.3rem 0 .8rem">${esc(a.body.slice(0, 150))}${a.body.length > 150 ? '…' : ''}</p><a class="btn sec sm" href="#/anuncios">Ver anuncios</a>` : '<p>Sin anuncios.</p>')(C.announcements[0])}<hr style="border:0;border-top:1px solid var(--line);margin:1rem 0"><h3><i class="fas fa-clock-rotate-left"></i> Actividad reciente</h3><ul class="list">${me().log.slice(0, 6).map(a => `<li><i class="fas ${a.i || 'fa-circle-check'}"></i><div>${esc(a.t)}<small>${ago(a.at)}</small></div></li>`).join('') || '<li><i class="fas fa-circle-info"></i><div>Aún no hay actividad<small>Empieza una lección para verla aquí</small></div></li>'}</ul></div></div>`;
};
V.lecciones = () => {
  const s = stats(), f = V._f || 'todas', show = x => f === 'todas' || (f === 'hechas' ? x.done : !x.done);
  const card = l => { const x = s.ls[l.id - 1], st = x.done ? ['done', 'Completada'] : x.v ? ['prog', 'En progreso'] : ['', 'Sin iniciar'];
    return `<article class="card lc"><div class="row">${ring(x.pct, 'sm')}<div><span class="tag ${st[0]}">${st[1]}</span><h3 style="margin-top:.35rem">Lección ${l.id}</h3></div></div>
    <h3 style="font-size:.98rem">${esc(l.title)}</h3><p>${esc(l.desc)}</p><div class="meta"><span><i class="far fa-clock"></i> ${l.min} min</span><span><i class="far fa-file-lines"></i> ${l.pages.length} páginas</span></div>
    <a class="btn ${x.done ? 'sec' : ''}" href="#/leccion/${l.id}">${x.done ? 'Repasar' : x.v ? 'Continuar' : 'Comenzar'}</a></article>`; };
  const weeks = C.weeks.map(w => { const ls = w.lessons.map(id => s.ls[id - 1]), done = ls.filter(x => x.done).length, cur = s.next && w.lessons.includes(s.next.id), shown = ls.filter(show);
    if (!shown.length) return '';
    return `<section class="wk ${cur ? 'cur' : ''}"><header class="wkh"><div class="wkn">${w.n}<small>semana</small></div><div class="grow"><h3>Semana ${w.n} · Lecciones ${w.lessons[0]}–${w.lessons[w.lessons.length - 1]} ${cur ? '<span class="tag prog">Semana actual</span>' : done === ls.length ? '<span class="tag done">Completa</span>' : ''}</h3>
    <div class="chips">${w.fechas ? `<span class="ch"><i class="far fa-calendar"></i>${esc(w.fechas)}</span>` : ''}${w.items.map(i => `<span class="ch">${esc(i)}</span>`).join('')}</div></div>
    <div class="wkp"><b>${done}/${ls.length}</b><div class="bar"><i style="width:${Math.round(done / ls.length * 100)}%"></i></div></div></header><div class="grid gA">${shown.map(x => card(L[x.id - 1])).join('')}</div></section>`; }).join('');
  return `<div class="ph"><h2>Lecciones</h2><p>4 semanas intensivas · 3 lecciones por semana · Todas las tareas vencen el domingo a las 11:59 pm</p></div>
  <div class="notice"><i class="fas fa-pen-to-square"></i> <b>Trabajo previo:</b> dominar la escritura y pronunciación del alfabeto griego y entregar la hoja del alfabeto a uno de los alumnos ayudantes el primer día.</div>
  <div class="tabs">${[['todas', 'Todas'], ['pend', 'Pendientes'], ['hechas', 'Completadas']].map(([k, t]) => `<button data-f="${k}" class="${f === k ? 'on' : ''}">${t}</button>`).join('')}</div>${weeks || '<p>No hay lecciones en esta categoría.</p>'}`;
};
V.anuncios = () => {
 const seen=db.seen||[],A=[...C.announcements,...(remoteContent.announcements||[])].sort((x,y)=>(y.pin?1:0)-(x.pin?1:0));
 return `<div class="ph"><h2>Anuncios y notificaciones</h2><p>Avisos del curso ${C.course}</p></div><div class="grid">${A.map(x=>`<article class="card ann ${x.pin?'pin':''}"><div class="ahd"><span class="tag">${esc(x.tag||'Aviso')}</span>${x.date?`<small>${fmtD(x.date)}</small>`:''}${!seen.includes(x.id)?'<span class="new">Nuevo</span>':''}</div><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p></article>`).join('')||'<p>No hay anuncios.</p>'}</div>`;
};
V.silabo = () => { const S = window.SILABO;
  const pts = '<div class="pts">' + S.points.map(p => `<i style="flex:${p[1]};background:${p[2]}" title="${p[0]}: ${p[1]}"></i>`).join('') + '</div><ul class="leg">' + S.points.map(p => `<li><i style="background:${p[2]}"></i>${p[0]} <b>${p[1]}</b></li>`).join('') + '</ul>';
  const wk = '<div class="grid g2" style="margin:.8rem 0">' + C.weeks.map(w => `<div class="card"><h3>Semana ${w.n} · Lecciones ${w.lessons[0]}–${w.lessons[w.lessons.length - 1]}</h3><ul class="list">${w.lessons.map(id => `<li><i class="fas fa-book-open"></i><div>${esc(L[id - 1].title)}</div></li>`).join('')}${w.items.map(i => `<li><i class="fas fa-circle-check"></i><div>${esc(i)}</div></li>`).join('')}</ul></div>`).join('') + '</div>';
  return `<div class="ph"><h2>Sílabo · Idioma Griego I</h2><p>Seminario Teológico Bautista de Cuba Oriental · Curso ${C.course}</p></div>
  <div class="card" style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-bottom:1.1rem"><div class="grow" style="flex:1;min-width:220px"><h3 style="margin:0">Documento oficial</h3><p style="color:var(--mut);font-size:.9rem">Descárgalo o ábrelo en PDF.</p></div><a class="btn" href="${S.pdf}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> Abrir PDF</a><a class="btn sec" href="${S.pdf}" download><i class="fas fa-download"></i> Descargar</a></div>
  <div class="grid g2" style="margin-bottom:1.1rem">${S.teachers.map(t => `<div class="card"><span class="tag">${t.rol}</span><h3 style="margin:.5rem 0 .3rem">${esc(t.n)}</h3><p style="color:var(--mut);font-size:.88rem"><i class="fas fa-phone"></i> ${esc(t.tel)}</p><div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.7rem"><a class="btn sec sm" href="mailto:${t.mail}"><i class="fas fa-envelope"></i> ${esc(t.mail)}</a><a class="btn sec sm" href="https://wa.me/${t.wa}" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> WhatsApp</a></div></div>`).join('')}</div>
  ${S.sections.map(x => `<details class="card acc" ${x.open ? 'open' : ''}><summary><i class="fas ${x.i}"></i> ${x.t}</summary><div class="accb">${x.h.replace('@POINTS@', pts).replace('@WEEKS@', wk)}</div></details>`).join('')}`; };
V.evaluaciones = () => {
  const sc = C.exams.map(e => me().exams[e.n]?.score), got = sc.filter(x => x != null), est = got.reduce((sum, x) => sum + x / 100 * 6.25, 0);
  return `<div class="ph"><h2>Evaluaciones</h2><p>Cuatro exámenes interactivos basados en las lecciones del curso. Cada examen se corrige automáticamente y guarda el resultado en Google Sheets.</p></div>
  <div class="notice"><i class="fas fa-circle-info"></i> Selecciona un examen para responder sus preguntas. Al entregarlo recibirás tu calificación y la explicación de cada respuesta.</div>
  <div class="grid g2">${C.exams.map(e => { const score = me().exams[e.n]?.score;
    return `<article class="card exam"><div class="hd"><span class="nb">${esc(e.title)}</span><span class="tag ${score == null ? 'tbd' : 'done'}">${score == null ? 'Disponible' : 'Nota: ' + score + '/100'}</span></div><h3>${esc(e.topic)}</h3><p style="color:var(--mut);font-size:.9rem">${esc(e.desc)}</p>
    <div class="info"><span><i class="fas fa-list-ol"></i> 10 preguntas</span><span><i class="fas fa-check-circle"></i> Corrección automática</span></div>
    <button class="btn" type="button" data-take-exam="${e.n}"><i class="fas fa-clipboard-check"></i> ${score == null ? 'Comenzar examen' : 'Repetir examen'}</button>
    </article>`; }).join('')}</div>
  <div class="card" style="margin-top:1.1rem"><h3>Aporte estimado de los exámenes</h3><p style="color:var(--mut);font-size:.9rem;margin-bottom:.6rem">Según las calificaciones registradas en tu cuenta.</p><div class="bar"><i style="width:${est / 25 * 100}%"></i></div><p style="margin-top:.4rem"><b>${est.toFixed(2)}</b> / 25 puntos · ${got.length} de ${C.exams.length} exámenes completados</p></div>`;
};
V.progreso = () => { const s = stats();
  return `<div class="ph"><h2>Mi progreso</h2><p>Todo se guarda automáticamente en este dispositivo.</p></div>
  <div class="grid g2" style="margin-bottom:1.2rem"><div class="card" style="display:flex;gap:1.2rem;align-items:center">${ring(s.pct, 'sm')}<div><h3 style="margin:0">${s.done} de ${L.length} lecciones</h3><p style="color:var(--mut);font-size:.9rem">${fmtT(s.secs)} de estudio · último envío: ${me().sent ? ago(me().sent) : 'nunca'}</p></div></div>
  <div class="card"><h3>Guardar y enviar</h3><div style="display:flex;gap:.6rem;flex-wrap:wrap"><button class="btn sm" data-act="send"><i class="fas fa-paper-plane"></i> Enviar al profesor</button><button class="btn sec sm" data-act="backup"><i class="fas fa-download"></i> Guardar copia</button><button class="btn sec sm" data-act="restore"><i class="fas fa-upload"></i> Restaurar</button></div></div></div>
  <div class="card tw"><table><thead><tr><th>Lección</th><th>Tema</th><th>Avance</th><th>Tiempo</th><th>Último acceso</th><th></th></tr></thead><tbody>${s.ls.map(x => `<tr><td>${x.id}</td><td>${esc(L[x.id - 1].title)}</td><td style="min-width:130px"><div class="bar"><i style="width:${x.pct}%"></i></div><small style="color:var(--mut)">${x.done ? 'Completada' : x.v + '/' + x.t + ' páginas'}</small></td><td>${x.secs ? fmtT(x.secs) : '—'}</td><td>${ago(x.last)}</td><td><a class="btn sec sm" href="#/leccion/${x.id}">Abrir</a></td></tr>`).join('')}</tbody></table></div>`; };
V.recursos = () => {
 const items=[...C.resources,...(remoteContent.resources||[])];
 return `<div class="ph"><h2>Recursos</h2><p>Material complementario para tu estudio.</p></div><div class="grid gA">${items.map(x=>`<div class="card res"><i class="fas ${esc(x.i||'fa-link')} big"></i><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>${x.u?`<a class="btn sec sm" href="${esc(x.u)}" target="_blank" rel="noopener">${esc(x.b||'Abrir recurso')}</a>`:'<span class="tag">Enlace por publicar</span>'}</div>`).join('')}</div>`;
};
V.foro = () => {
 const posts=remoteContent.posts||[], roots=posts.filter(p=>!p.parent);
 const canModerate=isTeacher();
 return `<div class="ph"><h2>Foro del curso</h2><p>Publica preguntas y participa en conversaciones académicas.</p></div>
 <div class="card" style="margin-bottom:1rem"><form id="forum-form"><label><b>Nueva pregunta o tema</b></label><textarea id="forum-message" maxlength="2000" required rows="3" style="width:100%;margin:.6rem 0;padding:.7rem;border:1px solid var(--line);border-radius:10px;font:inherit" placeholder="Escribe tu pregunta o inicia un debate…"></textarea><button class="btn" type="submit">Publicar tema</button></form></div>
 <div class="grid">${roots.slice().reverse().map(p=>{
  const replies=posts.filter(x=>x.parent===p.id);
  const open=(p.status||'Abierto')==='Abierto';
  return `<article class="card" style="margin-bottom:1rem"><div class="ahd"><b>${esc(p.name)}</b><small>${p.date?fmtD(p.date):''}</small><span class="tag ${open?'done':'tbd'}">${open?'Abierto':'Cerrado'}</span></div><h3 style="margin:.6rem 0 .35rem">Pregunta / tema</h3><p style="white-space:pre-wrap">${esc(p.message)}</p>
  <div style="margin:.8rem 0 0 1rem;padding-left:1rem;border-left:3px solid var(--line)">
   <b>${replies.length} ${replies.length===1?'respuesta':'respuestas'}</b>
   ${replies.map(x=>`<div style="padding:.7rem 0;border-bottom:1px solid var(--line)"><div class="ahd"><b>${esc(x.name)} ${x.user===p.user?'(autor)':''}</b><small>${x.date?fmtD(x.date):''}</small></div><p style="white-space:pre-wrap;margin:.3rem 0">${esc(x.message)}</p></div>`).join('')}
   ${open?`<form class="forum-reply-form" data-parent="${esc(p.id)}" style="margin-top:.7rem"><textarea name="message" maxlength="2000" required rows="2" style="width:100%;padding:.6rem;border:1px solid var(--line);border-radius:9px;font:inherit" placeholder="Responder a este tema…"></textarea><button class="btn sec sm" type="submit" style="margin-top:.4rem">Responder a esta pregunta</button></form>`:'<p class="muted" style="margin-top:.6rem">Este tema está cerrado y no admite nuevas respuestas.</p>'}
  </div>
  ${canModerate?`<div style="display:flex;gap:.5rem;justify-content:flex-end;margin-top:.8rem"><button class="btn sec sm" data-forum-status="${esc(p.id)}" data-status="${open?'Cerrado':'Abierto'}">${open?'Cerrar tema':'Reabrir tema'}</button></div>`:''}
  </article>`;
 }).join('')||'<div class="card">Todavía no hay temas. ¡Inicia la conversación!</div>'}</div>`;
};

V.vocabulario = () => window.vocabView();
V.profesor = () => {
 const rows=teacherData?.progress||[],token=adminToken();
 return `<div class="ph"><h2>Panel del profesor</h2><p>Seguimiento automático del grupo y administración del contenido. La hoja de resultados permanece privada.</p></div>
 <div class="card" style="margin-bottom:1rem"><form id="admin-token-form"><label for="admin-token"><b>Clave administrativa</b></label><div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.5rem"><input id="admin-token" type="password" required value="${esc(token)}" placeholder="Token de Apps Script" style="flex:1;min-width:220px;padding:.65rem;border:1px solid var(--line);border-radius:8px"><button class="btn" type="submit">Actualizar progreso</button></div><small>Se guarda en este navegador.</small></form></div>
 ${teacherData?`<div class="card tw" style="margin-bottom:1rem"><div style="display:flex;justify-content:space-between;gap:.5rem;align-items:center;flex-wrap:wrap"><h3>Progreso de estudiantes</h3><button class="btn sec sm" data-act="refresh-teacher">Actualizar ahora</button></div><table><thead><tr><th>Estudiante</th><th>Lecciones</th><th>Avance</th><th>Tiempo</th><th>Exámenes 1–4</th><th>Última actividad</th></tr></thead><tbody>${rows.map(p=>`<tr><td><b>${esc(p.name)}</b></td><td>${p.done}/${p.total}</td><td><div class="bar"><i style="width:${p.percent}%"></i></div><small>${p.percent}%</small></td><td>${p.mins} min</td><td>${p.examScores.map(x=>x==null?'—':x+'/100').join(' · ')}</td><td>${p.updated?ago(p.updated):'—'}</td></tr>`).join('')||'<tr><td colspan="6">Todavía no hay registros.</td></tr>'}</tbody></table></div>`:''}
 <div class="grid g2"><div class="card"><h3>Publicar anuncio</h3><form id="announcement-form"><input name="tag" placeholder="Categoría" required style="width:100%;padding:.6rem;margin:.35rem 0"><input name="title" placeholder="Título" required style="width:100%;padding:.6rem;margin:.35rem 0"><textarea name="body" placeholder="Contenido" required rows="3" style="width:100%;padding:.6rem;margin:.35rem 0"></textarea><label><input type="checkbox" name="pin"> Fijar arriba</label><button class="btn" type="submit">Publicar</button></form></div>
 <div class="card"><h3>Añadir recurso</h3><form id="resource-form"><input name="title" placeholder="Nombre" required style="width:100%;padding:.6rem;margin:.35rem 0"><input name="description" placeholder="Descripción" style="width:100%;padding:.6rem;margin:.35rem 0"><input name="url" type="url" placeholder="https://…" required style="width:100%;padding:.6rem;margin:.35rem 0"><button class="btn" type="submit">Guardar recurso</button></form></div></div>`;
};

/* ---------- lector ---------- */
let rd = null, tick = null;
function reader(id, pg) {
  const l = L[id - 1]; if (!l) return location.hash = '#/lecciones';
  const p = les(id); pg = Math.min(Math.max(pg ?? Math.min(p.visited.length ? Math.max(...p.visited) : 0, l.pages.length - 1), 0), l.pages.length - 1);
  if (!p.visited.includes(pg)) { if (!p.visited.length) log(`Comenzó la Lección ${id}`, 'fa-book-open'); p.visited.push(pg); }
  p.last = new Date().toISOString(); rd = { id, pg };
  if (!p.done && p.visited.length === l.pages.length) { p.done = true; log(`Completó la Lección ${id}: ${l.title}`, 'fa-trophy'); toast(`¡Lección ${id} completada! 🎉`, 'Enviar progreso', sendDialog); }
  save();
  $('#view').innerHTML = `<div class="reader"><nav class="toc" id="toc"><h3>Lección ${id} · ${esc(l.title)}</h3>${l.pages.map((x, i) => `<a href="#/leccion/${id}/${i}" class="${i === pg ? 'on' : ''} ${p.visited.includes(i) ? 'seen' : ''}"><i class="fas ${p.visited.includes(i) ? 'fa-circle-check' : 'fa-circle'}"></i><span>${esc(x.t)}</span></a>`).join('')}</nav>
  <section class="rmain"><div class="rbar"><button class="btn sec sm menu" id="tgl"><i class="fas fa-list"></i></button><h3>Página ${pg + 1} de ${l.pages.length} · ${esc(l.pages[pg].t)}</h3><a class="btn sec sm" href="#/lecciones"><i class="fas fa-xmark"></i> Cerrar</a></div>
  <div class="stage"><iframe class="lesson" title="${esc(l.pages[pg].t)}" src="${esc(l.pages[pg].src)}"></iframe></div>
  <div class="rfoot"><a class="btn sec" ${pg ? `href="#/leccion/${id}/${pg - 1}"` : 'aria-disabled="true" style="opacity:.4;pointer-events:none"'}><i class="fas fa-chevron-left"></i> Anterior</a>
  <button class="btn sec sm" data-act="done" ${p.done ? 'disabled' : ''}><i class="fas fa-check"></i> ${p.done ? 'Completada' : 'Marcar completada'}</button>
  ${pg < l.pages.length - 1 ? `<a class="btn" href="#/leccion/${id}/${pg + 1}">Siguiente <i class="fas fa-chevron-right"></i></a>` : `<a class="btn ok" href="#/lecciones">Terminar <i class="fas fa-flag-checkered"></i></a>`}</div></section></div>`;
  $('#tgl')?.addEventListener('click', () => $('#toc').classList.toggle('show'));
}
setInterval(() => { if (rd && document.visibilityState === 'visible' && document.hasFocus() !== false && db.session) { les(rd.id).secs += 5; save(); } }, 5000);

/* ---------- router y shell ---------- */
const NAV = [['inicio', 'fa-house', 'Inicio'], ['anuncios', 'fa-bullhorn', 'Anuncios'], ['lecciones', 'fa-book-open', 'Lecciones'], ['vocabulario', 'fa-spell-check', 'Vocabulario'], ['evaluaciones', 'fa-clipboard-check', 'Quizzes'], ['progreso', 'fa-chart-line', 'Progreso'], ['silabo', 'fa-file-lines', 'Sílabo'], ['recursos', 'fa-folder-open', 'Recursos'], ['foro', 'fa-comments', 'Foro']];
const PROF = ['profesor', 'fa-chalkboard-user', 'Profesor'];
const navLink = n => `<a href="#/${n[0]}" data-r="${n[0]}"><i class="fas ${n[1]}"></i>${n[2]}${n[0] === 'anuncios' && unseen() ? `<em class="bdg">${unseen()}</em>` : ''}</a>`;
function shell() {
  const s = stu(), nav = isTeacher() ? [...NAV, PROF] : NAV;
  $('#app').innerHTML = `<header class="top"><a class="brand" href="#/inicio"><img src="assets/logo.png" alt="STBCOr"><span><b>Curso de Griego I</b><small>Seminario Teológico Bautista de Cuba Oriental</small></span></a><span class="chip">${C.course}</span><span class="sp"></span>
    <button class="icn" id="inst" hidden title="Instalar app"><i class="fas fa-download"></i></button><div class="who"><span>${esc(s.name)}</span><div class="av">${esc(s.name.replace(/^(Rector|Prof\.?)\s+/i, '')[0])}</div></div><button class="icn" id="out" title="Salir" aria-label="Cerrar sesión"><i class="fas fa-right-from-bracket"></i></button></header>
    <div class="layout"><aside class="side">${nav.map(navLink).join('')}<span class="grow"></span><button class="btn sec sm" data-act="send"><i class="fas fa-paper-plane"></i> Enviar progreso</button><div class="mini">© ${C.course} · STBCOr</div></aside><main id="view"></main></div>
    <nav class="bnav">${NAV.slice(0, 4).map(navLink).join('')}<a href="#/mas" data-act="more"><i class="fas fa-ellipsis"></i>Más</a></nav>`;
  $('#out').onclick = () => { db.session = null; save(); rd = null; location.hash = ''; boot(); };
  syncInstall();
}
function route() {
  if (!db.session) return;
  if (!$('#view')) shell();
  const [r, a, b] = (location.hash.slice(2) || 'inicio').split('/'); rd = null;
  $$('[data-r]').forEach(x => x.classList.toggle('on', x.dataset.r === r || (r === 'leccion' && x.dataset.r === 'lecciones')));
  if (r === 'leccion') return reader(+a, b === undefined ? undefined : +b);
  if (r === 'profesor' && isTeacher() && adminToken() && !teacherData) loadTeacherData(adminToken()).catch(e => console.warn(e));
  const v = V[r] && !(r === 'profesor' && !isTeacher()) ? r : 'inicio'; $('#view').innerHTML = V[v]();
  if (v === 'anuncios') { db.seen = [...C.announcements, ...(remoteContent.announcements || [])].map(a => a.id); save(); $$('.bdg').forEach(x => x.remove()); }
  window.scrollTo(0, 0);
}
document.addEventListener('click', async e => {
  if (e.target.closest('#dlg a[href^="#/"]')) $('#dlg').close();
  const t = e.target.closest('[data-act],[data-f],[data-exam]'); if (!t) return;
  if (t.dataset.act === 'more') { e.preventDefault(); return moreDialog(); }
  if (t.dataset.f) { V._f = t.dataset.f; return route(); }
  if (t.dataset.exam) { log(`Abrió ${C.exams[t.dataset.exam - 1].title}`, 'fa-clipboard-check'); save(); return; }
  const a = t.dataset.act;
  if (a === 'send') sendDialog();
  if (t.dataset.forumStatus) { try { await adminRequest('forumStatus',{id:t.dataset.forumStatus,status:t.dataset.status}); await loadContent(); toast(t.dataset.status==='Cerrado'?'Tema cerrado ✓':'Tema reabierto ✓'); } catch(err) { toast(err.message); } return; }
  if (a === 'refresh-teacher') { try { await loadTeacherData(adminToken()); toast('Datos actualizados ✓'); } catch (err) { toast(err.message); } }
  if (a === 'paste') pasteDialog();
  if (a === 'backup') { const r = await report(); download(fname(r), JSON.stringify(r, null, 2)); toast('Copia guardada en tus descargas'); }
  if (a === 'restore') restore();
  if (a === 'done') { const l = les(rd.id); l.done = true; log(`Completó la Lección ${rd.id}: ${L[rd.id - 1].title}`, 'fa-trophy'); save(); toast('Lección marcada como completada ✓'); reader(rd.id, rd.pg); }
  if (a === 'import') { const i = Object.assign(document.createElement('input'), { type: 'file', accept: '.json', multiple: true });
    i.onchange = async () => { let n = 0; for (const f of i.files) { try { const r = JSON.parse(await f.text()), { sig, ...rest } = r; if (r.v !== 2 || sig !== await sha(JSON.stringify(rest) + C.salt)) { toast(`${f.name}: archivo inválido`); continue; } addReport(r); n++; } catch { toast(`${f.name}: no se pudo leer`); } } toast(`${n} reporte(s) importado(s)`); route(); }; i.click(); }
  if (a === 'csv') { const rows = Object.values(read(REP, {})); const h = ['Estudiante', 'Lecciones', 'Minutos', ...C.exams.map(e => e.title), 'Fecha']; download('progreso_grupo.csv', '\ufeff' + [h, ...rows.map(r => [r.name, `${r.done}/${r.total}`, r.mins, ...C.exams.map(e => r.exams.find(x => x.n === e.n)?.score ?? ''), r.at.slice(0, 10)])].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n'), 'text/csv'); }
  if (a === 'clearrep' && confirm('¿Vaciar los reportes importados?')) { localStorage.removeItem(REP); route(); }
});
document.addEventListener('submit',async e=>{
 const f=e.target;
 try{
  if(f.id==='admin-token-form'){e.preventDefault();const t=$('#admin-token').value.trim();localStorage.setItem('stbcor.adminToken',t);await loadTeacherData(t);toast('Progreso actualizado ✓');}
  if(f.id==='announcement-form'){e.preventDefault();const x=new FormData(f),item={tag:x.get('tag'),title:x.get('title'),body:x.get('body'),pin:x.get('pin')==='on'};await adminRequest('saveAnnouncement',{item:JSON.stringify(item)});f.reset();await loadContent();toast('Anuncio publicado ✓');}
  if(f.id==='resource-form'){e.preventDefault();const x=new FormData(f),item={title:x.get('title'),description:x.get('description'),url:x.get('url')};await adminRequest('saveResource',{item:JSON.stringify(item)});f.reset();await loadContent();toast('Recurso añadido ✓');}
  if(f.id==='forum-form'){e.preventDefault();const s=stu(),message=$('#forum-message').value.trim(),d=await cloudJSONP({action:'forumPost',user:s.u,name:s.name,message});if(!d?.ok)throw new Error(d?.error||'No se pudo publicar');$('#forum-message').value='';await loadContent();toast('Tema publicado ✓');}
  if(f.classList.contains('forum-reply-form')){e.preventDefault();const s=stu(),message=f.elements.message.value.trim(),d=await cloudJSONP({action:'forumPost',user:s.u,name:s.name,message,parent:f.dataset.parent});if(!d?.ok)throw new Error(d?.error||'No se pudo responder');await loadContent();toast('Respuesta publicada ✓');}
 }catch(err){toast(err.message||'No se pudo completar');}
});

document.addEventListener('change', e => { const n = e.target.dataset?.score; if (!n) return; const v = e.target.value === '' ? null : Math.min(100, Math.max(0, +e.target.value)); me().exams[n] = { ...(me().exams[n] || {}), score: v }; if (v != null) log(`Registró su nota del ${C.exams[n - 1].title}: ${v}`, 'fa-clipboard-check'); save(); toast('Nota guardada ✓'); });
window.addEventListener('hashchange', route);
window.addEventListener('online', () => { cloudLast = 0; syncProgress(false); });
window.addEventListener('pagehide', () => { if (db.session && C.teacher?.endpoint) syncProgress(false); });

/* ---------- login ---------- */
function boot() {
  if (db.session && stu()) { shell(); route(); loadCloudProgress(); loadContent(); return; }
  db.session = null;
  $('#app').innerHTML = `<div class="login"><section class="hero"><img src="assets/logo.png" alt="Logo del Seminario"><span class="pill">CURSO ${C.course}</span><h1>Curso de Griego I</h1><p class="sub">${C.school}. Doce lecciones para leer el Nuevo Testamento en su lengua original.</p>
    <div class="feats"><div><i class="fas fa-book-open"></i>12 lecciones con 43 páginas de estudio</div><div><i class="fas fa-chart-line"></i>Progreso guardado y enviable al profesor</div><div><i class="fas fa-clipboard-check"></i>Cuatro evaluaciones durante el curso</div><div><i class="fas fa-mobile-screen"></i>Instálala en tu teléfono; funciona sin conexión</div></div></section>
    <section class="formside"><form class="form" id="lf" autocomplete="on"><h2>Iniciar sesión</h2><p class="s">Entra con tu usuario del seminario.</p>
    <div class="fld"><label for="u">Usuario</label><div class="in"><input id="u" name="username" autocomplete="username" required autocapitalize="none"></div></div>
    <div class="fld"><label for="p">Contraseña</label><div class="in"><input id="p" name="password" type="password" autocomplete="current-password" required><button type="button" id="eye" aria-label="Mostrar contraseña"><i class="fas fa-eye"></i></button></div></div>
    <div class="err" id="er" role="alert"></div><button class="btn" type="submit">Entrar al curso <i class="fas fa-arrow-right"></i></button><p class="foot-note">¿Olvidaste tu contraseña? Consúltala con tu profesor.<br>© ${C.course} · STBCOr</p></form></section></div>`;
  $('#eye').onclick = () => { const p = $('#p'); p.type = p.type === 'password' ? 'text' : 'password'; };
  $('#lf').onsubmit = async e => {
    e.preventDefault(); const u = norm($('#u').value), s = C.students.find(x => norm(x.u) === u);
    if (!crypto?.subtle) return $('#er').textContent = 'Abre la plataforma desde su dirección https para iniciar sesión.';
    if (!s || s.h !== await sha(`${C.salt}|${u}|${$('#p').value}`)) return $('#er').textContent = 'Usuario o contraseña incorrectos.';
    db.session = s.u; me(); log('Inició sesión', 'fa-right-to-bracket'); save(); boot(); loadCloudProgress(); loadContent();
  };
}

/* ---------- PWA ---------- */
let deferred = null;
const ios = /iphone|ipad|ipod/i.test(navigator.userAgent), standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
function syncInstall() {
  const b = $('#inst'); if (!b || standalone) return; if (deferred || ios) b.hidden = false;
  b.onclick = async () => { if (deferred) { deferred.prompt(); await deferred.userChoice; deferred = null; b.hidden = true; } else dialog('Instalar en iPhone / iPad', '<p>Toca <b>Compartir</b> <i class="fas fa-arrow-up-from-bracket"></i> en Safari y elige <b>«Añadir a pantalla de inicio»</b>.</p>'); };
}
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; syncInstall(); });
window.addEventListener('appinstalled', () => toast('Aplicación instalada ✓'));
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').then(reg => {
  reg.addEventListener('updatefound', () => { const w = reg.installing; w?.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) toast('Hay una nueva versión del curso.', 'Actualizar', () => w.postMessage('SKIP_WAITING')); }); });
}).catch(() => {});
let reloaded = false; navigator.serviceWorker?.addEventListener('controllerchange', () => { if (!reloaded) { reloaded = true; location.reload(); } });
boot();
})();
