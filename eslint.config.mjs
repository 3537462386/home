import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default withNuxt(
  // 你的自定义规则
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // 违反 Prettier 规则时报错
    },
  },
  prettierConfig, // 放在最后，确保禁用所有与 Prettier 冲突的 ESLint 规则
)
