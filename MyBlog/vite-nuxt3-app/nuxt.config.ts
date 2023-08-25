export default defineNuxtConfig({
  srcDir: 'src/',
  css: [ '@/assets/css/normalize.css','@/assets/iconfont/iconfont.css'
  ],
  modules: [
    // ...
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@unocss/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  plugins: [
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/default.scss";'	
        }
      }
    }
  }
})
