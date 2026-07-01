"use client";

import { useState } from "react";
import "@/styles/cyber-about.css";

/* ── DATA ──────────────────────────────────────────────────── */

const HERO_STATS = [
  { icon: "◈", val: "12,400", accent: "+", label: "Enrolled Members",    delta: "+340 this week" },
  { icon: "⚑", val: "380",    accent: "",  label: "CTF Challenges",      delta: "Season IV live"  },
  { icon: "▶", val: "94",     accent: "",  label: "Expert Lectures",     delta: "8 live now"      },
  { icon: "⬡", val: "4",      accent: "",  label: "Years of Operation",  delta: "Since 2021"      },
];

const VALUES = [
  { icon: "⬡", name: "First Principles Only",    color: "#7aa2f7", desc: "Every concept is explained from scratch. We never assume knowledge; we build it." },
  { icon: "⚑", name: "Adversarial Mindset",      color: "#f7768e", desc: "Understanding how systems break is how you learn to build them better." },
  { icon: "◈", name: "Open Knowledge",           color: "#9ece6a", desc: "The Codex is free to read. Security knowledge shouldn't be paywalled." },
  { icon: "✦", name: "Community Over Commerce",  color: "#e0af68", desc: "We're practitioners teaching practitioners — no marketing funnels." },
];

const DOMAINS = [
  { icon: "⬡", name: "Web Security",       count: "18 lectures", color: "#7aa2f7" },
  { icon: "▸", name: "Binary Exploitation",count: "12 lectures", color: "#f7768e" },
  { icon: "◎", name: "Network Security",   count: "10 lectures", color: "#7dcfff" },
  { icon: "#", name: "Reverse Eng.",       count: "11 lectures", color: "#bb9af7" },
  { icon: "⚑", name: "DFIR / Forensics",  count: "9 lectures",  color: "#e0af68" },
  { icon: "∿", name: "OSCP Prep",          count: "13 lectures", color: "#9ece6a" },
  { icon: "◈", name: "Active Directory",   count: "7 lectures",  color: "#bb9af7" },
  { icon: "✦", name: "Cryptography",       count: "8 lectures",  color: "#7dcfff" },
  { icon: "⌘", name: "Malware Analysis",   count: "6 lectures",  color: "#f7768e" },
];

const PRINCIPLES = [
  { icon: "⬡", name: "Encyclopaedic Depth",    desc: "Indexed, cross-referenced, and version-controlled like source code." },
  { icon: "▶", name: "Live-First Learning",    desc: "Real-time sessions with instructors, not pre-recorded slideware." },
  { icon: "⚑", name: "CTF as a Sport",        desc: "Competitive challenges that make offensive security addictive." },
  { icon: "◈", name: "Career-Mapped Paths",   desc: "Every lecture tagged to OSCP, PNPT, CEH, or bug bounty tracks." },
];

const TEAM = [
  {
    initials: "AK",
    color: "#7aa2f7",
    name: "Arjun Kapoor",
    role: "Founder & Lead Instructor",
    roleColor: "#7aa2f7",
    barLabel: "founder::web_sec",
    bio: "Ex-Google red teamer. OSCP, OSWE. Led web exploitation research for 8 years before building CyberNexus.",
    tags: ["Web Exploitation", "OSCP", "Bug Bounty"],
    socials: [{ label: "GitHub", icon: "⌥" }, { label: "Twitter", icon: "◈" }],
  },
  {
    initials: "TN",
    color: "#e0af68",
    name: "Tariq Nguyen",
    role: "Binary & Kernel Specialist",
    roleColor: "#e0af68",
    barLabel: "core::binary_pwn",
    bio: "CTF legend — ranked Top 10 globally in DEF CON CTF twice. Expert in heap exploitation and kernel pwn.",
    tags: ["Heap Exploitation", "Kernel Pwn", "CTF"],
    socials: [{ label: "GitHub", icon: "⌥" }, { label: "CTFtime", icon: "⚑" }],
  },
  {
    initials: "EV",
    color: "#9ece6a",
    name: "Elena Vasquez",
    role: "Forensics & DFIR Lead",
    roleColor: "#9ece6a",
    barLabel: "core::dfir",
    bio: "Former law enforcement digital forensics analyst. Certified GCFE & GCFA. Leads the forensics and DFIR curriculum.",
    tags: ["DFIR", "Memory Forensics", "GCFE"],
    socials: [{ label: "GitHub", icon: "⌥" }, { label: "LinkedIn", icon: "◎" }],
  },
  {
    initials: "ML",
    color: "#bb9af7",
    name: "Marcus Larsson",
    role: "AD & Red Team Lead",
    roleColor: "#bb9af7",
    barLabel: "core::red_team",
    bio: "Senior red teamer at a Big 4 firm. Specialises in Active Directory, Kerberos abuse, and C2 infrastructure.",
    tags: ["Active Directory", "Red Team", "C2"],
    socials: [{ label: "GitHub", icon: "⌥" }, { label: "Twitter", icon: "◈" }],
  },
];

