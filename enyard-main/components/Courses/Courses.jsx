"use client";

import { useState, useMemo } from "react";
import "@/styles/cyber-courses.css";

/* ── DATA ──────────────────────────────────────────────────── */
const FEATURED = {
  id: "f1",
  eyebrow: { label: "Featured Path", chip: "cl-chip-blue" },
  liveChip: { label: "LIVE NOW", chip: "cl-chip-green" },
  title: "Web Application Penetration Testing",
  titleAccent: "Penetration Testing",
  desc:
    "The complete offensive web security track — from HTTP fundamentals to advanced injection, SSRF, OAuth abuse, and real-world bug bounty methodology. Led live every Monday & Wednesday.",
  instructor: { initials: "AK", color: "#7aa2f7", name: "A. Kapoor" },
  watching: 284,
  duration: "14h 30m",
  modules: 12,
  level: "Intermediate",
  modules_list: [
    { num: "01", name: "HTTP Deep Dive & Burp Suite", dur: "52m", done: true },
    { num: "02", name: "Recon & Fingerprinting",      dur: "44m", done: true },
    { num: "03", name: "SQLi — Manual & Automated",   dur: "1h 08m", done: false },
    { num: "04", name: "XSS & DOM Clobbering",        dur: "58m", done: false },
    { num: "05", name: "SSRF & CORS Misconfig",        dur: "1h 02m", done: false },
  ],
};

const COURSES = [
  {
    id: "c1",
    type: "Lecture",
    typeIcon: "▶",
    accentColor: "#7aa2f7",
    accentGrad: "linear-gradient(90deg,#7aa2f7,#7dcfff)",
    chips: [
      { label: "Beginner", cls: "cl-chip-green" },
      { label: "Linux", cls: "cl-chip-blue" },
    ],
    title: "Linux Internals for Hackers",
    desc: "Process memory, syscalls, /proc filesystem, and privilege boundaries explained from scratch.",
    instructor: { initials: "SR", color: "#9ece6a", name: "S. Reyes" },
    duration: "3h 20m",
    students: "2.4k",
    progress: 0,
    live: false,
    watching: null,
    actionLabel: "Start",
    actionCls: "cl-card-action-blue",
  },
  {
    id: "c2",
    type: "Live",
    typeIcon: "●",
    accentColor: "#9ece6a",
    accentGrad: "linear-gradient(90deg,#9ece6a,#73daca)",
    chips: [
      { label: "Advanced", cls: "cl-chip-red" },
      { label: "Binary",   cls: "cl-chip-yellow" },
    ],
    title: "Heap Exploitation & glibc Internals",
    desc: "tcache poisoning, House of Orange, and fastbin attacks against modern glibc allocators.",
    instructor: { initials: "TN", color: "#e0af68", name: "T. Nguyen" },
    duration: "2h 15m",
    students: "891",
    progress: 0,
    live: true,
    watching: 127,
    actionLabel: "Join Live",
    actionCls: "cl-card-action-green",
  },
  {
    id: "c3",
    type: "Lecture",
    typeIcon: "▶",
    accentColor: "#bb9af7",
    accentGrad: "linear-gradient(90deg,#bb9af7,#7aa2f7)",
    chips: [
      { label: "Intermediate", cls: "cl-chip-blue" },
      { label: "AD",           cls: "cl-chip-purple" },
    ],
    title: "Active Directory Attacks",
    desc: "Kerberoasting, AS-REP roasting, Pass-the-Hash, DCSync, and BloodHound enumeration.",
    instructor: { initials: "ML", color: "#bb9af7", name: "M. Larsson" },
    duration: "5h 44m",
    students: "3.1k",
    progress: 42,
    live: false,
    watching: null,
    actionLabel: "Continue",
    actionCls: "cl-card-action-blue",
  },
  {
    id: "c4",
    type: "Workshop",
    typeIcon: "⬡",
    accentColor: "#e0af68",
    accentGrad: "linear-gradient(90deg,#e0af68,#ff9e64)",
    chips: [
      { label: "Forensics", cls: "cl-chip-yellow" },
      { label: "DFIR",      cls: "cl-chip-cyan" },
    ],
    title: "Digital Forensics Workshop",
    desc: "Disk imaging, memory acquisition, timeline analysis, and artifact recovery with open-source tools.",
    instructor: { initials: "PV", color: "#7dcfff", name: "P. Vasquez" },
    duration: "4h 10m",
    students: "1.7k",
    progress: 0,
    live: false,
    watching: null,
    actionLabel: "Start",
    actionCls: "cl-card-action-blue",
  },
  {
    id: "c5",
    type: "Live",
    typeIcon: "●",
    accentColor: "#f7768e",
    accentGrad: "linear-gradient(90deg,#f7768e,#ff9e64)",
    chips: [
      { label: "Advanced",  cls: "cl-chip-red" },
      { label: "Malware",   cls: "cl-chip-purple" },
    ],
    title: "Malware Analysis & Reverse Engineering",
    desc: "Static and dynamic analysis, IDA Pro, Ghidra, sandbox evasion techniques, and unpacking.",
    instructor: { initials: "EO", color: "#f7768e", name: "E. Osei" },
    duration: "6h 55m",
    students: "2.2k",
    progress: 0,
    live: true,
    watching: 214,
    actionLabel: "Join Live",
    actionCls: "cl-card-action-green",
  },
  {
    id: "c6",
    type: "Lecture",
    typeIcon: "▶",
    accentColor: "#7dcfff",
    accentGrad: "linear-gradient(90deg,#7dcfff,#2ac3de)",
    chips: [
      { label: "Beginner",  cls: "cl-chip-green" },
      { label: "Crypto",    cls: "cl-chip-cyan" },
    ],
    title: "Cryptography from First Principles",
    desc: "Symmetric & asymmetric encryption, hash functions, PKI, TLS internals, and common crypto attacks.",
    instructor: { initials: "HJ", color: "#7dcfff", name: "H. Jensen" },
    duration: "4h 30m",
    students: "4.0k",
    progress: 78,
    live: false,
    watching: null,
    actionLabel: "Resume",
    actionCls: "cl-card-action-blue",
  },
];

