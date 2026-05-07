import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, AlertCircle, Code2 } from 'lucide-react';
import useGitHubRepos from '../hooks/useGitHubRepos.js';
import { profile } from '../data/content.js';

const langColor = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  Vue: '#41b883',
  Go: '#00ADD8',
  PHP: '#4F5D95',
};

const headingReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function RepoCardSkeleton() {
  return (
    <div className="p-6 lg:p-7 rounded-3xl bg-ink-elevated/40 border border-white/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-white/5 animate-pulse-soft" />
        <div className="flex-1 h-4 rounded bg-white/5 animate-pulse-soft" />
      </div>
      <div className="space-y-2">
        <div className="h-3 rounded bg-white/5 animate-pulse-soft" />
        <div className="h-3 rounded bg-white/5 w-2/3 animate-pulse-soft" />
      </div>
      <div className="mt-6 flex gap-3">
        <div className="h-3 w-16 rounded-full bg-white/5 animate-pulse-soft" />
        <div className="h-3 w-12 rounded-full bg-white/5 animate-pulse-soft" />
      </div>
    </div>
  );
}

// Determine the primary CTA target & label for a repo.
// Prefers the homepage URL (live GitHub Pages / deployed app) when set.
function repoTarget(repo) {
  const home = (repo.homepage || '').trim();
  if (home && /^https?:\/\//i.test(home)) {
    return { url: home, label: 'Visit Site', live: true };
  }
  return { url: repo.html_url, label: 'View Code', live: false };
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos();

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 scroll-mt-20"
      data-testid="projects-section"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={headingReveal}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <div className="eyebrow mb-6">04 — projects</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Things I'm shipping, piece by piece.
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              Pulled live from{' '}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-accent hover:underline underline-offset-4"
                data-testid="projects-github-link"
              >
                @{profile.githubUsername}
              </a>
              . Updates as I push.
            </p>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-teal-accent transition-colors"
            data-testid="projects-all-link"
            data-magnetic
          >
            <Github size={16} />
            All repositories
            <ExternalLink size={14} />
          </a>
        </motion.div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="projects-loading">
            {Array.from({ length: 3 }).map((_, i) => (
              <RepoCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            className="p-8 rounded-3xl border border-white/10 bg-ink-elevated/40 flex items-start gap-4"
            data-testid="projects-error"
          >
            <AlertCircle className="text-teal-accent shrink-0 mt-1" size={20} />
            <div>
              <p className="text-white">Couldn't load repos right now.</p>
              <p className="text-sm text-zinc-500 mt-1">
                You can still browse them on{' '}
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-accent hover:underline"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div
            className="p-12 rounded-3xl border border-white/10 bg-ink-elevated/40 text-center"
            data-testid="projects-empty"
          >
            <p className="text-zinc-400">
              No public repos yet. Stay tuned —{' '}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-accent hover:underline"
              >
                follow on GitHub
              </a>
              .
            </p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => {
              const target = repoTarget(repo);
              return (
                <motion.a
                  key={repo.id}
                  href={target.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="tilt-card group relative flex flex-col p-6 lg:p-7 rounded-3xl bg-ink-elevated/50 border border-white/5 hover:border-teal-accent/40 hover:shadow-[0_0_40px_rgba(0,201,167,0.15)]"
                  data-testid={`project-card-${repo.name}`}
                >
                  {/* LIVE badge */}
                  {target.live && (
                    <span
                      className="absolute -top-2 -right-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-accent text-black text-[10px] font-mono uppercase tracking-[0.18em] font-semibold shadow-[0_0_20px_rgba(0,201,167,0.45)]"
                      data-testid={`project-live-badge-${repo.name}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse-soft" />
                      Live
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-teal-accent/10 border border-teal-accent/30 flex items-center justify-center shrink-0">
                        {target.live ? (
                          <ExternalLink size={16} className="text-teal-accent" />
                        ) : (
                          <Code2 size={16} className="text-teal-accent" />
                        )}
                      </div>
                      <h3 className="font-display text-xl text-white truncate">{repo.name}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed flex-1 line-clamp-3">
                    {repo.description || (
                      <span className="text-zinc-500 italic">
                        A repository on GitHub. {target.live ? 'Live preview available.' : 'View code and details.'}
                      </span>
                    )}
                  </p>

                  <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span className="inline-flex items-center gap-2">
                      {repo.language && (
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: langColor[repo.language] || '#888' }}
                        />
                      )}
                      {repo.language || 'misc'}
                    </span>
                    <span className="inline-flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Star size={12} /> {repo.stargazers_count}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork size={12} /> {repo.forks_count}
                      </span>
                    </span>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm text-teal-accent group-hover:text-white transition-colors">
                    {target.label}
                    <ExternalLink
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
