import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { profile } from '../data/content.js';
import useTypewriter from '../hooks/useTypewriter.js';
import { getAssetUrl } from '../utils/assets.js';

// Mouse parallax — desktop only, returns translate values for two layers.
function useMouseParallax() {
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const isFinePointer =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reduce) return;

    let raf;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1..1
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setCoord({ x, y }));
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return coord;
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { x: mx, y: my } = useMouseParallax();

  // Split name. Each character animates individually for true per-letter reveal.
  const nameParts = profile.name.split(' ');
  const nameLine1 = nameParts[0] || 'Nibras';
  const nameLine2 = nameParts.slice(1).join(' ') || 'Shiddiq Abyan';

  // Per-letter container variant: stagger child reveals.
  const letterParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045, delayChildren: 0.4 } },
  };
  const letterChild = {
    hidden: { y: '110%', opacity: 0 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Render each character as a motion.span. Spaces preserved with non-breaking space.
  const renderName = (text, keyPrefix) => (
    <span className="inline-flex flex-wrap">
      {text.split('').map((ch, i) => (
        <span
          key={`${keyPrefix}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ lineHeight: 1.05 }}
        >
          <motion.span variants={letterChild} className="inline-block">
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );

  // Tagline typewriter — kicks in after the name reveal completes (~1.2s).
  const taglineDelay = reduceMotion ? 0 : 1500;
  const { text: typed, done: typeDone } = useTypewriter(profile.tagline, {
    delay: taglineDelay,
    speed: 26,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden mesh-bg"
      data-testid="hero-section"
    >
      {/* Animated dot grid */}
      <div className="dot-grid" aria-hidden="true" />

      {/* Mouse-parallax decorative shapes (desktop only via reduce-motion guard inside hook) */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full border border-teal-accent/15 pointer-events-none hidden md:block"
        animate={{ x: mx * 30, y: my * 24 }}
        transition={{ type: 'spring', stiffness: 60, damping: 18 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 w-[520px] h-[520px] rounded-full border border-white/5 pointer-events-none hidden md:block"
        animate={{ x: mx * -22, y: my * -16 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute top-1/3 right-[8%] w-24 h-24 text-teal-accent/30 pointer-events-none hidden lg:block"
        animate={{ x: mx * 18, y: my * 18, rotate: mx * 6 }}
        transition={{ type: 'spring', stiffness: 50, damping: 18 }}
      >
        <polygon
          points="50,5 95,27 95,73 50,95 5,73 5,27"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </motion.svg>

      <div className="grain-overlay" aria-hidden="true" />

      {/* Decorative side meta */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600">
        <span className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Portfolio · 2026
        </span>
        <div className="w-px h-16 bg-zinc-800" />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600">
        <div className="w-px h-16 bg-zinc-800" />
        <span style={{ writingMode: 'vertical-rl' }}>Malang · IDN</span>
      </div>

      <div className="relative max-w-7xl w-full mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-24 pb-24 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left: text */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="eyebrow mb-6"
            data-testid="hero-eyebrow"
          >
            web developer · {profile.university}
          </motion.div>

          <motion.h1
            variants={letterParent}
            initial="hidden"
            animate="show"
            className="font-display font-bold text-white tracking-tight"
            data-testid="hero-name"
          >
            <span className="block text-[clamp(2.25rem,8vw,7rem)] leading-[1.05] pb-2">
              {renderName(nameLine1, 'l1')}
            </span>
            <span className="block text-[clamp(1.75rem,5.5vw,4.25rem)] leading-[1.1] text-zinc-400 pb-2 whitespace-nowrap">
              {renderName(nameLine2, 'l2')}
            </span>
          </motion.h1>

          <p
            className={`mt-8 max-w-xl text-lg sm:text-xl leading-relaxed min-h-[3.5em] ${
              typeDone ? '' : 'caret'
            }`}
            data-testid="hero-tagline"
          >
            <span className="text-white">{typed}</span>
            {typeDone && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="block mt-2 text-base text-zinc-500"
              >
                Building thoughtful web interfaces from Malang, Indonesia.
              </motion.span>
            )}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-teal-accent text-black font-medium hover:bg-teal-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,201,167,0.45)]"
              data-testid="hero-cta-projects"
              data-magnetic
            >
              See my work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>

            {profile.cv && (
              <a
                href={getAssetUrl(profile.cv)}
                download
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white font-medium hover:border-teal-accent hover:text-teal-accent transition-all duration-300"
                data-testid="hero-cta-cv"
                data-magnetic
              >
                <Download size={18} />
                Download CV
              </a>
            )}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white font-medium hover:border-teal-accent hover:text-teal-accent transition-all duration-300"
              data-testid="hero-cta-contact"
              data-magnetic
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Right: photo with cinematic frame + clip-path reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="lg:col-span-5 order-1 lg:order-2 relative gpu"
          data-testid="hero-photo-frame"
        >
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            {/* Teal glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 bg-teal-accent/20 blur-3xl rounded-full opacity-60"
            />
            {/* Frame corners */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-teal-accent z-10" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-accent z-10" />

            <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-ink-elevated border border-white/5">
              {/* Clip-path reveal: image masked from bottom up */}
              <motion.img
                src={getAssetUrl(profile.photo)}
                alt={`Portrait of ${profile.name}`}
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                loading="eager"
                data-testid="hero-photo"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.7 }}
                style={{ willChange: 'clip-path' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-white/70">
                <span>· {profile.field}</span>
                <span>2026</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-teal-accent transition-colors"
        aria-label="Scroll to about"
        data-testid="hero-scroll-indicator"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
