<template>
    <div>
        <div class="absolute top-18 right-10 z-150">
          <img src="/image/button/actions.png" class="bg-white w-7 h-7 p-1 rounded-1 cursor-pointer" @click="showModal"
            v-show="!visible" />
          <img src="/image/button/unaction.svg" class="bg-white w-7 h-7 p-1 rounded-1 cursor-pointer" @click="showModal"
            v-show="visible" />
        </div>
        <div class="fixed top-0 right-1 w-10 h-0 flex justify-center items-center overflow-hidden z-150 transition-height duration-300 ease-in-out"
            :class="{ 'h-full': visible }">
            <div class="w-full  rounded-full p-8 flex flex-col justify-center items-center gap-7.5"
                style="background-color: #efeeee;">
                <div class="img">
                    <img src="/image/actions/all.svg" @click="toOther('/posts')">
                </div>
                <div class="img">
                    <img src="/image/actions/about.svg" @click="toOther('/about')">
                </div>
                <div class="img">
                    <img src="/image/actions/github.svg" @click="togithub">
                </div>
                <div class="img">
                    <img src="/image/actions/home.svg" @click="toOther('/about')">
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            visible: false,
        }
    },
    props: {
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
        togithub() {
            window.open('https://github.com/3537462386/home/tree/main/MyBlog', '_blank');
        },
        toOther(path) {
            this.$router.push(path);
            this.showModal();
        },
        showModal() {
            this.visible = !this.visible;
        },
    },
};
</script>
  
<style scoped>
/* 在这里可以添加额外的 CSS 样式 */
.img {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 4.5px 4.5px 7.5px rgba(0, 0, 0, 0.2),
        -4.5px -4.5px 7.5px rgba(255, 255, 255, 1);
    transition: all 0.2s ease-out;
}

.img img {
    width: 15px;
    transition: all 0.2s ease-out;
}

.img:hover {
    cursor: pointer;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
        0 0 0 rgba(255, 255, 255, 0.8),
        inset 4.5px 4.5px 7.5px rgba(0, 0, 0, 0.1),
        inset -4.5px -4.5px 7.5px rgba(255, 255, 255, 1);
}

.img:hover img {
    width: 14.5px;
}
</style>