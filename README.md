# Baby Shower · Invitación interactiva

Invitación digital para el Baby Shower del 26 de septiembre de 2026 en
CASAREYNA, Puebla. Pensada para compartirse por WhatsApp: carga rápida,
mobile-first, con música de fondo, countdown, RSVP y un pequeño momento
interactivo.

## Stack

React, TypeScript y Vite. Tailwind CSS para estilos, con la paleta
completa expuesta como variables CSS en `src/index.css` para poder
ajustarla sin tocar componentes. Framer Motion para las animaciones.
Lucide React para iconografía. Cloudflare Pages para el deployment.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Toda la información editable vive en un solo lugar

`src/data/invitation.ts` centraliza nombre del bebé, nombres de los
papás, fecha, hora, venue, dirección, link de Google Maps, configuración
de invitados y link de mesa de regalos. Ningún componente tiene textos
de evento hardcodeados: todo se importa desde ahí. Cuando tengas el
nombre del bebé y de los papás confirmados, reemplázalos ahí y se
propagan solos a Welcome, Hero, Countdown y Closing.

## Música de fondo

El archivo va en `public/audio/background.mp3`. No se incluye ningún
archivo real por derechos de autor; hay instrucciones en
`public/audio/README.md`. La reproducción nunca arranca sola: solo
inicia cuando la persona toca "Abrir invitación", respetando las
políticas de autoplay de los navegadores. Si el archivo no existe, el
control de música simplemente no aparece y el resto de la invitación
sigue funcionando con normalidad.

## RSVP

El formulario vive en `src/components/rsvp/RSVPForm.tsx` y el envío en
`src/lib/rsvp.ts`. El backend esperado es Supabase directo contra la
tabla `public.rsvps`. Define `VITE_SUPABASE_URL` y
`VITE_SUPABASE_ANON_KEY` en tu `.env`; cada respuesta se inserta con
nombre del invitado, asistencia, +1, nombre del acompañante, mensaje y
fecha de creación.

La migración SQL vive en
`supabase/migrations/20260816195711_create_rsvps.sql`. La tabla tiene
RLS activo y solo permite INSERT anónimo; no expone SELECT público.

El formulario ya no usa `localStorage` como respaldo. Si Supabase no
está configurado, responde con error o la conexión falla, la interfaz
muestra un estado claro para reintentar o editar la respuesta.

## Variables de entorno

Copia `.env.example` a `.env` y llena `VITE_SUPABASE_URL` y
`VITE_SUPABASE_ANON_KEY`. Nunca se sube `.env` al repositorio.

## Deployment en Cloudflare Pages

Conecta el repositorio de GitHub desde el dashboard de Cloudflare Pages
y usa esta configuración de build:

Framework preset: Vite. Build command: `npm run build`. Build output
directory: `dist`. Agrega `VITE_SUPABASE_URL` y
`VITE_SUPABASE_ANON_KEY` en Settings → Environment variables del
proyecto en Cloudflare, tanto para Production como para Preview.

El archivo `public/_redirects` ya deja resuelto el fallback de rutas
para que la aplicación funcione correctamente como SPA.

## Estructura

```text
src/
├── components/
│   ├── audio/       AudioProvider y MusicPlayer
│   ├── effects/      FadeInSection y GrowthRail (elemento de firma visual)
│   ├── rsvp/         RSVPForm
│   └── ui/           Button y Container
├── sections/          una carpeta por sección del flujo narrativo
├── hooks/             useCountdown
├── lib/               countdown.ts, calendar.ts, rsvp.ts
├── data/              invitation.ts (única fuente de verdad de contenido)
└── types/             tipos compartidos
```

## Pendiente antes de compartir el link

Nombre del bebé, papás, música y fotografías ya están cargados. Lo único
que falta antes de compartir el link es configurar las variables de
Supabase en el hosting y, si aplica, el link de mesa de regalos en
`giftRegistryUrl`.

El dashboard administrativo (`/admin`) descrito en el brief original
quedó fuera de este alcance a propósito: la prioridad fue la calidad de
la experiencia de invitación. Si luego se necesita, lo natural es
construirlo directamente sobre la tabla `public.rsvps` de Supabase, en
vez de duplicar lógica de almacenamiento en el frontend.
