/**
 * Curso de Griego I · STBCOr · API Google Sheets
 * Todo el backend vive en este único archivo Code.gs.
 *
 * Instalación:
 * 1. Vincula este proyecto Apps Script a una hoja de cálculo.
 * 2. Pega este archivo completo en Code.gs.
 * 3. Implementa como Aplicación web: ejecutar como propietario,
 *    acceso: cualquier usuario (la app valida usuario y limita acciones).
 *
 * NOTA: GitHub Pages es público y el login actual es del lado cliente.
 * Esta API registra seguimiento académico, pero no debe usarse para datos
 * sensibles ni considerarse un sistema de identidad de alta seguridad.
 */

const CFG = {
  COURSE: 'Griego I 2026-2027',
  SHEETS: { PROGRESS: 'Progreso', EXAMS: 'Examenes', ACTIVITY: 'Actividad', ANNOUNCEMENTS: 'Anuncios', RESOURCES: 'Recursos', FORUM: 'Foro' },
  PASS_MARK: 70,
  EXAMS: [
    {
      id: 1, title: 'Examen 1 · Fundamentos nominales', topic: 'Lecciones 1–4',
      questions: [
        ['¿Cuántas letras tiene el alfabeto griego clásico?', ['22','24','26','27'], 1, 'El alfabeto griego tiene 24 letras.'],
        ['¿Qué signo distingue una vocal larga de una breve en algunas ediciones didácticas?', ['La diéresis','El espíritu áspero','La cantidad vocálica indicada por macrón o breve','La coma'], 2, 'La cantidad vocálica distingue duración larga y breve.'],
        ['¿Qué caso suele funcionar como sujeto de una oración?', ['Genitivo','Dativo','Acusativo','Nominativo'], 3, 'El nominativo identifica normalmente el sujeto.'],
        ['¿Qué caso suele marcar el objeto directo?', ['Acusativo','Nominativo','Genitivo','Vocativo'], 0, 'El acusativo es el caso típico del objeto directo.'],
        ['¿Qué expresa normalmente el genitivo?', ['El sujeto','Relación, posesión u origen','Una orden','El objeto directo'], 1, 'El genitivo expresa relaciones como posesión, origen o descripción.'],
        ['¿Qué expresa normalmente el dativo?', ['Solo el sujeto','Solo el tiempo pasado','Destinatario, medio o interés','El vocativo'], 2, 'El dativo puede expresar destinatario, medio, instrumento o interés.'],
        ['¿Qué significa que un sustantivo sea de primera declinación?', ['Que siempre es neutro','Que no cambia de forma','Que solo aparece en plural','Que sigue el patrón flexivo de la primera declinación'], 3, 'La declinación agrupa patrones de terminaciones nominales.'],
        ['¿Con qué concuerda el artículo griego?', ['Género, número y caso','Solo con el verbo','Solo con el número','Con el orden de palabras'], 0, 'El artículo concuerda con el sustantivo en género, número y caso.'],
        ['¿Cuál es el artículo definido nominativo masculino singular?', ['τό','ὁ','ἡ','οἱ'], 1, 'ὁ es el artículo nominativo masculino singular.'],
        ['¿Qué función tiene el vocativo?', ['Indicar posesión','Marcar el objeto directo','Dirigirse directamente a alguien','Indicar instrumento'], 2, 'El vocativo se usa para llamar o dirigirse a alguien.']
      ]
    },
    {
      id: 2, title: 'Examen 2 · Adjetivos, pronombres y preposiciones', topic: 'Lecciones 5–7',
      questions: [
        ['¿Qué debe concordar con el sustantivo al que modifica un adjetivo atributivo?', ['Solo la posición','Género, número y caso','Solo el género','Solo la persona'], 1, 'El adjetivo concuerda con el sustantivo en género, número y caso.'],
        ['¿Qué función puede cumplir un adjetivo en posición predicativa?', ['Expresar una cualidad mediante una construcción predicativa','Convertirse en preposición','Marcar siempre posesión','Sustituir al artículo'], 0, 'La posición predicativa atribuye una cualidad al sustantivo.'],
        ['¿Cuál es la función principal de un pronombre personal?', ['Indicar tiempo','Unir dos cláusulas','Sustituir o representar a una persona o entidad','Marcar caso vocativo'], 2, 'El pronombre puede representar a los participantes del discurso.'],
        ['¿Qué expresa la primera persona?', ['La persona de quien se habla','La persona a quien se habla','Una entidad no personal','Quien habla'], 3, 'La primera persona corresponde al hablante.'],
        ['¿Qué expresa la segunda persona?', ['Quien escucha o a quien se habla','Quien habla','La persona de quien se habla','Una acción pasada'], 0, 'La segunda persona corresponde al interlocutor.'],
        ['¿Qué información ayuda a identificar la función de un pronombre griego?', ['El color de la palabra','Su caso, forma y contexto','La longitud de la oración solamente','La puntuación española'], 1, 'La forma flexiva y el contexto permiten reconocer su función.'],
        ['¿Qué rige una preposición griega?', ['Siempre el nominativo','Siempre el vocativo','Un caso o casos determinados','Únicamente el plural'], 2, 'Cada preposición selecciona uno o más casos.'],
        ['¿Qué puede cambiar cuando una preposición admite más de un caso?', ['La fuente tipográfica','El número de sílabas','La persona del verbo','El sentido de la relación expresada'], 3, 'El caso puede modificar el matiz semántico de la preposición.'],
        ['¿Qué es una frase preposicional?', ['Preposición junto con su complemento','Un verbo conjugado','Un sustantivo sin caso','Una oración sin predicado'], 0, 'La frase preposicional incluye la preposición y su término.'],
        ['¿Cuál es una estrategia correcta para traducir una frase preposicional?', ['Ignorar el caso','Identificar preposición, caso y contexto','Traducir siempre palabra por palabra','Cambiarla por un adverbio'], 1, 'Se interpreta considerando la preposición, el caso regido y el contexto.']
      ]
    },
    {
      id: 3, title: 'Examen 3 · El sistema verbal y el presente', topic: 'Lecciones 8–10',
      questions: [
        ['¿Cuál es el significado básico de εἰμί?', ['Comer','Ser o estar','Escribir','Enviar'], 1, 'εἰμί es el verbo ser/estar.'],
        ['¿Qué forma es εἰμί?', ['Un sustantivo','Una preposición','Un verbo','Un adjetivo'], 2, 'εἰμί es un verbo copulativo.'],
        ['¿Qué función puede desempeñar un nominativo predicativo con εἰμί?', ['Atribuir una cualidad o identificar al sujeto','Marcar el objeto directo','Indicar posesión','Introducir una subordinada'], 0, 'El predicativo complementa al sujeto mediante el verbo copulativo.'],
        ['¿Qué expresa el presente indicativo activo?', ['Una orden indirecta','Una acción en voz pasiva exclusivamente','Una acción futura','Una acción o estado presentado en presente/como actual'], 3, 'El presente indicativo activo presenta la acción desde la voz activa.'],
        ['¿Qué indica la voz activa?', ['Que el sujeto recibe la acción','Que el sujeto realiza la acción','Que no hay sujeto','Que la acción es necesariamente pasada'], 1, 'En voz activa el sujeto se presenta como quien realiza la acción.'],
        ['¿Qué indica la voz pasiva?', ['Que el sujeto recibe la acción','Que el sujeto realiza la acción','Que el verbo es siempre copulativo','Que no existe objeto'], 0, 'En voz pasiva el sujeto recibe la acción.'],
        ['¿Qué matiz básico puede expresar la voz media?', ['Solo tiempo futuro','Solo una orden','Relación del sujeto con la acción o interés del sujeto','Pluralidad del sujeto'], 2, 'La voz media presenta la acción en relación con el sujeto, según el verbo y contexto.'],
        ['¿Qué categoría expresa la terminación verbal griega?', ['Únicamente el género','Únicamente el caso','Solo el número del sustantivo','Información como persona, número, tiempo y voz'], 3, 'Las formas verbales codifican varias categorías gramaticales.'],
        ['¿Qué modo aparece en las formas del presente indicativo estudiadas?', ['Indicativo','Imperativo','Optativo','Subjuntivo'], 0, 'El indicativo presenta la acción como afirmación.'],
        ['¿Qué debe analizarse para identificar una forma verbal?', ['Solo la primera letra','Aumento, tema y terminación cuando corresponda','Solo la traducción española','El número de palabras del párrafo'], 1, 'La estructura morfológica y el contexto permiten analizar la forma verbal.']
      ]
    },
    {
      id: 4, title: 'Examen 4 · Imperfecto y futuro', topic: 'Lecciones 11–12',
      questions: [
        ['¿Qué tiempo verbal se estudia en la lección 11?', ['Aoristo','Perfecto','Imperfecto','Futuro'], 2, 'La lección 11 estudia el imperfecto indicativo.'],
        ['¿Qué valor aspectual suele asociarse al imperfecto indicativo?', ['Acción pasada vista en desarrollo o habitual','Acción futura puntual','Mandato directo','Estado siempre atemporal'], 0, 'El imperfecto suele presentar una acción pasada en desarrollo o repetida.'],
        ['¿Qué elemento suele aparecer al inicio de formas del imperfecto indicativo?', ['Reduplicación de perfecto','Aumento','Acento circunflejo obligatorio','Preposición'], 1, 'El aumento es una característica típica de los tiempos secundarios del indicativo.'],
        ['¿Qué voz se estudia junto al imperfecto activo?', ['Solo media','Solo activa','Ninguna','Pasiva'], 3, 'El bloque incluye imperfecto activo e imperfecto pasivo.'],
        ['¿Qué tiempo verbal se estudia en la lección 12?', ['Futuro','Imperfecto','Presente','Perfecto'], 0, 'La lección 12 aborda el futuro activo y medio.'],
        ['¿Qué marca morfológica es característica frecuente del futuro griego?', ['El aumento','La partícula ἄν obligatoria','El elemento sigma en muchos futuros','El artículo definido'], 2, 'Muchos futuros griegos se forman con el elemento -σ-.'],
        ['¿Qué voces se trabajan en el futuro del curso?', ['Pasiva y causativa','Activa y media','Solo pasiva','Activa y perfecta'], 1, 'El contenido incluye futuro activo y futuro medio.'],
        ['¿Qué sucede en algunos futuros de verbos con tema terminado en consonante líquida?', ['Siempre se añade aumento','Se elimina el verbo','Se convierten en sustantivos','Pueden presentar formación de futuro líquido sin sigma visible'], 3, 'Los futuros líquidos muestran cambios morfológicos particulares.'],
        ['¿Qué forma futura de εἰμί se estudia?', ['ἔσομαι','εἰμί','ἦν','ἐσμέν'], 0, 'ἔσομαι es la forma futura de εἰμί estudiada en el curso.'],
        ['¿Qué procedimiento es más adecuado para traducir imperfecto o futuro?', ['Traducir solo por la terminación española','Ignorar el contexto','Identificar tiempo, voz, persona, número y contexto','Asumir que todas las formas son activas'], 2, 'La traducción requiere análisis morfológico y contextual.']
      ]
    }
  ]
};

