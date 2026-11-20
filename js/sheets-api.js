/* Exámenes internos · Google Apps Script */
(() => {
 'use strict';
 const C=window.CONFIG;
 const endpoint=()=>C?.teacher?.endpoint||'';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function request(params){return new Promise((resolve,reject)=>{
  const cb='stbcExam_'+Date.now()+'_'+Math.random().toString(36).slice(2),script=document.createElement('script');
  const timer=setTimeout(()=>{clean();reject(new Error('La API no respondió a tiempo.'));},18000);
  function clean(){clearTimeout(timer);delete window[cb];script.remove();}
  window[cb]=data=>{clean();resolve(data);};
  script.onerror=()=>{clean();reject(new Error('No se pudo conectar con Apps Script. Verifica que la implementación permita acceso a cualquier usuario.'));};
  script.src=endpoint()+'?'+new URLSearchParams({...params,callback:cb}).toString();
  document.head.appendChild(script);
 });}
 function openDialog(title,html){
  const d=document.getElementById('dlg');
  d.innerHTML='<div class="dh"><h3>'+esc(title)+'</h3><button id="dx" aria-label="Cerrar">&times;</button></div><div class="db">'+html+'</div>';
  d.querySelector('#dx').onclick=()=>d.close();if(!d.open)d.showModal();return d;
 }
 document.addEventListener('click',async ev=>{
  const btn=ev.target.closest('[data-take-exam]');if(!btn)return;
  ev.preventDefault();
  if(!endpoint()){alert('Falta configurar la URL de Apps Script en js/config.js.');return;}
  const session=window.CONFIG.students.find(s=>s.u===window.__stbcSession);
  // El identificador de sesión se obtiene del estado local de la aplicación.
  let state={};try{state=JSON.parse(localStorage.getItem('stbcor.v2')||'{}');}catch{}
  const student=C.students.find(s=>s.u===state.session);
  if(!student){alert('No se pudo identificar al estudiante. Cierra sesión e inicia nuevamente.');return;}
  const examNo=Number(btn.dataset.takeExam);
  btn.disabled=true;const original=btn.innerHTML;btn.textContent='Cargando examen…';
  try{
   const response=await request({action:'exam',exam:examNo});
   if(!response?.ok||!response.exam)throw new Error(response?.error||'No se pudo cargar el examen.');
   const exam=response.exam;
   const form='<form id="stbc-exam">'+exam.questions.map(q=>'<fieldset class="card" style="margin:.8rem 0"><legend><b>'+q.id+'. '+esc(q.text)+'</b></legend>'+q.options.map((option,i)=>'<label style="display:flex;gap:.55rem;padding:.45rem;cursor:pointer"><input type="radio" required name="q'+q.id+'" value="'+i+'"> '+esc(option)+'</label>').join('')+'</fieldset>').join('')+'<button class="btn" type="submit">Entregar examen y corregir</button></form>';
   const d=openDialog(exam.title,'<p>'+esc(exam.topic)+' · '+exam.questions.length+' preguntas</p>'+form);
   d.querySelector('#stbc-exam').addEventListener('submit',async e=>{
    e.preventDefault();
    const answers={};exam.questions.forEach(q=>{const selected=d.querySelector('input[name="q'+q.id+'"]:checked');if(selected)answers[q.id]=Number(selected.value);});
    if(Object.keys(answers).length!==exam.questions.length){alert('Responde todas las preguntas antes de entregar.');return;}
    const submit=d.querySelector('[type="submit"]');submit.disabled=true;submit.textContent='Corrigiendo…';
    try{
     const encoded=btoa(unescape(encodeURIComponent(JSON.stringify(answers)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
     const result=await request({action:'grade',exam:examNo,user:student.u,name:student.name,answers:encoded});
     if(!result?.ok)throw new Error(result?.error||'No se pudo corregir el examen.');
     const score=Number(result.score);
     const current=document.querySelector('[data-score="'+examNo+'"]');
     if(current){current.value=score;current.dispatchEvent(new Event('change',{bubbles:true}));}
     d.querySelector('.db').innerHTML='<h2>'+score.toFixed(2)+' / 100</h2><p><b>'+result.correct+' de '+result.total+' respuestas correctas.</b> '+(result.passed?'Examen aprobado.':'Continúa repasando el contenido.')+'</p>'+result.detail.map(item=>'<div class="card" style="margin:.6rem 0"><b>Pregunta '+item.id+' · '+(item.ok?'Correcta':'Incorrecta')+'</b><p>'+esc(item.explanation)+'</p></div>').join('')+'<button class="btn" id="exam-close">Cerrar</button>';
     d.querySelector('#exam-close').onclick=()=>{d.close();location.hash='#/evaluaciones';};
    }catch(error){alert(error.message);submit.disabled=false;submit.textContent='Entregar examen y corregir';}
   });
  }catch(error){alert(error.message);}
  finally{btn.disabled=false;btn.innerHTML=original;}
 });
})();