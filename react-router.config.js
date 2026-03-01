export default {
  // Static Site Generation (SSG)
  // Pre-render all routes at build time as static HTML files
  ssr: true,

  // Preload routes for static generation
  // This tells React Router which routes should be pre-rendered
  preloadRoutes: ['/', '/cart'],
};
