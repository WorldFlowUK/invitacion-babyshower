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
`src/lib/rsvp.ts`. Hay dos formas de conectar un backend real, ninguna
obligatoria para que la invitación funcione:

Webhook propio, pensado para tu stack de n8n existente. Define
`VITE_RSVP_WEBHOOK_URL` en tu `.env` y cada respuesta llega ahí como
POST JSON con `guestName`, `attending`, `bringingPlusOne`,
`plusOneName`, `message` y `createdAt`. Desde n8n puedes reenviarlo a
Sheets, Zoho, WhatsApp o correo sin tocar el frontend.

Supabase directo. Define `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
en tu `.env` usando exclusivamente la clave anon/pública, nunca la
service role key. La tabla esperada es:

```sql
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  attending boolean not null,
  bringing_plus_one boolean not null default false,
  plus_one_name text,
  message text,
  created_at timestamptz not null default now()
);

alter table rsvps enable row level security;

create policy "Cualquiera puede confirmar su asistencia"
  on rsvps for insert
  to anon
  with check (true);
```

Si ninguna variable está configurada, la respuesta se guarda en el
`localStorage` del propio dispositivo del invitado como respaldo, y la
interfaz avisa con un mensaje amable en vez de un error técnico. Esto
es suficiente para probar el flujo, pero para recibir confirmaciones
reales de los 24 invitados hace falta configurar alguna de las dos
opciones antes de compartir el link.

## Variables de entorno

Copia `.env.example` a `.env` y llena solo la opción que vayas a usar.
Nunca se sube `.env` al repositorio.

## Deployment en Cloudflare

Tu proyecto quedó creado como un Worker de Cloudflare (la plataforma
unificada que reemplaza a Pages), no como un proyecto clásico de Pages.
Eso significa que el deploy corre `npx wrangler deploy` en vez de subir
`dist` directamente, y por defecto Wrangler intenta autoconfigurar el
proyecto usando el plugin de Vite para Cloudflare, algo que solo
funciona con Vite 6 o superior.

Para evitar ese problema sin forzar una migración de Vite, el
repositorio ya incluye `wrangler.jsonc` en la raíz, configurando el
proyecto como un Worker de solo assets estáticos que sirve `dist/` con
fallback de SPA (`not_found_handling: "single-page-application"`). Con
ese archivo presente, Wrangler deja de intentar la autoconfiguración
por Vite y simplemente publica los archivos generados por el build,
exactamente el comportamiento que buscábamos con un sitio estático.

No hace falta tocar nada en el dashboard de Cloudflare: en cuanto
subas este cambio a GitHub, el próximo build disparado automáticamente
por el push debería completarse sin el error de versión de Vite. Si
quieres confirmarlo localmente antes de subirlo, `npm run build` seguido
de `npx wrangler deploy --dry-run` valida el deploy sin publicar nada
ni requerir login en Cloudflare.

Si vas a usar el webhook o Supabase para el RSVP, agrega las mismas
variables de `.env` en Settings → Variables and Secrets del proyecto en
Cloudflare, tanto para Production como para Preview.

`public/_redirects` se mantiene por compatibilidad, pero el fallback de
SPA real en este setup lo resuelve `wrangler.jsonc`.

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
que falta es un backend de RSVP configurado (webhook o Supabase, ver
sección anterior) y, si aplica, el link de mesa de regalos en
`giftRegistryUrl`.

El dashboard administrativo (`/admin`) descrito en el brief original
quedó fuera de este alcance a propósito: la prioridad fue la calidad de
la experiencia de invitación. Si luego se necesita, lo natural es
construirlo directamente sobre la tabla `rsvps` de Supabase o sobre el
destino final del webhook en n8n, en vez de duplicar lógica de
almacenamiento en el frontend.
