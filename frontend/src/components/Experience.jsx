import { motion } from 'framer-motion';
import { experiences } from '../data/content.js';

export default function Experience() {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32 scroll-mt-20"
      data-testid="experience-section"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <div className="eyebrow mb-6">03 — experience</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Where I've shown up.
          </h2>
        </motion.div>

        <ol className="relative border-l border-white/10 ml-3 space-y-10">
          {experiences.map((exp, i) => (
            <motion.li
              key={`${exp.role}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="pl-8 relative"
              data-testid={`experience-item-${i}`}
            >
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-teal-accent shadow-[0_0_16px_rgba(0,201,167,0.6)]" />
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
                {exp.period}
              </div>
              <h3 className="mt-2 font-display text-2xl text-white">{exp.role}</h3>
              <p className="mt-1 text-teal-accent text-sm">{exp.organization}</p>
              <p className="mt-3 text-zinc-400 leading-relaxed max-w-2xl">{exp.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
