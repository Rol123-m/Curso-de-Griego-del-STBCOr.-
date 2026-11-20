/* ============================================================
   CONFIGURACIÓN DEL CURSO — edita este archivo, no hace falta tocar app.js
   ============================================================ */
window.CONFIG = {
  course: '2026–2027',
  name: 'Curso de Griego I',
  school: 'Seminario Teológico Bautista de Cuba Oriental',
  salt: 'stbcor2026',

  // ---- A dónde llega el progreso de los estudiantes ----
  teacher: {
    name: 'Lic. Rolando Desdín',
    email: 'rolandodesdin3@outlook.com',
    whatsapp: '5358169444',          // código de país + número, sin + ni espacios
    endpoint: 'https://script.google.com/macros/s/AKfycbyW9SnhaCwwFizapy5P3qVlepopVxj2klbVg1n1dOcHjhw0NE0Fd1UzKNojH32Pe3y14g/exec',                    // opcional: URL del Apps Script (docs/apps-script-recepcion.gs)
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1jltnJgFDcocFXiJqi81wcx5ZGrFSMOTflrwQmTF7eE4/edit?gid=309486152#gid=309486152'                     // opcional: enlace a la hoja de Google con los reportes
  },

  // ---- Plan semanal del sílabo (4 semanas intensivas, 3 lecciones por semana) ----
  // fechas: texto libre opcional, ej. 'Del 11 al 17 de enero de 2027'
  weeks: [
    { n: 1, lessons: [1, 2, 3, 4], fechas: '', items: ['Audiollamada · viernes 2:30 pm', 'Tarjetas de las lecciones 1–4', 'Quiz semanal 1'] },
    { n: 2, lessons: [5, 6, 7], fechas: '', items: ['Audiollamada · viernes 2:30 pm', 'Tarjetas de las lecciones 5–7', 'Quiz semanal 2'] },
    { n: 3, lessons: [8, 9, 10], fechas: '', items: ['Foro Debate 1 · miércoles', 'Audiollamada · viernes 2:30 pm', 'Tarjetas de las lecciones 8–10', 'Quiz semanal 3'] },
    { n: 4, lessons: [11, 12], fechas: '', items: ['Repaso integral de las 12 lecciones', 'Foro Debate 2 · miércoles', 'Entrega de la guía de ejercicios', 'Quiz semanal 4'] }
  ],

  // ---- Los 4 quizzes semanales (6.25 puntos cada uno = 25 puntos) ----
  // Pega el enlace de Google Forms en `url` cuando lo publiques; con enlace y sin fechas el quiz se habilita.
  // Si prefieres limitar por fechas, rellena open y close (AAAA-MM-DD). abierto:true fuerza la apertura.
  // (Enlace del quiz del curso anterior, lecciones 1–7: https://forms.gle/JLseeF9ikDwtnHSD9)
  exams: [
    { n: 1, week: 1, title: 'Quiz 1', topic: 'Lecciones 1–4', desc: 'Alfabeto, sustantivos, declinaciones y artículo definido.', q: 'Google Forms · una sola oportunidad', open: '', close: '', url: '' },
    { n: 2, week: 2, title: 'Quiz 2', topic: 'Lecciones 5–7', desc: 'Adjetivos, pronombres personales y preposiciones.', q: 'Google Forms · una sola oportunidad', open: '', close: '', url: '' },
    { n: 3, week: 3, title: 'Quiz 3', topic: 'Lecciones 8–10', desc: 'El verbo εἰμί, introducción al verbo y presente medio-pasivo.', q: 'Google Forms · una sola oportunidad', open: '', close: '', url: '' },
    { n: 4, week: 4, title: 'Quiz 4', topic: 'Lecciones 11–12', desc: 'Imperfecto indicativo y futuro activo y medio.', q: 'Google Forms · una sola oportunidad', open: '', close: '', url: '' }
  ],

  // ---- Anuncios (el más nuevo arriba). pin:true los fija arriba. Cambia el id al editar uno para que reaparezca como nuevo. ----
  announcements: [
    { id: 'a1', pin: true, tag: 'Bienvenida', date: '', title: 'Bienvenidos al Curso de Griego I · 2026–2027', body: 'El curso es 100 % en línea: 4 semanas intensivas, 3 lecciones por semana, con una audiollamada de grupo cada viernes a las 2:30 pm. Revisa la pestaña Sílabo para conocer el sistema de evaluación y el plan semanal.' },
    { id: 'a2', tag: 'Importante', date: '', title: 'Trabajo previo: Hoja del alfabeto', body: 'Todos deben llegar dominando la escritura y la pronunciación del alfabeto griego. La hoja del alfabeto se entrega a uno de los alumnos ayudantes el primer día de clases.' },
    { id: 'a3', tag: 'Fechas', date: '', title: 'Las tareas vencen el domingo a las 11:59 pm', body: 'Al cierre de cada semana se entregan las tarjetas resumen y se realiza el quiz semanal. Los quizzes son de una sola oportunidad en Google Forms: no se permite material de clase, libros ni IA.' },
    { id: 'a4', tag: 'Guía de ejercicios', date: '', title: 'Ejercicios completos antes del viernes', body: 'La guía de la semana debe estar completa antes de la audiollamada del viernes, porque se usa como bosquejo de la sesión. Los paradigmas y el alfabeto se presentan a mano, en imagen.' }
  ],

  resources: [
    // Pega aquí el enlace del PDF de vocabulario cuando lo publiques (ej. Google Drive, u:'…'). Sin enlace, se muestra como «por publicar».
    { i: 'fa-file-pdf', t: 'Vocabulario de las 12 lecciones', d: 'PDF muy visual con todo el vocabulario del curso, organizado por semanas y lecciones.', u: '', b: 'Abrir PDF' },
    { i: 'fa-font', t: 'Alfabeto griego', d: 'Tabla completa con letras, pronunciación y ejemplos.', u: 'https://drive.google.com/file/d/1jl1WD-wGcFiMHxq2Sw7-PcxF4oBZwtcb/view?usp=sharing', b: 'Abrir PDF' },
    { i: 'fa-table', t: 'Tablas de declinación', d: 'Declinaciones completas de sustantivos y adjetivos.', u: 'https://drive.google.com/file/d/1aUbpL0_-yvKFl2rTquxQY0vFdKeCuvsv/view?usp=sharing', b: 'Abrir PDF' },
    { i: 'fa-language', t: 'Conjugaciones verbales', d: 'Tablas de conjugación para los tiempos verbales.', u: 'https://drive.google.com/file/d/1jSKAVZ_Q0OcxBN7hAm6DnFE6dghepk9z/view?usp=sharing', b: 'Abrir PDF' },
    { i: 'fa-book', t: 'Vocabulario esencial', d: 'Aplicación con las palabras más frecuentes del Nuevo Testamento.', u: 'https://rol123-m.github.io/Aplicacion-de-vocabulario-de-Griego-Koine/', b: 'Abrir recurso' },
    { i: 'fa-gamepad', t: 'Juegos de vocabulario', d: 'Repasa el vocabulario de manera interactiva.', u: 'https://rol123-m.github.io/koine-greek-apk/', b: 'Jugar' },
    { i: 'fa-link', t: 'Enlaces útiles', d: 'Sitios y herramientas para practicar griego en línea.', u: 'https://rol123-m.github.io/Enlaces-tiles-de-griego-koin-/', b: 'Visitar' }
  ],

  // Las contraseñas se guardan como huella SHA-256 (campo h), no en texto plano.
  // Las contraseñas iniciales están en el archivo Credenciales_Griego_I_2026-2027.csv (solo para el profesor).
  students: [{"id":1,"u":"rolando","name":"Lic. Rolando Y. Desdín García","role":"profesor","h":"a923fbe428787c2947b413001f28f68a8a6329e75a6ed8947d80c74f73ef879e"},{"id":2,"u":"joel.gutierrez","name":"Ma. Joel Gutiérrez Cabrera","role":"profesor","h":"acedc0d3dfb5b4bcc3b54cf15bbb93b188cbd3cc60bf00f0944bcd905eef83fc"},{"id":3,"u":"orlando.aguilar","name":"Orlando Aguilar Fonseca","role":"estudiante","h":"b1265ef7f519c424362b25bb515dd8f222f3a02195c779364db36c08ee0597a2"},{"id":4,"u":"dennis.almaguer","name":"Dennis Almaguer George","role":"estudiante","h":"e325ab7d54bc7114934e12438bf894b56210a24651a098370e1db8909810a376"},{"id":5,"u":"leonard.carrera","name":"Leonard Luis Carrera Castillo","role":"estudiante","h":"905e84c16ff7ef9f47d4c0cfae841caaf4a345d3cacf8ae9e4d2078efff3f0c6"},{"id":6,"u":"amauri.escudero","name":"Amauri Escudero Guilarte","role":"estudiante","h":"81453ffccdc3329bd41b2739c5ff5ed641a9e888aa726f99ec2058e1bcb1bf5e"},{"id":7,"u":"hector.fernandez","name":"Hector Fernández Valdéz","role":"estudiante","h":"9fdac25a220ef3eb80b16b18fb834b7340fbe65b403a0ffabe25a880342cdcd4"},{"id":8,"u":"marcos.gonzalez","name":"Marcos González González","role":"estudiante","h":"bacc0acdcbef8eefd2a3de0ca105c525fe8b9cf60a013bedde7f071f3a246e59"},{"id":9,"u":"yulin.labrada","name":"Yulin Labrada Hernández","role":"estudiante","h":"d59b61cee793f69753dcd28ff6fd221480816ead2121aa49ea2cc407de5cc207"},{"id":10,"u":"alexei.lopez","name":"Alexei López Lamorú","role":"estudiante","h":"4b9db38a6025b85f7097a94afdaa0f7b336118a966674a0197590a8f3a055dfc"},{"id":11,"u":"yoanys.luvin","name":"Yoanys Luvín Delis","role":"estudiante","h":"b4bf9c524dda45501800368df5cf9625a6e059b8afb581c15937af1320844bcf"},{"id":12,"u":"joel.martinez","name":"Joel Favio Martínez Oconor","role":"estudiante","h":"a7fa6c1dc0e3066a7542a24277bcb4a2273c2b5caa096c402396efda1ee4caba"},{"id":13,"u":"yolexis.merencio","name":"Yolexis Merencio Árias","role":"estudiante","h":"e5acc5c0901013e21a1a073cbd91fdd47578c25e34c8ff903f9df666d144708f"},{"id":14,"u":"maikel.molina","name":"Maikel Molina Figueredo","role":"estudiante","h":"c63bdf587ff18004a265ae5c5048e4e67564fb97f5d90231b4d47143c628b95b"},{"id":15,"u":"midel.pileta","name":"Midel Pileta Romero","role":"estudiante","h":"c73c89591d031351781f2e912bbe3abc2fe3f8a9ed6d2513797191ea1373a083"},{"id":16,"u":"willer.rabilero","name":"Willer Luis Rabilero Martínez","role":"estudiante","h":"60416acd527f67e87cabae089b34dd05e21d3111d4855409069ef42c0e1cee49"},{"id":17,"u":"orley.rodriguez","name":"Orley Rodríguez Navarro","role":"estudiante","h":"2697353c7f606cacde461e9849aa0abd1cf99b809c76fdbc6080423a9a9e85b0"},{"id":18,"u":"jolkis.saminon","name":"Jolkis Samiñon Paumier","role":"estudiante","h":"b61b476ba2b2a09fad87172cfe8efe53cdc7b293f532386d9be378cb38e324a6"},{"id":19,"u":"victor.torno","name":"Victor Torno Mulet","role":"estudiante","h":"93f6f84be6b9fc17a5747265d3949e956b034766f56c349f67be2014334b0d99"},{"id":20,"u":"rolando.aguilar","name":"Rolando Aguilar Merayo","role":"estudiante","h":"3540fbfee4395a970cd5695472f2416926879c2e1854e0bdce2c400477941373"},{"id":21,"u":"gerardo.almenares","name":"Gerardo Almenares Cardoza","role":"estudiante","h":"5f169ca2325ad179d592e48ec2592671ec4bd148919c1c60ac8a3c456b7f9077"},{"id":22,"u":"ronny.babastro","name":"Ronny Babastro Pérez","role":"estudiante","h":"6b9bd744d7eeb4809c8f69b400a90461d27b1d629b9ea8d2f3f1dd4a4b8d6b3d"},{"id":23,"u":"aldo.benitez","name":"Aldo Benitez Suarez","role":"estudiante","h":"2396b681f03748defd1a6f1f80438d6ee05b51ee315e9b1ae642ec971318bb16"},{"id":24,"u":"roleydis.cantillo","name":"Roleydis Cantillo Furones","role":"estudiante","h":"f0002dec3d63d3e082bfb8cf6b12578130b7afae194c40c00256345adde065d7"},{"id":25,"u":"eudis.daniel","name":"Eudis Daniel Cardozo Heredia","role":"estudiante","h":"b1598a4574893646a079904dcac6fab5a466c53ee95df366a677f1922aa15a71"},{"id":26,"u":"wilber.carrera","name":"Wilber Carrera Llorente","role":"estudiante","h":"e7473854329d875bae22f3ff2f6b1aade5855f98ec2f868f28c6a5e850df44d5"},{"id":27,"u":"jeremias.m","name":"Jeremías M. Cifuentes Latres","role":"estudiante","h":"cb45129fffeddd1efb113fd48a8a04085d333069fd682675a2b40c2380febd97"},{"id":28,"u":"armando.cutino","name":"Armando Cutiño Viamontes","role":"estudiante","h":"3d05a8a1cda22cab815e6d40226700bcf7be61dd45a057035233f32d0b26679e"},{"id":29,"u":"jose.antonio","name":"José Antonio Estrada Castro","role":"estudiante","h":"64bfa89f835bc386c1558b16b87dc43027633e3dd61ad8a4f8609b2637568662"},{"id":30,"u":"luis.floiran","name":"Luis Floiran Romero","role":"estudiante","h":"3e800d8269243ca54aff485adec89fb7c49bcd69bd794895a9de7267eb1258cf"},{"id":31,"u":"alejandro.antonio","name":"Alejandro Antonio Foubelo Ferrer","role":"estudiante","h":"dc9a8e0e3e9007c3d6c69702a0dabfadc328c39e70078c883afeeee4599d8328"},{"id":32,"u":"angel.gabriel","name":"Angel Gabriel García Cardero","role":"estudiante","h":"a25255f3847e505dbe26369ef399ccd537117465f67a5794ce707b6e5b6b82c9"},{"id":33,"u":"ruliseidis.legra","name":"Ruliseidis Legrá Tamayo","role":"estudiante","h":"85a5e604131d46518a8b103023d4c7209dc0a823ac723d884171af10c50dda2a"},{"id":34,"u":"agustin.nicot","name":"Agustin Nicot Llorente","role":"estudiante","h":"e9d850cfebb1bc2846d8df327ea9f38b4850153700d8f1694309d2899dbe6188"},{"id":35,"u":"ilber.pena","name":"Ilber Peña Gutiérrez","role":"estudiante","h":"062e335f149bee04a422aa5e965e6ce7b9cb712689ed104a8a4faf7947f1439e"},{"id":36,"u":"reidel.verdecia","name":"Reidel Verdecia Pino","role":"estudiante","h":"3c830bb92931c76cd866b4ec6997ff1f84c808814b3271af656f7ce6c81faff1"},{"id":37,"u":"david.walter","name":"David Walter Fis","role":"estudiante","h":"fee6974a63affd748e62852525891002d505a51a3b3975c57c7add1ecb058d09"},{"id":38,"u":"abdiel.rodriguez","name":"Abdiel Rodríguez","role":"decano","h":"e2296ef43eeea9f1195a83ac0faef7cf2feeecbef171132752fc1f5f56e83f54"}]
};
