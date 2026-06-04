import React, { useEffect, useState, useRef } from "react";
import "./PageLoader.css";

const PageLoader = ({ onDone }) => {
  const [phase, setPhase] = useState("entering"); // entering → visible → leaving → gone
  const complete = useRef(false);

  useEffect(() => {
    /*
     * StrictMode in dev mounts → unmounts → remounts the component.
     * We track completion via a ref (preserved across the simulated remount).
     * On the remount the ref is still false (timers were cleared in cleanup),
     * so the animation plays once correctly. After it finishes, complete = true,
     * and any future effect runs (e.g. hypothetical re-mounts) skip immediately.
     */
    if (complete.current) {
      setPhase("gone");
      onDone?.();
      return;
    }

    const holdTimer = setTimeout(() => setPhase("leaving"), 1600);
    const doneTimer = setTimeout(() => {
      complete.current = true;
      setPhase("gone");
      onDone?.();
    }, 2300);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
