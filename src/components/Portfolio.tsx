"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { kinds, profile, projects, type Kind, type Project } from "@/data/projects";

const sm = (src: string) => src.replace(/\.jpg$/, "-sm.jpg");

type Mode = "plain" | "tech";
type Theme = "dark" | "light";

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: the choice just won't persist */
  }
}

function useSettings() {
  const [mode, setModeState] = useState<Mode>("plain");
  const [theme, setThemeState] = useState<Theme>("dark");
  useEffect(() => {
    const d = document.documentElement.dataset;
    if (d.mode === "tech" || d.mode === "plain") setModeState(d.mode);
    if (d.theme === "light" || d.theme === "dark") setThemeState(d.theme);
  }, []);
  const setMode = (m: Mode) => {
    setModeState(m);
    document.documentElement.dataset.mode = m;
    save("kg-mode", m);
  };
  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.dataset.theme = t;
    save("kg-theme", t);
  };
  return { mode, setMode, theme, setTheme };
}

/* ------------------------------------------------------------------ */
/* Hover preview that trails the cursor                                */
/* ------------------------------------------------------------------ */

function Preview({ project }: { project: Project | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const move = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", move, { passive: true });
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const k = reduce ? 1 : 0.16;
        pos.current.x += (target.current.x - pos.current.x) * k;
        pos.current.y += (target.current.y - pos.current.y) * k;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const flip = target.current.x + w + 48 > window.innerWidth;
        const x = flip ? pos.current.x - w - 32 : pos.current.x + 32;
        const y = Math.min(Math.max(pos.current.y - h / 2, 16), window.innerHeight - h - 16);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const shot = project?.shots[0];
  return (
    <div ref={ref} className={`preview${project ? " on" : ""}`} aria-hidden="true">
      {project && (
        <>
          {shot ? (
            <img src={sm(shot.src)} alt="" width={shot.w} height={shot.h} />
          ) : (
            <div className="preview-name">{project.name}</div>
          )}
          <dl className="preview-nums">
            {project.numbers.map((n) => (
              <div key={n.label}>
                <dt>{n.n}</dt>
                <dd>{n.label}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Full-screen project viewer                                          */
/* ------------------------------------------------------------------ */

function Viewer({
  project,
  onClose,
  onStep,
  position,
  mode,
  setMode,
}: {
  project: Project;
  onClose: () => void;
  onStep: (d: number) => void;
  position: string;
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const [shot, setShot] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShot(0);
    bodyRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("locked");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("locked");
    };
  }, [onClose, onStep]);

  const current = project.shots[shot];

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-labelledby="viewer-title">
      <header className="viewer-bar">
        <span className="viewer-kind">{project.kind}</span>
        <span className="viewer-pos">{position}</span>
        <div className="switch" role="group" aria-label="How much detail">
          <button type="button" aria-pressed={mode === "plain"} onClick={() => setMode("plain")}>
            Plain
          </button>
          <button type="button" aria-pressed={mode === "tech"} onClick={() => setMode("tech")}>
            Technical
          </button>
        </div>
        <div className="viewer-nav">
          <button type="button" onClick={() => onStep(-1)}>
            Previous
          </button>
          <button type="button" onClick={() => onStep(1)}>
            Next
          </button>
          <button type="button" ref={closeRef} onClick={onClose}>
            Close
          </button>
        </div>
      </header>

      <div className="viewer-body" ref={bodyRef} key={project.id}>
        <section className="viewer-media" aria-label="Screenshots">
          {current ? (
            <figure>
              <div className="frame">
                <img key={current.src} src={current.src} alt={current.alt} width={current.w} height={current.h} />
              </div>
              {current.caption && <figcaption>{current.caption}</figcaption>}
            </figure>
          ) : (
            <div className="frame frame-empty">
              <span>{project.name}</span>
              <p>No public screenshot yet. The code is linked with the project details.</p>
            </div>
          )}
          {project.shots.length > 1 && (
            <div className="thumbs" role="tablist" aria-label="Choose a screenshot">
              {project.shots.map((sh, i) => (
                <button
                  key={sh.src}
                  type="button"
                  role="tab"
                  aria-selected={i === shot}
                  aria-label={sh.caption ?? sh.alt}
                  onClick={() => setShot(i)}
                >
                  <img src={sm(sh.src)} alt="" width={sh.w} height={sh.h} />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="viewer-text">
          <h2 id="viewer-title">{project.name}</h2>
          <p className="viewer-plain">{mode === "plain" ? project.plain : project.line}</p>
          <dl className="nums">
            {project.numbers.map((n) => (
              <div key={n.label}>
                <dt>{n.n}</dt>
                <dd>{n.label}</dd>
              </div>
            ))}
          </dl>
          {mode === "plain" ? (
            <>
              <h3>What it does</h3>
              <div className="viewer-copy">
                {project.plainBody.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <h3>Built with</h3>
              <p className="viewer-stack">{project.stack}</p>
            </>
          ) : (
            <>
              <h3>How it works</h3>
              <div className="viewer-copy">
                {project.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <h3>Under the hood</h3>
              <table className="specs">
                <tbody>
                  {project.specs.map((sp) => (
                    <tr key={sp.k}>
                      <th scope="row">{sp.k}</th>
                      <td>{sp.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <p className="viewer-links">
            {project.live && (
              <a className="primary" href={project.live} target="_blank" rel="noopener">
                Open the live site
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener">
                Read the code
              </a>
            )}
          </p>
          {project.note && <p className="viewer-note">{project.note}</p>}
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Portfolio() {
  const { mode, setMode, theme, setTheme } = useSettings();
  const [filter, setFilter] = useState<Kind | "All">("All");
  const [hover, setHover] = useState<Project | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const list = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.kind === filter)), [filter]);
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of projects) c[p.kind] = (c[p.kind] ?? 0) + 1;
    return c;
  }, []);

  // Deep links: #necto opens that project.
  useEffect(() => {
    const read = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      setOpenId(projects.some((p) => p.id === id) ? id : null);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const open = (id: string) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setHover(null);
    history.pushState(null, "", `#${id}`);
    setOpenId(id);
  };
  const close = useCallback(() => {
    history.pushState(null, "", location.pathname + location.search);
    setOpenId(null);
    requestAnimationFrame(() => lastFocus.current?.focus());
  }, []);
  const step = useCallback(
    (d: number) => {
      setOpenId((cur) => {
        const i = list.findIndex((p) => p.id === cur);
        const next = list[(i + d + list.length) % list.length];
        history.replaceState(null, "", `#${next.id}`);
        return next.id;
      });
    },
    [list],
  );

  const current = openId ? projects.find((p) => p.id === openId) ?? null : null;
  const pos = current ? `${list.findIndex((p) => p.id === current.id) + 1} of ${list.length}` : "";

  const wall = projects.filter((p) => p.shots.length).map((p) => p.shots[0]);

  return (
    <>
      <a className="skip" href="#index">
        Skip to projects
      </a>

      <header className="top">
        <a href="#" className="top-name" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}>
          {profile.name}
        </a>
        <div className="top-right">
          <nav aria-label="Site">
            <a href="#index" onClick={(e) => { e.preventDefault(); document.getElementById("index")?.scrollIntoView(); }}>Work</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView(); }}>About</a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </nav>
          <div className="switch" role="group" aria-label="How much detail">
            <button type="button" aria-pressed={mode === "plain"} onClick={() => setMode("plain")}>
              Plain
            </button>
            <button type="button" aria-pressed={mode === "tech"} onClick={() => setMode("tech")}>
              Technical
            </button>
          </div>
          <button
            type="button"
            className="theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-name">
        <div className="wall" aria-hidden="true">
          {[0, 1, 2].map((col) => (
            <div className="wall-col" key={col}>
              {[...wall, ...wall].filter((_, i) => i % 3 === col).map((w, i) => (
                <img key={i} src={sm(w.src)} alt="" width={w.w} height={w.h} loading="lazy" />
              ))}
            </div>
          ))}
        </div>
        <div className="hero-copy">
          <p className="hero-title">
            {profile.title}, {profile.place}
          </p>
          <h1 id="hero-name">
            Krishn
            <br />
            Gohel
          </h1>
          <p className="hero-lede">
            {mode === "plain" ? (
              <>
                I build AI tools that save people real time: a recruiting system that ranks candidates and shows its
                reasoning, a trading agent that can&apos;t break its own rules, and assistants that run privately on
                your own computer. Here are {projects.length} of them.
              </>
            ) : (
              <>
                I build AI systems that hold up in production: agents with hard guardrails, matching people can
                audit, and models that run on the machine they&apos;re meant for. {projects.length} of them are below.
              </>
            )}
          </p>
          <p className="hero-cta">
            <a href="#index" onClick={(e) => { e.preventDefault(); document.getElementById("index")?.scrollIntoView(); }}>
              See the work
            </a>
            <a href={profile.github} target="_blank" rel="noopener">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </p>
        </div>
      </section>

      <main id="index" className="index">
        <div className="index-head">
          <h2>Work</h2>
          <div className="filters" role="group" aria-label="Filter projects">
            <button type="button" aria-pressed={filter === "All"} onClick={() => setFilter("All")}>
              All <span>{projects.length}</span>
            </button>
            {kinds.map((k) => (
              <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}>
                {k} <span>{counts[k]}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className={`rows${hover ? " dim" : ""}`} onPointerLeave={() => setHover(null)}>
          {list.map((p) => (
            <li key={p.id} className={hover?.id === p.id ? "hot" : undefined}>
              <button
                type="button"
                className="row"
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover(p)}
                onFocus={() => setHover(null)}
                onClick={() => open(p.id)}
                aria-label={`${p.name}: ${mode === "plain" ? p.plainLine : p.line} Open details.`}
              >
                <span className="row-kind">{p.kind}</span>
                <span className="row-name">{p.name}</span>
                <span className="row-line">{mode === "plain" ? p.plainLine : p.line}</span>
                <span className="row-meta">
                  {p.live ? "Live" : p.repo ? "Code" : "Private"}
                </span>
                {p.shots[0] && (
                  <img className="row-thumb" src={sm(p.shots[0].src)} alt="" width={p.shots[0].w} height={p.shots[0].h} loading="lazy" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </main>

      <section id="about" className="about" aria-labelledby="about-h">
        <div className="about-copy">
          <h2 id="about-h">About</h2>
          <p>
            I graduated from UTSA in May 2026 with a B.S. in Computer Science and a Data Science concentration. Since
            2023 I&apos;ve run Webloom, a one-person consultancy, and shipped 50+ client projects through it. Most of my
            recent work puts models inside real workflows: a recruiting team&apos;s matching, a trading agent&apos;s
            risk gate, a city&apos;s signal timing.
          </p>
          <a className="mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
        <table className="specs about-facts">
          <tbody>
            {profile.facts.map((f) => (
              <tr key={f.k}>
                <th scope="row">{f.k}</th>
                <td>{f.v}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Elsewhere</th>
              <td>
                <a href={profile.github} target="_blank" rel="noopener">github.com/krishngohel</a>
                <br />
                <a href={profile.linkedin} target="_blank" rel="noopener">linkedin.com/in/krishngohel</a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="foot">
        <span>
          {profile.name}, {profile.title}
        </span>
        <span>Revised November 2026</span>
      </footer>

      <Preview project={openId ? null : hover} />
      {current && <Viewer project={current} onClose={close} onStep={step} position={pos} mode={mode} setMode={setMode} />}
    </>
  );
}
