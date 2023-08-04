<template>
    <div class="container w-screen flex flex-col items-center my-10vh md:mx-10vw">
        <el-timeline w-full h-full>
            <el-timeline-item :timestamp="item.createdAt.split('T')[0]" placement="top" size="large" v-for="item in post"
                :key="item._id">
                <el-card>
                    <div class="flex justify-center items-center">
                        <img :src="item.imgs" class="w-13 h-11 rounded">
                        <div class="flex flex-col mx-4 ">
                            <h4 class="mb-2">{{ item.title }}</h4>
                            <div class="opacity-50" style="color: rgb(31, 86, 159);">{{ `${item.likes} Like / ${item.views} Read` }}</div>
                        </div>

                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
export default ({
    components: {
    },
    data() {
        return {
            post: []
        }
    },
    head() {

    },
    mounted() {
        this.getPost()
    },
    methods: {
        async getPost() {
            try {
                const result = await this.$axios.$post('http://localhost:3000/getAll');
                console.log(result.data)
                this.post = result.data
            } catch (error) {
                console.error(error);
            }
        }
    }
})
</script>

<style lang="scss" scoped></style>