const HEADERS = {
  Progreso: ['Actualizado', 'Usuario', 'Nombre', 'Lecciones completadas', 'Total lecciones', 'Porcentaje', 'Minutos', 'Detalle JSON'],
  Examenes: ['Fecha', 'Usuario', 'Nombre', 'Examen', 'Título', 'Aciertos', 'Total', 'Nota', 'Aprobado', 'Respuestas JSON'],
  Actividad: ['Fecha', 'Usuario', 'Nombre', 'Tipo', 'Detalle'],
  Anuncios: ['ID', 'Fecha', 'Etiqueta', 'Título', 'Contenido', 'Fijado', 'Activo'],
  Recursos: ['ID', 'Fecha', 'Tipo', 'Título', 'Descripción', 'URL', 'Activo'],
  Foro: ['ID', 'Fecha', 'Usuario', 'Nombre', 'Mensaje', 'Respuesta a', 'Activo', 'Estado']
};

function doGet(e) {
  const p = (e && e.parameter) || {};
  const action = String(p.action || '');
  let result;
  try {
    if (action === 'exam') {
      const exam = getExam_(Number(p.exam));
      result = exam ? { ok: true, exam: publicExam_(exam) } : { ok: false, error: 'Examen no encontrado' };
    } else if (action === 'grade') {
      const answers = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(p.answers || '')).getDataAsString('UTF-8'));
      result = gradeExam_(String(p.user || ''), String(p.name || ''), Number(p.exam), answers);
    } else if (action === 'progress') {
      result = { ok: true, progress: findProgress_(String(p.user || '')) };
    } else if (action === 'content') {
      result = getPublicContent_();
    } else if (action === 'teacherData') {
      requireAdmin_(p.token);
      result = getTeacherData_();
    } else if (action === 'forumPost') {
      result = saveForumPost_(p);
    } else if (action === 'forumStatus') {
      requireAdmin_(p.token);
      result = setForumStatus_(p.id, p.status);
    } else if (action === 'saveAnnouncement' || action === 'saveResource' || action === 'deleteContent' || action === 'deleteForumPost') {
      requireAdmin_(p.token);
      const item = p.item ? JSON.parse(p.item) : {};
      if (action === 'saveAnnouncement') result = saveContentItem_('Anuncios', item);
      else if (action === 'saveResource') result = saveContentItem_('Recursos', item);
      else if (action === 'deleteContent') result = deleteContentItem_(p.kind, p.id);
      else if (action === 'deleteForumPost') result = deleteForumPost_(p.id);
      else result = deleteForumConversation_(p.id);
    } else {
      result = { ok: true, service: 'STBCOr Greek Course API', version: '1.0', actions: ['exam','grade','progress'] };
    }
  } catch (err) {
    result = { ok: false, error: String(err && err.message || err) };
  }
  return output_(result, p.callback);
}

