import { useEffect, useRef, useState } from 'react';

/**
 * Counts up from 0 to `target` over `duration` ms, but only once
 * the element becomes visible in the viewport. Returns [ref, value].
 * Respects prefers-reduced-motion (renders target instantly).
 */
export default function useCountUp(target, duration = 1400) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const elapsed = now - start;
              const t = Math.min(elapsed / duration, 1);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(eased * target));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return [ref, value];
}
