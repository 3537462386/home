import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  // ── 预设 ──────────────────────────────────────────────────────────────
  presets: [
    presetUno(), // 默认预设（Tailwind/Windi 兼容工具类）
    presetAttributify(), // 属性化模式：<div text="sm blue" />
    presetIcons({ scale: 1.2 }), // 纯 CSS 图标：<i class="i-mdi-home" />
  ],

  // ── 转换器 ────────────────────────────────────────────────────────────
  transformers: [
    transformerDirectives(), // 支持 @apply、@screen、theme()
    transformerVariantGroup(), // 支持 hover:(text-red font-bold) 分组写法
  ],

  // ── 主题扩展 ──────────────────────────────────────────────────────────
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1677ff', // Ant Design 主色
        light: '#4096ff',
        dark: '#0958d9',
      },
      success: '#52c41a',
      warning: '#faad14',
      danger: '#ff4d4f',
    },
    breakpoints: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },

  // ── 快捷方式 ──────────────────────────────────────────────────────────
  shortcuts: {
    // 布局
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-col-center': 'flex flex-col items-center justify-center',
    'absolute-center': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',

    // 填充父容器
    'full': 'w-full h-full',
    'full-screen': 'w-screen h-screen',

    // 文字截断
    'truncate-1': 'overflow-hidden text-ellipsis whitespace-nowrap',
    'truncate-2': 'overflow-hidden line-clamp-2',

    // 卡片
    'card': 'rounded-lg bg-white shadow p-4',
    'card-hover': 'card transition-shadow hover:shadow-md',
  },

  // ── 安全列表（动态拼接的类名不会被 tree-shake 掉）────────────────────
  safelist: [
    'text-primary',
    'text-success',
    'text-warning',
    'text-danger',
  ],
})
