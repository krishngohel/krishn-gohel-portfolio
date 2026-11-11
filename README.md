# Krishn Gohel — portfolio

Single-page portfolio, laid out as a component datasheet: each project is a "part" with a
function line, prose, and a table of characteristics; earlier work is a selection guide;
experience is the revision history.

## Stack
- Next.js 16 (App Router, `src/`), TypeScript, plain CSS with custom-property tokens
- Archivo (display), IBM Plex Sans (body), IBM Plex Mono (data), self-hosted via Fontsource
- No client-side JavaScript beyond Next's runtime; no animation library

## Editing content
Everything on the page renders from `src/data/projects.ts`:
- `currentProjects` — the detailed entries (Necto, Ringlist, Gratiture)
- `earlierProjects` — the selection-guide table; set `repo` and/or `live` to show links
- `revisions` — the revision-history table

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
