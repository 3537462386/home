<template>
    <div class="fixed top-0 left-0 w-screen h-0 flex justify-center items-center overflow-hidden z-150 transition-height duration-300 ease-in-out"
        :class="{ 'h-full': visible }">
        <div class="w-90vw  bg-white rounded-lg p-8">
            <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
            <div class="mb-4">{{ message }}</div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Modal Title',
        },
        message: {
            type: String,
            default: 'Modal Message',
        },
        visible: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        visible(value) {
            if (value) {
                // 显示弹窗时禁用滚动事件
                document.body.style.overflowY = 'hidden';
            } else {
                // 隐藏弹窗时恢复滚动事件
                document.body.style.overflowY = 'auto';
            }
        },
    },
    methods: {
    },
};
</script>
  
<style scoped>
/* 在这里可以添加额外的 CSS 样式 */
</style>