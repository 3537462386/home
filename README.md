# 像素冒险  游戏化个人主页

> 核心理念：将「简历 / 作品集」转化为一场**可探索的像素冒险**。
> 玩家扮演角色在地图上自由移动，靠近建筑或 NPC 触发页面跳转与交互。

---

## 目录

1. [项目概览](#1-项目概览)
2. [技术栈](#2-技术栈)
3. [目录结构](#3-目录结构)
4. [快速开始](#4-快速开始)
5. [视觉设计规范](#5-视觉设计规范)
6. [地图与页面规划](#6-地图与页面规划)
7. [交互体验设计](#7-交互体验设计)
8. [技术实现方案](#8-技术实现方案)
9. [待办 / 路线图](#9-待办--路线图)

---

## 1. 项目概览

| 项目 | 说明 |
| :--- | :--- |
| **版本** | 1.0.0 |
| **框架** | Nuxt 4  Vue 3 Composition API |
| **主题** | 16-bit 复古像素 RPG（俯视角，类《星露谷物语》） |
| **目标分辨率** | 19201080（16:9 基准），全端自适应 |
| **内容源** | `@nuxt/content v3`，Markdown 驱动 |

---

## 2. 技术栈

| 类别 | 技术 / 库 | 说明 |
| :--- | :--- | :--- |
| 框架 | Nuxt 4 + Vue 3 | SSR / SSG 支持 |
| 内容 | @nuxt/content v3 + better-sqlite3 | Markdown 页面数据库 |
| UI 组件 | Ant Design Vue 4 | 全局注册，插件方式引入 |
| 原子样式 | UnoCSS | Tailwind 兼容 + 自定义预设 |
| 代码规范 | ESLint + Prettier | Flat Config，`@nuxt/eslint` |
| 运行时类型 | TypeScript | 类型由 Nuxt 自动生成至 `.nuxt/` |

---

## 3. 目录结构

```
.
 app/
    app.vue              # 全局入口（16:9 视口约束 + 动态布局）
    components/          # 全局 Vue 组件（MDC 组件亦在此）
       Alert.vue
       Counter.vue
    layouts/             # 布局文件
       default.vue      # 默认布局（ALayout 包裹）
    pages/               # 路由页面
       index.vue        # 首页（像素地图主场景）
       [...slug].vue    # 内容页 catch-all
    plugins/
        antd.ts          # Ant Design Vue 全局注册
 content/                 # Markdown 内容（@nuxt/content 读取）
    index.md
    about.md
 public/                  # 静态资源（图片、音频、字体等）
 uno.config.ts            # UnoCSS 配置与自定义预设
 nuxt.config.ts
 content.config.ts
 package.json
```

---

## 4. 快速开始

**环境要求：** Node.js  18，推荐使用 fnm 管理版本（项目已包含 `.nvmrc`）。

```bash
# 安装依赖
npm install

# 启动开发服务器（http://localhost:3000）
npm run dev

# 生产构建
npm run build

# 静态站点生成
npm run generate

# 预览构建产物
npm run preview

# 代码检查 & 自动修复
npm run lint
npm run lint:fix
```

---

## 5. 视觉设计规范

| 维度 | 标准 | 备注 |
| :--- | :--- | :--- |
| **美术风格** | 16-bit 复古像素，俯视角 | 参考《星露谷物语》《塞尔达传说》 |
| **基准分辨率** | 19201080（16:9） | `app.vue` 使用 `min(100vw, 100vh*16/9)` 自动缩放 |
| **色板** | 高饱和复古色（DB32 / Kawaii16） | 主色 `#1677ff`，已在 `uno.config.ts` 注册 |
| **字体** | 像素字体 | 标题：Monocraft；正文：高可读性像素字 |
| **图像渲染** | `image-rendering: pixelated` | 防止 CSS 缩放时产生模糊 |

### 视口适配规则

```
宽屏（比 16:9 更宽） 高度撑满，两侧黑边
窄屏（比 16:9 更窄） 宽度撑满，上下黑边
恰好 16:9            完全占满，无黑边
```

---

## 6. 地图与页面规划

首页为名为 **「创造之境 (The Realm of Creation)」** 的交互地图。

### 核心地标

| 地标 | 路由 | 功能 |
| :--- | :--- | :--- |
| 游戏洞穴 (Game Cave) | `/games` | 已发布的个人作品展示 |
| 卷轴图书馆 (Scrolls Library) | `/blog` | 技术心得与日常记录 |
| 法师小屋 (Mage's Hut) | `/about` | 个人简历、技术栈、联系方式 |
| NPC 作者化身 (The Guide) |  | 弹出联系对话框（GitHub / Email 等） |
| 隐藏宝箱 (Secret Chest) |  | 彩蛋：下载 PDF 版离线简历 |

---

## 7. 交互体验设计

### 角色导航

| 端 | 操作方式 |
| :--- | :--- |
| 桌面端 | 键盘 `W/A/S/D` 或方向键，4 方向移动 |
| 移动端 | 左下角半透明像素虚拟摇杆，或点击地图寻路 |
| 碰撞 | 水流、墙壁、树木有碰撞体积，角色不可穿越 |

### 触发反馈

1. **主动提示**：靠近建筑 / NPC 时头顶弹出 `[E] 交互` 或 `!` 气泡动画。
2. **对话系统**：复古对话框 + 逐字打字机效果。
3. **转场特效**：页面跳转时执行「圆形缩放 (Iris Out)」或「黑屏闪烁」过渡。

---

## 8. 技术实现方案

### 地图引擎

使用 **CSS Grid** 切分 Tile 阵列（建议 3218 格，对应 16:9 基准）。

```vue
<div class="grid grid-cols-32 grid-rows-18 full">
  <tile v-for="tile in mapData" :key="tile.id" :type="tile.type" />
</div>
```

### 状态管理（建议引入 Pinia）

```ts
// stores/game.ts
export const useGameStore = defineStore('game', () => {
  const x = ref(0)              // 角色格点 X
  const y = ref(0)              // 角色格点 Y
  const direction = ref('down') // 面向方向
  const inDialog = ref(false)   // 是否处于对话中
  return { x, y, direction, inDialog }
})
```

### UnoCSS 自定义快捷方式（已配置）

```ts
// uno.config.ts shortcuts 节选
'flex-center'     // flex items-center justify-center
'absolute-center' // 绝对居中
'card'            // rounded-lg bg-white shadow p-4
```

---

## 9. 待办 / 路线图

- [ ] 实现首页像素地图场景（Tile 渲染 + 碰撞层）
- [ ] 角色移动控制器（键盘 + 虚拟摇杆）
- [ ] 对话系统组件（打字机效果 + 复古边框）
- [ ] 页面转场动画（Iris Out / 黑屏闪烁）
- [ ] `/blog` 博客列表页（基于 `@nuxt/content`）
- [ ] `/games` 作品展示页
- [ ] `/about` 个人简历页
- [ ] 隐藏宝箱彩蛋（PDF 简历下载）
- [ ] 引入 Pinia 状态管理
- [ ] SEO 优化（`useSeoMeta` / OG 标签）
- [ ] PWA 离线支持