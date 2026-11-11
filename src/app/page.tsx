import { currentProjects, earlierProjects, revisions } from "@/data/projects";

const EMAIL = "gohel.krishn@gmail.com";
const GITHUB = "https://github.com/krishngohel";
const LINKEDIN = "https://www.linkedin.com/in/krishngohel";

export default function Home() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <article className="sheet">
        <header className="band">
          <strong>Krishn Gohel</strong>
          <span className="role">Software engineer, Frisco, TX</span>
          <nav aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#earlier">Earlier</a>
            <a href="#history">History</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className="mast inner" aria-labelledby="name">
          <div>
            <h1 id="name">
              Krishn
              <br />
              Gohel
            </h1>
            <p className="fn">I build the whole system, from schema to deploy, and keep it running after launch.</p>
            <p className="lede">
              My current work is for real users and real clients: a relationship CRM on iOS, Android
              and the web, a call-queue CRM for a life-insurance agency, and a recruiting CRM in production at a staffing firm.
              Since 2023 I&apos;ve run Webloom, a one-person consultancy, and delivered 50+ client projects through it.
            </p>
            <p className="contact-line">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href={GITHUB} target="_blank" rel="noopener">
                GitHub
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener">
                LinkedIn
              </a>
            </p>
          </div>

          <table className="spec">
            <caption>Characteristics</caption>
            <tbody>
              <tr>
                <th scope="row">Seeking</th>
                <td>Software engineering and data roles</td>
              </tr>
              <tr>
                <th scope="row">Education</th>
                <td>B.S. Computer Science, Data Science concentration, UTSA, May 2026</td>
              </tr>
              <tr>
                <th scope="row">Practice</th>
                <td>Webloom, sole developer since 2023, 50+ client projects</td>
              </tr>
              <tr>
                <th scope="row">Daily stack</th>
                <td>TypeScript, React, Next.js, Python, PostgreSQL, Supabase</td>
              </tr>
              <tr>
                <th scope="row">Certified</th>
                <td>Alteryx Designer Core; all 13 Anthropic Academy courses</td>
              </tr>
              <tr>
                <th scope="row">Based</th>
                <td>Frisco, Texas</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="sec" id="work" aria-labelledby="work-h">
          <div className="inner">
            <h2 id="work-h">Current work</h2>

            {currentProjects.map((p) => (
              <article className="part" key={p.id} id={p.id} aria-labelledby={`${p.id}-h`}>
                <div>
                  <div className="part-head">
                    <h3 id={`${p.id}-h`}>{p.name}</h3>
                    <span className="period">{p.period}</span>
                  </div>
                  <p className="function">{p.function}</p>
                  <div className="body">
                    {p.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <p className="links">
                    {p.links.map((l) =>
                      l.href ? (
                        <a key={l.label} href={l.href} target="_blank" rel="noopener">
                          {l.label}
                        </a>
                      ) : (
                        <span key={l.label}>{l.label}</span>
                      ),
                    )}
                  </p>
                </div>

                <table className="spec">
                  <caption className="sr-cap">{p.name} characteristics</caption>
                  <tbody>
                    {p.characteristics.map((c) => (
                      <tr key={c.parameter}>
                        <th scope="row">{c.parameter}</th>
                        <td>{c.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {p.gallery && (
                  <div className="gallery">
                    {p.gallery.map((g) => (
                      <figure key={g.src}>
                        <a href={g.src} target="_blank" rel="noopener" aria-label={`Open full size: ${g.caption}`}>
                          <img src={g.src} alt={g.alt} width={g.width} height={g.height} loading="lazy" decoding="async" />
                        </a>
                        <figcaption>{g.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="sec" id="earlier" aria-labelledby="earlier-h">
          <div className="inner">
            <h2 id="earlier-h">Earlier projects</h2>
            <p className="intro">
              Personal and coursework builds. Every one has public code, and the ones with a live deployment link
              to it.
            </p>
            <div className="guide-wrap">
              <table className="guide">
                <thead>
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">What it does</th>
                    <th scope="col">Key figure</th>
                    <th scope="col">Stack</th>
                    <th scope="col">Links</th>
                  </tr>
                </thead>
                <tbody>
                  {earlierProjects.map((p) => (
                    <tr key={p.name}>
                      <th scope="row">{p.name}</th>
                      <td className="what">{p.what}</td>
                      <td className="fig" data-label="Key figure">
                        {p.figure}
                      </td>
                      <td className="stack" data-label="Stack">
                        {p.stack}
                      </td>
                      <td className="lk">
                        {p.repo && (
                          <a href={p.repo} target="_blank" rel="noopener" aria-label={`${p.name} source code`}>
                            Code
                          </a>
                        )}
                        {p.live && (
                          <a href={p.live} target="_blank" rel="noopener" aria-label={`${p.name} live site`}>
                            Live
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="sec" aria-label="History and contact">
          <div className="inner closing">
            <table className="history" id="history">
              <caption>Revision history</caption>
              <tbody>
                {revisions.map((r) => (
                  <tr key={r.date}>
                    <th scope="row">{r.date}</th>
                    <td>{r.entry}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="reach" id="contact">
              <p>Hiring for software or data, or need something built? Email is the fastest way to reach me.</p>
              <a className="mail" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              <p className="contact-line">
                <a href={GITHUB} target="_blank" rel="noopener">
                  github.com/krishngohel
                </a>
                <a href={LINKEDIN} target="_blank" rel="noopener">
                  linkedin.com/in/krishngohel
                </a>
              </p>
            </div>
          </div>
        </section>

        <footer className="foot">Revised November 2026</footer>
      </article>
    </>
  );
}
