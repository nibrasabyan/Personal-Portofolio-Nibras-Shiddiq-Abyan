import { useEffect, useState } from 'react';

// Returns the id of the section currently in view.
export default function useScrollSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observers = [];
    const visibility = new Map();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibility.set(entry.target.id, entry.intersectionRatio);
          });
          // Pick the section with the highest intersection ratio.
          let bestId = sectionIds[0];
          let best = 0;
          visibility.forEach((ratio, key) => {
            if (ratio > best) {
              best = ratio;
              bestId = key;
            }
          });
          if (best > 0) setActive(bestId);
        },
        { threshold: [0.2, 0.4, 0.6, 0.8] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}
