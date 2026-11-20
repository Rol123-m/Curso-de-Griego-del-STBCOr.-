# Curso de Griego I · STBCOr · 2026–2027

Plataforma web instalable (PWA). Funciona en GitHub Pages sin servidor.

## Publicar
1. Sube **todo el contenido de esta carpeta** a la raíz del repositorio (sustituye los archivos anteriores; borra `script.js`, `style.css` y `assets/logo.jpg`).
2. Activa GitHub Pages (Settings → Pages → rama `main`, carpeta `/root`).
3. Abre la dirección `https://…github.io/…/` una vez con conexión: la app queda guardada para uso sin conexión.

## Lo que puedes editar (`js/config.js`)
- `teacher`: WhatsApp (+53 58169444) y correo (rolandodesdin3@outlook.com) ya configurados.
- `exams`: pega el enlace de Google Forms de cada quiz en `url` cuando lo publiques; con enlace, el quiz se habilita. Si prefieres limitar por fechas, rellena `open` y `close` (`AAAA-MM-DD`).
- `weeks`: plan semanal; puedes escribir las fechas de cada semana en `fechas`.
- `announcements`: la pestaña de anuncios. Agrega un objeto nuevo arriba de la lista (con `id` distinto) y a los estudiantes les aparece como «Nuevo».
- `resources`: el primer recurso es el **PDF del vocabulario de las 12 lecciones**; pega su enlace en `u:''` cuando lo publiques (Drive, GitHub…) y aparecerá el botón «Abrir PDF».
- `js/silabo.js`: contenido de la pestaña Sílabo. El PDF está en `assets/`.

## Pestaña Vocabulario (nueva en v2.4)
- `js/vocabulario.js` contiene todo el vocabulario del curso (194 palabras) organizado por semana y lección, tomado de las páginas de las 12 lecciones.
- Incluye dos prácticas: **selección múltiple** (12 preguntas al azar, griego↔español) y **tarjetas** (flashcards con «La sé / No la sabía»). La mejor puntuación se guarda en el dispositivo del estudiante (`stbcor.vocab`).
- Para editar una palabra o añadir más, busca la semana y la lección en `js/vocabulario.js` (`g` griego, `t` transliteración, `e` significado, `i` dato gramatical).

## Cada vez que publiques cambios
Sube el número de `VERSION` en `sw.js` (por ejemplo `v2.0.1`) para que los estudiantes reciban la actualización.

## Cambiar contraseñas
Las contraseñas no están en texto plano, sino como huella SHA-256 (`h` en `config.js`), calculada con `stbcor2026|usuario-en-minúsculas-sin-acentos|contraseña`.
En la consola del navegador:
`crypto.subtle.digest('SHA-256', new TextEncoder().encode('stbcor2026|jose|NUEVA')).then(b=>console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))`
Las contraseñas iniciales de cada cuenta están en `Credenciales_Griego_I_2026-2027.csv` (no lo subas al repositorio).
**Importante:** al ser un sitio estático, el acceso es una barrera de cortesía, no seguridad real. No pongas datos sensibles.

## Enviar progreso
El estudiante pulsa «Enviar progreso» y elige WhatsApp o correo; el mensaje lleva un código firmado (`STBCOR1:…`). En el panel del profesor (Rolando o Joel) se pega el código o se importan archivos `.json`, y se exporta un CSV del grupo.
