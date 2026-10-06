# Para Caro 🌼

Una experiencia web privada de cumpleaños. Construida con React + TypeScript + Vite + Tailwind CSS + Framer Motion.

No hay backend, base de datos ni autenticación: es un sitio 100% estático, pensado para desplegarse en Vercel y compartirse como un enlace privado (no está indexado por buscadores).

---

## 1. Instalación

```bash
npm install
```

## 2. Desarrollo

```bash
npm run dev
```

Abre la URL que muestra la terminal (normalmente `http://localhost:5173`).

## 3. Build de producción

```bash
npm run build
```

Esto corre `tsc` (chequeo estricto de TypeScript) y genera la carpeta `dist/` lista para desplegar.

## 4. Preview del build

```bash
npm run preview
```

---

## 5. Cómo personalizar (sin tocar componentes)

Todo el contenido personal vive en `src/data/`. Los componentes solo se encargan de **presentar** ese contenido.

| Qué quieres cambiar | Archivo |
| --- | --- |
| Nombre de ella / tuyo, fecha de cumpleaños, fecha de reencuentro, música | `src/data/site.ts` |
| Línea de tiempo de la relación | `src/data/story.ts` |
| Galería de recuerdos | `src/data/memories.ts` |
| Tarjetas "cosas que amo de ti" | `src/data/loveNotes.ts` |
| Sobres "Open When" | `src/data/openWhen.ts` |
| La carta principal | `src/data/letter.ts` |
| Preguntas y opciones de "Elige nuestra cita ideal" | `src/data/datePlanner.ts` |
| Pregunta y frases de "¿Sigues siendo mi amorcito?" | `src/data/commitment.ts` |
| Momentos especiales (primera cita, primer viaje...) | `src/data/specialMoments.ts` |
| Secuencia final y última sorpresa | `src/data/finalMessage.ts` |
| Colores del tema | `src/index.css` (bloque `:root`) y `src/data/site.ts` → `theme.accent` |

### Fotografías

Coloca tus imágenes en:

```
public/images/story/       → fotos de la línea de tiempo (01.webp, 02.webp, welcome.webp...)
public/images/memories/    → fotos de la galería
public/images/final/       → si quieres usar alguna en la sorpresa final
```

Y referencia la ruta pública en el `src` correspondiente dentro de `src/data/story.ts` o `src/data/memories.ts`, por ejemplo `/images/memories/01.webp`.

**Mientras no exista la imagen, el sitio no se rompe**: se muestra un marcador elegante ("[INSERTAR FOTO]") en su lugar.

### Música

1. Coloca el archivo en `public/audio/song.mp3` (o el nombre que prefieras).
2. En `src/data/site.ts`, dentro de `music`, cambia:
   ```ts
   music: {
     enabled: true,
     title: "Nombre de la canción",
     artist: "Artista",
     src: "/audio/song.mp3",
   }
   ```
3. Si `enabled` es `false` (o el archivo no existe), el control de música no aparece — el resto de la experiencia sigue funcionando normal.

La música ya no es una sección dentro del recorrido: es un botón discreto y flotante (esquina inferior izquierda) que aparece una vez que ella hace clic en "Entrar". Nunca se reproduce sola sin esa interacción.

No se incluye ninguna canción con derechos de autor en este repositorio: debes agregar tu propio archivo.

### Fecha de reencuentro (countdown)

En `src/data/site.ts`:

```ts
reunionDate: "2026-12-24T18:00:00",
```

Si la dejas vacía (`""`), el countdown de la sección "Distancia" no se muestra.

### Recibir sus respuestas por correo (EmailJS)

Cuando ella termina "Elige nuestra cita ideal" y cuando presiona "Sí" en el juego del compromiso, el sitio puede enviarte un correo automático — sin backend, sin que ella haga nada. Usa [EmailJS](https://www.emailjs.com/), que tiene plan gratuito (200 correos/mes).

**Configuración (una sola vez, ~5 minutos):**

1. Crea una cuenta gratuita en [emailjs.com](https://www.emailjs.com/).
2. En el dashboard, ve a **Email Services** → agrega tu proveedor (Gmail, Outlook, etc.) → copia el **Service ID**.
3. Ve a **Email Templates** → crea un template nuevo. Usa estas variables en el cuerpo del template (EmailJS las reemplaza automáticamente):
   ```
   Asunto: {{subject}}

   {{message}}

   — enviado desde la página de {{girlfriend_name}}
   ```
   Guarda y copia el **Template ID**.
4. Ve a **Account** → **General** → copia tu **Public Key**.
5. En `src/data/site.ts`, completa:
   ```ts
   emailjs: {
     enabled: true,
     serviceId: "tu_service_id",
     templateId: "tu_template_id",
     publicKey: "tu_public_key",
   },
   ```
6. Listo. Si `enabled` queda en `false` o falta algún valor, simplemente no se envía nada — el resto del sitio funciona normal.

Te llegarán dos correos como máximo: uno con las 4 elecciones de la cita ideal, y otro cuando ella presione "Sí" (con el número de veces que intentó decir "no", por diversión).

### El juego del "Sí / No"

En `src/data/commitment.ts` puedes cambiar la pregunta, el texto de los botones y las frases que van rotando (`teases`) cada vez que presiona "no". El botón "no" nunca se deshabilita — simplemente, cada vez que lo presiona, el botón "sí" salta y se coloca justo encima, hasta que termina presionando "sí". Agrega tantas frases como quieras a `teases`; se repiten en ciclo si se queda sin frases nuevas.

### La carta

Edita `src/data/letter.ts`. Separa los párrafos con una línea en blanco; el componente respeta los saltos de línea automáticamente.

---

## 6. Deploy en Vercel

1. Sube este proyecto a un repositorio (puede ser privado) en GitHub/GitLab/Bitbucket.
2. En [vercel.com](https://vercel.com), "Add New Project" → importa el repositorio.
3. Framework preset: **Vite** (Vercel lo detecta automáticamente).
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

Como es un sitio estático sin backend, también puedes arrastrar la carpeta `dist/` (después de `npm run build`) directamente a Vercel o Netlify si prefieres no usar Git.

El sitio incluye `<meta name="robots" content="noindex,nofollow">` para no ser indexado, pero recuerda que cualquiera con el enlace puede abrirlo — no hay contraseña. Si quieres protegerlo más, Vercel ofrece protección por contraseña en planes de pago ("Password Protection" en la configuración del proyecto).

---

## 7. Decisiones técnicas relevantes

- **Sin Redux ni estado global complejo**: solo `useState`/hooks y dos flags en `localStorage` (`experienceStarted`, y el volumen queda en memoria del reproductor).
- **`useAudioPlayer`, `useCountdown`, `useActiveSection`**: hooks propios, sin librerías externas de audio/fechas.
- **Tolerancia a contenido incompleto**: si falta una imagen, el audio, la fecha de reencuentro o hay pocos elementos en la historia, la aplicación se degrada con elegancia en lugar de romperse.
- **`prefers-reduced-motion`**: las animaciones se reducen automáticamente si el sistema del usuario lo solicita.
- **Mobile-first**: todos los elementos interactivos tienen un área táctil mínima de 44px; nada depende de `:hover` para funcionar.
