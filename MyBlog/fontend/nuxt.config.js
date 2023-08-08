export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/image/logo/logo.svg' }
    ],
    script: [
      { src: 'https://cdn.bootcdn.net/ajax/libs/device.js/0.1.59/device.js'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ '~/assets/css/normalize.css','~/static/iconfont/iconfont.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/element-ui', ssr: true },
    { src: '~/plugins/sessionStorage.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@unocss/nuxt','@nuxtjs/axios','@nuxtjs/composition-api/module',
  ],
  axios: {
    baseURL: 'http://8.137.16.32:3000',
  },
  server: {
    port: 8000,
    host: '127.0.0.1'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
