import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.2,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-teal-accent z-[60] origin-left"
      style={{ scaleX }}
      data-testid="scroll-progress-bar"
    />
  );
}
