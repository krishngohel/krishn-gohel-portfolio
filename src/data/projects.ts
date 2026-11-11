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
    id: "ringlist",
    name: "Ringlist",
    function: "Lead-routing CRM for an insurance agency",
    period: "Nov 2026, demo",
    body: [
      "An insurance agency runs Facebook and Instagram lead ads. My partner runs the campaigns; I build everything that happens after someone fills out the form. The form sits on the landing page under the video, so there's no second page to drop off on.",
      "Each submission lands in the CRM, which picks an agent, alerts them, and tracks the call. If the lead picks up, the agent quotes them. If not, the CRM sets a reminder and the agent tries again. It starts with one agent and grows to five or more.",
    ],
    characteristics: [
      { parameter: "Lead source", value: "Meta and Instagram lead ads into an on-page landing form" },
      { parameter: "Routing", value: "Assigns each lead to an agent and alerts them on arrival" },
      { parameter: "Follow-up", value: "No answer sets a reminder for the agent to call back" },
      { parameter: "Scale", value: "One agent at launch, scaling to five or more" },
      { parameter: "Engagement", value: "Freelance, paired with an ads partner" },
    ],
    links: [
      { label: "Live demo", href: "https://ringlist-crm-demo.netlify.app" },
      { label: "Repo private" },
    ],
  },
  {
    id: "gratiture",
    name: "Gratiture recruiting platform",
    function: "Recruiting and staffing operations platform for Gratiture Solutions",
    period: "2026, in progress",
    body: [
      "Gratiture Solutions is a staffing firm. They handed me an eleven-module requirements document covering job descriptions, a candidate database, AI resume fitment, applicant tracking, timesheets and payroll, a CRM, email outreach, compliance and onboarding, and executive dashboards, and asked for all of it in a month.",
      "I told them the full scope was closer to six months, flagged the gaps in the spec, and laid out a phased plan that ships the four core modules first. Modules release one at a time so the recruiting team uses each piece as it lands instead of waiting for a big reveal.",
    ],
    characteristics: [
      { parameter: "Scope", value: "11 modules across 5 phases" },
      { parameter: "First release", value: "Phase 1: four core modules, staggered" },
      { parameter: "Estimate", value: "About six months for full scope, against a one-month ask" },
      { parameter: "Role", value: "Scoping, delivery plan, build" },
    ],
    links: [{ label: "Client work, not public" }],
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
  { date: "Nov 2026", entry: "Built the Ringlist lead-routing CRM demo for an insurance agency." },
  { date: "Sep 2026", entry: "Took on the Gratiture Solutions recruiting platform: scoping, delivery plan, build." },
  { date: "Aug 2026", entry: "Started the Necto v2 rebuild on the live production database." },
  { date: "May 2026", entry: "B.S. Computer Science, Data Science concentration, UTSA." },
  { date: "2023", entry: "Founded Webloom. Sole developer on 50+ client projects since." },
];
