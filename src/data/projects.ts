// Every figure on this page comes from the project's own repo, spec, or client brief.
// Edit here; the page renders straight from these arrays.

export interface ProjectLink {
  label: string;
  href?: string; // omitted = shown as plain text (e.g. "Repo private")
}

export interface Characteristic {
  parameter: string;
  value: string;
}

export interface CurrentProject {
  id: string;
  name: string;
  function: string; // one-line, datasheet "function" line
  period: string;
  body: string[];
  characteristics: Characteristic[];
  links: ProjectLink[];
  gallery?: Shot[];
}

export interface Shot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export const currentProjects: CurrentProject[] = [
  {
    id: "necto",
    name: "Necto",
    function: "Relationship CRM for people who meet a lot of people",
    period: "2026, live",
    body: [
      "Necto turns a scanned business card or a LinkedIn export into a contact record that fills itself in, then draws your network as a graph that cools as you fall out of touch. I rebuilt it from scratch as v2 and wrote all of the code: one React codebase shipped to iOS, Android and the web through Capacitor, on Supabase Postgres with row-level security on every table.",
      "Enrichment runs Claude Haiku first and escalates to Sonnet only when it needs to. Every field stores its own source, confidence and timestamp, so any value on a profile can be traced to where it came from. The v2 schema had to land on the same live database v1's paying subscribers were using, so every migration was written to apply without touching them.",
    ],
    characteristics: [
      { parameter: "Platforms", value: "iOS, Android, web from one React + Vite codebase (Capacitor)" },
      { parameter: "Backend", value: "Supabase Postgres with RLS, 36 edge functions, 114 migrations" },
      { parameter: "AI", value: "Claude Haiku with Sonnet escalation; semantic search over notes" },
      { parameter: "Integrations", value: "Stripe billing, Granola meeting sync, wallet passes, an MCP server" },
      { parameter: "Tests", value: "83 test and smoke-test files" },
      { parameter: "Role", value: "Sole engineer on v2. Co-founded with Pranav Jajapur" },
    ],
    links: [
      { label: "Live site", href: "https://trynecto.com" },
      { label: "Repo private" },
    ],
  },
  {
    id: "lead-desk",
    name: "Lead Desk",
    function: "Call-queue CRM for a life-insurance agency",
    period: "Nov 2026, demo",
    body: [
      "A life-insurance agency runs Facebook and Instagram lead ads. My partner runs the campaigns; I build everything that happens after someone fills out the form. The form sits on the landing page under the video, so there's no second page to drop off on.",
      "Every new lead lands on a call board with a live clock against a five-minute target, hot leads first. The CRM routes it to the licensed agent on shift with the fewest open leads. No answer sets a timed retry; a pickup moves to a quote, a booked follow-up, or a sale. A STOP blocks the number, and each lead's consent wording, timestamp and phone number are saved with the record.",
    ],
    characteristics: [
      { parameter: "Lead source", value: "Meta and Instagram lead ads into an on-page landing form" },
      { parameter: "Routing", value: "Licensed agent on shift with the fewest open leads, or first come, first served" },
      { parameter: "Call flow", value: "No answer sets a timed retry; pickup goes to quote, follow-up, or sold" },
      { parameter: "Views", value: "Call board, pipeline, calendar, ads cost per lead and sale, team" },
      { parameter: "Compliance", value: "STOP blocks the number; consent record kept per lead" },
      { parameter: "Engagement", value: "Freelance, paired with an ads partner" },
    ],
    links: [
      { label: "Live demo", href: "https://claude.ai/artifact/EXik9bnYdR2CgxyorE4SJh" },
      { label: "Repo private" },
    ],
  },
  {
    id: "gratiture",
    name: "Gratiture Staffing CRM",
    function: "Recruiting CRM for the Gratiture Solutions staffing team",
    period: "2026, in production",
    body: [
      "Vendor job alerts reach Gratiture by email. The CRM reads the watched Gmail mailboxes, turns each vendor email into a clean posting, and keeps requirements, candidates and submissions in one place, with recruiter, lead and admin roles enforced in Postgres row-level security.",
      "Every candidate is scored 0 to 100 against every open role by rules in code, not AI: skills 50, role 15, experience 15, location 10, eligibility 10, each with its full breakdown and nothing counted as a match until a person approves it. AI runs only when a recruiter asks, on their own subscription, inside a per-user sandbox on a separate runner. The resume formatter checks every output line against the original and flags anything it can't find before download.",
    ],
    characteristics: [
      { parameter: "Web", value: "Next.js 16, React 19, TypeScript, server actions" },
      { parameter: "Data", value: "Supabase Postgres 17 with RLS, Auth, Storage, Realtime" },
      { parameter: "Runner", value: "Docker job worker, per-user AI sandboxes, Gmail poller, OCR" },
      { parameter: "Matching", value: "Deterministic 0 to 100 score, human approval required" },
      { parameter: "Bulk", value: "Screens up to 300 resumes against one requirement" },
      { parameter: "Tests", value: "133 Vitest files, 20 pgTAP files, 7 Playwright specs" },
      { parameter: "Status", value: "v0.7.0, in production with the Gratiture recruiting team" },
    ],
    links: [{ label: "Client work: app and repo private, screenshots below use test data" }],
    gallery: [
      {
        src: "/gratiture/pipeline.jpg",
        alt: "Pipeline page with open requirements, submissions against target, blockers, a hygiene list and daily targets per recruiter.",
        caption: "Pipeline: submission targets, blockers, and a hygiene list of gaps for leads.",
        width: 1600,
        height: 1000,
      },
      {
        src: "/gratiture/match-score.jpg",
        alt: "Match score card showing 100 of 100 with each part of the score broken down and the resume line that matched each skill.",
        caption: "Match score: every point traced to a line in the resume.",
        width: 1600,
        height: 1000,
      },
      {
        src: "/gratiture/resume-check.jpg",
        alt: "Formatted resume review with a warning that one line is not in the original resume.",
        caption: "Resume formatter: a line not in the original is flagged before download.",
        width: 1600,
        height: 1000,
      },
      {
        src: "/gratiture/jd-generator.jpg",
        alt: "JD generator draft built from a pasted job email and hiring-manager call notes.",
        caption: "JD generator: mixed sources in, one standard posting out.",
        width: 1600,
        height: 1000,
      },
      {
        src: "/gratiture/job-inbox.jpg",
        alt: "Job Inbox listing vendor job alert emails waiting to be processed.",
        caption: "Job Inbox: vendor alerts captured from the watched mailboxes.",
        width: 1600,
        height: 622,
      },
    ],
  },
];

