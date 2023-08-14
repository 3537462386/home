<template>
    <div class="container w-screen flex flex-col items-center my-10vh md:mx-10vw">
        <div class="w-full myhead z-200 px-5 flex justify-between items-center cursor-pointer" :class="{
            'dark-theme': $store.state.theme,
            'light-theme': !$store.state.theme,
            'show': showButton
        }">
            <img src="/image/logo/logo.svg" @click="ToHome">
            <h2>文章列表</h2>
            <img src="/image/actions/about.svg" @click="TOAbout">
        </div>
        <el-timeline w-full h-full>
            <el-timeline-item :timestamp="item.createdAt.split('T')[0]" placement="top" size="large" v-for="item in post"
                :key="item._id" color="blue" el-icon-document icon="el-icon-document">
                <el-card>
                    <div class="flex  items-center">
                        <img :src="item.imgs" class="w-13 h-11 rounded cursor-pointer" @click="toPost(item._id)">
                        <div class="flex flex-col mx-4 ">
                            <h4 class="mb-2 cursor-pointer hover:underline" @click="toPost(item._id)">{{ item.title }}</h4>
                            <div class="opacity-50" style="color: rgb(31, 86, 159);" >{{ `${item.likes} Like / ${item.views}
                                Read` }}</div>
                        </div>

                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
import Actions from '@/components/Actions.vue';
export default ({
    components: {
        Actions
    },
    data() {
        return {
            post: [],
            showButton: true,
            lastScrollPosition: 0,
        }
    },
    head() {

    },
    mounted() {
        this.getPost()
        // 头栏和脚栏出现事件监听
        this.lastScrollPosition = window.scrollY
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        async getPost() {
            try {
                const result = await this.$axios.$post('/getAll');
                console.log(result.data)
                this.post = result.data
            } catch (error) {
                console.error(error);
            }
        },
        handleScroll() {
            const currentScrollPosition = window.scrollY
            if (currentScrollPosition > this.lastScrollPosition && this.showButton === true) {
                this.showButton = false
            } else if (currentScrollPosition < this.lastScrollPosition && this.showButton === false) {
                this.showButton = true
            }
            this.lastScrollPosition = currentScrollPosition
        },
        ToHome() {
            this.$router.push("/");
        },
        TOAbout() {
            this.$router.push("/about");
        },
        toPost(id) {
            this.$router.push(`/posts/${id}`);
        }
    }
})
</script>

<style lang="scss" scoped></style>