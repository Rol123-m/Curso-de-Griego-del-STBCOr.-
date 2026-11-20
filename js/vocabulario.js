/* ============================================================
   VOCABULARIO — Curso de Griego I · STBCOr 2026–2027
   Pestaña nueva: vocabulario por semana (tomado de las 12 lecciones)
   + práctica por selección múltiple + práctica con tarjetas.
   Solo añade funcionalidad: no altera el contenido ni la lógica existente.
   ============================================================ */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const shuf = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const KEY = 'stbcor.vocab';
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const store = read(KEY, { best: {} });
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch {} };
const saveBest = (sc, pct) => { if (pct > (store.best[sc] || 0)) { store.best[sc] = pct; persist(); } };

/* ---------- DATOS · vocabulario por semana y lección ----------
   Cada palabra: g (griego), t (transliteración), e (significado), i (dato gramatical).
   Todas las palabras aparecen en las páginas de las lecciones del curso. */
window.VOCAB = [
{ n: 1, lessons: [
  { id: 1, words: [
    { g: 'ἀγάπη', t: 'agápē', e: 'amor', i: 'sust. fem.' },
    { g: 'βίβλος', t: 'bíblos', e: 'libro', i: 'sust. fem.' },
    { g: 'γένος', t: 'génos', e: 'género', i: 'sust. neut.' },
    { g: 'δόξα', t: 'dóxa', e: 'gloria', i: 'sust. fem.' },
    { g: 'εἰρήνη', t: 'eirénē', e: 'paz', i: 'sust. fem.' },
    { g: 'ζωή', t: 'dzōē', e: 'vida', i: 'sust. fem.' },
    { g: 'ἡμέρα', t: 'hēméra', e: 'día', i: 'sust. fem.' },
    { g: 'θεός', t: 'theós', e: 'Dios', i: 'sust. masc.' },
    { g: 'ἰδού', t: 'idoú', e: 'he aquí', i: 'adverbio' },
    { g: 'καρδία', t: 'kardía', e: 'corazón', i: 'sust. fem.' },
    { g: 'λόγος', t: 'lógos', e: 'palabra', i: 'sust. masc.' },
    { g: 'μαθητής', t: 'mathētēs', e: 'discípulo', i: 'sust. masc.' },
    { g: 'νόμος', t: 'nómos', e: 'ley', i: 'sust. masc.' },
    { g: 'ξένος', t: 'xénos', e: 'extranjero', i: 'sust. masc.' },
    { g: 'ὁδός', t: 'hodós', e: 'camino', i: 'sust. fem.' },
    { g: 'πατήρ', t: 'patēr', e: 'padre', i: 'sust. masc.' },
    { g: 'ῥῆμα', t: 'rhēma', e: 'palabra, dicho', i: 'sust. neut.' },
    { g: 'σωτήρ', t: 'sōtēr', e: 'salvador', i: 'sust. masc.' },
    { g: 'τέκνον', t: 'téknon', e: 'hijo', i: 'sust. neut.' },
    { g: 'ὕμνος', t: 'hýmnos', e: 'himno', i: 'sust. masc.' },
    { g: 'φῶς', t: 'phōs', e: 'luz', i: 'sust. neut.' },
    { g: 'χάρις', t: 'cháris', e: 'gracia', i: 'sust. fem.' },
    { g: 'ψυχή', t: 'psychē', e: 'alma', i: 'sust. fem.' },
    { g: 'ὡς', t: 'hōs', e: 'como', i: 'conjunción' },
    { g: 'ἄγγελος', t: 'ángelos', e: 'ángel, mensajero', i: 'sust. masc.' }
  ] },
  { id: 2, words: [
    { g: 'ἀπόστολος', t: 'apóstolos', e: 'apóstol, enviado', i: 'sust. masc. · 2ª decl.' },
    { g: 'ἐπιστολή', t: 'epistolḗ', e: 'carta, epístola', i: 'sust. fem. · 1ª decl.' },
    { g: 'ἁμαρτία', t: 'hamartía', e: 'pecado', i: 'sust. fem. · 1ª decl.' },
    { g: 'ἁμαρτωλός', t: 'hamartōlós', e: 'pecador', i: 'sust. masc. · 2ª decl.' },
    { g: 'ἔργον', t: 'érgon', e: 'obra, trabajo', i: 'sust. neut. · 2ª decl.' },
    { g: 'γραφή', t: 'graphḗ', e: 'escritura', i: 'sust. fem. · 1ª decl.' },
    { g: 'σάρξ', t: 'sárx', e: 'carne', i: 'sust. fem. · 3ª decl.' },
    { g: 'λαός', t: 'laós', e: 'pueblo', i: 'sust. masc. · 2ª decl.' },
    { g: 'λόγος', t: 'lógos', e: 'palabra, discurso', i: 'sust. masc. · 2ª decl.' },
    { g: 'Ἰσραήλ', t: 'Israēl', e: 'Israel', i: 'nombre indeclinable' },
    { g: 'πέμπω', t: 'pémpō', e: 'envío, mando', i: 'verbo' },
    { g: 'λέγω', t: 'légō', e: 'digo', i: 'verbo' },
    { g: 'γράφω', t: 'gráphō', e: 'escribo', i: 'verbo' },
    { g: 'δίδωμι', t: 'dídōmi', e: 'doy', i: 'verbo' },
    { g: 'βλέπω', t: 'blépō', e: 'veo', i: 'verbo' },
    { g: 'ἀγαπάω', t: 'agapáō', e: 'amo', i: 'verbo' },
    { g: 'εἰμί', t: 'eimí', e: 'soy, estoy', i: 'verbo' },
    { g: 'ἀγαθός', t: 'agathós', e: 'bueno', i: 'adjetivo' }
  ] },
  { id: 3, words: [
    { g: 'ἀγάπη', t: 'agápē', e: 'amor', i: 'sust. fem. · 1ª decl.' },
    { g: 'δόξα', t: 'dóxa', e: 'gloria', i: 'sust. fem. · 1ª decl.' },
    { g: 'λόγος', t: 'lógos', e: 'palabra', i: 'sust. masc. · 2ª decl.' },
    { g: 'ἔργον', t: 'érgon', e: 'obra', i: 'sust. neut. · 2ª decl.' },
    { g: 'θεός', t: 'theós', e: 'Dios', i: 'sust. masc. · 2ª decl.' },
    { g: 'κόσμος', t: 'kósmos', e: 'mundo', i: 'sust. masc. · 2ª decl.' },
    { g: 'Χριστός', t: 'Christós', e: 'Cristo, Ungido', i: 'sust. masc. · 2ª decl.' },
    { g: 'ἀρχή', t: 'archḗ', e: 'principio', i: 'sust. fem. · 1ª decl.' }
  ] },
  { id: 4, words: [
    { g: 'γραφή', t: 'graphḗ', e: 'escritura', i: 'sust. fem. · 1ª decl.' },
    { g: 'ὥρα', t: 'hōra', e: 'hora', i: 'sust. fem. · 1ª decl. (α)' },
    { g: 'δόξα', t: 'dóxa', e: 'gloria', i: 'sust. fem. · 1ª decl. (α)' },
    { g: 'Ἰησοῦς', t: 'Iēsoûs', e: 'Jesús', i: 'sust. masc. parcialmente declinado' },
    { g: 'κόσμος', t: 'kósmos', e: 'mundo', i: 'sust. masc. · 2ª decl.' },
    { g: 'θεός', t: 'theós', e: 'Dios', i: 'sust. masc. · 2ª decl.' },
    { g: 'λόγος', t: 'lógos', e: 'palabra, verbo', i: 'sust. masc. · 2ª decl.' },
    { g: 'ἔργον', t: 'érgon', e: 'obra', i: 'sust. neut. · 2ª decl.' },
    { g: 'Χριστός', t: 'Christós', e: 'Cristo', i: 'sust. masc. · 2ª decl.' }
  ] }
] },
{ n: 2, lessons: [
  { id: 5, words: [
    { g: 'ἀγαθός', t: 'agathós', e: 'bueno', i: 'adjetivo · 2-1-2' },
    { g: 'μέγας', t: 'mégas', e: 'grande', i: 'adjetivo' },
    { g: 'πόλις', t: 'pólis', e: 'ciudad', i: 'sust. fem.' },
    { g: 'καλός', t: 'kalós', e: 'bueno, hermoso', i: 'adjetivo · 2-1-2' },
    { g: 'πιστός', t: 'pistós', e: 'fiel', i: 'adjetivo · 2-1-2' },
    { g: 'νέος', t: 'néos', e: 'nuevo', i: 'adjetivo · 2-1-2' },
    { g: 'ἄνθρωπος', t: 'ánthrōpos', e: 'hombre, ser humano', i: 'sust. masc. · 2ª decl.' },
    { g: 'θεός', t: 'theós', e: 'Dios', i: 'sust. masc.' },
    { g: 'ἔργον', t: 'érgon', e: 'obra', i: 'sust. neut.' }
  ] },
  { id: 6, words: [
    { g: 'ἐγώ', t: 'egṓ', e: 'yo', i: 'pron. 1ª pers. sg. nom.' },
    { g: 'ἐμοῦ / μου', t: 'emoû / mou', e: 'de mí, mi', i: 'pron. 1ª pers. sg. gen.' },
    { g: 'ἐμοί / μοι', t: 'emoí / moi', e: 'a mí, me', i: 'pron. 1ª pers. sg. dat.' },
    { g: 'ἐμέ / με', t: 'emé / me', e: 'a mí, me', i: 'pron. 1ª pers. sg. ac.' },
    { g: 'σύ', t: 'sý', e: 'tú', i: 'pron. 2ª pers. sg. nom.' },
    { g: 'σοῦ / σου', t: 'soû / sou', e: 'de ti, tu', i: 'pron. 2ª pers. sg. gen.' },
    { g: 'σοί / σοι', t: 'soí / soi', e: 'a ti, te', i: 'pron. 2ª pers. sg. dat.' },
    { g: 'σέ / σε', t: 'sé / se', e: 'a ti, te', i: 'pron. 2ª pers. sg. ac.' },
    { g: 'ἡμεῖς', t: 'hēmeîs', e: 'nosotros', i: 'pron. 1ª pers. pl. nom.' },
    { g: 'ἡμῶν', t: 'hēmō̂n', e: 'de nosotros', i: 'pron. 1ª pers. pl. gen.' },
    { g: 'ἡμῖν', t: 'hēmîn', e: 'a nosotros', i: 'pron. 1ª pers. pl. dat.' },
    { g: 'ἡμᾶς', t: 'hēmâs', e: 'a nosotros, nos', i: 'pron. 1ª pers. pl. ac.' },
    { g: 'ὑμεῖς', t: 'hymeîs', e: 'vosotros', i: 'pron. 2ª pers. pl. nom.' },
    { g: 'ὑμῶν', t: 'hymō̂n', e: 'de vosotros', i: 'pron. 2ª pers. pl. gen.' },
    { g: 'ὑμῖν', t: 'hymîn', e: 'a vosotros', i: 'pron. 2ª pers. pl. dat.' },
    { g: 'ὑμᾶς', t: 'hymâs', e: 'a vosotros, os', i: 'pron. 2ª pers. pl. ac.' },
    { g: 'αὐτός', t: 'autós', e: 'él', i: 'pron. 3ª pers. masc.' },
    { g: 'αὐτή', t: 'autḗ', e: 'ella', i: 'pron. 3ª pers. fem.' },
    { g: 'αὐτό', t: 'autó', e: 'ello', i: 'pron. 3ª pers. neut.' },
    { g: 'πιστεύω', t: 'pisteúō', e: 'creo, tengo fe', i: 'verbo' },
    { g: 'βαπτίζω', t: 'baptízō', e: 'bautizo', i: 'verbo' },
    { g: 'ὕδωρ', t: 'hýdōr', e: 'agua', i: 'sust. neut.' },
    { g: 'πνεῦμα', t: 'pneûma', e: 'espíritu, viento', i: 'sust. neut.' },
    { g: 'ἅγιος', t: 'hágios', e: 'santo', i: 'adjetivo' }
  ] },
  { id: 7, words: [
    { g: 'ἐν', t: 'en', e: 'en, dentro de', i: 'prep. + dat.' },
    { g: 'εἰς', t: 'eis', e: 'hacia, para, en', i: 'prep. + acc.' },
    { g: 'ἐκ / ἐξ', t: 'ek / ex', e: 'de, desde, fuera de', i: 'prep. + gen.' },
    { g: 'ἀπό', t: 'apó', e: 'desde, de (origen)', i: 'prep. + gen.' },
    { g: 'πρός', t: 'prós', e: 'hacia, con, cerca de', i: 'prep. + acc.' },
    { g: 'διά', t: 'diá', e: 'a través de / a causa de', i: 'prep. + gen. / acc.' },
    { g: 'μετά', t: 'metá', e: 'con / después de', i: 'prep. + gen. / acc.' },
    { g: 'ἀνά', t: 'aná', e: 'arriba, a lo largo de', i: 'prep. + acc.' },
    { g: 'ἀντί', t: 'antí', e: 'en lugar de, por', i: 'prep. + gen.' },
    { g: 'ἄνευ', t: 'áneu', e: 'sin', i: 'prep. + gen.' },
    { g: 'ἐπί', t: 'epí', e: 'sobre, en', i: 'prep. + gen/dat/acc' },
    { g: 'ἕνεκεν', t: 'héneken', e: 'por causa de', i: 'prep. + gen.' },
    { g: 'κατά', t: 'katá', e: 'según, a lo largo de / contra', i: 'prep. + acc. / gen.' },
    { g: 'παρά', t: 'pará', e: 'junto a, al lado de', i: 'prep. + dat. / acc. / gen.' },
    { g: 'περί', t: 'perí', e: 'acerca de / alrededor de', i: 'prep. + gen. / acc.' },
    { g: 'πρό', t: 'pró', e: 'antes de', i: 'prep. + gen.' },
    { g: 'σύν', t: 'sýn', e: 'con (compañía)', i: 'prep. + dat.' },
    { g: 'ὑπέρ', t: 'hypér', e: 'en favor de / sobre', i: 'prep. + gen. / acc.' },
    { g: 'ὑπό', t: 'hypó', e: 'por (agente) / bajo', i: 'prep. + gen. / acc.' },
    { g: 'χωρίς', t: 'chōrís', e: 'sin, separado de', i: 'prep. + gen.' },
    { g: 'ἐκκλησία', t: 'ekklēsía', e: 'iglesia, asamblea', i: 'sust. fem.' },
    { g: 'οὐρανός', t: 'ouranós', e: 'cielo', i: 'sust. masc.' },
    { g: 'ἀδελφός', t: 'adelphós', e: 'hermano', i: 'sust. masc.' }
  ] }
] },
{ n: 3, lessons: [
  { id: 8, words: [
    { g: 'εἰμί', t: 'eimí', e: 'yo soy, estoy', i: 'pres. de εἰμί · 1ª sg.' },
    { g: 'εἶ', t: 'eî', e: 'tú eres', i: 'pres. de εἰμί · 2ª sg.' },
    { g: 'ἐστί(ν)', t: 'estí(n)', e: 'él/ella es', i: 'pres. de εἰμί · 3ª sg.' },
    { g: 'ἐσμέν', t: 'esmén', e: 'nosotros somos', i: 'pres. de εἰμί · 1ª pl.' },
    { g: 'ἐστέ', t: 'esté', e: 'vosotros sois', i: 'pres. de εἰμί · 2ª pl.' },
    { g: 'εἰσί(ν)', t: 'eisí(n)', e: 'ellos son', i: 'pres. de εἰμί · 3ª pl.' },
    { g: 'ἦν', t: 'ēn', e: 'él/ella era', i: 'pasado de εἰμί · 3ª sg.' },
    { g: 'γράφω', t: 'gráphō', e: 'escribo', i: 'verbo' },
    { g: 'γράφεις', t: 'grápheis', e: 'tú escribes', i: 'pres. act. · 2ª sg.' },
    { g: 'γράφει', t: 'gráphe(i)', e: 'él/ella escribe', i: 'pres. act. · 3ª sg.' },
    { g: 'θεός', t: 'theós', e: 'Dios', i: 'sust. masc.' },
    { g: 'κύριος', t: 'kúrios', e: 'Señor, dueño', i: 'sust. masc.' }
  ] },
  { id: 9, words: [
    { g: 'λύω', t: 'lúō', e: 'suelto, libero', i: 'pres. act. ind. · 1ª sg.' },
    { g: 'λύεις', t: 'lúeis', e: 'tú liberas', i: 'pres. act. ind. · 2ª sg.' },
    { g: 'λύει', t: 'lúei', e: 'él/ella libera', i: 'pres. act. ind. · 3ª sg.' },
    { g: 'λύομεν', t: 'lúomen', e: 'liberamos', i: 'pres. act. ind. · 1ª pl.' },
    { g: 'λύετε', t: 'lúete', e: 'liberáis', i: 'pres. act. ind. · 2ª pl.' },
    { g: 'λύουσι(ν)', t: 'lúousi(n)', e: 'liberan', i: 'pres. act. ind. · 3ª pl.' },
    { g: 'λέγω', t: 'légō', e: 'digo', i: 'verbo' },
    { g: 'ἀκούω', t: 'akoúō', e: 'oigo, escucho', i: 'verbo' },
    { g: 'ἐσθίω', t: 'esthíō', e: 'como', i: 'verbo' },
    { g: 'ἀκολουθέω', t: 'akolouthéō', e: 'sigo, acompaño', i: 'verbo' },
    { g: 'ἀκολουθείτω', t: 'akoloutheítō', e: '¡sígame!', i: 'imperativo · 3ª sg.' },
    { g: 'γράφω', t: 'gráphō', e: 'escribo', i: 'verbo' }
  ] },
  { id: 10, words: [
    { g: 'λύομαι', t: 'lúomai', e: 'soy soltado', i: 'pres. pas. · 1ª sg.' },
    { g: 'λύῃ', t: 'lúē(i)', e: 'eres soltado', i: 'pres. pas. · 2ª sg.' },
    { g: 'λύεται', t: 'lúetai', e: 'es soltado', i: 'pres. pas. · 3ª sg.' },
    { g: 'λυόμεθα', t: 'lyómetha', e: 'somos soltados', i: 'pres. pas. · 1ª pl.' },
    { g: 'λύεσθε', t: 'lúesthe', e: 'sois soltados', i: 'pres. pas. · 2ª pl.' },
    { g: 'λύονται', t: 'lúontai', e: 'son soltados', i: 'pres. pas. · 3ª pl.' },
    { g: 'ἔρχομαι', t: 'érchomai', e: 'vengo', i: 'verbo deponente' },
    { g: 'γίνομαι', t: 'gínomai', e: 'llego a ser, sucedo', i: 'verbo deponente' },
    { g: 'λούομαι', t: 'loúomai', e: 'me lavo', i: 'voz media' },
    { g: 'ὑπό', t: 'hypó', e: 'por (agente)', i: 'prep. + gen.' },
    { g: 'λόγος', t: 'lógos', e: 'palabra', i: 'sust. masc.' },
    { g: 'ὕδωρ', t: 'hýdōr', e: 'agua', i: 'sust. neut.' }
  ] }
] },
{ n: 4, lessons: [
  { id: 11, words: [
    { g: 'ἔλυον', t: 'élyon', e: 'yo soltaba, estaba soltando', i: 'imperfecto de λύω · 1ª sg.' },
    { g: 'ἔλυες', t: 'élyes', e: 'tú soltabas', i: 'imperfecto de λύω · 2ª sg.' },
    { g: 'ἐλύομεν', t: 'elyómen', e: 'soltábamos', i: 'imperfecto de λύω · 1ª pl.' },
    { g: 'ἠγάπων', t: 'ēgápōn', e: 'amaba, estaba amando', i: 'imperfecto de ἀγαπάω' },
    { g: 'ἤλπιζον', t: 'ēlpízon', e: 'esperaba', i: 'imperfecto de ἐλπίζω' },
    { g: 'ὥρων', t: 'ōrōn', e: 'veía', i: 'imperfecto de ὁράω' },
    { g: 'ἴσχυον', t: 'íschyon', e: 'era fuerte', i: 'imperfecto de ἰσχύω' },
    { g: 'ὑπέμενον', t: 'hypémenon', e: 'permanecía, resistía', i: 'imperfecto de ὑπομένω' },
    { g: 'ᾔτουν', t: 'ēítoun', e: 'pedía', i: 'imperfecto de αἰτέω' },
    { g: 'εὕρισκον', t: 'heúriskon', e: 'encontraba', i: 'imperfecto de εὑρίσκω' },
    { g: 'ἔλεγον', t: 'élegon', e: 'decía, decían', i: 'imperfecto de λέγω' },
    { g: 'ἐβαπτίζοντο', t: 'ebaptízonto', e: 'eran bautizados', i: 'impf. pas. de βαπτίζω' },
    { g: 'κατέβαινον', t: 'katébainon', e: 'descendían', i: 'imperfecto de καταβαίνω' },
    { g: 'ἐξέβαλλον', t: 'exéballon', e: 'echaba fuera', i: 'imperfecto de ἐκβάλλω' },
    { g: 'ἐποίουν', t: 'epoíoún', e: 'hacía', i: 'imperfecto de ποιέω' },
    { g: 'ἐπλήρουν', t: 'eplḗroun', e: 'llenaba, cumplía', i: 'imperfecto de πληρόω' },
    { g: 'ἤμην', t: 'ēmēn', e: 'yo era, estaba', i: 'impf. de εἰμί · 1ª sg.' },
    { g: 'ἦς', t: 'ēs', e: 'tú eras', i: 'impf. de εἰμί · 2ª sg.' },
    { g: 'ἦν', t: 'ēn', e: 'él/ella era', i: 'impf. de εἰμί · 3ª sg.' },
    { g: 'ἦμεν', t: 'ēmen', e: 'éramos', i: 'impf. de εἰμί · 1ª pl.' },
    { g: 'ἦτε', t: 'ēte', e: 'erais', i: 'impf. de εἰμί · 2ª pl.' },
    { g: 'ἦσαν', t: 'ēsan', e: 'eran', i: 'impf. de εἰμί · 3ª pl.' },
    { g: 'διδάσκαλος', t: 'didáskalos', e: 'maestro', i: 'sust. masc.' },
    { g: 'τελώνης', t: 'telṓnēs', e: 'publicano, recaudador', i: 'sust. masc.' },
    { g: 'φαρισαῖος', t: 'pharisaîos', e: 'fariseo', i: 'sust. masc.' }
  ] },
  { id: 12, words: [
    { g: 'λύσω', t: 'lúsō', e: 'liberaré', i: 'futuro de λύω · 1ª sg.' },
    { g: 'ἀκούσω', t: 'akoúsō', e: 'escucharé', i: 'futuro de ἀκούω' },
    { g: 'ποιήσω', t: 'poiḗsō', e: 'haré', i: 'futuro de ποιέω' },
    { g: 'βλέψω', t: 'blépsō', e: 'veré', i: 'futuro de βλέπω' },
    { g: 'γράψω', t: 'grápsō', e: 'escribiré', i: 'futuro de γράφω' },
    { g: 'φυλάξω', t: 'phyláxō', e: 'protegeré, guardaré', i: 'futuro de φυλάσσω' },
    { g: 'πιστεύσω', t: 'pisteúsō', e: 'creeré', i: 'futuro de πιστεύω' },
    { g: 'ἔσομαι', t: 'ésomai', e: 'seré, estaré', i: 'futuro de εἰμί · 1ª sg.' },
    { g: 'ἔσῃ', t: 'ésē(i)', e: 'serás', i: 'futuro de εἰμί · 2ª sg.' },
    { g: 'ἔσται', t: 'éstai', e: 'será', i: 'futuro de εἰμί · 3ª sg.' },
    { g: 'ἐσόμεθα', t: 'esómetha', e: 'seremos', i: 'futuro de εἰμί · 1ª pl.' },
    { g: 'ἔσεσθε', t: 'ésesthe', e: 'seréis', i: 'futuro de εἰμί · 2ª pl.' },
    { g: 'ἔσονται', t: 'ésontai', e: 'serán', i: 'futuro de εἰμί · 3ª pl.' },
    { g: 'πορεύομαι', t: 'poreúomai', e: 'voy, me dirijo', i: 'pres. deponente' },
    { g: 'πορεύσομαι', t: 'poreúsomai', e: 'iré', i: 'futuro de πορεύομαι' },
    { g: 'γινώσκω', t: 'ginṓskō', e: 'conozco, sé', i: 'pres. activo' },
    { g: 'γνώσομαι', t: 'gnṓsomai', e: 'conoceré', i: 'futuro deponente de γινώσκω' }
  ] }
] }
];

