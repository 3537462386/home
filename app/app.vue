<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = computed(() => (route.meta.layout as string) || 'default')
</script>

<template>
  <div class="viewport-outer">
    <div class="viewport-inner">
      <NuxtRouteAnnouncer />
      <NuxtLayout :name="layout as any">
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

<style scoped>
.viewport-outer {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  overflow: hidden;
}

.viewport-inner {
  /*
   * min(100vw, 100vh * 16/9):
   *   宽屏(>16:9): 100vh*16/9 < 100vw → 取高度约束，两侧留黑边
   *   窄屏(<16:9): 100vw < 100vh*16/9 → 取宽度约束，上下留黑边
   *   恰好16:9:   两值相等，完全撑满
   */
  width: min(100vw, calc(100vh * 16 / 9));
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
}
</style>
