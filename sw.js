/* Service worker — Curso de Griego I · STBCOr. Sube VERSION cada vez que publiques cambios. */
const VERSION = 'v2.9.0';
const CACHE = 'stbcor-griego-' + VERSION;
const PRECACHE = ["./", "./assets/apple-touch-icon.png", "./assets/favicon.png", "./assets/icon-192.png", "./assets/icon-512.png", "./assets/icon-maskable-512.png", "./assets/logo.png", "./assets/silabo-griego-I-2026-2027.pdf", "./contenido/leccion1/acentos.html", "./contenido/leccion1/alfabeto.html", "./contenido/leccion1/griego-koine.css", "./contenido/leccion1/simulador.html", "./contenido/leccion10/griego-koine.css", "./contenido/leccion10/verbos_pasivos.html", "./contenido/leccion10/voz_media.html", "./contenido/leccion11/caracteristicas.html", "./contenido/leccion11/griego-koine.css", "./contenido/leccion11/imperfecto_activo.html", "./contenido/leccion11/imperfecto_pasivo.html", "./contenido/leccion11/intro_imperfecto.html", "./contenido/leccion11/resumen.html", "./contenido/leccion12/Introduccion_futuro.html", "./contenido/leccion12/futuro_eimi.html", "./contenido/leccion12/futuro_liquido.html", "./contenido/leccion12/futuro_medio_indicativo.html", "./contenido/leccion12/griego-koine.css", "./contenido/leccion12/mas_futuro.html", "./contenido/leccion2/casos.html", "./contenido/leccion2/griego-koine.css", "./contenido/leccion2/sustantivos.html", "./contenido/leccion3/declinaciones.html", "./contenido/leccion3/griego-koine.css", "./contenido/leccion3/juegoDeclinaciones.html", "./contenido/leccion3/nominativo-acusativo.html", "./contenido/leccion4/articuloDefinido.html", "./contenido/leccion4/articulodefinidoII.html", "./contenido/leccion4/griego-koine.css", "./contenido/leccion4/sustantivos.html", "./contenido/leccion5/adjetivos.html", "./contenido/leccion5/adjetivos2.html", "./contenido/leccion5/funcionesAdjetivos.html", "./contenido/leccion5/griego-koine.css", "./contenido/leccion5/masDetalles.html", "./contenido/leccion6/IntroPronombres.html", "./contenido/leccion6/MasPronombres.html", "./contenido/leccion6/formaTerceraPersona.html", "./contenido/leccion6/funcionesPronombre.html", "./contenido/leccion6/griego-koine.css", "./contenido/leccion6/tercerapersona.html", "./contenido/leccion6/traduccion.html", "./contenido/leccion7/Frase_preposicional.html", "./contenido/leccion7/Introduccion_Preposiciones.html", "./contenido/leccion7/Mas_sobre_preposiciones.html", "./contenido/leccion7/griego-koine.css", "./contenido/leccion7/tabla_de_preposiciones.html", "./contenido/leccion8/Nominativo_Predicativo.html", "./contenido/leccion8/griego-koine.css", "./contenido/leccion8/verbo_eimi.html", "./contenido/leccion9/Verbos_griegos.html", "./contenido/leccion9/componentes_basicos.html", "./contenido/leccion9/griego-koine.css", "./contenido/leccion9/mas_contenido.html", "./contenido/leccion9/presente_activo_indicativo.html", "./css/app.css", "./index.html", "./js/app.js", "./js/sheets-api.js", "./js/config.js", "./js/vocabulario.js", "./js/lessons.js", "./js/silabo.js", "./js/students.json", "./manifest.webmanifest", "./vendor/fa/all.min.css", "./vendor/fa/webfonts/fa-brands-400.woff2", "./vendor/fa/webfonts/fa-regular-400.woff2", "./vendor/fa/webfonts/fa-solid-900.woff2", "./vendor/fonts/fonts.css", "./vendor/fonts/merriweather-latin-400-normal.woff2", "./vendor/fonts/merriweather-latin-700-normal.woff2", "./vendor/fonts/open-sans-latin-400-normal.woff2", "./vendor/fonts/open-sans-latin-600-normal.woff2", "./vendor/fonts/open-sans-latin-700-normal.woff2"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(PRECACHE.map(u => c.add(u).catch(() => null)))));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('stbcor-griego-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // Navegación: red primero, caché de respaldo (funciona sin conexión)
    if (req.mode === 'navigate') {
      e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; })
        .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))));
      return;
    }
    // Resto: caché primero y se refresca en segundo plano
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; }).catch(() => hit);
      return hit || net;
    }));
  } else {
    // Recursos externos (CDN, imágenes): se guardan al usarlos
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; }).catch(() => hit)));
  }
});