function doPost(e) {
  let result;
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (data.action === 'saveProgress') result = saveProgress_(data.report || data);
    else if (data.user && Array.isArray(data.lessons)) result = saveProgress_(data); // Compatibilidad: reportes enviados directamente por la versión anterior de la app
    else if (data.action === 'forumPost') result = saveForumPost_(data);
    else {
      requireAdmin_(data.token);
      if (data.action === 'saveAnnouncement') result = saveContentItem_('Anuncios', data.item);
      else if (data.action === 'saveResource') result = saveContentItem_('Recursos', data.item);
      else if (data.action === 'deleteContent') result = deleteContentItem_(data.kind, data.id);
      else if (data.action === 'deleteForumPost') result = deleteForumPost_(data.id);
      else if (data.action === 'deleteForumConversation') result = deleteForumConversation_(data.id);
      else if (data.action === 'forumStatus') result = setForumStatus_(data.id, data.status);
      else result = { ok: false, error: 'Acción no válida' };
    }
  } catch (err) {
    result = { ok: false, error: String(err && err.message || err) };
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function output_(obj, callback) {
  const json = JSON.stringify(obj);
  if (callback && /^[a-zA-Z_$][0-9a-zA-Z_$\.]*$/.test(callback)) {
    return ContentService.createTextOutput(callback + '(' + json + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function publicExam_(exam) {
  return { id: exam.id, title: exam.title, topic: exam.topic, questions: exam.questions.map((q, i) => ({
    id: i + 1, text: q[0], options: q[1]
  })) };
}

function getExam_(id) {
  return CFG.EXAMS.find(x => x.id === id);
}

function gradeExam_(user, name, examId, answers) {
  if (!user || !/^[a-z0-9._-]{2,40}$/i.test(user)) throw new Error('Usuario no válido');
  const exam = getExam_(examId);
  if (!exam) throw new Error('Examen no encontrado');
  if (!answers || typeof answers !== 'object') throw new Error('Respuestas no válidas');
  let correct = 0;
  const detail = exam.questions.map((q, i) => {
    const given = Number(answers[String(i + 1)]);
    const ok = Number.isInteger(given) && given === q[2];
    if (ok) correct++;
    return { id: i + 1, selected: Number.isInteger(given) ? given : null, correct: q[2], ok, explanation: q[3] };
  });
  const score = Math.round(correct / exam.questions.length * 10000) / 100;
  const sh = sheet_(CFG.SHEETS.EXAMS);
  sh.appendRow([new Date(), user, safe_(name), examId, exam.title, correct, exam.questions.length, score, score >= CFG.PASS_MARK ? 'Sí' : 'No', JSON.stringify(detail)]);
  activity_(user, name, 'examen', exam.title + ': ' + score + '/100');
  return { ok: true, exam: examId, correct, total: exam.questions.length, score, passed: score >= CFG.PASS_MARK, detail };
}

function saveProgress_(r) {
  if (!r || !r.user || !/^[a-z0-9._-]{2,40}$/i.test(String(r.user))) throw new Error('Reporte no válido');
  const sh = sheet_(CFG.SHEETS.PROGRESS);
  const last = sh.getLastRow();
  const values = last > 1 ? sh.getRange(2, 2, last - 1, 1).getValues().flat() : [];
  const row = [new Date(r.at || Date.now()), String(r.user), safe_(r.name), Number(r.done || 0), Number(r.total || 12), Math.round((Number(r.done || 0) / Math.max(1, Number(r.total || 12))) * 100), Number(r.mins || 0), JSON.stringify(r)];
  const idx = values.findIndex(x => String(x) === String(r.user));
  if (idx >= 0) sh.getRange(idx + 2, 1, 1, row.length).setValues([row]);
  else sh.appendRow(row);
  activity_(r.user, r.name, 'progreso', row[3] + '/' + row[4] + ' lecciones');
  return { ok: true, saved: true };
}

function findProgress_(user) {
  const sh = sheet_(CFG.SHEETS.PROGRESS);
  if (sh.getLastRow() < 2) return null;
  const rows = sh.getDataRange().getValues();
  const i = rows.findIndex((r, n) => n > 0 && String(r[1]) === user);
  return i < 0 ? null : { updated: rows[i][0], user: rows[i][1], name: rows[i][2], done: rows[i][3], total: rows[i][4], percent: rows[i][5], mins: rows[i][6], detail: rows[i][7] };
}

function sheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS[name]);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS[name].length).setFontWeight('bold').setBackground('#14385c').setFontColor('#ffffff');
  } else if (HEADERS[name]) {
    // Migra encabezados de hojas existentes sin tocar los datos guardados.
    const current = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
    if (current.length < HEADERS[name].length || current[HEADERS[name].length - 1] !== HEADERS[name][HEADERS[name].length - 1]) {
      sh.getRange(1, current.length + 1, 1, HEADERS[name].length - current.length).setValues([HEADERS[name].slice(current.length)]);
      sh.getRange(1, current.length + 1, 1, HEADERS[name].length - current.length).setFontWeight('bold').setBackground('#14385c').setFontColor('#ffffff');
    }
  }
  return sh;
}

