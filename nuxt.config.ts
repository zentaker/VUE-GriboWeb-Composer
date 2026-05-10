export default defineNuxtConfig({
  compatibilityDate: '2026-05-07',
  srcDir: 'app/',
  modules: ['@nuxt/content'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'dark'
      },
      title: 'Gribo Digital',
      meta: [
        {
          name: 'description',
          content: 'Revista cultural, laboratorio editorial y repositorio tecnico.'
        }
      ]
    }
  },
  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },
  typescript: {
    strict: true
  }
})
