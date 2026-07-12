"use client";

import type { ReactElement } from "react";
import type { Project } from "@/data/projects";

const hex: Record<string, string> = { orange: "#c2571f", purple: "#8a63d2", teal: "#1f8a7c" };

function Frame({ children }: { children: ReactElement }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ width: 520, height: 325, background: "linear-gradient(135deg,#fffaf2,#f4ecdd)" }}
    >
      {children}
    </div>
  );
}

/* ---------- Cleanroom AI — private chat platform ---------- */
function ChatScene(a: string): ReactElement {
  return (
    <div className="flex h-full w-full">
      <div className="flex w-16 flex-col items-center gap-3 border-r border-[#2a241c]/10 bg-[#f3ead9] py-4">
        <div className="h-6 w-6 rounded-md" style={{ background: a }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-2 w-8 rounded-full bg-[#2a241c]/15" />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-bold text-[#2a241c]">Cleanroom</span>
          <span className="flex items-center gap-1 rounded-full bg-[#1f8a7c]/15 px-2 py-0.5 text-[8px] font-semibold text-[#1f8a7c]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1f8a7c]" />on-prem
          </span>
        </div>
        <div className="kg-anim self-start rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[9px] text-[#2a241c] shadow-sm" style={{ animation: "kg-slide .5s ease both" }}>
          How do I deploy this privately?
        </div>
        <div className="kg-anim mt-2 max-w-[80%] self-end rounded-2xl rounded-tr-sm px-3 py-2 text-[9px] text-white" style={{ background: a, animation: "kg-slide .5s ease both", animationDelay: ".6s" }}>
          Spin up the Docker compose — nothing leaves the network.
        </div>
        <div className="kg-anim mt-2 self-start rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm" style={{ animation: "kg-slide .5s ease both", animationDelay: "1.2s" }}>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="kg-anim h-1.5 w-1.5 rounded-full bg-[#2a241c]/50" style={{ animation: "kg-dots 1.4s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Calisthenics Form Tracker — pose + form score ---------- */
function PoseScene(a: string): ReactElement {
  const joints = [[75, 60], [35, 100], [115, 100], [75, 130], [45, 175], [105, 175], [40, 220], [110, 220]];
  return (
    <div className="flex h-full w-full items-center gap-3 p-5">
      <svg width="150" height="245" viewBox="0 0 150 245">
        <g stroke={a} strokeWidth="3" strokeLinecap="round" fill="none">
          <line x1="75" y1="60" x2="75" y2="130" />
          <line x1="75" y1="75" x2="35" y2="100" />
          <line x1="75" y1="75" x2="115" y2="100" />
          <line x1="75" y1="130" x2="45" y2="175" />
          <line x1="75" y1="130" x2="105" y2="175" />
          <line x1="45" y1="175" x2="40" y2="220" />
          <line x1="105" y1="175" x2="110" y2="220" />
        </g>
        <circle cx="75" cy="45" r="14" fill="none" stroke={a} strokeWidth="3" />
        {joints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill={a} className="kg-anim" style={{ animation: "kg-dots 1.6s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
        ))}
      </svg>
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-[#6f6557]">Form score</div>
          <div className="font-display text-4xl font-bold" style={{ color: a }}>92%</div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#2a241c]/10">
          <div className="kg-anim h-full rounded-full" style={{ background: a, width: "92%", transformOrigin: "left", animation: "kg-grow 1.8s ease-out both" }} />
        </div>
        <div className="flex items-center gap-2 text-[#2a241c]">
          <span className="text-[9px] uppercase tracking-wider text-[#6f6557]">Hold</span>
          <span className="font-mono text-lg font-bold">0:14</span>
        </div>
        <span className="rounded-md bg-[#2a241c]/5 px-2 py-1 text-[8px] text-[#6f6557]">Keep shoulders depressed</span>
      </div>
    </div>
  );
}

/* ---------- RT-MBAS — webcam cognitive-state classifier ---------- */
function WebcamScene(a: string): ReactElement {
  const labels: [string, string][] = [["Focused", "#1f8a7c"], ["Distracted", "#c2571f"], ["Stressed", "#8a63d2"]];
  const marks = [[110, 80], [150, 80], [130, 100], [110, 120], [150, 120], [130, 130], [100, 95], [160, 95]];
  return (
    <div className="flex h-full w-full items-center gap-4 p-5">
      <div className="relative h-[200px] w-[260px] overflow-hidden rounded-lg border border-[#2a241c]/15 bg-[#0e0e0e]">
        <svg width="260" height="200" viewBox="0 0 260 200">
          <circle cx="130" cy="95" r="55" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
          {marks.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill={a} />
          ))}
          <path d="M110 120 Q130 135 150 120" stroke={a} strokeWidth="1.5" fill="none" />
        </svg>
        <div className="kg-anim absolute inset-x-0 top-0 h-[2px]" style={{ background: a, boxShadow: `0 0 8px ${a}`, animation: "kg-scan 2.4s ease-in-out infinite alternate" }} />
        <div className="absolute bottom-2 left-2 h-4 w-28">
          {labels.map(([t, c], i) => (
            <span key={t} className="kg-anim absolute bottom-0 left-0 whitespace-nowrap rounded px-2 py-0.5 text-[9px] font-bold text-white" style={{ background: c, animation: "kg-cyc 6s ease-in-out infinite", animationDelay: `${i * 2}s` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="text-[9px] uppercase tracking-wider text-[#6f6557]">15 features</div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex h-3 items-end gap-[3px]">
            {[0, 1, 2, 3, 4, 5].map((j) => (
              <span key={j} className="kg-anim w-[6px] rounded-sm" style={{ height: "100%", background: a, opacity: 0.45 + (j % 3) * 0.2, transformOrigin: "bottom", animation: "kg-bar 1.6s ease-in-out infinite", animationDelay: `${(i + j) * 0.12}s` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Pressed — AI resume + job kanban ---------- */
function ResumeScene(a: string): ReactElement {
  return (
    <div className="flex h-full w-full gap-4 p-5">
      <div className="flex h-full w-[150px] flex-col gap-2 rounded-md bg-white p-3 shadow-md">
        <div className="h-3 w-20 rounded" style={{ background: a }} />
        <div className="h-1.5 w-24 rounded bg-[#2a241c]/15" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="kg-anim h-1.5 rounded bg-[#2a241c]/10" style={{ width: `${90 - i * 8}%`, animation: "kg-slide .5s ease both", animationDelay: `${i * 0.18}s` }} />
        ))}
        <div className="mt-1 h-2 w-12 rounded" style={{ background: a, opacity: 0.6 }} />
        {[0, 1, 2].map((i) => (
          <div key={i} className="kg-anim h-1.5 rounded bg-[#2a241c]/10" style={{ width: `${80 - i * 12}%`, animation: "kg-slide .5s ease both", animationDelay: `${0.9 + i * 0.18}s` }} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="text-[9px] uppercase tracking-wider text-[#6f6557]">Job tracker</div>
        <div className="grid flex-1 grid-cols-3 gap-2">
          {["Applied", "Interview", "Offer"].map((col, c) => (
            <div key={col} className="flex flex-col gap-1.5 rounded bg-[#2a241c]/[0.04] p-1.5">
              <span className="text-[7px] font-bold uppercase text-[#6f6557]">{col}</span>
              {[0, 1].map((k) => (
                <div key={k} className="kg-anim rounded bg-white p-1.5 shadow-sm" style={{ animation: "kg-pop .5s ease both", animationDelay: `${(c * 2 + k) * 0.2}s` }}>
                  <div className="h-1 w-full rounded" style={{ background: c === 2 ? a : "rgba(42,36,28,0.15)" }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Futureproof — in-browser coding IDE ---------- */
function IdeScene(a: string): ReactElement {
  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[8px] text-[#6f6557]">main.py</span>
      </div>
      <div className="flex-1 rounded-md bg-[#1c1813] p-3 font-mono text-[10px] leading-relaxed">
        <div><span className="text-[#8a63d2]">def </span><span className="text-[#febc2e]">greet</span><span className="text-white/80">():</span></div>
        <div className="pl-4"><span className="text-[#8a63d2]">print</span><span className="text-white/80">(</span><span style={{ color: "#28c840" }}>&apos;Hi&apos;</span><span className="text-white/80">)</span></div>
        <div>
          <span className="text-[#1f8a7c]">greet()</span>
          <span className="kg-anim ml-0.5 inline-block h-3 w-[6px] align-middle" style={{ background: a, animation: "kg-blink 1s step-end infinite" }} />
        </div>
        <div className="mt-2 border-t border-white/10 pt-2 text-white/60">
          &#9656; <span className="kg-anim" style={{ animation: "kg-slide .6s ease both", animationDelay: "1s" }}>Hi</span>
        </div>
      </div>
      <button className="mt-2 self-start rounded-md px-3 py-1 text-[9px] font-bold text-white" style={{ background: a }}>&#9654; Run</button>
    </div>
  );
}

/* ---------- Clarity Classifier — NLP class probabilities ---------- */
function NlpScene(a: string): ReactElement {
  const rows: [string, string, string, boolean][] = [
    ["Clear Reply", "78%", "#1f8a7c", true],
    ["Ambivalent", "16%", "#c2571f", false],
    ["Clear Non-Reply", "6%", "#8a63d2", false],
  ];
  return (
    <div className="flex h-full w-full flex-col gap-3 p-5">
      <div className="rounded-md bg-white p-3 shadow-sm">
        <div className="text-[8px] font-bold uppercase text-[#6f6557]">Interview Q&amp;A</div>
        <div className="mt-1 text-[10px] text-[#2a241c]">&ldquo;Will you raise taxes?&rdquo; &mdash; &ldquo;Yes, on the top bracket.&rdquo;</div>
      </div>
      <div className="flex flex-col gap-2.5">
        {rows.map(([label, pct, c, hot], i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-24 text-[9px] font-semibold" style={{ color: hot ? c : "#6f6557" }}>{label}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#2a241c]/10">
              <div className="kg-anim h-full rounded-full" style={{ background: c, width: pct, transformOrigin: "left", animation: "kg-grow 1.4s ease-out both", animationDelay: `${i * 0.2}s` }} />
            </div>
            <span className="w-8 text-right font-mono text-[9px]" style={{ color: hot ? c : "#6f6557" }}>{pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- AI Debate Tool — pro/con board + score ---------- */
function DebateScene(a: string): ReactElement {
  const sides: [string, string][] = [["PRO", "#1f8a7c"], ["CON", "#c2571f"]];
  return (
    <div className="flex h-full w-full items-stretch gap-3 p-5">
      {sides.map(([side, c], s) => (
        <div key={side} className="flex flex-1 flex-col gap-2">
          <span className="text-[9px] font-bold" style={{ color: c }}>{side}</span>
          {[0, 1, 2].map((k) => (
            <div key={k} className="kg-anim rounded-md bg-white p-2 shadow-sm" style={{ animation: "kg-slide .5s ease both", animationDelay: `${(s * 3 + k) * 0.18}s` }}>
              <div className="h-1.5 w-full rounded" style={{ background: c, opacity: 0.5 }} />
              <div className="mt-1 h-1.5 w-2/3 rounded bg-[#2a241c]/10" />
            </div>
          ))}
        </div>
      ))}
      <div className="flex w-16 flex-col items-center justify-center gap-1 rounded-lg bg-[#2a241c]/[0.04]">
        <span className="text-[8px] uppercase text-[#6f6557]">Score</span>
        <span className="kg-anim font-display text-2xl font-bold" style={{ color: a, animation: "kg-pop .6s ease both", animationDelay: ".8s" }}>8.4</span>
        <div className="flex gap-[2px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="kg-anim h-4 w-[4px] rounded-sm" style={{ background: a, opacity: 0.4 + i * 0.12, transformOrigin: "bottom", animation: "kg-bar 1.6s ease-in-out infinite", animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Capstone — showcase website ---------- */
function SiteScene(a: string): ReactElement {
  return (
    <div className="kg-anim h-full w-full p-6" style={{ animation: "kg-float 6s ease-in-out infinite" }}>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-2" style={{ background: a }}>
          <span className="text-[9px] font-bold text-white">AI in Education</span>
          <div className="flex gap-2">{[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-6 rounded-full bg-white/60" />)}</div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="h-3 w-2/3 rounded" style={{ background: `${a}55` }} />
          <div className="h-1.5 w-1/2 rounded bg-[#2a241c]/10" />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="kg-anim rounded-md border border-[#2a241c]/10 p-2" style={{ animation: "kg-pop .5s ease both", animationDelay: `${i * 0.2}s` }}>
                <div className="h-6 w-full rounded" style={{ background: `${a}22` }} />
                <div className="mt-1 h-1 w-full rounded bg-[#2a241c]/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Finger-Tracking Canvas — drawn stroke ---------- */
function CanvasScene(a: string): ReactElement {
  return (
    <div className="relative h-full w-full p-5">
      <div className="relative h-full w-full overflow-hidden rounded-lg border border-[#2a241c]/12 bg-white">
        <svg width="100%" height="100%" viewBox="0 0 480 285" preserveAspectRatio="none">
          <path d="M40 230 C120 60 200 250 280 120 S420 60 450 180" fill="none" stroke={a} strokeWidth="6" strokeLinecap="round" className="kg-anim" style={{ strokeDasharray: 900, strokeDashoffset: 900, animation: "kg-draw 3.4s ease-in-out infinite alternate" }} />
        </svg>
        <svg width="34" height="34" viewBox="0 0 34 34" className="kg-anim absolute left-6 top-6" style={{ animation: "kg-float 3.4s ease-in-out infinite" }}>
          <circle cx="17" cy="17" r="9" fill={a} fillOpacity="0.25" />
          <circle cx="17" cy="17" r="4" fill={a} />
        </svg>
        <span className="absolute right-2 top-2 rounded bg-[#2a241c]/5 px-2 py-0.5 text-[8px] text-[#6f6557]">hand tracking</span>
      </div>
    </div>
  );
}

/* ---------- GamePlaza & TicTacToe ---------- */
function TttScene(a: string): ReactElement {
  const cells = ["X", "", "O", "", "X", "", "O", "", "X"];
  return (
    <div className="flex h-full w-full items-center justify-center gap-6 p-5">
      <div className="grid grid-cols-3 gap-1.5">
        {cells.map((v, i) => (
          <div key={i} className="flex h-16 w-16 items-center justify-center rounded-md bg-white shadow-sm">
            {v && (
              <span className="kg-anim font-display text-3xl font-bold" style={{ color: v === "X" ? a : "#1f8a7c", animation: "kg-pop .4s ease both", animationDelay: `${i * 0.18}s` }}>{v}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-bold uppercase text-[#6f6557]">GamePlaza</span>
        {[0, 1, 2].map((i) => (
          <div key={i} className="kg-anim h-9 w-24 rounded-md" style={{ background: i === 0 ? a : `${a}22`, animation: "kg-slide .5s ease both", animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Client Websites — stacked browser cards ---------- */
function ClientsScene(): ReactElement {
  const cards: [number, number, string][] = [[0, 0, "#c2571f"], [40, 28, "#8a63d2"], [80, 56, "#1f8a7c"]];
  return (
    <div className="relative h-full w-full p-5">
      {cards.map(([x, y, c], i) => (
        <div key={i} className="kg-anim absolute h-[150px] w-[230px] overflow-hidden rounded-lg border border-[#2a241c]/12 bg-white shadow-lg" style={{ left: 30 + x, top: 36 + y, zIndex: i, animation: "kg-float 6s ease-in-out infinite", animationDelay: `${i * 0.6}s` }}>
          <div className="flex items-center gap-1 px-2 py-1.5" style={{ background: c }}>
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          </div>
          <div className="p-2">
            <div className="h-2 w-2/3 rounded" style={{ background: `${c}66` }} />
            <div className="mt-1.5 h-1 w-full rounded bg-[#2a241c]/10" />
            <div className="mt-1 h-1 w-3/4 rounded bg-[#2a241c]/10" />
            <div className="mt-2 grid grid-cols-3 gap-1">{[0, 1, 2].map((k) => <div key={k} className="h-6 rounded" style={{ background: `${c}22` }} />)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Claude-Obsidian RAG — knowledge graph ---------- */
function GraphScene(a: string): ReactElement {
  const nodes: [number, number, number, string, string][] = [
    [260, 142, 18, a, "MCP"], [120, 70, 10, "#8a63d2", ""], [400, 80, 10, "#1f8a7c", ""],
    [110, 210, 10, "#c2571f", ""], [410, 210, 10, "#8a63d2", ""], [260, 40, 8, "#1f8a7c", ""], [200, 235, 8, "#c2571f", ""],
  ];
  const edges = [1, 2, 3, 4, 5, 6];
  return (
    <div className="relative h-full w-full">
      <svg width="520" height="285" viewBox="0 0 520 285">
        {edges.map((f, i) => (
          <line key={i} x1={nodes[f][0]} y1={nodes[f][1]} x2={nodes[0][0]} y2={nodes[0][1]} stroke="#2a241c" strokeOpacity="0.18" strokeWidth="1.5" className="kg-anim kg-dash" />
        ))}
        {nodes.map(([x, y, r, c, label], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={c} className="kg-anim" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "kg-dots 2.4s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
            {label ? <text x={x} y={y + 3} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{label}</text> : null}
          </g>
        ))}
      </svg>
      <span className="absolute bottom-3 left-4 text-[9px] font-semibold text-[#6f6557]">Obsidian vault &rarr; Claude context</span>
    </div>
  );
}

const SCENES: Record<string, (a: string) => ReactElement> = {
  chat: ChatScene,
  pose: PoseScene,
  webcam: WebcamScene,
  resume: ResumeScene,
  ide: IdeScene,
  nlp: NlpScene,
  debate: DebateScene,
  site: SiteScene,
  canvas: CanvasScene,
  ttt: TttScene,
  clients: () => ClientsScene(),
  graph: GraphScene,
};

const NAME_TO_SCENE: Record<string, string> = {
  "Cleanroom AI": "chat",
  "Calisthenics Form Tracker": "pose",
  "RT-MBAS": "webcam",
  "Pressed": "resume",
  "Futureproof": "ide",
  "Clarity Classifier": "nlp",
  "AI Debate Tool": "debate",
  "Capstone — AI in Education": "site",
  "Finger-Tracking Canvas": "canvas",
  "GamePlaza & TicTacToe": "ttt",
  "Client Websites": "clients",
  "Claude-Obsidian RAG Workspace": "graph",
};

export function AnimatedPreview({ project }: { project: Project }) {
  const a = hex[project.accent];
  const key = NAME_TO_SCENE[project.name] ?? "site";
  const Scene = SCENES[key] ?? SiteScene;
  return <Frame>{Scene(a)}</Frame>;
}
