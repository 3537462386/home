<template>
    <div class="max-w-3xl mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">添加歌曲</h1>
        <div>
            <label for="title" class="font-medium">名字</label>
            <input type="text" id="title" v-model="state.Form.name"
                class="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1" required>
        </div>
        <div>
            <label for="sketch" class="font-medium">url</label>
            <input type="text" id="sketch" v-model="state.Form.url"
                class="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1" required>
        </div>
        <div>
            <label for="content" class="font-medium">歌词</label>
            <textarea id="content" v-model="state.Form.lrc"
                class="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1" rows="8" required></textarea>
        </div>
        <div class="flex justify-end">
            <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" @click="submitForm">发布</button>
        </div>
    </div>
</template>
    
<script setup>
import { addSong } from '@/api'
const state = reactive({
    Form: {
        name: '',
        url: '',
        lrc: ''
    }
})
const submitForm = async () => {
    try {
        const result = await addSong({
            name: state.Form.name,
            url: state.Form.url,
            lrc: state.Form.lrc
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