const FILTERS = [
  { id: "all",       label: "All",       icon: "⌬", count: 94  },
  { id: "live",      label: "Live",      icon: "●", count: 8   },
  { id: "lecture",   label: "Lectures",  icon: "▶", count: 61  },
  { id: "workshop",  label: "Workshops", icon: "⬡", count: 14  },
  { id: "beginner",  label: "Beginner",  icon: "#", count: 22  },
  { id: "advanced",  label: "Advanced",  icon: "⚑", count: 31  },
];

const DOMAINS = [
  { icon: "⬡", label: "Web Security",        count: 18 },
  { icon: "▸", label: "Binary Exploitation",  count: 12 },
  { icon: "⚑", label: "Forensics & DFIR",     count: 9  },
  { icon: "#", label: "Reverse Engineering",  count: 11 },
  { icon: "◈", label: "Active Directory",     count: 7  },
  { icon: "✦", label: "Cryptography",         count: 8  },
  { icon: "◎", label: "Network Security",     count: 10 },
  { icon: "⌘", label: "Malware Analysis",     count: 6  },
  { icon: "∿", label: "OSCP Prep",            count: 13 },
];

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function CoursesSection() {
  const [filter, setFilter]   = useState("all");
  const [domain, setDomain]   = useState(null);
  const [sort, setSort]       = useState("popular");
  const [showAll, setShowAll] = useState(false);

  const visible = useMemo(() => {
    let list = [...COURSES];
    if (filter === "live")      list = list.filter((c) => c.live);
    if (filter === "lecture")   list = list.filter((c) => c.type === "Lecture");
    if (filter === "workshop")  list = list.filter((c) => c.type === "Workshop");
    if (filter === "beginner")  list = list.filter((c) => c.chips.some((ch) => ch.label === "Beginner"));
    if (filter === "advanced")  list = list.filter((c) => c.chips.some((ch) => ch.label === "Advanced"));
    if (sort === "newest")      list = [...list].reverse();
    if (sort === "progress")    list = [...list].sort((a, b) => b.progress - a.progress);
    return showAll ? list : list.slice(0, 6);
  }, [filter, sort, showAll]);

  return (
    <section className="cl section-light" id="courses" aria-label="Course catalog">
      <div className="cl-inner">

        {/* ── Header ── */}
        <div className="cl-header reveal">
          <div className="cl-header-left">
            <div className="cl-label"><span>Lecture Catalog</span></div>
            <h2 className="cl-title">
              Learn by doing.<br />
              <em>Every discipline covered.</em>
            </h2>
            <p className="cl-sub">
              94 lectures across 40+ security domains — from beginner to advanced.
            </p>
          </div>
          <div className="cl-header-right">
            <div className="cl-live-strip">
              <span className="cl-live-dot" />
              <span><strong>8 lectures</strong> streaming live right now</span>
            </div>
            <a href="#" className="cl-view-all">
              View full catalog →
            </a>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <div className="cl-filters" role="group" aria-label="Filter courses">
          {FILTERS.map(({ id, label, icon, count }) => (
            <button
              key={id}
              className={`cl-filter-btn${filter === id ? " active" : ""}`}
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
              <span className="cl-filter-count">{count}</span>
            </button>
          ))}

          <span className="cl-filter-sep" aria-hidden="true" />

          <div className="cl-sort">
            <span>sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort courses"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="progress">My Progress</option>
            </select>
          </div>
        </div>

        {/* ── Main Layout ── */}
        <div className="cl-layout">

          {/* ── Sidebar — Domain Nav ── */}
          <nav className="cl-sidebar" aria-label="Domain navigation">
            <div className="cl-sidebar-title">Domains</div>
            {DOMAINS.map(({ icon, label, count }) => (
              <button
                key={label}
                className={`cl-sidebar-item${domain === label ? " active" : ""}`}
                onClick={() => setDomain(domain === label ? null : label)}
                aria-pressed={domain === label}
              >
                <span className="cl-sidebar-item-left">
                  <span className="cl-sidebar-icon" aria-hidden="true">{icon}</span>
                  {label}
                </span>
                <span className="cl-sidebar-num">{count}</span>
              </button>
            ))}
            <div className="cl-sidebar-divider" />
            <button
              className="cl-sidebar-item"
              onClick={() => { setDomain(null); setFilter("all"); }}
            >
              <span className="cl-sidebar-item-left">
                <span className="cl-sidebar-icon" aria-hidden="true">↺</span>
                Reset filters
              </span>
            </button>
          </nav>

          {/* ── Course Grid ── */}
          <div>

            {/* Featured wide card */}
            {(filter === "all" || filter === "live") && (
              <div className="cl-card-wide reveal" role="article" aria-label="Featured course">
                <div className="cl-wide-left">
                  <div className="cl-wide-eyebrow">
                    <span className={`cl-chip ${FEATURED.eyebrow.chip}`}>
                      {FEATURED.eyebrow.label}
                    </span>
                    <span className={`cl-chip ${FEATURED.liveChip.chip}`}>
                      <span className="cl-live-badge">
                        <span className="cl-live-badge-dot" aria-hidden="true" />
                        {FEATURED.liveChip.label}
                      </span>
                    </span>
                    <span className="cl-card-meta-item">
                      <span aria-hidden="true">◎</span>
                      <span>{FEATURED.watching} watching</span>
                    </span>
                  </div>

                  <h3 className="cl-wide-title">{FEATURED.title}</h3>
                  <p className="cl-wide-desc">{FEATURED.desc}</p>

                  <div className="cl-wide-meta">
                    <div className="cl-wide-meta-item">
                      <span aria-hidden="true">◷</span>
                      <strong>{FEATURED.duration}</strong>
                    </div>
                    <div className="cl-wide-meta-item">
                      <span aria-hidden="true">⬡</span>
                      <strong>{FEATURED.modules} modules</strong>
                    </div>
                    <div className="cl-wide-meta-item">
                      <span aria-hidden="true">⚑</span>
                      <strong>{FEATURED.level}</strong>
                    </div>
                    <div className="cl-wide-meta-item">
                      <span aria-hidden="true">◈</span>
                      <strong>by {FEATURED.instructor.name}</strong>
                    </div>
                  </div>

                  <div className="cl-wide-actions">
                    <button className="cl-wide-btn-primary">
                      <span aria-hidden="true">▶</span>
                      Join Live Session
                    </button>
                    <button className="cl-wide-btn-ghost">View Syllabus</button>
                  </div>
                </div>

                <div className="cl-wide-right">
                  <div className="cl-wide-right-title">Course Modules</div>
                  {FEATURED.modules_list.map((m) => (
                    <div className="cl-module" key={m.num}>
                      <span className="cl-module-num">{m.num}</span>
                      <span className="cl-module-name">{m.name}</span>
                      <span className="cl-module-dur">{m.dur}</span>
                      <span
                        className="cl-module-status"
                        style={{
                          background: m.done
                            ? "var(--green)"
                            : "var(--bg-light)",
                          border: m.done
                            ? "none"
                            : "1px solid var(--border)",
                        }}
                        aria-label={m.done ? "Completed" : "Not started"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course card grid */}
            <div className="cl-grid" style={{ marginTop: 16 }}>
              {visible.map((course, idx) => (
                <article
                  key={course.id}
                  className={`cl-card${course.live ? " live" : ""}`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  role="article"
                  aria-label={course.title}
                >
                  {/* colored accent strip */}
                  <div className="cl-card-thumb">
                    <div
                      className="cl-card-thumb-fill"
                      style={{ background: course.accentGrad }}
                    />
                  </div>

                  {/* card header */}
                  <div className="cl-card-head">
                    <div className="cl-card-type" style={{ color: course.accentColor }}>
                      <span className="cl-card-type-icon" aria-hidden="true">
                        {course.typeIcon}
                      </span>
                      {course.live ? (
                        <span className="cl-live-badge">
                          <span className="cl-live-badge-dot" aria-hidden="true" />
                          LIVE
                        </span>
                      ) : (
                        course.type
                      )}
                    </div>
                    <div className="cl-card-badges">
                      {course.chips.map((ch) => (
                        <span key={ch.label} className={`cl-chip ${ch.cls}`}>
                          {ch.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* card body */}
                  <div className="cl-card-body">
                    <h3 className="cl-card-title">{course.title}</h3>
                    <p className="cl-card-desc">{course.desc}</p>

                    <div className="cl-card-meta">
                      <div className="cl-card-meta-item">
                        <span aria-hidden="true">◷</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="cl-card-meta-item">
                        <span aria-hidden="true">◈</span>
                        <span>{course.students} enrolled</span>
                      </div>
                      {course.live && course.watching && (
                        <div className="cl-card-meta-item" style={{ color: "var(--green)" }}>
                          <span aria-hidden="true">●</span>
                          <span>{course.watching} watching</span>
                        </div>
                      )}
                    </div>

                    {/* progress bar */}
                    {course.progress > 0 && (
                      <div
                        className="cl-card-progress"
                        role="progressbar"
                        aria-valuenow={course.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${course.progress}% complete`}
                      >
                        <div
                          className="cl-card-progress-fill"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* card footer */}
                  <div className="cl-card-foot">
                    <div className="cl-card-instructor">
                      <div
                        className="cl-instructor-dot"
                        style={{
                          background:  `${course.instructor.color}18`,
                          color:        course.instructor.color,
                          borderColor: `${course.instructor.color}55`,
                        }}
                        aria-hidden="true"
                      >
                        {course.instructor.initials}
                      </div>
                      {course.instructor.name}
                    </div>
                    <button className={`cl-card-action ${course.actionCls}`}>
                      {course.actionLabel} →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Load more / footer */}
            <div className="cl-footer">
              <div className="cl-count-info">
                Showing <strong>{visible.length}</strong> of{" "}
                <strong>94</strong> lectures
              </div>
              <button
                className="cl-load-more"
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? "[ show less − ]" : "[ load more + ]"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}