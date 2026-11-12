// Every figure here comes from the project's own repo README, live site, or client docs.
// Images live in /public/work and /public/gratiture; each has a "-sm" sibling for previews.
// Every screenshot of a client product uses seeded demo or test data.

export type Kind = "Product" | "Client" | "AI / ML" | "Tools" | "Games";

export const kinds: Kind[] = ["AI / ML", "Product", "Client", "Tools", "Games"];

export interface Shot {
  src: string;
  alt: string;
  caption?: string;
  w: number;
  h: number;
}

export interface Spec {
  k: string;
  v: string;
}

export interface Project {
  id: string;
  name: string;
  kind: Kind;
  line: string;
  stack: string;
  body: string[];
  specs: Spec[];
  shots: Shot[];
  /** One or two plain-English sentences: what it does and who it helps. */
  plain: string;
  /** Short plain-English line for the index. */
  plainLine: string;
  /** Plain-English detail paragraphs for non-technical readers. */
  plainBody: string[];
  /** Three real numbers from the project, shown big. */
  numbers: { n: string; label: string }[];
  live?: string;
  repo?: string;
  note?: string;
}

const s = (src: string, alt: string, w: number, h: number, caption?: string): Shot => ({ src, alt, w, h, caption });

export const projects: Project[] = [
  {
    id: "necto",
    plainLine: "Scan a business card and the contact fills itself in.",
    plainBody: [
      "You meet people at events and forget half of them. With Necto you scan their business card or import your LinkedIn, and it fills in their job, company and background for you.",
      "It then draws everyone you know as a map, colored by how recently you were in touch, so you can see who you're drifting away from. It works on iPhone, Android and the web, and it's live with paying subscribers.",
    ],
    plain: "Meet someone, scan their business card, and Necto fills in who they are, where they work, and when you last talked, then shows your whole network so nobody quietly drops off.",
    numbers: [
      { n: "6,054", label: "people in one live network" },
      { n: "3", label: "platforms from one codebase" },
      { n: "36", label: "backend edge functions" },
    ],
    name: "Necto",
    kind: "Product",
    line: "Relationship CRM that fills in every contact you scan and maps your network.",
    stack: "React, Capacitor, Supabase, Claude, Stripe",
    body: [
      "Necto turns a scanned business card or a LinkedIn export into a contact record that fills itself in, then draws your network as a graph that cools as you fall out of touch. I rebuilt it from scratch as v2 and wrote all of the code: one React codebase shipped to iOS, Android and the web through Capacitor, on Supabase Postgres with row-level security on every table.",
      "Enrichment runs Claude Haiku first and escalates to Sonnet only when it needs to. Every field stores its own source, confidence and timestamp, so any value on a profile can be traced to where it came from. The v2 schema had to land on the same live database v1's paying subscribers were using.",
    ],
    specs: [
      { k: "Platforms", v: "iOS, Android, web from one React + Vite codebase" },
      { k: "Backend", v: "Supabase Postgres with RLS, 36 edge functions, 114 migrations" },
      { k: "AI", v: "Claude Haiku with Sonnet escalation; semantic search over notes" },
      { k: "Integrations", v: "Stripe, Granola meeting sync, wallet passes, an MCP server" },
      { k: "Tests", v: "83 test and smoke-test files" },
      { k: "Role", v: "Sole engineer on v2; co-founded with Pranav Jajapur" },
    ],
    shots: [s("/work/necto-graph.jpg", "Necto network graph grouping a 6,054-person network into company clusters.", 1510, 812, "The network view: 6,054 people grouped by company, sized by connection count.")],
    live: "https://trynecto.com",
    note: "Repo private",
  },
  {
    id: "gratiture",
    plainLine: "Ranks job candidates for recruiters and shows why each one ranked there.",
    plainBody: [
      "Recruiters at a staffing firm used to read every resume by hand for every job. Now job requests arrive by email and turn into clean job posts automatically, and every candidate gets a score out of 100 for every open job.",
      "The score is fully explained: how much came from skills, experience, location and so on, with the exact resume line behind each point. Nobody is put forward until a recruiter approves them. It's in production with the firm's recruiting team.",
    ],
    plain: "A staffing firm's recruiters get a ranked shortlist for every open job and can see exactly why each candidate ranked where they did, instead of reading every resume by hand.",
    numbers: [
      { n: "300", label: "resumes screened in one pass" },
      { n: "0\u2013100", label: "match score, split into 5 parts" },
      { n: "160", label: "automated test files" },
    ],
    name: "Gratiture Staffing CRM",
    kind: "Client",
    line: "Recruiting CRM in production at a staffing firm, with explainable candidate matching.",
    stack: "Next.js 16, Supabase, Docker runner, Gmail API",
    body: [
      "Vendor job alerts reach Gratiture by email. The CRM reads the watched Gmail mailboxes, turns each vendor email into a clean posting, and keeps requirements, candidates and submissions in one place, with recruiter, lead and admin roles enforced in Postgres row-level security.",
      "Every candidate is scored 0 to 100 against every open role by rules in code, not AI: skills 50, role 15, experience 15, location 10, eligibility 10, each with its full breakdown, and nothing counts as a match until a person approves it. AI runs only when a recruiter asks, on their own subscription, inside a per-user sandbox on a separate runner. The resume formatter checks every output line against the original and flags anything it can't find.",
    ],
    specs: [
      { k: "Web", v: "Next.js 16, React 19, TypeScript, server actions" },
      { k: "Data", v: "Supabase Postgres 17 with RLS, Auth, Storage, Realtime" },
      { k: "Runner", v: "Docker job worker, per-user AI sandboxes, Gmail poller, OCR" },
      { k: "Matching", v: "Deterministic 0 to 100 score, human approval required" },
      { k: "Bulk", v: "Screens up to 300 resumes against one requirement" },
      { k: "Tests", v: "133 Vitest files, 20 pgTAP files, 7 Playwright specs" },
      { k: "Status", v: "v0.7.0, in production with the Gratiture recruiting team" },
    ],
    shots: [
      s("/gratiture/match-score.jpg", "Match score card at 100 of 100 with every part of the score broken down.", 1600, 1000, "Match score: every point traced to a line in the resume."),
      s("/gratiture/pipeline.jpg", "Pipeline page with open requirements, blockers, hygiene list and daily targets.", 1600, 1000, "Pipeline: submission targets, blockers, and a hygiene list for leads."),
      s("/gratiture/resume-check.jpg", "Formatted resume review flagging one line that is not in the original.", 1600, 1000, "Resume formatter: a line not in the original is flagged before download."),
      s("/gratiture/jd-generator.jpg", "JD generator draft built from a job email and call notes.", 1600, 1000, "JD generator: mixed sources in, one standard posting out."),
      s("/gratiture/job-inbox.jpg", "Job Inbox listing vendor job alerts waiting to be processed.", 1600, 622, "Job Inbox: vendor alerts captured from the watched mailboxes."),
    ],
    note: "Client work. App and repo private; screenshots use seeded test data",
  },
  {
    id: "lead-desk",
    plainLine: "Gets insurance leads to the right agent fast, and tracks every call.",
    plainBody: [
      "When someone fills out a quote form from a Facebook or Instagram ad, the lead goes straight to an available licensed agent and a five-minute timer starts, so the call happens while the person is still interested.",
      "If nobody picks up, it schedules a retry. If they pick up, the agent logs the quote, the follow-up, or the sale. If someone says STOP, the number is blocked, and the agency keeps a record of exactly what each person agreed to.",
    ],
    plain: "When someone asks for a life-insurance quote, the right licensed agent gets the lead and a clock starts, so the call happens in minutes instead of whenever someone checks the inbox.",
    numbers: [
      { n: "5 min", label: "target from form to first call" },
      { n: "1", label: "landing page, form built in" },
      { n: "0", label: "leads called after a STOP" },
    ],
    name: "Lead Desk",
    kind: "Client",
    line: "Call-queue CRM that routes ad leads to licensed agents against a five-minute clock.",
    stack: "HTML, CSS, JavaScript",
    body: [
      "A life-insurance agency runs Facebook and Instagram lead ads. My partner runs the campaigns; I build everything after someone fills out the form. The form sits on the landing page under the video, so there's no second page to drop off on.",
      "Every new lead lands on a call board with a live clock against a five-minute target, hot leads first. The CRM routes it to the licensed agent on shift with the fewest open leads. No answer sets a timed retry; a pickup moves to a quote, a booked follow-up, or a sale. A STOP blocks the number, and each lead's consent wording, timestamp and phone number are saved with the record.",
    ],
    specs: [
      { k: "Lead source", v: "Meta and Instagram lead ads into an on-page form" },
      { k: "Routing", v: "Licensed agent on shift with the fewest open leads" },
      { k: "Call flow", v: "No answer sets a timed retry; pickup goes to quote or sale" },
      { k: "Views", v: "Call board, pipeline, calendar, ads cost per lead, team" },
      { k: "Compliance", v: "STOP blocks the number; consent record kept per lead" },
    ],
    shots: [s("/work/lead-desk-queue.jpg", "Lead Desk call queue with the wait ruler against a five-minute target.", 1510, 768, "The queue before the first lead: a wait ruler against the five-minute target.")],
    live: "https://claude.ai/artifact/EXik9bnYdR2CgxyorE4SJh",
    note: "Demo for a client; repo private",
  },
  {
    id: "ihop",
    plainLine: "Shows restaurant managers which stores need help today, out of ~120.",
    plainBody: [
      "Area managers for a group of about 120 restaurants used to check every store's numbers each morning. Now one screen lists the handful that missed their sales or staffing targets, with the reasons alongside, including the weather and how the same day went last year.",
      "A short summary is ready each morning, and managers fill in a weekly forecast that rolls up to their region. The data comes in from the restaurant systems' own reports, so nobody has to share vendor passwords.",
    ],
    plain: "Instead of checking 120 restaurants every morning, managers open one screen that lists the few stores missing their sales or labor targets, with the numbers that explain why.",
    numbers: [
      { n: "~120", label: "restaurants in one view" },
      { n: "15%", label: "lowest performers flagged daily" },
      { n: "4", label: "access levels, exec to store" },
    ],
    name: "IHOP Operations Dashboard",
    kind: "Client",
    line: "Sales and labor dashboard for a ~120-restaurant group that shows where to look first.",
    stack: "React, Node.js, built-in SQLite",
    body: [
      "Built to a client brief for a roughly 120-restaurant organization. It replaces a manual daily review of every restaurant with a prioritized hotspots view: the bottom 15% on sales and labor exceptions, rolled up by region, area and store, each with weather and prior-year context.",
      "A morning summary is generated after the prior day's data lands, and area managers reconcile a weekly forecast form that rolls up to region. Data arrives from Rosnet and Merchant Centric STARS through a reports mailbox or a watched folder. It never logs in to vendor sites or stores vendor passwords.",
    ],
    specs: [
      { k: "Screens", v: "Overview, hotspots, regions, restaurant, daily summary, forecast" },
      { k: "Data", v: "Rosnet and STARS via reports mailbox or watched folder" },
      { k: "Storage", v: "Node's built-in SQLite; no database to install" },
      { k: "Access", v: "Executive, region, area and store sign-ins" },
    ],
    shots: [
      s("/work/ihop-hotspots.jpg", "Hotspots view listing restaurants with sales and labor misses and weather context.", 1510, 850, "Hotspots: every flag shown with its supporting numbers and weather."),
      s("/work/ihop-overview.jpg", "Company overview with sales vs forecast, labor vs allowable, and guest ratings.", 1510, 850, "Overview: today live, yesterday final, period to date."),
    ],
    repo: "https://github.com/krishngohel/ihop-analytics",
    note: "Screenshots use the repo's generated demo data",
  },
  {
    id: "paper-desk",
    plainLine: "An AI trades a practice account, with rules it physically can't break.",
    plainBody: [
      "Would you trust an AI with your money? Paper Desk is how to find out safely. An AI trades a practice account all day with fake money, writing down why it made every trade and where it would get out.",
      "A separate set of hard rules sits between the AI and the broker and blocks anything risky, like betting on prices falling or borrowing to trade, no matter what the AI wants. Every decision is logged and graded weekly, so there's an honest track record before any real money is involved.",
    ],
    plain: "An AI trades a practice account all day with a written reason for every trade, while hard-coded rules block the bets it is never allowed to make. The record shows whether its judgment holds up before real money is involved.",
    numbers: [
      { n: "$0", label: "real money at risk" },
      { n: "15 s", label: "between every stop-loss check" },
      { n: "100%", label: "of orders pass a rule gate" },
    ],
    name: "Paper Desk",
    kind: "AI / ML",
    line: "Autonomous paper-trading agent: Claude decides, a hard-coded gate can say no.",
    stack: "Python, Claude, Alpaca, Netlify Functions",
    body: [
      "An autonomous, long-only paper trading agent built as a training ground: the goal is a fully labeled record of decisions and outcomes before real capital is ever discussed. A relay of Claude sessions runs from open to close, screening the market and entering with a written thesis, a numeric stop and target, and a sizing rationale.",
      "Every order passes through a mandate gate, forked from Vibe-Trading, that structurally refuses short selling, leverage, and anything outside US equities and ETFs, whatever the model decides. A 15-second watcher enforces every stop, the kill switch is a file, and every action lands in a hash-chained audit ledger.",
    ],
    specs: [
      { k: "Decisions", v: "Relay of Claude sessions, market open to close" },
      { k: "Guardrail", v: "Mandate gate: long-only, no leverage, US equities and ETFs" },
      { k: "Execution", v: "Alpaca paper; 15-second stop watcher" },
      { k: "Audit", v: "Hash-chained ledger; weekly review scores each trade" },
    ],
    shots: [s("/work/paper-desk-dashboard.jpg", "Paper Desk dashboard: equity versus VOO, open positions and closed trades.", 1510, 812, "Live dashboard: equity against a VOO buy-and-hold benchmark.")],
    live: "https://paper-desk-training.netlify.app",
    repo: "https://github.com/krishngohel/paper-desk",
  },
  {
    id: "trafficlab",
    plainLine: "Teaches traffic lights to adapt to traffic, then shows it in 3D.",
    plainBody: [
      "Most traffic lights run on a fixed timer, even when one direction is empty. TrafficLab is a virtual city where AI controllers learn to time the lights based on the cars actually waiting.",
      "Each AI is tested against the methods traffic engineers already use, and every run can be replayed in 3D in a browser. On one simulated rush hour, the AI cut each driver's delay by 18% compared with a fixed timer.",
    ],
    plain: "Teaches traffic lights to react to the cars actually waiting instead of running a fixed timer, then replays the result in 3D so you can watch the difference.",
    numbers: [
      { n: "18%", label: "less delay per driver on a test rush hour" },
      { n: "70k", label: "vehicle-steps simulated per second" },
      { n: "2,000", label: "cars rendered at 60 fps" },
    ],
    name: "TrafficLab",
    kind: "AI / ML",
    line: "Multi-agent RL for traffic signals on a microsimulator I wrote, with a WebGL replay.",
    stack: "Python, PyTorch, Next.js, three.js",
    body: [
      "A research platform for multi-agent traffic signal control. The simulator is a deterministic IDM + MOBIL microsimulator with protected lefts, yellow and all-red clearance, and Poisson rush-hour demand, byte-identical under a seed at about 70,000 vehicle-steps per second on one core.",
      "On top sits a PettingZoo-style environment with hand-written DQN, IPPO and GAT-PPO trainers, compared against Webster, actuated and max-pressure baselines. A WebGL visualizer replays any run at 60 fps with 2,000 vehicles. On one rush-hour seed, the learned DQN cut delay per driver 18% against a fixed 20-second timer.",
    ],
    specs: [
      { k: "Simulator", v: "IDM + MOBIL, ~70k vehicle-steps/s, deterministic" },
      { k: "Learning", v: "DQN, IPPO, GAT-PPO, written by hand" },
      { k: "Baselines", v: "Webster, actuated, max-pressure" },
      { k: "Viz", v: "Instanced WebGL, 60 fps at 2,000 vehicles" },
    ],
    shots: [
      s("/work/trafficlab-city.jpg", "TrafficLab WebGL replay of a grid of intersections with queued vehicles.", 1600, 900, "A rush-hour replay in the WebGL visualizer."),
      s("/work/trafficlab-night.jpg", "The same visualizer in night mode.", 1600, 900, "Night lighting, same trajectory file."),
    ],
    repo: "https://github.com/krishngohel/trafficlab",
  },
  {
    id: "traffic-rl",
    plainLine: "Tells a city whether retiming a light would cut wait times.",
    plainBody: [
      "Cities already count cars at intersections. traffic-rl takes those counts and answers a simple question: would a different light schedule make people wait less, and by how much?",
      "It tests the usual approaches and an AI side by side on identical traffic, 20 times over, and reports the result honestly even when the AI loses. It focuses on the unluckiest drivers, the ones stuck through several red lights, not just the average.",
    ],
    plain: "Tells a city whether retiming a traffic light would cut waits, using the traffic counts it already collects, and says how sure it is.",
    numbers: [
      { n: "40,000\u00d7", label: "faster than real time" },
      { n: "20", label: "matched runs behind every result" },
      { n: "p95", label: "wait: judged on the unluckiest drivers" },
    ],
    name: "traffic-rl",
    kind: "AI / ML",
    line: "Signal retiming study in a box: honest simulation, baselines, RL, and an optimizer.",
    stack: "Python",
    body: [
      "Can smarter light timing cut how long people wait? A four-way intersection and corridor simulator, with pedestrians, runs about 40,000 times faster than real time, so a year of traffic takes minutes.",
      "Classical controllers and an RL controller compete on the same traffic: each test runs 20 times, and each run uses the same arrivals for every strategy. The scoreboard is published even when the AI loses. traffic-rl-optimize takes the traffic counts cities already collect and returns a better timing plan with error bars, judged on the p95 wait of the unluckiest drivers.",
    ],
    specs: [
      { k: "Speed", v: "~40,000x real time" },
      { k: "Method", v: "20 paired runs per test, same arrivals for every strategy" },
      { k: "Metric", v: "p95 wait, with 95% confidence intervals" },
      { k: "Tool", v: "traffic-rl-optimize: counts in, timing plan out" },
    ],
    shots: [s("/work/traffic-rl-p95.jpg", "Bar charts of p95 wait by controller across traffic scenarios with confidence intervals.", 1400, 576, "p95 wait by controller, mean of 20 paired runs with 95% CIs.")],
    repo: "https://github.com/krishngohel/traffic-rl",
  },
  {
    id: "cleanroom",
    plainLine: "A private ChatGPT for teams that can't put their data in the cloud.",
    plainBody: [
      "Hospitals, banks and law firms often can't paste documents into ChatGPT because the data would leave the building. Cleanroom gives them the same kind of assistant running on their own servers.",
      "Staff can chat with it, organize work into projects and share prompts, while every action is recorded in a log that can't be edited. It can also improve its model from several sites' data without that data ever being pooled in one place.",
    ],
    plain: "A ChatGPT-style assistant that a hospital, bank or law firm can run on its own servers, so sensitive documents never leave the building.",
    numbers: [
      { n: "0", label: "bytes of data sent to the cloud" },
      { n: "63", label: "backend tests" },
      { n: "Local", label: "Llama models, no outside API" },
    ],
    name: "Cleanroom AI",
    kind: "AI / ML",
    line: "On-premise AI workspace for teams that can't send data to the cloud.",
    stack: "Python, FastAPI, React, PostgreSQL, Redis, Ollama",
    body: [
      "A compliance-grade, on-premise Claude-style platform: chat, projects, a sandboxed files workspace, a prompt library, admin insights and an immutable audit log. No data leaves the network.",
      "Federated learning runs with differential privacy (Opacus DP-SGD, X25519 secure aggregation), and chat streams through an OpenAI-compatible API on Ollama. Async FastAPI with JWT and Redis auth, a React 18 dashboard, Docker Compose, and Prometheus with Grafana.",
    ],
    specs: [
      { k: "Privacy", v: "DP-SGD federated learning, secure aggregation" },
      { k: "Models", v: "Local Llama models via Ollama, OpenAI-compatible API" },
      { k: "Ops", v: "Docker Compose, Prometheus, Grafana, audit log" },
      { k: "Tests", v: "63 backend tests" },
    ],
    shots: [s("/work/cleanroom-home.jpg", "Cleanroom AI landing page with a private chat mockup.", 1510, 850)],
    repo: "https://github.com/krishngohel/cleanroom",
  },
  {
    id: "library-claim",
    plainLine: "Film your bookshelves and get a priced insurance claim.",
    plainBody: [
      "After a fire or flood, insurers want a list of everything you lost, with prices. With this agent you walk around the room filming on your phone while it talks to you, telling you to slow down or get closer.",
      "When you're done, it hands back a claim packet: every book identified from its spine and priced, other items priced, and the room's size. A sweep costs two to three cents in AI fees, or nothing on Google's free tier.",
    ],
    plain: "After a fire or flood, film your bookshelves while the agent talks you through it, and get an itemized insurance claim with every book identified and priced.",
    numbers: [
      { n: "3 min", label: "walk-through of one room" },
      { n: "$0.02\u20130.03", label: "model cost per sweep" },
      { n: "$0", label: "on the free Gemini tier" },
    ],
    name: "Library Claim Agent",
    kind: "AI / ML",
    line: "Voice and camera agent that inventories a home library in one walk around the room.",
    stack: "Python, FastAPI, Gemini or Claude",
    body: [
      "You talk to it while filming on your phone. It tells you when to slow down or step closer and fills in the inventory as you go. When you finish, it produces a claim packet: every book read from its spine, measured and priced; every other item priced; and the room's floor and wall area.",
      "It runs from a laptop and works in iPhone Safari or Android Chrome through a tunnel with no app install, on either a free Google AI Studio key or an Anthropic key. The repo ships ground truth, results against each pass bar, a failure log, and cost and latency per stage.",
    ],
    specs: [
      { k: "Input", v: "Live phone video and voice" },
      { k: "Output", v: "Claim packet: JSON, HTML report, referenced frames" },
      { k: "Models", v: "Google AI Studio or Anthropic, picked from the keys" },
      { k: "Evaluation", v: "Hand-collected ground truth, failure log, cost per sweep" },
    ],
    shots: [],
    repo: "https://github.com/krishngohel/library-claim-agent",
  },
  {
    id: "clarity",
    plainLine: "Spots when a politician dodges the question.",
    plainBody: [
      "In interviews, politicians often answer a different question than the one they were asked. This model reads a question and the answer and decides whether it was a clear answer, a half-answer, or a dodge.",
      "It learned from 2,758 real interview exchanges, and 15 versions of the model vote on each answer to make the call more reliable. It was built for a university machine-learning competition.",
    ],
    plain: "Detects when a politician answers a question and when they dodge it, trained on real interview transcripts.",
    numbers: [
      { n: "2,758", label: "labeled question\u2013answer pairs" },
      { n: "15", label: "models voting together" },
      { n: "74", label: "unit tests" },
    ],
    name: "Clarity Classifier",
    kind: "AI / ML",
    line: "15-model DeBERTa-v3 ensemble that tells clear answers from non-answers.",
    stack: "Python, PyTorch, Hugging Face",
    body: [
      "Three-class classification of 2,758 political interview Q&A pairs into clear reply, ambivalent, or clear non-reply, under heavy label imbalance, for a UTSA Kaggle competition.",
      "A DeBERTa-v3 ensemble with a multi-pool head: 5-fold CV times 3 seeds for 15 models, with focal loss, LLRD, AWP, R-Drop, checkpoint souping and OOF-weighted blending, plus confidence and entropy-gated pseudo-labeling.",
    ],
    specs: [
      { k: "Data", v: "2,758 labeled Q&A pairs, 3 classes" },
      { k: "Models", v: "DeBERTa-v3, 5 folds x 3 seeds = 15" },
      { k: "Training", v: "Focal loss, LLRD, AWP, R-Drop, souping" },
      { k: "Tests", v: "74 unit tests" },
    ],
    shots: [],
    repo: "https://github.com/krishngohel/clarity-classifier",
  },
  {
    id: "rt-mbas",
    plainLine: "Reads focus and stress from a webcam, live, on any laptop.",
    plainBody: [
      "This watches a webcam and tells, moment by moment, whether someone looks focused, distracted or stressed, based on cues like blinking, hand speed and overall movement.",
      "It runs entirely on an ordinary laptop with no internet connection and no special graphics card, so the video never goes anywhere.",
    ],
    plain: "Watches a webcam and tells in real time whether a person looks focused, distracted, or stressed, without sending video anywhere.",
    numbers: [
      { n: "15", label: "body-language signals per frame" },
      { n: "10", label: "frames voted on per answer" },
      { n: "0", label: "GPUs or cloud calls needed" },
    ],
    name: "RT-MBAS",
    kind: "AI / ML",
    line: "Reads focus, distraction and stress from a webcam in real time, on a CPU.",
    stack: "Python, OpenCV, MediaPipe, scikit-learn",
    body: [
      "MediaPipe extracts 15 behavioral features per frame, including eye aspect ratio, hand velocity and motion entropy, into a RandomForest. Ten-frame majority voting keeps predictions stable.",
      "A Streamlit dashboard shows feature importances and the confusion matrix. It runs fully local: no API keys, no cloud, no GPU.",
    ],
    specs: [
      { k: "Features", v: "15 per frame from MediaPipe landmarks" },
      { k: "Model", v: "RandomForest with 10-frame majority vote" },
      { k: "Runs on", v: "CPU, fully local" },
    ],
    shots: [s("/work/rt-mbas-confusion.jpg", "Confusion matrix for the demeanor classifier across seven states.", 960, 720, "Confusion matrix from the analysis notebook.")],
    repo: "https://github.com/krishngohel/rt-mbas",
  },
  {
    id: "calisthenics",
    plainLine: "Film your workout and get coached on your form.",
    plainBody: [
      "Bodyweight skills like planches and handstands are hard to judge on your own. Upload or record a video and the app times each hold and scores your form as the clip plays, with tips on what to fix.",
      "It knows 29 skills and can show a ghost outline of the right position to copy. The video is analyzed on your own device and never uploaded.",
    ],
    plain: "Film your workout and it times your holds and scores your form like a coach would, with the video never leaving your phone or laptop.",
    numbers: [
      { n: "29", label: "exercises it can judge" },
      { n: "0", label: "videos uploaded" },
      { n: "Live", label: "feedback as the clip plays" },
    ],
    name: "Calisthenics Form Tracker",
    kind: "AI / ML",
    line: "Scores form and times holds from a training video, in the browser.",
    stack: "Next.js, TensorFlow.js, MediaPipe, Supabase",
    body: [
      "An in-browser calisthenics coach: hold timers, form scores and coaching cues update live as the clip plays, and the video never leaves the device.",
      "MoveNet or MediaPipe runs in a Web Worker; per-skill geometry rules score form and drive a hold start and stop state machine across 29 skills, with a ghost-pose learn mode and a Supabase session history.",
    ],
    specs: [
      { k: "Pose", v: "MoveNet or MediaPipe in a Web Worker" },
      { k: "Skills", v: "29, each with its own geometry rules" },
      { k: "Privacy", v: "Video stays on the device" },
    ],
    shots: [],
    repo: "https://github.com/krishngohel/calisthenics-form-tracker",
  },
  {
    id: "pressed",
    plainLine: "Your whole career in one place, and a tailored resume for each job.",
    plainBody: [
      "Job hunting means rewriting your resume for every application and losing track of emails. Pressed keeps everything you've done in one place, then writes a resume matched to each job description and turns it into a polished PDF you can edit by clicking any line.",
      "It can also scan your Gmail for interview requests, offers and deadlines and put them on a board so nothing slips. The basics are free; Pro is $15 a month.",
    ],
    plain: "Keeps your whole career in one place, writes a resume tailored to each job you apply for, and reads your inbox so interview invites and deadlines don't slip.",
    numbers: [
      { n: "$15", label: "a month for Pro" },
      { n: "$299", label: "one-time lifetime plan" },
      { n: "1", label: "vault reused for every resume" },
    ],
    name: "Pressed",
    kind: "Product",
    line: "Career vault and AI resume builder with in-browser LaTeX and a Gmail-fed tracker.",
    stack: "React, Express, Supabase, Stripe, Claude, WASM",
    body: [
      "One vault for everything you've done. Claude picks the work that fits a role, rewrites the bullets, and compiles a typeset PDF in the browser through WASM. Click any line on the preview to edit it in place.",
      "A Gmail connector, with AES-256-GCM encrypted tokens, scans recruiter threads, classifies them as interview, offer, rejection or follow-up, and lines them up on a kanban tracker. Stripe runs three paid tiers.",
    ],
    specs: [
      { k: "Resume", v: "LaTeX compiled in-browser via WASM, click-to-edit" },
      { k: "Inbox", v: "Gmail OAuth, encrypted tokens, email classification" },
      { k: "Billing", v: "Stripe monthly, annual and lifetime" },
    ],
    shots: [s("/work/pressed-home.jpg", "Pressed landing page: Your career, polished.", 1510, 812)],
    live: "https://pressedjobhelp.netlify.app",
    repo: "https://github.com/krishngohel/pressed",
  },
  {
    id: "studywork",
    plainLine: "A distraction-free practice app for middle schoolers, no internet needed.",
    plainBody: [
      "Studywork gives students in grades 6 to 8 practice in math, reading, science and social studies, matched to what Texas schools teach.",
      "It works without internet, so there are no ads or other tabs to wander into. Each child's progress is kept separately and parents get clear controls. It installs on Windows and Mac.",
    ],
    plain: "A practice app for middle schoolers that works with no internet, so there's nothing to get distracted by, and parents can see each child's progress.",
    numbers: [
      { n: "6\u20138", label: "grades covered" },
      { n: "4", label: "core subjects" },
      { n: "0", label: "internet needed" },
    ],
    name: "Studywork",
    kind: "Product",
    line: "Offline-first TEKS practice for grades 6 to 8, with parent controls.",
    stack: "TypeScript desktop app",
    body: [
      "A focused desktop learning app for Math, English Language Arts and Reading, Science, and Social Studies, aligned to Texas TEKS for grades 6 to 8.",
      "It works offline, keeps each student's progress separate, and gives parents clear controls, with optional cloud sync. Installers ship for Windows and universal macOS.",
    ],
    specs: [
      { k: "Subjects", v: "Math, ELAR, Science, Social Studies" },
      { k: "Mode", v: "Offline-first, optional cloud sync" },
      { k: "Platforms", v: "Windows and universal macOS installers" },
    ],
    shots: [s("/work/studywork-home.jpg", "Studywork download page with a progress dashboard mockup.", 1510, 850)],
    repo: "https://github.com/krishngohel/Studywork-Website",
    note: "App repo private; website repo public",
  },
  {
    id: "futureproof",
    plainLine: "Teaches kids how AI works, with coding right in the browser.",
    plainBody: [
      "Futureproof is a course that teaches K-12 students how AI works, with lessons, quizzes and hands-on coding in the browser, no installs required.",
      "The first module is free and the full course is $5 a month. Students' projects and progress are saved to their account.",
    ],
    plain: "Teaches K-12 students how AI works, with lessons, quizzes, and a code editor that runs in the browser.",
    numbers: [
      { n: "5", label: "modules, the first one free" },
      { n: "6", label: "languages in the editor" },
      { n: "$5", label: "a month for the full course" },
    ],
    name: "Futureproof",
    kind: "Product",
    line: "K-12 AI literacy platform with a paywall and a multi-language code editor.",
    stack: "Next.js, Supabase, Stripe, Piston API",
    body: [
      "Module 1 is free; modules 2 to 5 sit behind a $5 monthly Stripe subscription with webhooks.",
      "The in-browser IDE runs JavaScript and HTML natively, and Python, Java, Go and Rust through the Piston API, with an HTML game preview. Supabase auth and Postgres with row-level security store each project's files, quizzes and progress.",
    ],
    specs: [
      { k: "Billing", v: "Stripe subscriptions and webhooks" },
      { k: "IDE", v: "JS and HTML native; Python, Java, Go, Rust via Piston" },
      { k: "Data", v: "Supabase with row-level security" },
    ],
    shots: [],
    repo: "https://github.com/krishngohel/futureproof",
  },
  {
    id: "scrubbed",
    plainLine: "Med school applicants enter their story once and get essay outlines.",
    plainBody: [
      "Applying to medical school means writing dozens of school-specific essays. Scrubbed has applicants enter their activities, hours and experiences once.",
      "It then builds an outline for each school's essay prompts from what the applicant actually did, instead of generic advice.",
    ],
    plain: "Medical school applicants enter their experiences once, then get essay outlines for each school built from what they actually did.",
    numbers: [
      { n: "1", label: "record for every application" },
      { n: "Live", label: "on Netlify" },
      { n: "JWT", label: "secured accounts" },
    ],
    name: "Scrubbed",
    kind: "Product",
    line: "Pre-med application record that builds secondary-essay outlines from your real history.",
    stack: "Node.js, Express, SQLite, JWT",
    body: [
      "Applicants enter activities, hours, letters and essays once. Scrubbed gives every piece of the application a home and builds school-specific secondary outlines from that record instead of guessing.",
      "A normalized SQLite schema behind a Node and Express REST API with JWT authentication.",
    ],
    specs: [
      { k: "API", v: "Node.js, Express, REST" },
      { k: "Data", v: "Normalized SQLite schema" },
      { k: "Auth", v: "JWT" },
    ],
    shots: [s("/work/scrubbed-home.jpg", "Scrubbed landing page: One record. Every secondary.", 1510, 812)],
    live: "https://getscrubbed.netlify.app",
    repo: "https://github.com/krishngohel/Scrubbed",
  },
  {
    id: "echo",
    plainLine: "Lets your AI assistant browse the web on your own computer.",
    plainBody: [
      "AI assistants like Claude or ChatGPT usually can't use a real browser, or they use one in the cloud that isn't signed in to anything. Echo is a browser on your computer that your assistant can control directly.",
      "You can watch it click and type in the same window you see. It works with seven or more AI apps and installs on Windows, Mac and Linux.",
    ],
    plain: "Lets any AI assistant use a real web browser on your own computer, so it can search and click through sites with your logins instead of a cloud robot.",
    numbers: [
      { n: "7+", label: "AI apps it connects to" },
      { n: "4", label: "installers: Windows x64 and ARM, Mac, Linux" },
      { n: "0", label: "cloud browsers involved" },
    ],
    name: "Echo",
    kind: "Tools",
    line: "Desktop browser with a built-in MCP server, so any AI client can drive it.",
    stack: "TypeScript, Electron",
    body: [
      "Echo is a desktop browser that exposes an MCP server, so Cursor, Claude Desktop, ChatGPT and Codex, Continue, Cline, Windsurf, VS Code and other clients can drive it with your existing subscription.",
      "There is no model API and no cloud Chromium: the window you see is the one the assistant controls. It connects to each client from its settings screen, guards the server with a bearer token, and ships installers for Windows, macOS and Linux.",
    ],
    specs: [
      { k: "Protocol", v: "MCP over local HTTP with a bearer token" },
      { k: "Clients", v: "Cursor, Claude, ChatGPT/Codex, Cline, VS Code and more" },
      { k: "Platforms", v: "Windows x64 and ARM, macOS universal, Linux" },
    ],
    shots: [],
    repo: "https://github.com/krishngohel/local-browser",
  },
  {
    id: "airdesk",
    plainLine: "Control your computer with hand gestures and your voice.",
    plainBody: [
      "AirDesk turns a webcam into a mouse: point to move the cursor, pinch to click, pinch and hold to drag, and flick a window to snap it to the side. Speak and it types.",
      "Everything is processed on the PC itself, so nothing you say or do is sent anywhere, and your regular mouse and keyboard keep working.",
    ],
    plain: "Control your PC with hand gestures and your voice through a webcam and microphone, with everything processed on the PC itself.",
    numbers: [
      { n: "8+", label: "gestures: click, drag, scroll, snap, volume" },
      { n: "0", label: "data sent off the machine" },
      { n: "1", label: "webcam is all it needs" },
    ],
    name: "AirDesk",
    kind: "Tools",
    line: "Hand gestures replace the mouse and Whisper replaces the keyboard, all on-device.",
    stack: "Python, MediaPipe, Whisper",
    body: [
      "Fully local gesture and voice control for Windows. A webcam with MediaPipe hand tracking moves the cursor from your index fingertip; Whisper large-v3-turbo on the GPU takes dictation. Nothing leaves the machine.",
      "Pinches click, drag and right-click; a held pinch grabs a window and a fling snaps it to an edge; two fingers scroll; a ring pinch sets volume. A click-through HUD shows each action as it happens, and the physical mouse and keyboard always keep working.",
    ],
    specs: [
      { k: "Pointer", v: "MediaPipe hand tracking, index fingertip" },
      { k: "Voice", v: "Whisper large-v3-turbo on the GPU" },
      { k: "Gestures", v: "Click, drag, right-click, scroll, window snap, volume" },
    ],
    shots: [],
    repo: "https://github.com/krishngohel/AirDesk",
  },
  {
    id: "gotham",
    plainLine: "A comic-book action game that runs in your browser, no download.",
    plainBody: [
      "A superhero action game you play in a browser tab: glide over a rainy city at night, fight through three districts, and stop a villain's plan, with twelve hidden trophies to find.",
      "The city, the comic-style story pages, the music and the sound effects are all generated by code rather than drawn or recorded by hand.",
    ],
    plain: "A comic-book action game that runs in a web browser with no install, where the city, music and sound are all generated by code.",
    numbers: [
      { n: "3", label: "city districts to fight through" },
      { n: "12", label: "hidden trophies" },
      { n: "0", label: "installs: it runs in a browser tab" },
    ],
    name: "Gotham: The Long Night",
    kind: "Games",
    line: "Comic-book open-city brawler in the browser, with every scene and sound made in code.",
    stack: "JavaScript, three.js, Vite",
    body: [
      "Glide over a rainy city, fight through three districts, take apart a midnight plot and finish on a clock tower, with twelve hidden trophies along the way.",
      "The city, the comic panels, the music and the sound effects are all generated in code; the only downloaded art is a CC0 character and animation set. Every key can be rebound and a gamepad works.",
    ],
    specs: [
      { k: "Engine", v: "three.js" },
      { k: "Assets", v: "Procedural city, music and SFX; CC0 characters" },
      { k: "Input", v: "Mouse and keyboard or gamepad, fully rebindable" },
    ],
    shots: [s("/work/gotham-title.jpg", "Title screen over a night city skyline.", 1510, 740)],
    repo: "https://github.com/krishngohel/gotham",
    note: "Unofficial fan game",
  },
  {
    id: "web-of-ink",
    plainLine: "A web-swinging game where every swing follows real physics.",
    plainBody: [
      "A comic-style fan game in the browser where you swing between buildings. Aim at a building and you swing from exactly that point; aim at nothing and you fall.",
      "It has a full story with thirteen boss fights, nineteen playable characters, and online play for up to five friends.",
    ],
    plain: "A comic-style web-swinging game in the browser where every swing is real physics: you hang from the exact point you aimed at.",
    numbers: [
      { n: "19", label: "playable characters" },
      { n: "13", label: "boss fights" },
      { n: "5", label: "players online together" },
    ],
    name: "Web of Ink",
    kind: "Games",
    line: "Unofficial comic-style superhero fan game with real rope-physics swinging.",
    stack: "JavaScript, three.js, Node server",
    body: [
      "A 3 by 2 km city drawn in ink, a story in four acts with thirteen bosses, nineteen playable characters, and five-player multiplayer.",
      "Swinging is real physics: put the crosshair on a building, hold swing, and you swing on a rope about that exact point. Let go to fly, aim the next web, and miss if you aim at nothing.",
    ],
    specs: [
      { k: "World", v: "3 x 2 km city, four acts, 13 bosses" },
      { k: "Players", v: "19 characters, 5-player multiplayer" },
      { k: "Physics", v: "Rope swing about the exact aimed point" },
    ],
    shots: [],
    repo: "https://github.com/krishngohel/spider-man-web-of-ink",
    note: "Unofficial fan game, never sold",
  },
];

export const profile = {
  name: "Krishn Gohel",
  title: "AI/ML engineer",
  place: "Frisco, Texas",
  email: "gohel.krishn@gmail.com",
  github: "https://github.com/krishngohel",
  linkedin: "https://www.linkedin.com/in/krishngohel",
  facts: [
    { k: "Education", v: "B.S. Computer Science, Data Science concentration, UTSA, May 2026" },
    { k: "Practice", v: "Webloom, sole developer since 2023, 50+ client projects" },
    { k: "Certified", v: "Alteryx Designer Core; all 13 Anthropic Academy courses" },
    { k: "Seeking", v: "AI/ML and software engineering roles" },
  ],
};