const TIMELINE = [
  {
    side: "left",
    year: "2021",
    yearColor: "#7aa2f7",
    icon: "⬡",
    iconColor: "#7aa2f7",
    iconBg: "rgba(122,162,247,0.15)",
    event: "CyberNexus Founded",
    desc: "Arjun Kapoor launches the Codex — a free, indexed reference for offensive security concepts. First 200 members join in week one.",
    chip: { label: "Origin", color: "#7aa2f7", bg: "rgba(122,162,247,0.12)", border: "rgba(122,162,247,0.3)" },
  },
  {
    side: "right",
    year: "2022",
    yearColor: "#9ece6a",
    icon: "▶",
    iconColor: "#9ece6a",
    iconBg: "rgba(158,206,106,0.15)",
    event: "Live Lectures Launched",
    desc: "First live lecture series on Web App Pentesting draws 800 concurrent viewers. Lecture library grows to 30 sessions.",
    chip: { label: "Milestone", color: "#9ece6a", bg: "rgba(158,206,106,0.12)", border: "rgba(158,206,106,0.3)" },
  },
  {
    side: "left",
    year: "2022 Q4",
    yearColor: "#e0af68",
    icon: "⚑",
    iconColor: "#e0af68",
    iconBg: "rgba(224,175,104,0.15)",
    event: "CTF Arena — Season I",
    desc: "The CTF platform launches with 80 challenges. Season I draws 1,200 participants from 40 countries.",
    chip: { label: "CTF", color: "#e0af68", bg: "rgba(224,175,104,0.12)", border: "rgba(224,175,104,0.3)" },
  },
  {
    side: "right",
    year: "2023",
    yearColor: "#bb9af7",
    icon: "◈",
    iconColor: "#bb9af7",
    iconBg: "rgba(187,154,247,0.15)",
    event: "5,000 Members & Lab Environments",
    desc: "Dedicated lab environments go live — spin up vulnerable machines in under 30 seconds. Community hits 5k enrolled.",
    chip: { label: "Growth", color: "#bb9af7", bg: "rgba(187,154,247,0.12)", border: "rgba(187,154,247,0.3)" },
  },
  {
    side: "left",
    year: "2024",
    yearColor: "#7dcfff",
    icon: "✦",
    iconColor: "#7dcfff",
    iconBg: "rgba(125,207,255,0.15)",
    event: "10,000 Members & OSCP Prep Paths",
    desc: "Career-mapped paths launch for OSCP, PNPT, and CEH. Platform hits 10k members and 70 lectures.",
    chip: { label: "Scale", color: "#7dcfff", bg: "rgba(125,207,255,0.12)", border: "rgba(125,207,255,0.3)" },
  },
  {
    side: "right",
    year: "2025 — Now",
    yearColor: "#f7768e",
    icon: "⬡",
    iconColor: "#f7768e",
    iconBg: "rgba(247,118,142,0.15)",
    event: "Season IV · 12,400 Members",
    desc: "CTF Season IV launches with 380 challenges. 94 lectures, 40+ domains, 8 live sessions running daily.",
    chip: { label: "Live", color: "#f7768e", bg: "rgba(247,118,142,0.12)", border: "rgba(247,118,142,0.3)" },
  },
];

const PRESS = [
  { icon: "◈", name: "DEF CON" },
  { icon: "⬡", name: "Black Hat" },
  { icon: "⚑", name: "HackerOne" },
  { icon: "✦", name: "CTFtime.org" },
  { icon: "▶", name: "InfoSec Institute" },
];

