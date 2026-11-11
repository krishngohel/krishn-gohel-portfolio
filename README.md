# Krishn Gohel — portfolio

Single-page portfolio for Krishn Gohel, AI/ML engineer: a wall of real project screenshots,
an index of every project with cursor-following previews, and a full-screen viewer per project.

## Stack
- Next.js 16 (App Router, `src/`), TypeScript, plain CSS with custom-property tokens
- Archivo (display), IBM Plex Sans (body), IBM Plex Mono (data), self-hosted via Fontsource
- No client-side JavaScript beyond Next's runtime; no animation library

## Editing content
Everything renders from `src/data/projects.ts`. Each project has:
- `plain`: one or two plain-English sentences on what it does and who it helps
- `numbers`: three real figures, shown on hover and at the top of the project viewer
- `body` and `specs`: how it works and what it's built with
- `shots`: screenshots in `public/work` or `public/gratiture`, each with a `-sm` copy for previews
- `live`, `repo`, `note`: links and any caveat (private repo, demo data)

Projects open in a full-screen viewer at `/#<id>` (for example `/#necto`); arrow keys step between
projects and Esc closes.

Old routes (`/work`, `/about`, `/contact`, `/services`, `/process`) redirect to sections of
the home page via `next.config.ts`.

## Local development
```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy
Netlify builds from GitHub on push (`netlify.toml`, Next.js Runtime, Node 22). No
environment variables are required.
