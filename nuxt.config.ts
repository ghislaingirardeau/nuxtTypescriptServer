require('dotenv').config()

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
          integrity:
            'sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD',
          crossorigin: 'anonymous',
        },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
          integrity:
            'sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  routeRules: {
    // ssr est true par defaut
    /// WORK ON DEPLOY NETLIFY - open code source to see change
    // SWR
    // swr page generated on demand, revalidates in background, cached for 1 hour (3600 seconds)
    // swr: true, alors cached until API response changes
    '/swr': { swr: 60 },
    // STATIC
    // as SSR, still working on last version nuxt ??
    '/static': { static: true },
    // SPA
    // spa dashboard renders only on client-side
    '/spa': { ssr: false },
    // ISR
    // Blog post page generated on demand once until next deployment, cached on CDN
    '/blog/**': { isr: true },
    // Add redirect headers
    /* '/old-page': { redirect: '/new-page' },
    '/old-page2': { redirect: { to: '/new-page', statusCode: 302 } } */
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    /* css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_main.scss" as *;',
        },
      },
    }, */
  },
  runtimeConfig: {
    DBHOST: process.env.DBHOST,
    DBPORT: process.env.DBPORT,
    DBUSER: process.env.DBUSER,
    DBPASSWORD: process.env.DBPASSWORD,
    DBDATABASE: process.env.DBDATABASE,
    public: {
      // VISIBLE SUR CODE SOURCE
      apiBase: '/api',
    },
  },
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
