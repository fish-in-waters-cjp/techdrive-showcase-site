/**
 * Composable for handling base path in URLs
 * This ensures all links work correctly on GitHub Pages
 */
export function useBasePath() {
  // Get base URL from Vite's environment variable
  // In development: '/'
  // In production (GitHub Pages): '/techdrive-showcase-site/'
  const basePath = import.meta.env.BASE_URL

  /**
   * Generate a URL with the correct base path
   * @param {string} path - The path to append to base (e.g., '/about.html' or 'about.html')
   * @returns {string} The complete URL with base path
   */
  const getUrl = (path) => {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path

    // Combine base path with the clean path
    // basePath already ends with '/', so we don't need to add one
    return `${basePath}${cleanPath}`
  }

  return {
    basePath,
    getUrl
  }
}
