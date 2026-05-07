import { useEffect, useState } from 'react';

/**
 * Typewriter that types in `text` after `delay` ms,
 * one character every `speed` ms.
 * Respects prefers-reduced-motion.
 */
export default function useTypewriter(text, { delay = 0, speed = 28 } = {}) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        setOut(text);
        setDone(true);
        return;
      }
    }

    let i = 0;
    let raf;
    let cancelled = false;
    const startTimer = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setOut(text.slice(0, i));
        if (i < text.length) {
          raf = setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      tick();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearTimeout(raf);
    };
  }, [text, delay, speed]);

  return { text: out, done };
}
