# Krishn Gohel — Portfolio

Personal portfolio for Krishn Gohel — Computer Science @ UTSA, founder of Webloom, full-stack & AI engineer. Dark-to-light "Sunlit Workspace" palette (orange / purple / teal on cream), motion-rich, built on the Cuberto-inspired layout.

## Stack
- Next.js 16 (App Router, `src/`) · TypeScript · Tailwind CSS v4
- Framer Motion · shadcn-style primitives (Radix + CVA) · Lucide icons
- Inter + Syne (Google Fonts) · configured for Netlify

## Local development
```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy to Netlify

This repo is Netlify hosting-ready. `netlify.toml` uses the official **Next.js Runtime** (`@netlify/plugin-nextjs`), which Netlify auto-installs — it handles SSR, the `/api/contact` function, and routing. Node is pinned to 22 (`netlify.toml` + `.nvmrc`).

**Option A — Git (recommended):**
1. Push this folder to a GitHub repo.
2. In Netlify: **Add new site → Import an existing project → GitHub**, pick the repo.
3. Build command `npm run build` and the plugin are detected from `netlify.toml`. Click **Deploy**.

**Option B — CLI:**
```bash
npm i -g netlify-cli
netlify login
netlify init            # create/link a site
netlify deploy --build --prod
```

Notes:
- Don't set a publish directory — the Next.js Runtime manages output. (Setting `.next` manually breaks v5.)
- No static export: the site uses SSR + an API route, so it deploys as Netlify Functions, not a static bundle.
- No environment variables are required to deploy. When you wire the contact form to an email provider later, add its key in **Site settings → Environment variables**.

## Notes
- **Projects** are a tightened vertical timeline (gradient spine, pulsing nodes, quick staggered reveal). Every project shows a hover preview on desktop: projects with a `liveUrl` (e.g. Scrubbed → getscrubbed.netlify.app) embed the real site in a browser-window iframe; the rest get an **animated preview** (orbiting accent rings + title/stack) so nothing is ever blank. Cards link to the live site if set, otherwise the GitHub repo; coursework/team projects with no public repo are non-clickable and tagged "Private / coursework".
- The full list shows on both the home page and `/work` (no "view all" button). Edit `src/data/projects.ts` to reorder, add a `liveUrl`, or change copy.
- The native cursor is visible alongside the custom follower.
- Placeholders to swap later: testimonial names/quotes, and the contact-form email delivery (wire `/api/contact` to Resend/SendGrid).
