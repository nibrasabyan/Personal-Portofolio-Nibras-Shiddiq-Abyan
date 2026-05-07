import { motion } from 'framer-motion';
import { skills } from '../data/content.js';

const headingReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const groupContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// Spring entrance for badges — bouncier feel
const badgeItem = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 scroll-mt-20 overflow-hidden"
      data-testid="skills-section"
    >
      <div className="grid-paper" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={headingReveal}
          className="max-w-2xl mb-16"
        >
          <div className="eyebrow mb-6">02 — skills</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Tools I reach for, opinions I keep.
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            A practical stack — picked for clarity, picked for the long term.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={groupContainer}
              className="relative p-6 lg:p-8 rounded-3xl bg-ink-elevated/50 border border-white/5 hover:border-teal-accent/40 transition-colors duration-500"
              data-testid={`skill-group-${group.category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                className="flex items-start justify-between mb-6"
              >
                <h3 className="font-display text-2xl text-white">{group.category}</h3>
                <span className="text-xs font-mono text-zinc-500">
                  0{gi + 1}
                </span>
              </motion.div>

              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={badgeItem}
                    whileHover={{ y: -2, scale: 1.04 }}
                    className="px-3 py-1.5 text-sm bg-ink rounded-full border border-white/5 text-zinc-300 hover:border-teal-accent/50 hover:text-white transition-colors"
                    data-testid={`skill-item-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
