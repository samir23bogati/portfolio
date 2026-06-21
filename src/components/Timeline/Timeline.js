import React, { useState, useEffect, useRef } from "react";
import "./Timeline.css";

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
const TIMELINE = [
  {
    id: "2023",
    year: "2023",
    label: "Foundation",
    desc: "Web development & digital marketing roots",
    accent: "#06b6d4",
    stats: { roles: 4, months: 14, skills: 8 },
    experiences: [
      {
        role: "Web Developer",
        company: "Rokka Brothers",
        type: "Freelance",
        period: "May – Jul 2023",
        duration: "3 mos",
        location: "Bakhru, Nepal",
        skills: ["HTML", "CSS", "JavaScript", "React.js"],
      },
      {
        role: "Web Development Intern",
        company: "CodSoft",
        type: "Internship",
        period: "Oct – Dec 2023",
        duration: "3 mos",
        skills: ["HTML", "CSS", "JavaScript"],
      },
      {
        role: "SEO / Content Writer",
        company: "WhattheNepal.com",
        type: "Full-time",
        period: "Dec 2023 – Mar 2024",
        duration: "4 mos",
        skills: ["SEO", "Content Writing", "Analytics"],
      },
      {
        role: "Social Media Manager",
        company: "CherieDigitalTech",
        type: "Full-time",
        period: "Dec 2023 – Mar 2024",
        duration: "4 mos",
        skills: ["Social Media", "Marketing", "Copywriting"],
      },
    ],
  },
  {
    id: "2024",
    year: "2024",
    label: "Full-Stack",
    desc: "MERN stack, Flutter & founding BogatiX",
    accent: "#a855f7",
    stats: { roles: 4, months: 12, skills: 12 },
    experiences: [
      
      {
        role: "Full-Stack Developer",
        company: "Cognifyz Technologies",
        type: "Internship",
        period: "Apr – Jun 2024",
        duration: "2 mos",
        skills: ["React.js", "Node.js", "MongoDB"],
      },
      {
        role: "Flutter Developer",
        company: "Padhshala Inc. Pvt. Ltd.",
        type: "Full-time",
        period: "Jun – Sept 2024",
        duration: "3 mos",
        skills: ["Flutter", "Dart", "Firebase"],
      },
      {
        role: "Silver Trading App",
        company: "Suvha Ornaments",
        type: "Freelance",
        period: "2024 · 1 mo",
        duration: "1 mo",
        location: "Patan, Nepal",
        skills: ["Flutter", "Firebase", "Google Play Console"],
      },
      {
        role: "Web Developer", 
        company: "GAOtek Inc.",
        type: "Part-time",
        period: "Dec 2024",
        duration: "3 mos",
        skills: ["Web Dev", "JavaScript"],
      },
      
    ],
  },
  {
    id: "2025",
    year: "2025",
    label: "Flutter Expert",
    desc: "Senior mobile engineering across multiple companies",
    accent: "#ff512f",
    stats: { roles: 3, months: 11, skills: 10 },
    experiences: [
      {
        role: "Founder & Developer",
        company: "BogatiX",
        type: "Full-time",
        period: "Jan 2025 – Present",
        duration: "1+ yrs",
        skills: ["Flutter", "React.js", "Node.js", "Firebase"],
        current: true,
      },
      {
        role: "Flutter Developer",
        company: "Chichii Online",
        type: "Part-time",
        period: "Feb 2025 – July 2025",
        duration: "8 mos",
        skills: ["Flutter", "Dart", "Android Dev"],
      },
      {
        role: "Mid Level Flutter Developer",
        company: "Supreme IT Solutions",
        type: "Full-time",
        period: "July 2025 – Sept 2025",
        duration: "2 mos",
        skills: ["Flutter", "Dart", "State Management"],
      },
      {
        role: "Flutter / MERNSTACK Developer",
        company: "Janak Tech",
        type: "Full-time",
        period: "Nov 2025 – Dec 2025",
        duration: "3 mos",
        location: "Kathmandu, Nepal · On-site",
        skills: ["Flutter", "React.js", "Next.js", "Node.js"],
      },
    ],
  },
  {
    id: "now",
    year: "Now",
    label: "Present",
    desc: "Active roles — building products & leading teams",
    accent: "#10b981",
    stats: { roles: 2, months: 12, skills: 15 },
    experiences: [
      {
        role: "Mid Level Flutter Developer",
        company: "Man I Corp Nepal",
        type: "Full-time",
        period: "Jan 2026 – Present",
        duration: "6 mos",
        location: "Kathmandu, Nepal",
        skills: ["Flutter", "Dart", "REST API", "CI/CD"],
        current: true,
      },
      {
        role: "Founder & Developer",
        company: "BogatiX",
        type: "Full-time",
        period: "Jan 2025 – Present",
        duration: "1+ yrs",
        skills: ["Flutter", "React.js", "Node.js", "Firebase", "MongoDB"],
        current: true,
      },
    ],
  },
];

const TYPE_META = {
  "Full-time":  { color: "#ff512f", bg: "rgba(255,81,47,0.12)"   },
  "Freelance":  { color: "#a855f7", bg: "rgba(168,85,247,0.12)"  },
  "Internship": { color: "#06b6d4", bg: "rgba(6,182,212,0.12)"   },
  "Part-time":  { color: "#10b981", bg: "rgba(16,185,129,0.12)"  },
};

/* ─────────────────────────────────────
   COUNT-UP HOOK
───────────────────────────────────── */
const useCountUp = (target, duration = 900, active = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
};

