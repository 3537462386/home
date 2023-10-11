<template>
    <div class="container w-screen flex flex-col items-center justify-center mx-0 my-10vh px-6">
        <div class="w-full myhead z-200 px-5 flex justify-between items-center cursor-pointer" :class="{'show': state.showButton}">
            <img src="@/assets/image/logo/logo.svg" @click="ToHome">
            <h2>文章列表</h2>
            <img src="@/assets/image/actions/about.svg" @click="TOAbout">
        </div>
        <el-timeline class="w-100 m-0">
            <el-timeline-item class="w-full" :timestamp="item.createdAt.split('T')[0]" placement="top" size="large" v-for="item in state.post"
                :key="item._id" color="pink" el-icon-document icon="el-icon-document">
                <el-card>
                    <div class="flex  items-center">
                        <img :src="item.imgs" class="w-13 h-11 rounded cursor-pointer" @click="toPost(item._id)">
                        <div class="flex flex-col mx-4 ">
                            <h4 class="mb-2 cursor-pointer hover:underline" @click="toPost(item._id)">{{ item.title }}</h4>
                            <div class="opacity-50" style="color: rgb(31, 86, 159);">{{ `${item.likes} Like / ${item.views}
                                Read` }}</div>
                        </div>
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script setup>
import Actions from '@/components/Actions.vue';
import { useIndexState } from '@/stores/index'
import { GetPosts } from '@/api'

const indexState = useIndexState()
const router = useRouter();
const state = reactive({
    post: [],
    showButton: true,
    lastScrollPosition: 0,
})

onMounted(async () => {
    // 头栏和脚栏出现事件监听
    state.lastScrollPosition = window.scrollY
    window.addEventListener('scroll', handleScroll)
    await nextTick();
    getPost()
})


const getPost = async () => {
    try {
        const {data} = await GetPosts();
        console.log(data.data)
        state.post = data.value.data;
    } catch (error) {
        console.error(error);
    }
}
const handleScroll = () => {
    const currentScrollPosition = window.scrollY
    if (currentScrollPosition > state.lastScrollPosition && state.showButton === true) {
        state.showButton = false
    } else if (currentScrollPosition < state.lastScrollPosition && state.showButton === false) {
        state.showButton = true
    }
    state.lastScrollPosition = currentScrollPosition
}
const ToHome = () => {
   router.push("/");
}
const TOAbout = () => {
    router.push("/about");
}
const toPost = (id) => {
    router.push(`/posts/${id}`);
}

</script>

<style scoped>
.myhead {
    margin: 0;
    position: fixed;
    top: 0;
    right: 0;
    height: 0;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    /* 设置上边框 */
    box-shadow: inset 0px -1px 1px rgba(0, 0, 0, 0.1);
    /* 添加内阴影 */
    background-color: #f1f1f1;
}

.myhead.show {
    height: 40px;
}
</style>