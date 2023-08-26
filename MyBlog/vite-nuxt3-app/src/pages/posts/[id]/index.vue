<template>
  <div class="w-screen" :class="indexState.theme ? 'dark-theme' : 'light-theme'">

    <Head />
    <div class="post px-10 py-30 flex flex-col justify-center items-center w-full md:px-10vw lg:px-22vw">
      <h1 class="">{{ state.post.title }}</h1>
      <!-- <pre>{{ state.post.content }}</pre> -->
      <p class="py-10" style="white-space:pre-wrap;line-height:2;">{{ state.post.content }}</p>
      <div class="w-full flex flex-col items-center justify-center h-70 rounded p-5"
        style="border:1px solid rgb(158, 150, 150,0.3);border-radius: 4px;">
        <div class="flex items-center justify-center w-full mx-10 ">
          <input type="text" class="w-1/2 h-8 mr-2 border-none opacity-50  focus:outline-none focus:opacity-100"
            v-model="state.comment.name" style="border-bottom:1px dashed  rgb(90, 74, 74);" placeholder="Name">
          <input type="email" class="w-1/2 h-8 ml-2 border-none opacity-50 focus:outline-none focus:opacity-100"
            v-model="state.comment.email" style="border-bottom:1px dashed  rgb(80, 69, 69);" placeholder="Email">
        </div>
        <div class="w-full mx-10 m-3">
          <textarea type="email" class="w-full p-3 h-40 border-none opacity-50 focus:outline-none focus:opacity-100"
            style="border:1px dashed  rgb(71, 62, 62);border-radius: 4px;" v-model="state.comment.content"
            placeholder="What do you want to say?"></textarea>
        </div>
        <div class="w-full flex items-center">
          <el-button @click="submitComment" class="mr-4">Submit</el-button>
          <span class="iconfont icon-icon-hongcha mr-2" style="color: red;font-size:10px" v-show="state.isRed"></span>
          <div class=" opacity-50 " :class="{ 'textRed': state.isRed }">{{ state.inputtext }}</div>
        </div>
      </div>
      <div class="comments w-full my-10">
        <p class="">comments&nbsp;({{ state.post.comments ? state.post.comments.length : 0 }})</p>
        <ul class="w-full">
          <li v-for="item in state.comments" :key="item._id" class="w-full m-5 px-6 flex items-center justify-between">
            <div class="flex ">
              <p class="" style="color: red;">{{ item.name }}:</p>
              <p class="mx-5">{{ item.content }}</p>
            </div>
            <p class="opacity-30 " style="font-size: 10px;">{{ item.createdAt.split('T')[0] }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  

<script setup>
import Head from '@/components/Head.vue';
import axios from 'axios'
import { useIndexState } from '@/stores/index';
const indexState = useIndexState()
const route = useRoute()
const state = reactive({
  post: [],
  comments: [],
  comment: {
    name: '',
    email: '',
    content: '',
    postId: route.params.id
  },
  inputtext: '~认真和用心是一种态度, 感谢支持~',
  isRed: false
})
useHead({
  title: '文章'
});
onMounted(() => {
  getPost();
  console.log(indexState.theme)
})
//得到文章
const getPost = async () => {
  try {
    const params = route.params
    console.log(params)
    const result = await axios.post('http://8.137.16.32:3000/addViews', { _id: params.id });
    const comment = await axios.post('http://8.137.16.32:3000/getCommentByPost', { _id: params.id });
    state.comments = comment.data.data;
    // indexState.setPost(result.data.data);
    state.post = result.data.data;
  } catch (error) {
    console.error(error);
  }
}
const submitComment = async () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (state.comment.name === '') {
    state.inputtext = '您的名字是第一印象哦～';
    state.isRed = true;
    return;
  } else if (!emailPattern.test(state.comment.email)) {
    state.inputtext = '请输入正确的邮箱，期待回信～';
    state.isRed = true;
    return;
  } else if (state.comment.content === '') {
    state.inputtext = '偷偷告诉我，你作文是不是0分～';
    state.isRed = true;
    return;
  } else {
    state.isRed = false;
    state.inputtext = '~认真和用心是一种态度, 感谢支持~';
    const params = route.params
    const result = await axios.post('http://8.137.16.32:3000/addComment', state.comment);
    const comment = await axios.post('http://8.137.16.32:3000/getCommentByPost', { _id: params.id });
    state.comments = comment.data.data
  }
}

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

.light-theme {
  background-color: white;
  color: black;
}

.dark-theme {
  /* 在这里编写黑夜主题相关的样式 */
  background-color: black;
  color: white;
}

.dark-theme input,
.dark-theme textarea {
  background-color: black;
  color: white;
}
</style>