import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -300, y: -300 });
  const ring    = useRef({ x: -300, y: -300 });
  const rafRef  = useRef(null);
  const hover   = useRef(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* ── Precise dot tracks the real pointer ── */
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    /* ── Interactive-element detection ── */
    const onOver = (e) => {
      const interactive =
        e.target.closest('a, button, input, textarea, select, label, [role="button"]') ||
        window.getComputedStyle(e.target).cursor === 'pointer';

      if (interactive && !hover.current) {
        hover.current = true;
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      } else if (!interactive && hover.current) {
        hover.current = false;
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      }
    };

    /* ── Click squeeze ── */
    const onDown = () => {
      dot.classList.add('cursor-click');
      ring.classList.add('cursor-click');
    };
    const onUp = () => {
      dot.classList.remove('cursor-click');
      ring.classList.remove('cursor-click');
    };

    /* ── Window edge hide / show ── */
    const onLeave  = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const onEnter  = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };

    /* ── Smooth trailing ring (lerp) ── */
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      ringRef.current.style.transform =
        `translate(${ring.current.x}px, ${ring.current.y}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="cur-dot"  ref={dotRef}  />
      <div className="cur-ring" ref={ringRef} />
    </>
  );
};

export default CustomCursor;
