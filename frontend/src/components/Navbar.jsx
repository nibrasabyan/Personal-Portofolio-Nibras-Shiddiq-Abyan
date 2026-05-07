import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SignatureMark from './ui/SignatureMark.jsx';
import useScrollSection from '../hooks/useScrollSection.js';

export default function Navbar({ sections }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSection(sections);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl bg-ink/60 border-b border-white/5'
            : 'bg-transparent'
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleNav(e, 'hero')}
            className="flex items-center gap-2 group"
            data-testid="navbar-mark-link"
            aria-label="Back to top"
          >
            <SignatureMark size={28} className="transition-transform duration-500 group-hover:rotate-12" />
            <span className="sr-only">Nibras</span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNav(e, id)}
                className="relative px-4 py-2 text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors"
                data-testid={`nav-link-${id}`}
                data-magnetic
              >
                <span className="capitalize">{id}</span>
                {active === id && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-teal-accent rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            className="md:hidden p-2 text-white"
            aria-label={open ? 'Close menu' : 'Open menu'}
            data-testid="navbar-mobile-toggle"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-ink border-l border-white/5 md:hidden pt-24 px-8"
            data-testid="navbar-mobile-menu"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {sections.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNav(e, id)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                  className={`font-display text-3xl py-3 border-b border-white/5 capitalize ${
                    active === id ? 'text-teal-accent' : 'text-white'
                  }`}
                  data-testid={`mobile-nav-link-${id}`}
                >
                  {id}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
