import { useEffect, useRef, useState } from "react";
import "./intro.css";
import bg from "../../assets/bg.png";

let introAnimated = false;

const HERO_LINES = [
  "// Hello! 👋  Welcome to my portfolio.",
  "",
  "const developer = {",
  '  name:       "Er. Samir Bogati",',
  '  role:       "Computer Engineer",',
  '  builds:     "Mobile & Web Apps",',
  '  stack:      "Modern Technologies",',
  '  delivers:   "Seamless User Experience",',
  "  available:   true,",
  "};",
  "",
  "// Let's build something great! 🚀",
];

function tokenize(line) {
  if (!line.trim()) return [{ text: " ", cls: "" }];
  if (/^\s*\/\//.test(line)) return [{ text: line, cls: "tc-cmt" }];

  const tokens = [];
  let s = line;
  const P = [
    [/^(const|let|var|function|return|class|import|export|from|of|in|new)\b/, "tc-kw"],
    [/^(true|false|null|undefined)\b/, "tc-bool"],
    [/^"[^"]*"/, "tc-str"],
    [/^'[^']*'/, "tc-str"],
    [/^`[^`]*`/, "tc-str"],
    [/^\b\d+\.?\d*\b/, "tc-num"],
    [/^[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/, "tc-fn"],
    [/^[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*:)/, "tc-prop"],
    [/^[a-zA-Z_$][a-zA-Z0-9_$]*/, "tc-id"],
    [/^[\[\]{}(),;.]/, "tc-pun"],
    [/^./, "tc-op"],
  ];

  let i = 0;
  while (s.length) {
    let hit = false;
    for (const [re, cls] of P) {
      const m = s.match(re);
      if (m) {
        tokens.push({ text: m[0], cls, key: i++ });
        s = s.slice(m[0].length);
        hit = true;
        break;
      }
    }
    if (!hit) s = s.slice(1);
  }
  return tokens;
}

const HeroTerminal = ({ startDelay = 0 }) => {
  const [started, setStarted] = useState(startDelay === 0);
  const [doneLines, setDoneLines] = useState([]);
  const [curLine, setCurLine] = useState(0);
  const [curChar, setCurChar] = useState(0);
  const [blink, setBlink] = useState(true);
  const isDone = curLine >= HERO_LINES.length;

  useEffect(() => {
    if (startDelay > 0) {
      const t = setTimeout(() => setStarted(true), startDelay);
      return () => clearTimeout(t);
    }
  }, [startDelay]);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!started || isDone) return;
    const line = HERO_LINES[curLine];

    if (line === "" || curChar >= line.length) {
      const t = setTimeout(
        () => {
          setDoneLines((dl) => [...dl, line]);
          setCurLine((l) => l + 1);
          setCurChar(0);
        },
        line === "" ? 50 : 70
      );
      return () => clearTimeout(t);
    }

    /* Comments type a bit faster for a flowing feel */
    const speed = line.trimStart().startsWith("//") ? 18 : 22;
    const t = setTimeout(() => setCurChar((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [started, isDone, curLine, curChar]);

  const typingText = !isDone && started ? HERO_LINES[curLine].slice(0, curChar) : null;
  const curLn  = doneLines.length + 1;
  const curCol = typingText !== null ? typingText.length + 1 : 1;

  return (
    <div className="terminal hero-terminal intro-el el-3">
      {/* ── macOS header ── */}
      <div className="terminal-hdr">
        <div className="t-dots">
          <span className="t-dot t-red" />
          <span className="t-dot t-yellow" />
          <span className="t-dot t-green" />
        </div>
        <span className="t-filename">~/portfolio/developer.js</span>
      </div>

      {/* ── VS Code-style file tab ── */}
      <div className="terminal-tabs">
        <div className="t-tab">
          <span className="t-badge">JS</span>
          developer.js
        </div>
      </div>

      {/* ── Code body ── */}
      <div className="terminal-code">
        {/* Idle cursor before typing starts */}
        {!started && (
          <div className="t-line">
            <span className="t-lnum">1</span>
            <span className="t-content">
              <span className={`t-cursor${blink ? " on" : ""}`}>|</span>
            </span>
          </div>
        )}

        {/* Completed lines with syntax highlighting */}
        {doneLines.map((line, i) => (
          <div key={i} className="t-line">
            <span className="t-lnum">{i + 1}</span>
            <span className="t-content">
              {tokenize(line).map((tok, j) => (
                <span key={j} className={tok.cls}>{tok.text}</span>
              ))}
            </span>
          </div>
        ))}

        {/* Currently-typing line */}
        {(typingText !== null || isDone) && (
          <div className={`t-line${!isDone ? " t-line-active" : ""}`}>
            <span className="t-lnum">{curLn}</span>
            <span className="t-content">
              {typingText ?? ""}
              <span className={`t-cursor${blink ? " on" : ""}`}>|</span>
            </span>
          </div>
        )}
      </div>

      {/* ── VS Code-style status bar ── */}
      <div className="terminal-statusbar">
        <div className="sb-left">
          <span className="sb-branch">⎇ main</span>
          <span className="sb-item">0 errors</span>
        </div>
        <div className="sb-right">
          <span className="sb-item">
            Ln {isDone ? HERO_LINES.length : curLn},
            Col {isDone ? 1 : curCol}
          </span>
          <span className="sb-item sb-lang">JavaScript</span>
          <span className="sb-item">UTF-8</span>
        </div>
      </div>
    </div>
  );
};

const Intro = () => {
  const sectionRef = useRef(null);
  /* Capture BEFORE the effect flips the flag — true means navigate-back */
  const isNavigateBack = introAnimated;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (introAnimated) {
      section.classList.add("intro-done");
      return;
    }

    introAnimated = true;
    const t = setTimeout(() => section.classList.add("intro-animate"), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="intro" ref={sectionRef}>
      <div className="introContent">
        <HeroTerminal startDelay={isNavigateBack ? 200 : 2600} />
      </div>
      <img src={bg} alt="Profile" className="bg intro-bg" />
    </section>
  );
};

export default Intro;
