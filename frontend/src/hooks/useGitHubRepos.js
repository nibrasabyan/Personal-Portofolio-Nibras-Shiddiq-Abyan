import { useEffect, useState } from 'react';
import { profile } from '../data/content.js';

// Fetches the user's public GitHub repos (excluding forks),
// sorts by recent activity, and caps at 6.
export default function useGitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=updated`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const filtered = data
          .filter((r) => !r.fork)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 6);
        setRepos(filtered);
      } catch (e) {
        if (e.name !== 'AbortError' && !cancelled) {
          setError(e.message || 'Failed to load repos');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRepos();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return { repos, loading, error };
}
