<template>
    <div>
        <div class="w-full myhead z-200 px-5 flex justify-between items-center">
            <img src="@/assets/image/logo/logo.svg" @click="ToHome" class="cursor-pointer">
            <audio :src="song.url" controls autoplay></audio>
            <img src="@/assets/image/actions/about.svg" @click="TOAbout" class="cursor-pointer">
        </div>
        <div class="w-full px-10 pt-20 flex">
            <div class="w-55">
                <img class="w-45 h-45 my-5 rounded-full" src="@/assets/image/logo/me.jpg" alt="帅哥头像">
                <h2 class="mb-5">Sakura</h2>
                <!-- <p class="mb-5">好困好困。。。</p> -->
                <div class="w-full flex items-center mb-3 scale-90">
                    <span class="iconfont icon-wenzhang1 mr-1"></span>
                    <p class="mr-4">{{ posts.posts }}</p>
                    <span class="iconfont icon-aixin mr-1"></span>
                    <p class="mr-4">{{ posts.likes }}</p>
                    <span class="iconfont icon-yanjing mr-1"></span>
                    <p>{{ posts.views }}</p>
                </div>
                <div class="mb-3 flex scale-90"><span class="iconfont icon-dizi mr-1"></span>
                    <p>江西南昌</p>
                </div>
                <div class="mb-3 flex scale-90"><span class="iconfont icon-youjian mr-1"></span>
                    <p>luwen0710@qq.com</p>
                </div>
                <div class="flex scale-90"><span class="iconfont icon-github mr-1"></span>
                    <a href="https://github.com/3537462386">https://github.com/...</a>
                </div>
            </div>
            <div class="w-300 p-10 rounded-1 border border-solid border-gray-300 ml-10 flex">
                <div class="flex flex-col mr-20">
                    <h2 class="mb-3">Hi,我是Sakura</h2>
                    <h2 class="mb-3">关于我：</h2>
                    <ul class="ml-8 mb-3">
                        <li>前端程序员</li>
                        <li>在校大四学生</li>
                        <li>正在寻找工作</li>
                    </ul>
                    <h2 class="mb-3">最近更新：</h2>
                    <ul class="ml-8 mb-3">
                        <li v-for="item in newPosts" :key="item._id">
                            <p @click="ToPost(item._id)" class="text-blue-500 underline hover:cursor-pointer">{{ item.title }}</p>
                        </li>
                    </ul>
                </div>

                <div id="chart" class="w-100 h-60"></div>
            </div>
            <div class="w-65">

            </div>
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { getSong, GetPosts } from '@/api';
const router = useRouter();
const value = reactive(new Date())
const newPosts = reactive([])
const song = reactive({
    url: '',
    lrc: '',
    name: '',
})
const posts = reactive({
    views: 0,
    likes: 0,
    posts: 0,
    comments: 0,
})
onMounted(async () => {
    await nextTick();
    getSongs();
    getPosts();
    setEcharts();
})
//请求歌数据
const getSongs = async () => {
    try {
        const { data } = await getSong();
        let songs = data.value.data;
        const randomIndex = Math.floor(Math.random() * songs.length);
        // song.lrc = parseLrc(songs[randomIndex].lrc);
        song.url = songs[randomIndex].url;
        song.name = songs[randomIndex].name;
    } catch (error) {
        console.error(error);
    }
}
//请求文章数据
const getPosts = async () => {
    try {
        const { data } = await GetPosts();
        let Data = data.value.data;
        console.log(Data);
        Data.forEach(post => {
            posts.likes += post.likes;
            posts.comments += post.comments.length;
            posts.views += post.views;
        });
        posts.posts = Data.length;
        newPosts = Data.slice(-4);
    } catch (error) {
        console.error(error);
    }
}
// echarts
const setEcharts = () => {
    // 1. 获取容器dom
    const chartDom = document.getElementById('chart');
    // 2. 初始化ECharts对象
    const chart = echarts.init(chartDom, null, {
        width: 300,
        height: 200
    });
    // 3. 编写 option 参数,调用 setOption 完成渲染
    var now = new Date();
    var date = now.getDate();
    console.log(date.toString());
    const option = {
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['posts', 'likes', 'views', 'comments']
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { value: posts.posts, name: 'posts' },
                    { value: posts.likes, name: 'likes' },
                    { value: posts.views, name: 'views' },
                    { value: posts.comments, name: 'comments' }
                ]
            }
        ]
    };
    chart.setOption(option);
}
const ToHome = () => {
   router.push("/");
}
const TOAbout = () => {
    router.push("/about");
}
const ToPost = (id) => {
    router.push(`/posts/${id}`);
}
</script>

<style scoped>
.myhead {
    margin: 0;
    position: fixed;
    top: 0;
    right: 0;
    height: 40px;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    /* 设置上边框 */
    box-shadow: inset 0px -1px 1px rgba(0, 0, 0, 0.1);
    /* 添加内阴影 */
    background-color: #f1f1f1;
}
</style>