/* ---------- utilidades de datos ---------- */
const LT = () => window.LESSONS || [];
const flat = wk => {
  const out = [];
  window.VOCAB.forEach(w => { if (wk && w.n !== wk) return; w.lessons.forEach(l => l.words.forEach(x => out.push({ ...x, wk: w.n, les: l.id }))); });
  return out;
};
const weekRange = w => { const a = w.lessons; return `Lecciones ${a[0].id}–${a[a.length - 1].id}`; };
const scopeLabel = sc => sc === 'all' ? 'Todo el curso' : 'Semana ' + sc.slice(1);

/* ---------- estado de la pestaña ---------- */
let VW = { week: 0, q: '', scope: 'all' };   // filtro de semanas, búsqueda y alcance de práctica
let PR = null;                  // práctica activa (quiz o tarjetas)

/* ---------- vista: práctica ---------- */
function poolFor(sc) { return flat(sc === 'all' ? 0 : +sc.slice(1)); }
function renderPractice() {
  const el = $('#vprac'); if (!el) return;
  el.innerHTML = PR ? (PR.mode === 'quiz' ? quizHTML() : cardsHTML()) : practiceStartHTML();
}
function practiceStartHTML() {
  const chips = ['all', 'w1', 'w2', 'w3', 'w4'].map(sc => {
    const n = poolFor(sc).length, b = store.best[sc];
    return `<span class="ch vch${VW.scope === sc ? ' on' : ''}" data-v="scope" data-scope="${sc}">${scopeLabel(sc)} · ${n} palabras${b ? ` · mejor ${b}%` : ''}</span>`;
  }).join('');
  const sc = VW.scope || 'all';
  return `<h3><i class="fas fa-dumbbell"></i> Practica el vocabulario</h3>
  <p style="color:var(--mut);font-size:.92rem">Elige un alcance y practica con selección múltiple o con tarjetas. Tu mejor puntuación se guarda en este dispositivo.</p>
  <div class="chips" style="margin:.7rem 0">${chips}</div>
  <div style="display:flex;gap:.6rem;flex-wrap:wrap">
    <button class="btn" data-v="start" data-mode="quiz" data-scope="${sc}"><i class="fas fa-list-check"></i> Selección múltiple</button>
    <button class="btn sec" data-v="start" data-mode="cards" data-scope="${sc}"><i class="fas fa-layer-group"></i> Tarjetas</button>
  </div>`;
}
function startPractice(mode, sc) {
  const seen = new Set(), pool = [];
  for (const w of poolFor(sc)) { if (seen.has(w.g)) continue; seen.add(w.g); pool.push(w); } // sin repetir la misma forma en una ronda
  if (!pool.length) return;
  if (mode === 'quiz') {
    const qs = shuf(pool).slice(0, Math.min(12, pool.length)).map(w => {
      const dir = Math.random() < .5 ? 'g2e' : 'e2g';
      const f = dir === 'g2e' ? 'e' : 'g', seen = new Set([w[f]]), ds = [];
      for (const x of shuf(pool)) { if (ds.length >= 3) break; const v = x[f]; if (!seen.has(v) && v !== w[f]) { seen.add(v); ds.push(x); } }
      if (ds.length < 3) for (const x of shuf(poolFor('all'))) { if (ds.length >= 3) break; const v = x[f]; if (!seen.has(v) && v !== w[f]) { seen.add(v); ds.push(x); } }
      const os = shuf([w, ...ds]); return { w, dir, os, ans: os.indexOf(w) };
    });
    PR = { mode, sc, qs, i: 0, ok: 0, sel: null, done: false };
  } else {
    PR = { mode, sc, queue: shuf(pool), failed: [], known: 0, total: pool.length, flipped: false, done: false };
  }
  renderPractice();
}
function quizHTML() {
  const n = PR.qs.length;
  if (PR.done) {
    const pct = Math.round(PR.ok / n * 100);
    saveBest(PR.sc, pct);
    const msg = pct === 100 ? '¡Perfecto! Dominas estas palabras.' : pct >= 70 ? '¡Muy bien! Sigue así.' : 'Buen intento: repasa la lista y vuelve a practicar.';
    return `<h3><i class="fas fa-list-check"></i> Selección múltiple · Resultado</h3>
    <div style="display:flex;gap:1.2rem;align-items:center;flex-wrap:wrap;margin:.6rem 0">${ring(pct)}<div><b>${PR.ok} de ${n} correctas</b><p style="color:var(--mut);margin:.2rem 0">${msg}</p><small style="color:var(--mut)">Mejor puntuación (${esc(scopeLabel(PR.sc))}): ${store.best[PR.sc]}%</small></div></div>
    <div style="display:flex;gap:.6rem;flex-wrap:wrap"><button class="btn sm" data-v="retry"><i class="fas fa-rotate-right"></i> Repetir</button><button class="btn sec sm" data-v="exit"><i class="fas fa-xmark"></i> Salir</button></div>`;
  }
  const q = PR.qs[PR.i], g2e = q.dir === 'g2e';
  const label = g2e ? '¿Qué significa esta palabra?' : '¿Qué palabra griega significa esto?';
  return `<div style="display:flex;gap:.5rem;align-items:center;margin-bottom:.6rem"><b style="flex:1">Selección múltiple</b><button class="btn sec sm" data-v="exit"><i class="fas fa-xmark"></i> Salir</button></div>
  <div class="bar" style="margin-bottom:.5rem"><i style="width:${Math.round(PR.i / n * 100)}%"></i></div>
  <p style="color:var(--mut);font-size:.85rem;margin-bottom:.5rem">Pregunta ${PR.i + 1} de ${n} · ${PR.ok} correctas · ${esc(scopeLabel(PR.sc))}</p>
  <p style="font-size:.9rem;margin-bottom:.4rem">${label}</p>
  <div class="${g2e ? 'gk vbig' : 'vsp'}">${g2e ? esc(q.w.g) : '«' + esc(q.w.e) + '»'}</div>
  <div class="vopts" style="margin:.8rem 0">${q.os.map((o, k) => {
    let cls = 'vopt'; if (PR.sel !== null) { if (k === q.ans) cls += ' ok'; else if (k === PR.sel) cls += ' bad'; }
    const txt = PR.sel === null ? (g2e ? esc(o.e) : `<span class="gk">${esc(o.g)}</span>`) : `<span class="gk">${esc(o.g)}</span><small>${esc(o.e)}</small>`;
    return `<button class="${cls}" data-v="opt" data-k="${k}" ${PR.sel !== null ? 'disabled' : ''}>${txt}</button>`;
  }).join('')}</div>
  <p class="vfeed">${PR.sel === null ? '<small style="color:var(--mut)">Toca una opción.</small>' : PR.sel === q.ans ? '<b style="color:#25613f">¡Correcto!</b>' : `<b style="color:#9a3220">La respuesta era:</b> <span class="gk">${esc(q.w.g)}</span> — ${esc(q.w.e)}`}</p>
  ${PR.sel !== null ? `<button class="btn sm" data-v="next">${PR.i === n - 1 ? 'Ver resultado' : 'Siguiente pregunta'} <i class="fas fa-arrow-right"></i></button>` : ''}`;
}
function cardsHTML() {
  if (PR.done) {
    const pct = Math.round(PR.known / PR.total * 100);
    saveBest(PR.sc, pct);
    return `<h3><i class="fas fa-layer-group"></i> Tarjetas · Resultado</h3>
    <p style="color:var(--mut);margin:.4rem 0">Terminaste el mazo de ${PR.total} palabras (${esc(scopeLabel(PR.sc))}).</p>
    <div style="display:flex;gap:.6rem;flex-wrap:wrap;margin:.6rem 0"><span class="tag done">¡La sé!: ${PR.known}</span><span class="tag closed">Repasar: ${PR.failed.length}</span></div>
    <div style="display:flex;gap:.6rem;flex-wrap:wrap">
      ${PR.failed.length ? `<button class="btn sm" data-v="retryfail"><i class="fas fa-rotate-right"></i> Repetir las ${PR.failed.length} falladas</button>` : ''}
      <button class="btn sec sm" data-v="retry"><i class="fas fa-shuffle"></i> Repetir todas</button>
      <button class="btn sec sm" data-v="exit"><i class="fas fa-xmark"></i> Salir</button></div>`;
  }
  const w = PR.queue[0], les = LT()[w.les - 1];
  return `<div style="display:flex;gap:.5rem;align-items:center;margin-bottom:.6rem"><b style="flex:1">Tarjetas</b><button class="btn sec sm" data-v="exit"><i class="fas fa-xmark"></i> Salir</button></div>
  <div class="bar" style="margin-bottom:.5rem"><i style="width:${Math.round((PR.total - PR.queue.length) / PR.total * 100)}%"></i></div>
  <p style="color:var(--mut);font-size:.85rem;margin-bottom:.6rem">Tarjeta ${PR.total - PR.queue.length + 1} de ${PR.total} · ${esc(scopeLabel(PR.sc))}</p>
  <div class="vflip ${PR.flipped ? 'flipped' : ''}" data-v="flip"><div class="vflip-in">
    <div class="vface vfront"><div><div class="gk" style="font-size:1.9rem;font-weight:700">${esc(w.g)}</div><small style="color:#c9d8ea">Toca la tarjeta para ver el significado</small></div></div>
    <div class="vface vback"><div><div class="gk" style="font-size:1.3rem;color:var(--navy)">${esc(w.g)}</div><div style="font-style:italic;color:var(--mut);margin:.2rem 0">${esc(w.t)}</div><div style="font-size:1.15rem;font-weight:700">${esc(w.e)}</div><span class="tag" style="margin-top:.5rem">${esc(w.i)} · Lección ${w.les}${les ? ' · ' + esc(les.title) : ''}</span></div></div>
  </div></div>
  <div style="display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap;margin-top:.9rem">
    <button class="btn warn sm" data-v="again"><i class="fas fa-rotate-left"></i> No la sabía</button>
    <button class="btn ok sm" data-v="known"><i class="fas fa-check"></i> ¡La sé!</button></div>
  <p style="text-align:center;color:var(--mut);font-size:.82rem;margin-top:.5rem">Acertadas: ${PR.known} · Por repasar: ${PR.failed.length}</p>`;
}

