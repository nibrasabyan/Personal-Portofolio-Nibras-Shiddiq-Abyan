import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { profile } from '../data/content.js';
import SignatureMark from './ui/SignatureMark.jsx';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 mt-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <SignatureMark size={20} />
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} {profile.name}. Built in Malang.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="p-2 rounded-full text-zinc-500 hover:text-teal-accent hover:bg-white/5 transition-colors"
            aria-label="Email"
            data-testid="footer-email"
          >
            <Mail size={16} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-zinc-500 hover:text-teal-accent hover:bg-white/5 transition-colors"
            aria-label="GitHub"
            data-testid="footer-github"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-zinc-500 hover:text-teal-accent hover:bg-white/5 transition-colors"
            aria-label="LinkedIn"
            data-testid="footer-linkedin"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-zinc-500 hover:text-teal-accent hover:bg-white/5 transition-colors"
            aria-label="Instagram"
            data-testid="footer-instagram"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
