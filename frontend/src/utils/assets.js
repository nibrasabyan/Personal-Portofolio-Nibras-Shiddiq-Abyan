/**
 * Prepends the Vite BASE_URL to a path if it's an absolute path within the public directory.
 * This ensures assets like photos and PDFs work correctly on GitHub Pages sub-folders.
 */
export function getAssetUrl(path) {
  if (!path) return '';
  
  // If the path is already a full URL or relative, return it as-is
  if (path.startsWith('http') || !path.startsWith('/')) {
    return path;
  }
  
  // import.meta.env.BASE_URL is handled by Vite (e.g., '/Personal-Portofolio-Nibras-Shiddiq-Abyan/')
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // Remove trailing slash if exists
  return `${base}${path}`;
}