/* ---------- vista: listas por semana ---------- */
const gkSpan = w => `<div class="vw"><div class="vw-g gk">${esc(w.g)}</div><div class="vw-t">${esc(w.t)}</div><div class="vw-e">${esc(w.e)}</div><span class="tag">${esc(w.i)}</span></div>`;
function listHTML() {
  const q = norm(VW.q);
  const secs = window.VOCAB.filter(w => !VW.week || w.n === VW.week).map(w => {
    const lessons = w.lessons.map(l => {
      const words = q ? l.words.filter(x => norm(x.g + ' ' + x.t + ' ' + x.e + ' ' + x.i).includes(q)) : l.words;
      const les = LT()[l.id - 1];
      if (!words.length) return '';
      return `<article class="card vles"><div class="vles-h"><span class="vnum">Lección ${l.id}</span><h3>${les ? esc(les.title) : ''}</h3><span class="tag">${words.length} palabras</span></div>
      <div class="vw-grid">${words.map(gkSpan).join('')}</div></article>`;
    }).join('');
    if (!lessons) return '';
    const n = flat(w.n).length;
    return `<section class="wk"><header class="wkh"><div class="wkn">${w.n}<small>semana</small></div>
    <div class="grow"><h3>Semana ${w.n} · ${weekRange(w)}</h3><div class="chips"><span class="ch"><i class="fas fa-font"></i>${n} palabras</span><span class="ch">${w.lessons.length} lecciones</span></div></div>
    <div class="wkp"><button class="btn sec sm" data-v="start" data-mode="quiz" data-scope="w${w.n}"><i class="fas fa-list-check"></i> Practicar</button></div></header>
    <div class="grid">${lessons}</div></section>`;
  }).join('');
  return secs || `<p style="color:var(--mut)">No hay palabras que coincidan con «${esc(VW.q)}». Prueba con otra búsqueda.</p>`;
}
function tabsHTML() {
  const total = flat(0).length;
  return `<button data-v="week" data-w="0" class="${!VW.week ? 'on' : ''}">Todas · ${total}</button>` +
    window.VOCAB.map(w => `<button data-v="week" data-w="${w.n}" class="${VW.week === w.n ? 'on' : ''}">Semana ${w.n} · ${flat(w.n).length}</button>`).join('');
}

