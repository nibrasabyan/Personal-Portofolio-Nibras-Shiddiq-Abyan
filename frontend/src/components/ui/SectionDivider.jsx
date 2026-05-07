import { motion } from 'framer-motion';

/**
 * Subtle horizontal divider between sections.
 * A teal hairline with a tiny rotating diamond at center.
 */
export default function SectionDivider() {
  return (
    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-2">
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-teal-accent/30 to-transparent">
        <motion.span
          aria-hidden="true"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 border border-teal-accent/40 bg-ink"
        />
      </div>
    </div>
  );
}
