<template>
    <div class="container w-screen flex flex-col items-center my-10vh md:mx-10vw">
        <div class="w-full myhead z-200 px-5 flex justify-between items-center cursor-pointer" :class="{
            'dark-theme': indexState.theme,
            'light-theme': !indexState.theme,
            'show': state.showButton
        }">
            <img src="@/assets/image/logo/logo.svg" @click="ToHome">
            <h2>文章列表</h2>
            <img src="@/assets/image/actions/about.svg" @click="TOAbout">
        </div>
        <el-timeline w-full h-full>
            <el-timeline-item :timestamp="item.createdAt.split('T')[0]" placement="top" size="large" v-for="item in state.post"
                :key="item._id" color="blue" el-icon-document icon="el-icon-document">
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
const indexState = useIndexState()
import axios from 'axios'
const router = useRouter();
const state = reactive({
    post: [],
    showButton: true,
    lastScrollPosition: 0,
})

onMounted(() => {
    getPost()
    // 头栏和脚栏出现事件监听
    state.lastScrollPosition = window.scrollY
    window.addEventListener('scroll', handleScroll)
})


const getPost = async () => {
    try {
        const {data} = await axios.post('http://8.137.16.32:3000/getAll');
        console.log(data.data)
        state.post = data.data
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

<style lang="scss" scoped></style>