export interface EarlierProject {
  name: string;
  what: string;
  figure: string;
  stack: string;
  repo?: string;
  live?: string;
}

export const earlierProjects: EarlierProject[] = [
  {
    name: "Cleanroom AI",
    what: "On-premise AI workspace with federated learning and differential privacy. No data leaves the network.",
    figure: "63 backend tests",
    stack: "Python, FastAPI, React, PostgreSQL, Redis, Docker",
    repo: "https://github.com/krishngohel/cleanroom",
  },
  {
    name: "Pressed",
    what: "Career vault and AI resume builder. LaTeX compiles in the browser; a Gmail connector feeds a job tracker.",
    figure: "3 paid Stripe tiers",
    stack: "React, Express, Supabase, Stripe, Claude API, WASM",
    repo: "https://github.com/krishngohel/pressed",
    live: "https://pressedjobhelp.netlify.app",
  },
  {
    name: "Calisthenics Form Tracker",
    what: "Scores form and times holds from a training video, in the browser. Video never leaves the device.",
    figure: "29 skills",
    stack: "Next.js, TensorFlow.js, MediaPipe, Web Workers, Supabase",
    repo: "https://github.com/krishngohel/calisthenics-form-tracker",
  },
  {
    name: "Clarity Classifier",
    what: "Classifies political interview answers as clear reply, ambivalent, or non-reply under heavy label imbalance.",
    figure: "15-model DeBERTa-v3 ensemble",
    stack: "Python, PyTorch, Hugging Face, scikit-learn",
    repo: "https://github.com/krishngohel/clarity-classifier",
  },
  {
    name: "RT-MBAS",
    what: "Classifies focused, distracted, or stressed from a webcam in real time, on a CPU.",
    figure: "15 features per frame",
    stack: "Python, OpenCV, MediaPipe, scikit-learn, Streamlit",
    repo: "https://github.com/krishngohel/rt-mbas",
  },
  {
    name: "Futureproof",
    what: "AI literacy course platform for K-12 with a paywall and a multi-language code editor.",
    figure: "5 languages in-browser",
    stack: "Next.js, Supabase, Stripe, Piston API",
    repo: "https://github.com/krishngohel/futureproof",
  },
  {
    name: "Scrubbed",
    what: "Pre-med application tool that drafts secondary-essay outlines.",
    figure: "Live on Netlify",
    stack: "Node.js, Express, SQLite, JWT",
    repo: "https://github.com/krishngohel/Scrubbed",
    live: "https://getscrubbed.netlify.app",
  },
];

export interface Revision {
  date: string;
  entry: string;
}

export const revisions: Revision[] = [
  { date: "Nov 2026", entry: "Built the Lead Desk call-queue CRM demo for a life-insurance agency." },
  { date: "Sep 2026", entry: "Started the Gratiture Staffing CRM, now in production with their recruiting team." },
  { date: "Aug 2026", entry: "Started the Necto v2 rebuild on the live production database." },
  { date: "May 2026", entry: "B.S. Computer Science, Data Science concentration, UTSA." },
  { date: "2023", entry: "Founded Webloom. Sole developer on 50+ client projects since." },
];
