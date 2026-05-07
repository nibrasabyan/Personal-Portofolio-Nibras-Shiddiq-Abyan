import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SignatureMark from './SignatureMark.jsx';

export default function LoadingScreen() {
  const [phase, setPhase] = useState('show'); // 'show' | 'fade' | 'gone'

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fade'), 900);
    const t2 = setTimeout(() => setPhase('gone'), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <motion.div
      animate={{ opacity: phase === 'fade' ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-0 z-[999] bg-ink flex items-center justify-center pointer-events-none"
      data-testid="loading-screen"
    >
      <div className="flex flex-col items-center gap-4">
        <SignatureMark size={48} />
        <span className="text-xs font-mono uppercase tracking-[0.4em] text-teal-accent">
          loading
        </span>
      </div>
    </motion.div>
  );
}
