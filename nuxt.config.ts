// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/eslint', '@unocss/nuxt'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  eslint: {
    config: {
      stylistic: true
    }
  }
})
