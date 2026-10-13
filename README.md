# Learn Taekwondo

> A study companion for WTF Taekwondo practitioners. Learn technique names, pronunciation, purpose, and the belt at which each is introduced.

Learn Taekwondo is a Next.js web application that serves as a study guide for World Taekwondo (WTF) students. It covers techniques, belt history, the grading system (gubs and dans), hierarchy, and terminology in romanized Korean, Hangul, English, and Portuguese. All content lives in Markdown files and is parsed at build time. No login, no database, no external CMS.

## Features

- **Techniques library** — searchable and filterable by belt, category, and level
- **Belt guide** — one page per belt from 10º Gub (white) to 9º Dan (black)
- **Grading system** — explains the 10 gubs, 9 dans, and how exams work
- **Hierarchy** — student, instructor, master, and grandmaster ranks
- **Terminology glossary** — commands, greetings, counting, parts of the body, and dojo etiquette
- **Global search** — matches English, Portuguese, descriptions, and romanized names
- **Korean pronunciation** — uses Web Speech API when available; falls back to written phonetics
- **Dark and light mode** — follows device preference, overridable in Settings
- **Language switch** — English and Portuguese, with automatic detection from the system
- **PWA** — installable and works offline after first load
- **Multi-platform build** — web, desktop (Pake), and Android APK (Nitron)

## Tech Stack

- Next.js (Pages Router)
- TypeScript
- styled-components
- sonner (toasts)
- Markdown (content source)
- Nitron (Android APK)
- Pake (desktop)

## Content Structure

```

content/
├── techniques/
├── belts/
├── grading/
├── hierarchy/
└── terminology/

```

Each technique entry contains romanji, Hangul, English, Portuguese, belt level, purpose, execution, and pronunciation.

## Getting Started

Install [Bun](https://bun.sh/) first. This project uses Bun for package management and scripts.

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

## Build Targets

**Web / PWA**

```bash
bun run build
```

Output is a static site under `out/`. Deployable to Vercel, Netlify, or any static host.

**Desktop (Pake)**

```bash
bun run build:desktop
```

The script runs Pake CLI through `bunx`. Install Rust and the native prerequisites for the target OS first; see [Pake's CLI guide](https://github.com/tw93/Pake/blob/main/docs/cli-usage.md) and [Tauri's Linux prerequisites](https://v2.tauri.app/start/prerequisites/). On Linux it creates `tkd-study.deb` and `tkd-study.AppImage`. Build on Windows or macOS to create those platforms' native packages.

**Android (Nitron)**

`nitron.config.json` contains the package ID, name, and static entry point. Then:

```bash
bun run build:android
```

Output is an APK under `dist/`. Nitron signs its default build with a debug key for local installation and testing. Use your own release signing setup for production distribution. Nitron and Java prerequisites are documented in the [Nitron project](https://github.com/ALightbolt4G/nitron).

## Limitations

- Content is read at build time. New Markdown files require a rebuild.
- Web Speech API depends on the browser and installed Korean voice. Not all devices have it.
- Korean pronunciation is best-effort when the voice is unavailable; written phonetics are used as fallback.

## License

MIT.
