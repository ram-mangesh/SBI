"use client";

import { useState, useEffect, useRef } from "react";
import "../../styles/cyber-testimonail.css";
/* ── TESTIMONIAL DATA ──────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    handle: "@r00t_runner",
    name: "Priya Nair",
    role: "Penetration Tester · Mumbai",
    avatar: "PN",
    avatarColor: "#7aa2f7",
    rating: 5,
    domain: "OSCP",
    domainStyle: "blue",
    quote:
      "CyberNexus is the first platform where I didn't feel like I was drowning after week one. The Codex cross-references everything — I can trace a concept from first principles all the way to a live CTF exploit. Passed OSCP on my first attempt.",
    stat: { val: "OSCP", lbl: "First Attempt" },
    tags: ["Privilege Escalation", "Buffer Overflow"],
    joined: "Season II",
  },
  {
    id: 2,
    handle: "@nullbyte_kat",
    name: "Katsuki Mori",
    role: "Security Researcher · Tokyo",
    avatar: "KM",
    avatarColor: "#bb9af7",
    rating: 5,
    domain: "CTF",
    domainStyle: "red",
    quote:
      "The CTF arena is genuinely addictive. Season IV's forensics track had me up until 3 AM reconstructing PCAP files. The real-time leaderboard makes it feel like a sport. I've learned more in 6 weeks here than in a full semester of university.",
    stat: { val: "#7", lbl: "Global Rank" },
    tags: ["Network Forensics", "PCAP Analysis"],
    joined: "Season IV",
  },
  {
    id: 3,
    handle: "@xor_elena",
    name: "Elena Vasquez",
    role: "CS Student · Madrid",
    avatar: "EV",
    avatarColor: "#9ece6a",
    rating: 5,
    domain: "Beginner",
    domainStyle: "green",
    quote:
      "I had zero security background — just Python and curiosity. The lectures start from actual first principles, not 'assume you know Linux'. Within a month I was solving beginner CTF challenges. The community Discord is insanely helpful.",
    stat: { val: "0→CTF", lbl: "In 4 Weeks" },
    tags: ["XSS", "Web Security"],
    joined: "Season III",
  },
  {
    id: 4,
    handle: "@ghostshell_dev",
    name: "Marcus Osei",
    role: "Bug Bounty Hunter · Accra",
    avatar: "MO",
    avatarColor: "#e0af68",
    rating: 5,
    domain: "Bug Bounty",
    domainStyle: "yellow",
    quote:
      "Reported my first critical CVE three months after joining. The web exploitation Codex is absurdly thorough — SSRF, CORS misconfig, prototype pollution — all indexed and explained with real-world context. This isn't tutorial content, it's a proper reference.",
    stat: { val: "$4,200", lbl: "First Bounty" },
    tags: ["SSRF", "Prototype Pollution"],
    joined: "Season III",
  },
  {
    id: 5,
    handle: "@redteam_sara",
    name: "Sara Lindqvist",
    role: "Red Team Analyst · Stockholm",
    avatar: "SL",
    avatarColor: "#f7768e",
    rating: 5,
    domain: "Red Team",
    domainStyle: "red",
    quote:
      "The Active Directory attacks lecture series is the most practical AD content I've found outside of a paid course. Live Q&A with the instructor, timestamped recordings, and the lab environment just works — no setup headaches.",
    stat: { val: "AD", lbl: "Mastered" },
    tags: ["Active Directory", "Kerberoasting"],
    joined: "Season II",
  },
];

const CHIP_STYLES = {
  blue:   { color: "#7aa2f7", bg: "rgba(122,162,247,0.12)", border: "rgba(122,162,247,0.3)" },
  red:    { color: "#f7768e", bg: "rgba(247,118,142,0.12)", border: "rgba(247,118,142,0.3)" },
  green:  { color: "#9ece6a", bg: "rgba(158,206,106,0.12)", border: "rgba(158,206,106,0.3)" },
  yellow: { color: "#e0af68", bg: "rgba(224,175,104,0.12)", border: "rgba(224,175,104,0.3)" },
  purple: { color: "#bb9af7", bg: "rgba(187,154,247,0.12)", border: "rgba(187,154,247,0.3)" },
  cyan:   { color: "#7dcfff", bg: "rgba(125,207,255,0.12)", border: "rgba(125,207,255,0.3)" },
};

/* ── TERMINAL GIF-LIKE ANIMATION FRAMES ───────────────────── */
const FRAMES = [
  ["$ nexus scan --live", ""],
  ["$ nexus scan --live", "> connecting to codex..."],
  ["$ nexus scan --live", "> connecting to codex...", "> fetching testimonials [████░░] 67%"],
  ["$ nexus scan --live", "> connecting to codex...", "> fetching testimonials [████████] 100%", ""],
  ["$ nexus scan --live", "> connecting to codex...", "> fetching testimonials [████████] 100%", "> 5 verified members found"],
  ["$ nexus scan --live", "> connecting to codex...", "> fetching testimonials [████████] 100%", "> 5 verified members found", "> avg rating: 5.0 / 5.0 ★"],
  ["$ nexus scan --live", "> connecting to codex...", "> fetching testimonials [████████] 100%", "> 5 verified members found", "> avg rating: 5.0 / 5.0 ★", "> domains: OSCP · CTF · BugBounty"],
  ["$ nexus scan --live", "> connecting to codex...", "> fetching testimonials [████████] 100%", "> 5 verified members found", "> avg rating: 5.0 / 5.0 ★", "> domains: OSCP · CTF · BugBounty", ""],
  ["$ nexus scan --live", "> connecting to codex...", "> fetching testimonials [████████] 100%", "> 5 verified members found", "> avg rating: 5.0 / 5.0 ★", "> domains: OSCP · CTF · BugBounty", "", "$ _"],
];

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [frame, setFrame]   = useState(0);
  const [paused, setPaused] = useState(false);
  const autoRef = useRef(null);

  /* terminal animation loop */
  useEffect(() => {
    const t = setInterval(() => {
      setFrame((f) => (f + 1) % (FRAMES.length + 3));
    }, 500);
    return () => clearInterval(t);
  }, []);

  /* auto-cycle testimonials */
  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(autoRef.current);
  }, [paused]);

  const currentFrame = FRAMES[Math.min(frame, FRAMES.length - 1)];
  const t    = TESTIMONIALS[active];
  const chip = CHIP_STYLES[t.domainStyle] || CHIP_STYLES.blue;

  const go = (i) => { setActive(i); setPaused(true); };

  return (
    <section className="tm" id="testimonials" aria-label="Community testimonials">
      <div className="tm-inner">

        {/* ── Header ── */}
        <div className="tm-header reveal">
          <div>
            <div className="tm-label"><span>Verified Members</span></div>
            <h2 className="tm-title">
              Real people.<br />
              <em>Real breakthroughs.</em>
            </h2>
            <p className="tm-sub">
              From absolute beginners to seasoned red teamers —
              here what the community is saying.
            </p>
          </div>

          <div className="tm-header-right">
            <div className="tm-count">
              Showing <strong>1 of 12,400+</strong> members
            </div>
            <div className="tm-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`tm-dot${active === i ? " active" : ""}`}
                  onClick={() => go(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="tm-grid">

          {/* ══ LEFT — testimonial cards ══ */}
          <div className="tm-cards reveal-left">

            <div className="tm-stack">
              {/* ghost depth cards */}
              <div className="tm-ghost tm-ghost-1" />
              <div className="tm-ghost tm-ghost-2" />

              {/* active card */}
              <div className="tm-card" key={t.id}>

                <div className="tm-card-top">
                  <div
                    className="tm-avatar"
                    style={{
                      background:  `${t.avatarColor}18`,
                      color:        t.avatarColor,
                      borderColor: `${t.avatarColor}55`,
                    }}
                  >
                    {t.avatar}
                  </div>

                  <div className="tm-meta">
                    <div className="tm-name">{t.name}</div>
                    <div className="tm-role">{t.role}</div>
                    <div className="tm-handle" style={{ color: t.avatarColor }}>
                      {t.handle}
                    </div>
                  </div>

                  <div>
                    <div
                      className="tm-domain-chip"
                      style={{
                        color:       chip.color,
                        background:  chip.bg,
                        borderColor: chip.border,
                      }}
                    >
                      {t.domain}
                    </div>
                    <div className="tm-stars" style={{ marginTop: 8 }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span className="tm-star" key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="tm-quote-wrap">
                  <span className="tm-quote-mark"></span>
                  <p className="tm-quote">{t.quote}</p>
                </div>

                <div className="tm-card-bottom">
                  <div className="tm-tags">
                    {t.tags.map((tag) => (
                      <span className="tm-tag" key={tag}>{tag}</span>
                    ))}
                    <span className="tm-tag" style={{ color: "var(--comment)" }}>
                      Joined {t.joined}
                    </span>
                  </div>
                  <div className="tm-stat">
                    <div className="tm-stat-val">{t.stat.val}</div>
                    <div className="tm-stat-lbl">{t.stat.lbl}</div>
                  </div>
                </div>

              </div>
            </div>

            {/* pill navigation */}
            <div className="tm-pill-bar">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.id}
                  className={`tm-pill${active === i ? " active" : ""}`}
                  onClick={() => go(i)}
                >
                  <span className="tm-pill-dot" style={{ background: item.avatarColor }} />
                  {item.handle}
                </button>
              ))}
            </div>

            {/* prev / next / cta */}
            <div className="tm-nav">
              <button
                className="tm-nav-btn"
                onClick={() => go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              >
                ← Prev
              </button>
              <button
                className="tm-nav-btn"
                onClick={() => go((active + 1) % TESTIMONIALS.length)}
              >
                Next →
              </button>
              <button className="tm-nav-btn primary">
                Join the Community
              </button>
            </div>

          </div>

          {/* ══ RIGHT — terminal + board ══ */}
          <div className="tm-right reveal-right">

            {/* animated terminal */}
            <div className="tm-terminal">
              <div className="tm-terminal-bar">
                <div className="tm-terminal-dots">
                  <span /><span /><span />
                </div>
                <span className="tm-terminal-title">nexus@codex:~/testimonials</span>
              </div>

              <div className="tm-terminal-body">
                {currentFrame.map((line, i) => {
                  let cls = "tm-t-line";
                  if (line.includes("%"))        cls += " progress";
                  else if (line.includes("found"))   cls += " found";
                  else if (line.includes("rating"))  cls += " rating";
                  else if (line.includes("domains")) cls += " domain";

                  const isLast   = i === currentFrame.length - 1;
                  const isPrompt = line.startsWith("$");

                  return (
                    <span className={cls} key={i}>
                      {isPrompt ? (
                        <>
                          <span className="tm-t-prompt">❯ </span>
                          <span className="tm-t-cmd">{line.slice(2)}</span>
                        </>
                      ) : line.startsWith(">") ? (
                        <span className="tm-t-muted">{line}</span>
                      ) : line === "" && isLast ? (
                        <>
                          <span className="tm-t-prompt">❯ </span>
                          <span className="tm-t-cursor" />
                        </>
                      ) : (
                        line
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* mini leaderboard */}
            <div className="tm-board">
              <div className="tm-board-header">
                <span className="tm-board-title">Top Reviewers · Season IV</span>
                <span className="tm-board-live">
                  <span className="tm-board-live-dot" />
                  LIVE
                </span>
              </div>

              {TESTIMONIALS.map((item, i) => (
                <div
                  key={item.id}
                  className={`tm-board-row${active === i ? " hl" : ""}`}
                  onClick={() => go(i)}
                >
                  <span className={`tm-board-rank${i < 3 ? " top" : ""}`}>
                    {i === 0 ? "①" : i === 1 ? "②" : i === 2 ? "③" : `${i + 1}.`}
                  </span>
                  <div
                    className="tm-board-av"
                    style={{
                      background:  `${item.avatarColor}18`,
                      color:        item.avatarColor,
                      borderColor: `${item.avatarColor}55`,
                    }}
                  >
                    {item.avatar}
                  </div>
                  <div className="tm-board-info">
                    <div className="tm-board-name">{item.name}</div>
                    <div className="tm-board-handle">{item.handle}</div>
                  </div>
                  <span className="tm-board-score">{item.stat.val}</span>
                </div>
              ))}
            </div>

            {/* aggregate stats */}
            <div className="tm-aggregate">
              <div className="tm-agg-item">
                <div className="tm-agg-val">5.0<span>★</span></div>
                <div className="tm-agg-lbl">Avg Rating</div>
              </div>
              <div className="tm-agg-item">
                <div className="tm-agg-val">12k<span>+</span></div>
                <div className="tm-agg-lbl">Members</div>
              </div>
              <div className="tm-agg-item">
                <div className="tm-agg-val">40<span>+</span></div>
                <div className="tm-agg-lbl">Domains</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}