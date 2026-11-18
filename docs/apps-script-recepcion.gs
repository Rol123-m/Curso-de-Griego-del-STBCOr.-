/**
 * Recepción automática del progreso de los estudiantes en una Hoja de Google.
 * 1) Crea una Hoja de cálculo nueva (Google Sheets).
 * 2) Extensiones → Apps Script → pega este código → Guardar.
 * 3) Implementar → Nueva implementación → Tipo: Aplicación web
 *    · Ejecutar como: Yo   · Quién tiene acceso: Cualquier usuario
 * 4) Copia la URL que termina en /exec y pégala en js/config.js → teacher.endpoint
 *    (y la URL de la hoja en teacher.sheetUrl).
 */
const COLS = ['Fecha', 'Usuario', 'Nombre', 'Lecciones', 'Minutos', 'Quiz 1', 'Quiz 2', 'Examen 3', 'Examen 4', 'Detalle (JSON)'];
function doPost(e) {
  const r = JSON.parse(e.postData.contents);
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Progreso') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Progreso');
  if (sh.getLastRow() === 0) sh.appendRow(COLS);
  const sc = n => { const x = (r.exams || []).find(v => v.n === n); return x && x.score != null ? x.score : ''; };
  sh.appendRow([new Date(r.at), r.user, r.name, r.done + '/' + r.total, r.mins, sc(1), sc(2), sc(3), sc(4), JSON.stringify(r.lessons)]);
  return ContentService.createTextOutput('ok');
}