const CTA_STATS = [
  { val: "Free",  accent: "",   label: "To Start"      },
  { val: "30",    accent: "s",  label: "Lab Spin-up"   },
  { val: "24",    accent: "/7", label: "Community"     },
  { val: "40",    accent: "+",  label: "Domains"       },
];

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function AboutPage() {
  const [activeTeam, setActiveTeam] = useState(null);

  return (
    <div className="ab-page section-light">

      {/* ══════════════════════════════════════════════════════
          § 1  HERO
      ══════════════════════════════════════════════════════ */}
      <section className="ab-hero ab-dotgrid" aria-label="About CyberNexus">

        {/* edition bar */}
        <div className="ab-hero-edition reveal">
          <span>
            Encyclopaedia Cybernetica &nbsp;·&nbsp;
            <span>Volume XII</span>
            &nbsp;·&nbsp; About the Platform
          </span>
          <div className="ab-hero-edition-right">
            <span className="ab-hero-edition-tag">EST. 2021</span>
            <span>OSCP · CTF · DFIR · RED TEAM</span>
          </div>
        </div>

        {/* main hero grid */}
        <div className="ab-hero-body">

          {/* left */}
          <div className="reveal-left">
            <p className="ab-hero-kicker">
              <span>Who We Are</span>
            </p>

            <h1 className="ab-hero-title">
              Built by hackers.<br />
              <em>For curious minds</em><br />
              <span className="ab-accent">of every background.</span>
            </h1>

            <p className="ab-hero-lead">
              CyberNexus is a <strong>live learning platform</strong> and
              encyclopaedic reference for offensive &amp; defensive security.
              Not a course marketplace. Not a video library.
              A <strong>practitioner-built compendium</strong> — indexed,
              cross-referenced, and updated in real time.
            </p>

            <div className="ab-hero-cta">
              <a href="#mission" className="ab-btn-primary">
                ▶ Our Mission
              </a>
              <a href="#team" className="ab-btn-ghost">
                ◈ Meet the Team
              </a>
            </div>
          </div>

          {/* right — manifesto terminal */}
          <div className="ab-hero-terminal reveal-right">
            <div className="ab-terminal-bar">
              <div className="ab-terminal-dots">
                <span /><span /><span />
              </div>
              <span className="ab-terminal-title">nexus@codex:~/about</span>
            </div>

            <div className="ab-terminal-body">
              <span className="ab-t-line">
                <span className="ab-t-comment"># CyberNexus Platform Manifest</span>
              </span>
              <span className="ab-t-line">&nbsp;</span>

              <span className="ab-t-line">
                <span className="ab-t-prompt">❯ </span>
                <span className="ab-t-cmd">cat </span>
                <span className="ab-t-str">mission.md</span>
              </span>

              <span className="ab-t-line ab-t-indent">
                <span className="ab-t-key">founded: </span>
                <span className="ab-t-val">2021</span>
                <span className="ab-t-muted"> · Mumbai, IN</span>
              </span>
              <span className="ab-t-line ab-t-indent">
                <span className="ab-t-key">members: </span>
                <span className="ab-t-val">12,400</span>
                <span className="ab-t-ok"> +340/wk</span>
              </span>
              <span className="ab-t-line ab-t-indent">
                <span className="ab-t-key">lectures: </span>
                <span className="ab-t-val">94</span>
                <span className="ab-t-muted"> · 8 live</span>
              </span>
              <span className="ab-t-line ab-t-indent">
                <span className="ab-t-key">ctf_season: </span>
                <span className="ab-t-purple">IV</span>
                <span className="ab-t-muted"> · 380 chals</span>
              </span>
              <span className="ab-t-line ab-t-indent">
                <span className="ab-t-key">domains: </span>
                <span className="ab-t-val">40</span>
                <span className="ab-t-muted"> · cross-referenced</span>
              </span>

              <span className="ab-t-line">&nbsp;</span>

              <span className="ab-t-line">
                <span className="ab-t-prompt">❯ </span>
                <span className="ab-t-cmd">nexus status</span>
              </span>

              <span className="ab-t-line ab-t-indent">
                <span className="ab-t-ok">● </span>
                <span className="ab-t-val">Platform operational</span>
              </span>
              <span className="ab-t-line ab-t-indent">
                <span className="ab-t-ok">● </span>
                <span className="ab-t-val">All labs online</span>
              </span>
              <span className="ab-t-line ab-t-indent">
                <span className="ab-t-ok">● </span>
                <span className="ab-t-val">CTF Arena live</span>
              </span>

              <span className="ab-t-line">&nbsp;</span>

              <span className="ab-t-line">
                <span className="ab-t-prompt">❯ </span>
                <span className="ab-t-cursor" />
              </span>
            </div>
          </div>

        </div>

        {/* stat strip */}
        <div className="ab-hero-stats">
          {HERO_STATS.map(({ icon, val, accent, label, delta }) => (
            <div className="ab-hero-stat" key={label}>
              <div className="ab-stat-icon" aria-hidden="true">{icon}</div>
              <div className="ab-stat-val">
                {val}<span>{accent}</span>
              </div>
              <div className="ab-stat-label">{label}</div>
              <div className="ab-stat-delta">{delta}</div>
            </div>
          ))}
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════
          § 2  MISSION
      ══════════════════════════════════════════════════════ */}
      <section className="ab-mission ab-dotgrid" id="mission" aria-label="Our mission">
        <div className="ab-mission-inner">

          {/* left */}
          <div className="ab-mission-left reveal-left">
            <div className="ab-label"><span>Mission Statement</span></div>

            <h2 className="ab-mission-title">
              Security knowledge<br />
              should be <em>encyclopaedic,</em><br />
              not episodic.
            </h2>

            <p className="ab-mission-body">
              Most security education is fragmented — a course here, a YouTube video
              there, a blog post that assumes you already know half the background.
              <strong> CyberNexus exists to fix that.</strong>
            </p>

            <p className="ab-mission-body" style={{ marginTop: 14 }}>
              We built a platform where every concept is indexed, every lecture is
              timestamped and cross-referenced, and every CTF challenge maps back to
              a domain in the Codex. Its the platform we wished existed when we
              were learning — and its <strong>free to explore.</strong>
            </p>

            <div className="ab-mission-values">
              {VALUES.map(({ icon, name, color, desc }) => (
                <div className="ab-value-row" key={name}>
                  <div
                    className="ab-value-icon"
                    style={{ color }}
                    aria-hidden="true"
                  >
                    {icon}
                  </div>
                  <div className="ab-value-text">
                    <div className="ab-value-name" style={{ color }}>{name}</div>
                    <div className="ab-value-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right */}
          <div className="ab-mission-right reveal-right">

            {/* domain hex grid */}
            <div className="ab-mission-visual">
              <div className="ab-mission-visual-bar">
                <span>Coverage Map · 40+ Domains</span>
                <div className="ab-mission-visual-live">
                  <span className="ab-mission-visual-live-dot" aria-hidden="true" />
                  LIVE
                </div>
              </div>
              <div className="ab-mission-canvas">
                {DOMAINS.map(({ icon, name, count, color }) => (
                  <div className="ab-domain-hex" key={name}>
                    <div
                      className="ab-domain-hex-icon"
                      style={{ color }}
                      aria-hidden="true"
                    >
                      {icon}
                    </div>
                    <div className="ab-domain-hex-name">{name}</div>
                    <div className="ab-domain-hex-count">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* principle cards */}
            <div className="ab-principles">
              {PRINCIPLES.map(({ icon, name, desc }) => (
                <div className="ab-principle" key={name}>
                  <div className="ab-principle-icon" aria-hidden="true">{icon}</div>
                  <div className="ab-principle-name">{name}</div>
                  <div className="ab-principle-desc">{desc}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 3  TEAM
      ══════════════════════════════════════════════════════ */}
      <section className="ab-team ab-dotgrid" id="team" aria-label="Our team">
        <div className="ab-team-inner">

          <div className="ab-team-header reveal">
            <div>
              <div className="ab-label"><span>The Instructors</span></div>
              <h2 className="ab-team-title">
                Practitioners.<br />
                <em>Not presenters.</em>
              </h2>
              <p className="ab-team-sub">
                Every instructor on CyberNexus is an active security
                professional — not a content creator.
              </p>
            </div>
            <div className="ab-team-count">
              <strong>8 instructors</strong> · 40+ years combined experience
            </div>
          </div>

          <div className="ab-team-grid">
            {TEAM.map((member, idx) => (
              <div
                key={member.name}
                className="ab-team-card"
                style={{ animationDelay: `${idx * 0.08}s` }}
                onMouseEnter={() => setActiveTeam(member.name)}
                onMouseLeave={() => setActiveTeam(null)}
              >
                {/* bar */}
                <div className="ab-team-card-bar">
                  <span>{member.barLabel}</span>
                  <span style={{ color: member.color }}>●</span>
                </div>

                {/* avatar */}
                <div className="ab-team-avatar-wrap">
                  <div
                    className="ab-team-avatar"
                    style={{
                      background:  `${member.color}18`,
                      color:        member.color,
                      borderColor: `${member.color}55`,
                    }}
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>
                  <div className="ab-team-name">{member.name}</div>
                  <div
                    className="ab-team-role"
                    style={{ color: member.roleColor }}
                  >
                    {member.role}
                  </div>
                </div>

                {/* body */}
                <div className="ab-team-body">
                  <p className="ab-team-bio">{member.bio}</p>

                  <div className="ab-team-tags">
                    {member.tags.map((tag) => (
                      <span className="ab-team-tag" key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="ab-team-socials">
                    {member.socials.map((s) => (
                      <a
                        key={s.label}
                        href="#"
                        className="ab-team-social"
                        aria-label={s.label}
                      >
                        <span aria-hidden="true">{s.icon}</span>
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* hiring card */}
            <div className="ab-team-card-hire" role="article" aria-label="We are hiring">
              <div className="ab-hire-icon" aria-hidden="true">⬡</div>
              <div className="ab-hire-title">Join the Team</div>
              <p className="ab-hire-sub">
                We looking for active practitioners to join as instructors
                or curriculum contributors.
              </p>
              <button className="ab-hire-btn">
                View Open Roles →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 4  TIMELINE
      ══════════════════════════════════════════════════════ */}
      <section className="ab-timeline ab-dotgrid" id="timeline" aria-label="Platform history">
        <div className="ab-timeline-inner">

          <div className="ab-timeline-header reveal">
            <div className="ab-label"><span>Platform History</span></div>
            <h2 className="ab-timeline-title">
              From a Codex<br />
              to a <em>community.</em>
            </h2>
            <p className="ab-timeline-sub">
              Four years. 12,400 members. One mission.
            </p>
          </div>

          <div className="ab-tl-track" role="list">
            {TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className={`ab-tl-item ${item.side}`}
                role="listitem"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* content */}
                <div className="ab-tl-content">
                  <div
                    className="ab-tl-year"
                    style={{ color: item.yearColor }}
                  >
                    {item.year}
                  </div>
                  <div className="ab-tl-card">
                    <div className="ab-tl-event">{item.event}</div>
                    <p className="ab-tl-desc">{item.desc}</p>
                    <span
                      className="ab-tl-chip"
                      style={{
                        color:       item.chip.color,
                        background:  item.chip.bg,
                        borderColor: item.chip.border,
                      }}
                    >
                      {item.chip.label}
                    </span>
                  </div>
                </div>

                {/* center node */}
                <div className="ab-tl-node">
                  <div
                    className="ab-tl-dot"
                    style={{
                      color:       item.iconColor,
                      borderColor: `${item.iconColor}55`,
                      background:  item.iconBg,
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                </div>

                {/* empty opposite side */}
                <div className="ab-tl-empty" aria-hidden="true" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 5  PRESS / PARTNERS
      ══════════════════════════════════════════════════════ */}
      <section className="ab-press" aria-label="As seen in">
        <div className="ab-press-inner">
          <div className="ab-press-label">
            Recognised by the security community
          </div>
          <div className="ab-press-grid">
            {PRESS.map(({ icon, name }) => (
              <div className="ab-press-item" key={name}>
                <div className="ab-press-icon" aria-hidden="true">{icon}</div>
                <div className="ab-press-name">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 6  CTA
      ══════════════════════════════════════════════════════ */}
      <section className="ab-cta ab-dotgrid" aria-label="Get started">
        <div className="ab-cta-inner">

          <div>
            <div className="ab-label"><span>Ready to Begin</span></div>
            <h2 className="ab-cta-title">
              Start exploring<br />
              the Codex <em>today.</em>
            </h2>
            <p className="ab-cta-sub">
              Free to read. No account needed to browse the Codex.
              Create a free account to unlock CTF challenges, track
              progress, and join the community.
            </p>
            <div className="ab-cta-actions">
              <a href="#" className="ab-btn-primary">
                ▶ Start for Free
              </a>
              <a href="#" className="ab-btn-ghost">
                ⚑ View CTF Arena
              </a>
            </div>
          </div>

          <div className="ab-cta-right">
            <div className="ab-cta-stat-row">
              {CTA_STATS.map(({ val, accent, label }) => (
                <div className="ab-cta-stat" key={label}>
                  <div className="ab-cta-stat-val">
                    {val}<span>{accent}</span>
                  </div>
                  <div className="ab-cta-stat-lbl">{label}</div>
                </div>
              ))}
            </div>
            <div className="ab-cta-note">
              No credit card · Cancel anytime · Student discount available
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}