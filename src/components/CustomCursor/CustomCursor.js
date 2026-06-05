import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const mouse    = useRef({ x: -300, y: -300 });
  const ringPos  = useRef({ x: -300, y: -300 }); // trailing position — separate from ringRef DOM ref
  const rafRef   = useRef(null);
  const hovered  = useRef(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* ── Inner dot: instant ── */
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    /* ── Hover detection ── */
    const onOver = (e) => {
      const hit =
        !!e.target.closest('a, button, input, textarea, select, label, [role="button"]') ||
        window.getComputedStyle(e.target).cursor === 'pointer';

      if (hit !== hovered.current) {
        hovered.current = hit;
        dot.classList.toggle('c-hover',  hit);
        ring.classList.toggle('c-hover', hit);
      }
    };

    /* ── Click squeeze ── */
    const onDown = () => { dot.classList.add('c-press');    ring.classList.add('c-press');    };
    const onUp   = () => { dot.classList.remove('c-press'); ring.classList.remove('c-press'); };

    /* ── Fade at window edge ── */
    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };

    /* ── Outer ring: lerp trail (0.085 — clearly visible lag) ── */
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.085);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.085);
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
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
      <div className="c-dot"  ref={dotRef}  />
      <div className="c-ring" ref={ringRef} />
    </>
  );
};

export default CustomCursor;
