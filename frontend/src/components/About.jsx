import { motion } from 'framer-motion';
import { profile, certificates, skills } from '../data/content.js';
import useCountUp from '../hooks/useCountUp.js';

const headingReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function StatCard({ value, suffix = '', label, accent = false, idx }) {
  const [ref, n] = useCountUp(value, 1500 + idx * 100);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-6 lg:p-8 rounded-3xl bg-ink-elevated/40 border border-white/5 hover:border-teal-accent/40 transition-colors duration-500"
      data-testid={`about-stat-${idx}`}
    >
      <div className={`font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-none ${
        accent ? 'text-teal-accent' : 'text-white'
      }`}>
        {value === Infinity ? '∞' : n}
        <span className="text-3xl lg:text-4xl text-zinc-500 align-top ml-1">{suffix}</span>
      </div>
      <div className="mt-3 text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </div>
    </motion.div>
  );
}

const marqueeWords = [
  'WEB DEVELOPMENT',
  'REACT',
  'UI / UX',
  'GENERATIVE AI',
  'MALANG',
  'BRAWIJAYA',
  'TYPESCRIPT',
  'DESIGN SYSTEMS',
];

export default function About() {
  // Compute live stats from data sources
  const projectCount = 3; // public, with descriptions or notable
  const certCount = certificates.length;
  const skillCount = skills.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 scroll-mt-20 overflow-hidden"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={headingReveal}
          className="max-w-4xl"
        >
          <div className="eyebrow mb-6">01 — about</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            A developer who treats <span className="text-teal-accent">interfaces</span> like quiet conversations.
          </h2>
        </motion.div>

        {/* Bio + meta column */}
        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="text-lg lg:text-xl text-zinc-400 leading-relaxed" data-testid="about-bio">
              {profile.bio}
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-8 self-start"
          >
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">Currently</dt>
              <dd className="mt-2 text-white">Studying Web Dev</dd>
            </div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">University</dt>
              <dd className="mt-2 text-white">Brawijaya</dd>
            </div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">Based in</dt>
              <dd className="mt-2 text-white">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">Focus</dt>
              <dd className="mt-2 text-white">React · UI · DX</dd>
            </div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">Exploring</dt>
              <dd className="mt-2 text-white">Generative AI</dd>
            </div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">Open to</dt>
              <dd className="mt-2 text-teal-accent">Collaborations</dd>
            </div>
          </motion.dl>
        </div>

        {/* Animated stats row */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard value={projectCount} suffix="+" label="Projects shipped" idx={0} />
          <StatCard value={certCount} suffix="+" label="Certificates earned" idx={1} accent />
          <StatCard value={skillCount} suffix="" label="Tools in the kit" idx={2} />
          <StatCard value={Infinity} suffix="" label="Ideas worth chasing" idx={3} accent />
        </div>
      </div>

      {/* Full-bleed marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-20 border-y border-white/5 py-8 overflow-hidden"
        data-testid="about-marquee"
      >
        <div className="marquee">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              aria-hidden={dup === 1 ? 'true' : undefined}
              className="flex shrink-0 items-center gap-12 pr-12 font-display text-3xl sm:text-4xl lg:text-5xl text-zinc-700"
            >
              {marqueeWords.map((w, i) => (
                <span key={`${dup}-${i}`} className="flex items-center gap-12">
                  <span className={i % 3 === 1 ? 'text-teal-accent' : 'text-zinc-700'}>
                    {w}
                  </span>
                  <span className="text-teal-accent/40">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