function activity_(user, name, type, detail) {
  sheet_(CFG.SHEETS.ACTIVITY).appendRow([new Date(), user, safe_(name), type, safe_(detail)]);
}

function safe_(v) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, '').slice(0, 500);
}


/* Contenido dinámico y administración */
function requireAdmin_(token) {
  const expected = PropertiesService.getScriptProperties().getProperty('ADMIN_TOKEN');
  if (!expected || String(token || '') !== expected) throw new Error('Acceso administrativo no autorizado.');
}
function rowsAsObjects_(name) {
  const values = sheet_(name).getDataRange().getValues(), headers = values[0];
  return values.slice(1).map(row => Object.fromEntries(headers.map((h,i)=>[h,row[i]])));
}
function getPublicContent_() {
  const announcements = rowsAsObjects_('Anuncios').filter(x=>x.Activo!=='No'&&x.Activo!==false).map(x=>({id:String(x.ID),date:x.Fecha instanceof Date?x.Fecha.toISOString():String(x.Fecha||''),tag:String(x.Etiqueta||'Aviso'),title:String(x.Título||''),body:String(x.Contenido||''),pin:x.Fijado==='Sí'||x.Fijado===true}));
  const resources = rowsAsObjects_('Recursos').filter(x=>x.Activo!=='No'&&x.Activo!==false).map(x=>({id:String(x.ID),i:String(x.Tipo||'fa-link'),t:String(x.Título||''),d:String(x.Descripción||''),u:String(x.URL||''),b:'Abrir recurso'}));
  const posts = rowsAsObjects_('Foro').filter(x=>x.Activo!=='No'&&x.Activo!==false).map(x=>({id:String(x.ID),date:x.Fecha instanceof Date?x.Fecha.toISOString():String(x.Fecha||''),user:String(x.Usuario||''),name:String(x.Nombre||''),message:String(x.Mensaje||''),parent:String(x['Respuesta a']||''),status:String(x.Estado||'Abierto')}));
  return {ok:true,announcements,resources,posts};
}
function getTeacherData_() {
  const progress=rowsAsObjects_('Progreso').map(x=>({user:String(x.Usuario||''),name:String(x.Nombre||''),done:Number(x['Lecciones completadas']||0),total:Number(x['Total lecciones']||12),percent:Number(x.Porcentaje||0),mins:Number(x.Minutos||0),updated:x.Actualizado instanceof Date?x.Actualizado.toISOString():String(x.Actualizado||''),detail:String(x['Detalle JSON']||'{}')}));
  const exams=rowsAsObjects_('Examenes').map(x=>({user:String(x.Usuario||''),name:String(x.Nombre||''),exam:Number(x.Examen||0),score:Number(x.Nota||0),passed:String(x.Aprobado||'')==='Sí',date:x.Fecha instanceof Date?x.Fecha.toISOString():String(x.Fecha||'')}));
  const activity=rowsAsObjects_('Actividad').map(x=>({date:x.Fecha instanceof Date?x.Fecha.toISOString():String(x.Fecha||''),user:String(x.Usuario||''),name:String(x.Nombre||''),type:String(x.Tipo||''),detail:String(x.Detalle||'')})).slice(-150).reverse();
  progress.forEach(p=>{let d={};try{d=JSON.parse(p.detail)}catch(_){}p.lessons=Array.isArray(d.lessons)?d.lessons:[];p.exams=exams.filter(e=>e.user===p.user);p.examScores=[1,2,3,4].map(n=>{const a=p.exams.filter(e=>e.exam===n);return a.length?a[a.length-1].score:null});delete p.detail});
  return {ok:true,progress,exams,activity};
}
function saveContentItem_(name,item) {
  if(!item||!item.title||(name==='Anuncios'&&!item.body)||(name==='Recursos'&&!item.url))throw new Error('Completa los campos obligatorios.');
  const sh=sheet_(name),rows=sh.getDataRange().getValues(),id=String(item.id||Utilities.getUuid());
  const row=name==='Anuncios'?[id,new Date(),safe_(item.tag||'Aviso'),safe_(item.title),safe_(item.body),item.pin?'Sí':'No','Sí']:[id,new Date(),safe_(item.icon||'fa-link'),safe_(item.title),safe_(item.description||''),safeUrl_(item.url),'Sí'];
  const i=rows.findIndex((r,n)=>n>0&&String(r[0])===id);
  if(i>0)sh.getRange(i+1,1,1,row.length).setValues([row]);else sh.appendRow(row);
  return {ok:true,id};
}
function deleteContentItem_(kind,id) {
  const name=kind==='announcement'?'Anuncios':kind==='resource'?'Recursos':'';
  if(!name)throw new Error('Tipo no válido.');
  const sh=sheet_(name),rows=sh.getDataRange().getValues(),i=rows.findIndex((r,n)=>n>0&&String(r[0])===String(id));
  if(i<1)throw new Error('Elemento no encontrado.');
  sh.getRange(i+1,rows[0].length).setValue('No');return {ok:true};
}
function saveForumPost_(d) {
  const user=safe_(d.user),name=safe_(d.name),message=String(d.message||'').replace(/[\\u0000-\\u001f]/g,'').trim().slice(0,2000);
  if(!user||!name||message.length<3)throw new Error('El mensaje debe tener entre 3 y 2000 caracteres.');
  const sh=sheet_('Foro'), parent=String(d.parent||'').trim();
  if(parent){
    const rows=sh.getDataRange().getValues(), root=rows.find((r,i)=>i>0&&String(r[0])===parent&&String(r[5]||'')==='');
    if(!root||String(root[6])==='No')throw new Error('La pregunta original no está disponible.');
    if(String(root[7]||'Abierto')!=='Abierto')throw new Error('Este tema está cerrado. Ya no admite respuestas.');
  }
  const id=Utilities.getUuid();sh.appendRow([id,new Date(),user,name,message,parent,'Sí',parent?'':'Abierto']);return {ok:true,id};
}
function setForumStatus_(id,status) {
  if(!['Abierto','Cerrado'].includes(status))throw new Error('Estado no válido.');
  const sh=sheet_('Foro'),rows=sh.getDataRange().getValues();
  const i=rows.findIndex((r,n)=>n>0&&String(r[0])===String(id)&&String(r[5]||'')==='');
  if(i<1)throw new Error('No se encontró el tema.');
  sh.getRange(i+1,8).setValue(status);return {ok:true,id,status};
}
function deleteForumConversation_(id) {
  const sh=sheet_('Foro'), rows=sh.getDataRange().getValues();
  const root=rows.find((r,n)=>n>0&&String(r[0])===String(id)&&String(r[5]||'')==='');
  if(!root)throw new Error('No se encontró la conversación.');
  let removed=0;
  rows.forEach((r,n)=>{
    if(n>0&&(String(r[0])===String(id)||String(r[5]||'')===String(id))&&String(r[6])!=='No'){
      sh.getRange(n+1,7).setValue('No');removed++;
    }
  });
  return {ok:true,id,removed};
}
function deleteForumPost_(id) {
  const sh=sheet_('Foro'),rows=sh.getDataRange().getValues(),i=rows.findIndex((r,n)=>n>0&&String(r[0])===String(id));
  if(i<1)throw new Error('Publicación no encontrada.');sh.getRange(i+1,7).setValue('No');return {ok:true};
}
function safeUrl_(v) {
  const url=String(v||'').trim();if(!/^https:\/\/[^\s]+$/i.test(url))throw new Error('El enlace debe comenzar con https://');return url.slice(0,1000);
}

/** Ejecuta manualmente desde Apps Script para crear y preparar las pestañas. */
function setup() {
  Object.keys(HEADERS).forEach(sheet_);
  SpreadsheetApp.getUi().alert('La hoja quedó preparada: Progreso, Examenes, Actividad, Anuncios, Recursos y Foro.');
}
