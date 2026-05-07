import { useEffect, useRef, useState } from 'react';

// Desktop-only custom cursor: tiny teal dot + larger ring follower.
// On hover over [data-magnetic] elements (or generic a/button), the ring
// snaps toward the element's center for a "magnetic" feel.
// Disabled on touch devices and when prefers-reduced-motion is set.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reduceMotion) return;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf;

    // Tracks the element currently being magnetised toward.
    let magnetTarget = null;
    let magnetRect = null;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    const findInteractive = (el) => {
      while (el && el !== document.body) {
        if (
          el.matches?.('[data-magnetic], a, button, [role="button"]')
        ) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    };

    const handleOver = (e) => {
      const target = findInteractive(e.target);
      if (target) {
        magnetTarget = target;
        magnetRect = target.getBoundingClientRect();
        ringRef.current?.classList.add('cursor-ring-hover');
      }
    };

    const handleOut = (e) => {
      const target = findInteractive(e.target);
      if (target && target === magnetTarget) {
        magnetTarget = null;
        magnetRect = null;
        ringRef.current?.classList.remove('cursor-ring-hover');
      }
    };

    const handleScrollOrResize = () => {
      if (magnetTarget) {
        magnetRect = magnetTarget.getBoundingClientRect();
      }
    };

    const tick = () => {
      // Compute the target the ring should follow (pure mouse, or magnet center).
      let targetX = mouseX;
      let targetY = mouseY;

      if (magnetTarget && magnetRect) {
        const cx = magnetRect.left + magnetRect.width / 2;
        const cy = magnetRect.top + magnetRect.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.hypot(dx, dy);
        const radius = Math.max(magnetRect.width, magnetRect.height) * 0.9;
        if (dist < radius) {
          // Closer = stronger pull (max 0.45 of distance).
          const pull = (1 - dist / radius) * 0.45;
          targetX = mouseX - dx * pull;
          targetY = mouseY - dy * pull;
        }
      }

      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 w-2 h-2 rounded-full bg-teal-accent pointer-events-none z-[100]"
        style={{ mixBlendMode: 'screen' }}
        data-testid="custom-cursor-dot"
      />
      <div
        ref={ringRef}
        className="custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full border border-teal-accent/60 pointer-events-none z-[100] transition-[width,height,border-color] duration-200"
      />
      <style>{`
        .cursor-ring-hover {
          width: 56px !important;
          height: 56px !important;
          border-color: rgba(0, 201, 167, 1) !important;
        }
      `}</style>
    </>
  );
}
