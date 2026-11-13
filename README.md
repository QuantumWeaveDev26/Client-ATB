# ATB Tennis Academy

Responsive React + Vite website for ATB Tennis Academy in Yelahanka, Bengaluru.

## Development

Use Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

The development URL is http://127.0.0.1:5173.

```sh
npm run build
npm run preview
```

The production output is `dist/`. The default preview URL is http://127.0.0.1:4173.

## Pages and features

- Home: court photography, mentor slideshow, academy introduction, coaching-program preview, gallery preview and local practice videos.
- Programs: seven coaching programs with photographs and details.
- Gallery: all 42 photographs, Academy Pictures/Achievements filters, width-filling photo rows and a full-screen viewer.
- Scroll-aware navigation: hides scrolling down and returns scrolling up.
- Lenis smooth scrolling, GSAP transitions and reversible Three.js tennis motion, with reduced-motion support.
- Combined FAQ/contact section with court-photo background, address, directions, phone and email.
- Slot requests: preferred date, name, number of players and optional notes. Validated details open a WhatsApp draft; the visitor sends it and the academy confirms availability.

No database, API secrets, payment processing, live slot inventory or spreadsheet connection is configured. No request is sent automatically.

## Deploy

Deploy the **contents** of `dist/`, with `index.html`, `programs.html` and `gallery.html` at the hosting root. All photos, fonts and clips are local under `public/` and copied by Vite.

See [Hostinger deployment and domain steps](docs/HOSTINGER-DEPLOYMENT.md) for GitHub deployment or a static upload. The site does not need a persistent Node.js server. No single-page-app fallback rewrite is necessary.

The existing PowerShell release utility `scripts/package-client-release.ps1` packages a built `dist/` for static hosting. It requires PowerShell 7 and also refreshes local ZIP aliases and the full-photo archive. ZIPs and build output are excluded from Git.

## Project structure

- `src/`: shared components, page entries, data, CSS and animation code.
- `public/`: runtime photographs, media, fonts, licenses and asset provenance sidecars.
- `index.html`, `programs.html`, `gallery.html`: Vite's three page entries.
- `scripts/`: optional asset-processing and release utilities.
- `tests/`: booking/date/WhatsApp unit tests (`npm test`).
- `PRODUCT.md`, `DESIGN.md`: project and design notes; dated entries record the development history.
- `docs/`: hosting handoff instructions.

Private uploads, photo-processing backups, research working files, design-tool caches, local credentials, generated ZIPs, `dist/` and `node_modules/` stay on the local machine and are not required to build the site. Some optional historical image-processing scripts expect those local originals; the committed runtime assets are already complete.

## Assets

Keep the supplied academy photos and achievement captions accurate. Do not invent prices, results, coach credentials or live availability. Font license files and media provenance sidecars are included beside the assets. Original client uploads and enhancement working files remain in local backups.

## Repository

https://github.com/QuantumWeaveDev26/Client-ATB
