import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default withNuxt(
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      // Prettier 作为 ESLint 规则运行，格式问题统一报错
      'prettier/prettier': 'error',
      // Vue SFC 块顺序：script → template → style
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }]
    }
  },
  // 关闭所有与 Prettier 冲突的 ESLint / @stylistic 规则，必须放最后
  prettierConfig
)
