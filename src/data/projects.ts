export type Accent = "orange" | "purple" | "teal";

export interface Project {
  name: string;
  tag: string;
  accent: Accent;
  tech: string[];
  bullets: string[];
  repoUrl?: string;
  liveUrl?: string;
}

// Curated order, strongest first.
export const projects: Project[] = [
  {
    name: "Cleanroom AI",
    tag: "Flagship · On-Prem AI Platform",
    accent: "orange",
    tech: ["Python", "FastAPI", "React 18", "PostgreSQL", "Redis", "Docker", "PyTorch", "Ollama"],
    bullets: [
      "Compliance-grade, on-premise Claude-style platform — Chat, Projects, sandboxed Files workspace, prompt library, admin Insights, and an immutable audit log. No data ever leaves the network.",
      "Federated learning with differential privacy (Opacus DP-SGD, X25519 secure aggregation) and OpenAI-compatible streaming chat via Ollama.",
      "Async FastAPI + JWT/Redis auth, React 18 + TypeScript dashboard, Docker Compose, Prometheus + Grafana — 63 backend tests passing.",
    ],
    repoUrl: "https://github.com/krishngohel/cleanroom",
  },
  {
    name: "Calisthenics Form Tracker",
    tag: "Pose AI · Web App",
    accent: "purple",
    tech: ["Next.js 14", "TypeScript", "TensorFlow.js", "MoveNet", "MediaPipe", "Web Workers", "Supabase"],
    bullets: [
      "In-browser calisthenics coach that analyzes training videos — hold timers, form scores, and coaching cues update live as the clip plays. Videos never leave the device.",
      "Pose pipeline runs MoveNet or MediaPipe in a Web Worker; per-skill geometry rules score form and drive a hold start/stop state machine across 29 skills.",
      "Auto-detect mode, ghost-pose Learn mode with correction arrows, live form-score charts, and a Supabase dashboard for saved session history.",
    ],
    repoUrl: "https://github.com/krishngohel/calisthenics-form-tracker",
  },
  {
    name: "RT-MBAS",
    tag: "Computer Vision · ML",
    accent: "teal",
    tech: ["Python", "OpenCV", "MediaPipe", "scikit-learn", "Streamlit", "pandas"],
    bullets: [
      "Real-time webcam cognitive-state classifier: MediaPipe extracts 15 behavioral features per frame (eye aspect ratio, hand velocity, motion entropy) into a RandomForest.",
      "10-frame majority-vote smoothing for stable Focused / Distracted / Stressed predictions; Streamlit dashboard with feature importances and confusion matrix.",
      "Fully local and CPU-capable — no API keys, no cloud, no GPU required.",
    ],
    repoUrl: "https://github.com/krishngohel/rt-mbas",
  },
  {
    name: "Scrubbed",
    tag: "Full-Stack · Health-Ed",
    accent: "orange",
    tech: ["Node.js", "Express", "SQLite", "JWT", "REST API"],
    bullets: [
      "Pre-med application platform with a normalized SQLite schema and a Node.js/Express REST API.",
      "JWT authentication and AI-powered secondary-essay outline generation.",
    ],
    repoUrl: "https://github.com/krishngohel/Scrubbed",
    liveUrl: "https://getscrubbed.netlify.app",
  },
  {
    name: "Pressed",
    tag: "AI Career Platform · SaaS",
    accent: "purple",
    tech: ["React 18", "Vite", "Express", "Netlify Functions", "Supabase", "Stripe", "Claude API", "WASM"],
    bullets: [
      "Career vault + AI resume generator with a click-to-edit WYSIWYG editor — LaTeX compiled entirely in-browser via WASM; PDF.js maps placeholders to bounding boxes for on-preview editing.",
      "Gmail connector (OAuth, AES-256-GCM encrypted tokens) surfaces interviews, offers, and deadlines into a kanban job tracker.",
      "Stripe Pro/Annual/Lifetime plans, RAG over live vault entries, and ephemeral prompt caching on every Claude call.",
    ],
    repoUrl: "https://github.com/krishngohel/pressed",
  },
  {
    name: "Futureproof",
    tag: "K-12 EdTech · SaaS",
    accent: "teal",
    tech: ["Next.js 14", "TypeScript", "Supabase", "Stripe", "Tailwind CSS", "Piston API"],
    bullets: [
      "K-12 AI literacy platform — Module 1 free, Modules 2–5 paywalled at $5/month via Stripe subscriptions + webhooks, on a Vercel-deployed App Router architecture.",
      "Multi-language in-browser IDE: JS/HTML run natively; Python, Java, Go, and Rust execute via the Piston API, with an HTML game preview panel.",
      "Supabase auth + PostgreSQL with row-level security, per-project file persistence, quiz engine, and progress tracking.",
    ],
    repoUrl: "https://github.com/krishngohel/futureproof",
  },
  {
    name: "Clarity Classifier",
    tag: "NLP · UTSA Kaggle",
    accent: "orange",
    tech: ["Python", "PyTorch", "HuggingFace", "DeBERTa-v3", "scikit-learn"],
    bullets: [
      "3-class classification of 2,758 political interview Q&A pairs (Clear Reply / Ambivalent / Clear Non-Reply) under heavy label imbalance.",
      "DeBERTa-v3 ensemble: multi-pool head, 5-fold CV × 3 seeds = 15 models, focal loss, LLRD, AWP, R-Drop, checkpoint souping, OOF-weighted blending.",
      "Confidence/entropy-gated pseudo-labeling pipeline — 74 unit tests passing.",
    ],
    repoUrl: "https://github.com/krishngohel/clarity-classifier",
  },
  {
    name: "AI Debate Tool",
    tag: "AI · EdTech",
    accent: "purple",
    tech: ["JavaScript", "Bootstrap", "OpenAI"],
    bullets: [
      "AI-powered debate platform for K-12 students — structured argument scoring and real-time feedback.",
      "Readability analysis and per-session logging via the OpenAI API.",
    ],
    repoUrl: "https://github.com/krishngohel/AIDebateTool",
  },
  {
    name: "Capstone — AI in Education",
    tag: "UTSA Capstone · Team of 5",
    accent: "teal",
    tech: ["AI", "Education", "Bootstrap", "Group Project"],
    bullets: [
      "Group capstone applying AI to education (UTSA), built with a five-person team.",
      "Showcase site with feature/module pages, team, and testimonials on a Bootstrap architecture.",
    ],
    liveUrl: "https://aiedsolutions.org/",
  },
  {
    name: "Finger-Tracking Canvas",
    tag: "Computer Vision · Experiment",
    accent: "orange",
    tech: ["HTML5 Canvas", "WebSocket", "Python", "OpenCV", "MediaPipe"],
    bullets: [
      "Dual-input drawing canvas: touch/mouse pointer events, or webcam fingertip tracking streamed over WebSocket in real time.",
      "MediaPipe hand landmarks → index fingertip broadcast from a Python backend; graceful fallback to touch-only, with gesture-based pen/eraser switching.",
    ],
  },
  {
    name: "GamePlaza & TicTacToe",
    tag: "Mobile · Java + Kotlin",
    accent: "purple",
    tech: ["Java", "Kotlin", "Jetpack Compose", "Material3", "Android SDK", "Gradle"],
    bullets: [
      "GamePlaza (UTSA CS 3443 group project): a Java multi-game hub with custom player profiles, multiple game modes, and a tutorial system.",
      "TicTacToe rebuilt as a clean, modern Kotlin + Jetpack Compose + Material3 app.",
    ],
  },
  {
    name: "Client Websites",
    tag: "Webloom · Client Work",
    accent: "teal",
    tech: ["HTML5", "Bootstrap 5", "Vanilla JS", "Framer Motion", "React/Vite"],
    bullets: [
      "Freelance sites shipped through Webloom: Emma Ramirez Realtor, SahMadeIt, getFitted, a nonprofit on the Nova template, forMaanvi, and more.",
      "Product marketing pages for Cleanroom AI and Futureproof, built on a self-defined \"Sunlit Workspace\" design system.",
    ],
  },
  {
    name: "Claude-Obsidian RAG Workspace",
    tag: "Dev Tooling · MCP",
    accent: "orange",
    tech: ["Python", "MCP", "Obsidian", "REST API", "Task Scheduler"],
    bullets: [
      "Integrated Obsidian with Claude Code via a local MCP server (supergateway), enabling RAG-style context injection from structured vault notes into the AI context window.",
      "Python vault scanner for automated note ingestion across a 50+ file knowledge graph spanning 7 active projects.",
    ],
  },
];

export const featuredProjects = projects;
