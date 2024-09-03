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
    // tuto : C:\Users\ghisl\OneDrive\Documents\Formation\Memo global\vuejs
    '/swr': { swr: true }, // WORK ON DEPLOY NETLIFY
    '/static': { static: true }, // WORK ON DEPLOY NETLIFY
    '/spa': { ssr: false },
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
    public: {
      DBHOST: process.env.DBHOST,
      DBPORT: process.env.DBPORT,
      DBUSER: process.env.DBUSER,
      DBPASSWORD: process.env.DBPASSWORD,
      DBDATABASE: process.env.DBDATABASE,
      DEPLOYEDDBHOST: process.env.DEPLOYEDDBHOST,
      DEPLOYEDDBUSER: process.env.DEPLOYEDDBUSER,
      DEPLOYEDDBPASSWORD: process.env.DEPLOYEDDBPASSWORD,
      DEPLOYEDDBDATABASE: process.env.DEPLOYEDDBDATABASE,
    },
  },
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