/* ─────────────────────────────────────
   STAT COUNTER
───────────────────────────────────── */
const StatBox = ({ label, value, suffix = "", active }) => {
  const count = useCountUp(value, 800, active);
  return (
    <div className="tl-stat">
      <span className="tl-stat-val">{count}{suffix}</span>
      <span className="tl-stat-label">{label}</span>
    </div>
  );
};

/* ─────────────────────────────────────
   EXPERIENCE CARD
───────────────────────────────────── */
const ExperienceCard = ({ exp, index, accent }) => {
  const meta = TYPE_META[exp.type] || TYPE_META["Full-time"];
  return (
    <div
      className="tl-card"
      style={{ "--card-accent": accent, animationDelay: `${index * 0.08}s` }}
    >
      <div className="tl-card-topbar" style={{ background: accent }} />

      <div className="tl-card-header">
        <div className="tl-card-company-row">
          <div className="tl-company-avatar" style={{ background: `${accent}22`, color: accent }}>
            {exp.company.charAt(0)}
          </div>
          <div className="tl-company-info">
            <span className="tl-company-name">{exp.company}</span>
            {exp.location && <span className="tl-location">📍 {exp.location}</span>}
          </div>
          {exp.current && (
            <span className="tl-now-badge">
              <span className="tl-now-dot" />
              NOW
            </span>
          )}
        </div>
        <span className="tl-type-badge" style={{ color: meta.color, background: meta.bg }}>
          {exp.type}
        </span>
      </div>

      <h3 className="tl-card-role">{exp.role}</h3>

      <div className="tl-card-meta">
        <span className="tl-period">{exp.period}</span>
        <span className="tl-sep">·</span>
        <span className="tl-duration">{exp.duration}</span>
      </div>

      <div className="tl-skills">
        {exp.skills.map((sk, i) => (
          <span
            key={i}
            className="tl-skill"
            style={{ animationDelay: `${index * 0.08 + 0.2 + i * 0.04}s` }}
          >
            {sk}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
   MAIN TIMELINE
───────────────────────────────────── */
const Timeline = () => {
  const [activeId, setActiveId] = useState("now");
  const [animKey, setAnimKey]   = useState(0);
  const [statsOn, setStatsOn]   = useState(false);
  const [visible, setVisible]   = useState(false);
  const sectionRef = useRef(null);

  /* Scroll-trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleYearClick = (id) => {
    if (id === activeId) return;
    setStatsOn(false);
    setActiveId(id);
    setAnimKey((k) => k + 1);
    setTimeout(() => setStatsOn(true), 100);
  };

  useEffect(() => {
    if (visible) setTimeout(() => setStatsOn(true), 400);
  }, [visible]);

  const activeData  = TIMELINE.find((d) => d.id === activeId);
  const activeIdx   = TIMELINE.findIndex((d) => d.id === activeId);
  const progressPct = (activeIdx / (TIMELINE.length - 1)) * 100;

  return (
    <section id="timeline" ref={sectionRef} className={visible ? "tl-visible" : ""}>
      <div className="tl-inner">

        {/* Header */}
        <div className="tl-header">
          <span className="tl-eyebrow">Experience</span>
          <h2 className="tl-heading">Career Journey</h2>
          <p className="tl-subheading">
            3+ years growing from web foundations to senior Flutter engineering
          </p>
        </div>

        {/* ── Desktop horizontal track ── */}
        <div className="tl-track-outer">
          <div className="tl-track-line-bg" />
          <div className="tl-track-line-fill" style={{ width: `${progressPct}%` }} />

          <div className="tl-track-nodes">
            {TIMELINE.map((item, i) => {
              const pct    = (i / (TIMELINE.length - 1)) * 100;
              const isActive = item.id === activeId;
              const isPast   = i <= activeIdx;
              return (
                <button
                  key={item.id}
                  className={`tl-node ${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""} ${item.id === "now" ? "is-present" : ""}`}
                  style={{ left: `${pct}%`, "--nc": item.accent }}
                  onClick={() => handleYearClick(item.id)}
                  aria-label={`View ${item.year} experience`}
                >
                  {isActive && <span className="tl-pulse" />}
                  <span className="tl-node-circle">
                    <span className="tl-node-inner" />
                  </span>
                  <span className="tl-node-year">{item.year}</span>
                  <span className="tl-node-lbl">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Mobile pill tabs ── */}
        <div className="tl-pills">
          {TIMELINE.map((item) => (
            <button
              key={item.id}
              className={`tl-pill ${activeId === item.id ? "active" : ""}`}
              style={{ "--pc": item.accent }}
              onClick={() => handleYearClick(item.id)}
            >
              <span className="tl-pill-year">{item.year}</span>
              <span className="tl-pill-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* ── Year summary + stats ── */}
        <div className="tl-summary" key={`s-${activeId}`}>
          <div className="tl-summary-left">
            <span className="tl-summary-year" style={{ color: activeData.accent }}>
              {activeData.year}
            </span>
            <div>
              <p className="tl-summary-title">{activeData.label}</p>
              <p className="tl-summary-desc">{activeData.desc}</p>
            </div>
          </div>
          <div className="tl-stats">
            <StatBox label="Roles"    value={activeData.stats.roles}  active={statsOn} />
            <StatBox label="Months"   value={activeData.stats.months} active={statsOn} />
            <StatBox label="Skills"   value={activeData.stats.skills} suffix="+" active={statsOn} />
          </div>
        </div>

        {/* ── Experience cards ── */}
        <div className="tl-cards" key={animKey}>
          {activeData.experiences.map((exp, i) => (
            <ExperienceCard
              key={`${activeId}-${i}`}
              exp={exp}
              index={i}
              accent={activeData.accent}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Timeline;