/* ---------- vista principal (la llama app.js) ---------- */
window.vocabView = function () {
  return `<div class="ph"><h2>Vocabulario</h2><p>Las palabras de las 12 lecciones, organizadas por semana (4 semanas · ${flat(0).length} palabras). Practica con selección múltiple o con tarjetas.</p></div>
  <div class="card vpraccard" id="vprac">${PR ? (PR.mode === 'quiz' ? quizHTML() : cardsHTML()) : practiceStartHTML()}</div>
  <div class="tabs" id="vtabs">${tabsHTML()}</div>
  <div class="vsearch"><i class="fas fa-magnifying-glass"></i><input type="search" data-vq value="${esc(VW.q)}" placeholder="Buscar palabra (griego, transliteración o significado)…" aria-label="Buscar palabra"></div>
  <div id="vlist">${listHTML()}</div>`;
};
const ring = (p, cls = '') => `<div class="ring sm ${cls}" style="--p:${p}"><b>${p}%</b></div>`;
const refreshList = () => { const l = $('#vlist'); if (l) l.innerHTML = listHTML(); const t = $('#vtabs'); if (t) t.innerHTML = tabsHTML(); };

/* ---------- interacciones (atributos data-v, sin tocar la lógica existente) ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-v]'); if (!t) return;
  const a = t.dataset.v;
  if (a === 'week') { VW.week = +t.dataset.w; refreshList(); }
  if (a === 'scope') { VW.scope = t.dataset.scope; renderPractice(); }
  if (a === 'start') startPractice(t.dataset.mode, t.dataset.scope || VW.scope || 'all');
  if (a === 'exit') { PR = null; renderPractice(); }
  if (a === 'retry' && PR) { const m = PR.mode, sc = PR.sc; PR = null; startPractice(m, sc); }
  if (a === 'retryfail' && PR?.mode === 'cards') { PR.queue = shuf(PR.failed); PR.failed = []; PR.known = 0; PR.total = PR.queue.length; PR.flipped = false; PR.done = false; renderPractice(); }
  if (a === 'opt' && PR?.mode === 'quiz' && PR.sel === null) { PR.sel = +t.dataset.k; if (PR.sel === PR.qs[PR.i].ans) PR.ok++; renderPractice(); }
  if (a === 'next' && PR?.mode === 'quiz') { if (PR.i === PR.qs.length - 1) { PR.done = true; } else { PR.i++; PR.sel = null; } renderPractice(); }
  if (a === 'flip' && PR?.mode === 'cards') { PR.flipped = !PR.flipped; renderPractice(); }
  if (a === 'again' && PR?.mode === 'cards' && PR.queue.length) { PR.failed.push(PR.queue.shift()); PR.flipped = false; if (!PR.queue.length) PR.done = true; renderPractice(); }
  if (a === 'known' && PR?.mode === 'cards' && PR.queue.length) { PR.known++; PR.queue.shift(); PR.flipped = false; if (!PR.queue.length) PR.done = true; renderPractice(); }
});
document.addEventListener('input', e => { if (e.target.matches('[data-vq]')) { VW.q = e.target.value; refreshList(); } });
})();
