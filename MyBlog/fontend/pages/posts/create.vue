<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">发布新文章</h1>
      <div>
        <label for="title" class="font-medium">标题</label>
        <input type="text" id="title" v-model="state.Form.title"
          class="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1" required>
      </div>
      <div>
        <label for="sketch" class="font-medium">概述</label>
        <input type="text" id="sketch" v-model="state.Form.sketch"
          class="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1" required>
      </div>
      <div>
        <label for="content" class="font-medium">内容</label>
        <textarea id="content" v-model="state.Form.content"
          class="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1" rows="8" required></textarea>
      </div>
      <!-- <div>
        <label for="imgs" class="font-medium">图片</label>
        <textarea id="imgs" v-model="state.Form.imgs"
          class="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1" rows="8" required></textarea>
      </div> -->
      <div>
        <input type="file" @change="handleFileSelect" accept="image/*">
        <img :src="state.Form.imgs" v-if="state.Form.imgs" class="w-20 h-20">
      </div>
      <div class="flex justify-end">
        <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          @click="submitForm">发布</button>
      </div>
  </div>
</template>
  
<script setup>
import { reactive, onMounted, ref } from 'vue'
import axios from 'axios'
const state = reactive({
  Form: {
    title: '',
    content: '',
    sketch: '',
    imgs: ''
  }
})
//图片转base64格式方法

const handleFileSelect = (event) =>{
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64Data = e.target.result;
      state.Form.imgs = base64Data
      console.log(base64Data);
    };
    reader.readAsDataURL(file);
  }
}
const submitForm = async () => {
  try {
    const result = await axios.post('http://localhost:3000/addPost',{
      title: state.Form.title,
      content: state.Form.content,
      sketch: state.Form.sketch,
      imgs: state.Form.imgs
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
</script>
  
<style>
/* 在这里可以添加样式 */
</style>