// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        { src: 'https://awesome-lib.js' },
        { src: 'https://cdn.bootcdn.net/ajax/libs/device.js/0.1.59/device.js'}
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        { rel: 'stylesheet', href: 'https://awesome-lib.css' }
      ]
    }
  },
  srcDir: 'src/',
  css: [ '~/assets/css/normalize.css','~/static/iconfont/iconfont.css'
  ],
  modules: [
    // ...
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@axios/nuxt',
    '@unocss/nuxt',
  ],
  plugins: [
    { src: '~/plugins/element-ui', ssr: true },
    { src: '~/plugins/sessionStorage.js', mode: 'client' }
  ],
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/default.scss";'	
        }
      }
    },
    
  }
})
