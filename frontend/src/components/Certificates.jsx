import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { certificates } from '../data/content.js';
import { getAssetUrl } from '../utils/assets.js';

const headingReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// Cards enter with a subtle tilt -> straight motion + slide.
const cardEntrance = (i) => ({
  hidden: { opacity: 0, y: 30, rotate: i % 2 === 0 ? -3 : 3 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export default function Certificates() {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section
      id="certificates"
      className="relative py-24 sm:py-32 scroll-mt-20 overflow-hidden"
      data-testid="certificates-section"
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
          <div className="eyebrow mb-6">
            {String(certificates.length).padStart(2, '0')} — certificates
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Proof I keep learning.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {certificates.map((cert, i) => (
            <motion.article
              key={cert.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={cardEntrance(i)}
              whileHover={{ y: -6 }}
              className="group relative p-7 lg:p-9 rounded-3xl bg-ink-elevated/50 border border-white/5 hover:border-teal-accent/40 hover:shadow-[0_0_40px_rgba(0,201,167,0.15)] transition-[border-color,box-shadow] duration-500"
              data-testid={`certificate-card-${cert.id}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-accent/10 border border-teal-accent/30 flex items-center justify-center">
                  <Award size={20} className="text-teal-accent" />
                </div>
                {cert.validUntil && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-accent/10 border border-teal-accent/30 text-[11px] font-mono uppercase tracking-wider text-teal-accent">
                    <ShieldCheck size={12} />
                    Valid until {cert.validUntil.split(',')[0].split(' ').slice(0, 2).join(' ')} {cert.validUntil.split(',')[1]?.trim()}
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl text-white leading-tight">
                {cert.title}
              </h3>
              {cert.qualification && (
                <p className="mt-2 text-zinc-400">{cert.qualification}</p>
              )}

              <p className="mt-4 text-sm text-zinc-500">
                Issued by <span className="text-white">{cert.issuer}</span>
              </p>

              <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={12} /> {cert.issueDate}
                </span>
                <span className="text-zinc-600">ID · {cert.certificateId}</span>
              </div>

              {cert.credentialUrl && (
                <a
                  href={getAssetUrl(cert.credentialUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-teal-accent hover:text-white transition-colors"
                  data-testid={`certificate-link-${cert.id}`}
                  data-magnetic
                >
                  View credential
                  <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
