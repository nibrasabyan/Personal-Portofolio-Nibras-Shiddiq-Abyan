import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/content.js';

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, testid: 'contact-email' },
  { label: 'GitHub', value: `@${profile.githubUsername}`, href: profile.github, Icon: Github, testid: 'contact-github' },
  { label: 'LinkedIn', value: 'nibras-shiddiq-abyan', href: profile.linkedin, Icon: Linkedin, testid: 'contact-linkedin' },
  { label: 'Instagram', value: '@_nibrasabyan', href: profile.instagram, Icon: Instagram, testid: 'contact-instagram' },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 scroll-mt-20"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="eyebrow mb-6">05 — contact</div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            Let's build <br className="hidden sm:block" />
            <span className="text-teal-accent">something good.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-zinc-400 leading-relaxed">
            Working on a project, an organization, or just curious? I read every email
            — drop a line and let's see where it goes.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-10 inline-flex items-center gap-3 px-7 py-4 rounded-full bg-teal-accent text-black font-medium hover:bg-teal-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,201,167,0.45)]"
            data-testid="contact-cta-email"
            data-magnetic
          >
            <Mail size={18} />
            {profile.email}
            <ArrowUpRight size={18} />
          </a>
        </motion.div>

        <div className="mt-20 border-t border-white/5 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="group flex items-center justify-between gap-4 p-5 rounded-2xl border border-white/5 hover:border-teal-accent/60 hover:bg-ink-elevated/40 hover:shadow-[0_0_30px_rgba(0,201,167,0.18)] transition-[border-color,background-color,box-shadow] duration-300"
                data-testid={l.testid}
                data-magnetic
              >
                <div className="flex items-center gap-4 min-w-0">
                  <l.Icon size={18} className="text-teal-accent shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
                      {l.label}
                    </p>
                    <p className="text-white truncate">{l.value}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-zinc-600 group-hover:text-teal-accent transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
