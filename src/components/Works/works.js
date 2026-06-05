import React from "react";
import "./works.css";
import rct     from "../../assets/rct.png";
import html    from "../../assets/html.png";
import css     from "../../assets/css.png";
import js      from "../../assets/js.png";
import node    from "../../assets/node.png";
import github  from "../../assets/github.png";
import flutter from "../../assets/flutter.jpg";
import firebase     from "../../assets/Firebase.png";
import firestore    from "../../assets/firestore.png";
import dart         from "../../assets/dart.png";
import android      from "../../assets/android.png";
import googleplay   from "../../assets/googleplayconsole.png";

const ROW1 = [
  { img: html,    name: "HTML 5"       },
  { img: css,     name: "CSS 3"        },
  { img: js,      name: "JavaScript"   },
  { img: rct,     name: "React.js"     },
  { img: node,    name: "Node.js"      },
  { img: flutter, name: "Flutter"      },
];

const ROW2 = [
  { img: dart,      name: "Dart"          },
  { img: firebase,  name: "Firebase"      },
  { img: firestore, name: "Firestore"     },
  { img: android,   name: "Android"       },
  { img: github,    name: "GitHub"        },
  { img: googleplay, name: "Play Console" },
];

/* Duplicate items for a seamless infinite loop */
const MarqueeRow = ({ items, reverse = false, speed = 22 }) => {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-row${reverse ? " marquee-rev" : ""}`}>
      <div className="marquee-belt" style={{ "--speed": `${speed}s` }}>
        {doubled.map((sk, i) => (
          <div key={i} className="sk-chip">
            <img src={sk.img} alt={sk.name} className="sk-logo" />
            <span className="sk-name">{sk.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Works = () => (
  <section id="works">
    <div className="works-inner">

      <div className="works-header">
        <span className="works-eyebrow">Tech Stack</span>
        <h2 className="workstitle">My Skills</h2>
        <p className="worksDesc">
          Building web &amp; mobile products with modern frameworks and tools —
          from React and Node.js on the web to Flutter and Dart on mobile.
        </p>
      </div>

      <div className="marquee-stage">
        {/* Edge fade-out gradients */}
        <div className="marquee-edge left"  />
        <div className="marquee-edge right" />

        <MarqueeRow items={ROW1} speed={22} />
        <MarqueeRow items={ROW2} speed={28} reverse />
      </div>

    </div>
  </section>
);

export default Works;
