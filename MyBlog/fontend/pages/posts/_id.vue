<template>
  <div class="w-screen" :class="$store.state.theme ? 'dark-theme' : 'light-theme'">

    <Head />
    <div class="post px-10 py-30 flex flex-col justify-center items-center w-full md:px-10vw lg:px-22vw">
      <h1 class="">{{ $store.state.posts.title }}</h1>
      <!-- <pre>{{ state.post.content }}</pre> -->
      <p class="py-10" style="white-space:pre-wrap;line-height:2;">{{ $store.state.posts.content }}</p>
      <div class="w-full flex flex-col items-center justify-center h-70 rounded p-5"
        style="border:1px solid rgb(158, 150, 150,0.3);border-radius: 4px;">
        <div class="flex items-center justify-center w-full mx-10 ">
          <input type="text" class="w-1/2 h-8 mr-2 border-none opacity-50  focus:outline-none focus:opacity-100"
            v-model="comment.name" style="border-bottom:1px dashed  rgb(90, 74, 74);" placeholder="Name"
            :class="$store.state.theme ? 'dark-theme' : 'light-theme'">
          <input type="email" class="w-1/2 h-8 ml-2 border-none opacity-50 focus:outline-none focus:opacity-100"
            v-model="comment.email" style="border-bottom:1px dashed  rgb(80, 69, 69);" placeholder="Email"
            :class="$store.state.theme ? 'dark-theme' : 'light-theme'">
        </div>
        <div class="w-full mx-10 m-3">
          <textarea type="email" class="w-full p-3 h-40 border-none opacity-50 focus:outline-none focus:opacity-100"
            style="border:1px dashed  rgb(71, 62, 62);border-radius: 4px;" v-model="comment.content"
            placeholder="What do you want to say?" :class="$store.state.theme ? 'dark-theme' : 'light-theme'"></textarea>
        </div>
        <div class="w-full flex items-center">
          <el-button size="medium" @click="submitComment" class="mr-4" :class="$store.state.theme ? 'dark-theme' : 'light-theme'">Submit</el-button>
          <span class="iconfont icon-icon-hongcha mr-2" style="color: red;font-size:10px" v-show="isRed"></span>
          <div class=" opacity-50 " :class="{ 'textRed': isRed }">{{ inputtext }}</div>
        </div>
      </div>
      <div class="comments w-full my-10">
        <p class="">comments&nbsp;({{  $store.state.posts.comments ? $store.state.posts.comments.length : 0 }})</p>
        <ul>
          <li v-for="item in comments" :key="item._id" class="m-5">{{ item.name }}:{{item.content}}     {{ item.createdAt.split('T')[0] }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
  

<script>
import Head from '@/components/Head.vue';
export default ({

  components: {
    Head
  },
  data() {
    return {
      post: [],
      comments:[],
      comment: {
        name: '',
        email: '',
        content: '',
        postId: this.$route.params.id
      },
      inputtext: '~认真和用心是一种态度, 感谢支持~',
      isRed: false
    }
  },
  head() {

  },
  mounted() {
    this.getPost();

  },
  methods: {
    //得到文章
    async getPost() {
      try {
        const params = this.$route.params
        console.log(params)
        const result = await this.$axios.$post('http://localhost:3000/addViews', { _id: params.id });
        const comments = await this.$axios.$post('http://localhost:3000/getCommentByPost', { _id: params.id });
        this.comments = comments.data
        this.$store.commit('setPosts',result.data)
      } catch (error) {
        console.error(error);
      }
    },
    async submitComment() {
      if (this.comment.name === '') {
        this.inputtext = '您的名字是第一印象哦～';
        this.isRed = true;
        return;
      } else if (this.comment.email === '') {
        this.inputtext = '请输入正确的邮箱，期待回信～';
        this.isRed = true;
        return;
      } else if (this.comment.content === '') {
        this.inputtext = '偷偷告诉我，你作文是不是0分～';
        this.isRed = true;
        return;
      } else {
        const params = this.$route.params
        const result = await this.$axios.$post('http://localhost:3000/addComment', this.comment);
        const posts = await this.$axios.$post('http://localhost:3000/addViews', { _id: params.id });
        const comments = await this.$axios.$post('http://localhost:3000/getCommentByPost', { _id: params.id });
        this.comments = comments.data
        // console.log(posts)
        // this.post = posts.data
        this.$store.commit('setPosts',posts.data)
      }

    }
  }
})
</script>
<style scoped>
.textRed {
  color: red;
}
.comments ul {
    transition: 0.6s;
    list-style: none;
    overflow: hidden;
}
.light-theme  {
  background-color: white;
  color: black;
}

.dark-theme {
  /* 在这里编写黑夜主题相关的样式 */
  background-color: black;
  color: white;
}
</style>