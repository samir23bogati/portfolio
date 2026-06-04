import React, { useEffect, useState } from "react";
import "./PageLoader.css";

/* Module-level flag: resets on browser refresh, survives React route navigation */
let loaderShown = false;

const PageLoader = ({ onDone }) => {
  const [phase, setPhase] = useState("entering"); // entering → visible → leaving → gone

  useEffect(() => {
    if (loaderShown) {
      setPhase("gone");
      onDone?.();
      return;
    }
    loaderShown = true;

    /* hold for 1.6s then slide up */
    const holdTimer = setTimeout(() => setPhase("leaving"), 1600);

    /* tell the parent it's done after the exit animation (~700ms) */
    const doneTimer = setTimeout(() => {
      setPhase("gone");
      onDone?.();
    }, 2300);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  if (phase === "gone") return null;

  return (
    <div className={`pageLoader ${phase}`} aria-hidden="true">
      <div className="loaderContent">
        <div className="loaderRingWrap">
          <div className="loaderRing" />
          <div className="loaderRingInner" />
        </div>

        <h1 className="loaderName">Samir Bogati</h1>
        <p className="loaderRole">Computer Engineer</p>

        <div className="loaderBarWrap">
          <div className="loaderBar" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
