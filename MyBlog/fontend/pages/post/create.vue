<template>
    <div class="max-w-3xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4">发布新文章</h1>
      <form class="space-y-4" @submit.prevent="submitForm">
        <div>
          <label for="title" class="font-medium">标题</label>
          <input type="text" id="title" v-model="title" class="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1" required>
        </div>
        <div>
          <label for="content" class="font-medium">内容</label>
          <textarea id="content" v-model="content" class="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1" rows="8" required></textarea>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">发布</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        content: '',
      };
    },
    methods: {
      submitForm() {
        // TODO: 提交表单数据到后端
        console.log(`发布文章：标题=${this.title}，内容=${this.content}`);
        // 清空表单数据
        this.title = '';
        this.content = '';
      },
    },
  };
  </script>
  
  <style>
    /* 在这里可以添加样式 */
  </style>