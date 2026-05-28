/**
 * Returns a proper URL for public assets, adding Astro.base when deployed to a sub‑path.
 * @param {string} path - Asset path relative to the public folder.
 * @returns {string} Full URL for the asset.
 */
export function assetPath(path) {
  // Remove leading slashes to avoid duplicate //
  const clean = path.replace(/^\/+/, "");
// Astro.base is not available in plain JS modules. Use the build-time env variable.
const base = import.meta.env.BASE_URL || "/";
const prefix = base.endsWith('/') ? base : base + '/';
return prefix + clean;
}
