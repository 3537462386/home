<template>
    <div>
        <div class="w-full myhead z-200 px-5 flex justify-between items-center " :class="{
            'dark-theme': indexState.theme,
            'light-theme': !indexState.theme,
            'show': state.showButton
        }">
            <img src="@/assets/image/logo/logo.svg" @click="ToHome" class="cursor-pointer">
            <audio :src="song.url" controls autoplay></audio>
            <img src="@/assets/image/actions/about.svg" @click="TOAbout" class="cursor-pointer">
        </div>
        <div class="w-full myfoot z-200 px-5 flex justify-around items-center" :class="{
            'dark-theme': indexState.theme,
            'light-theme': !indexState.theme,
            'show': !state.showButton
        }">
            <div class="lrc">
                <ul>
                    <li v-for="item in song.lrc" :key="item.index">{{ item.words }}</li>
                    <li></li>
                </ul>
            </div>
            <div class="button flex justify-center items-center cursor-pointer">
                <span class="iconfont icon-yanjing"></span>
                <p>{{ state.post.views + 1}}</p>
                <span class="iconfont icon-xinxi" @click="backToEnd"></span>   
                <p>{{ state.post.comments ? state.post.comments.length : '0' }}</p>
                <span class="iconfont icon-aixin" v-show="!state.isLiked" @click="likePost"></span>
                <span class="iconfont icon-aixin1" style="color: rgb(230, 96, 96);" v-show="state.isLiked" @click="likePost"></span>
                <p>{{ state.post.likes }}</p>
                <span class="iconfont icon-taiyangtianqi" v-show="!indexState.theme" @click="changeTheme"></span>
                <span class="iconfont icon-yueguang" v-show="indexState.theme" @click="changeTheme"></span>
                <span class="iconfont icon-huidaodingbu" @click="backToTop"></span>
            </div>
        </div>
    </div>

</template>
  
<script setup>
import { useIndexState } from '@/stores/index'
import { GetOnePost,LikePost,getSong } from '@/api';
const indexState = useIndexState();
const route = useRoute();
const router = useRouter();
const state = reactive({
    showButton: true,
    lastScrollPosition: 0,
    isLiked: false,
    post: []
})
const song = reactive({
    url:'',
    lrc:'',
    name:'',
})

onMounted(async () => {
    state.lastScrollPosition = window.scrollY;
    window.addEventListener('scroll',handleScroll);
    document.querySelector('audio').addEventListener('timeupdate',setOffset);
    await nextTick();
    getPost();
    getSongs();
})

// beforeUnmount(() => {
//     window.removeEventListener('scroll',handleScroll)
// });

const getPost = async () => {
    try {
        const params = route.params
        const post = await GetOnePost({ _id: params.id });
        state.post = post.data.value.data;
        state.isLiked = isLike(post.data.value.data._id)
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
const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
const backToEnd = () => {
    window.scrollTo({
        top: 100000000,
        behavior: 'smooth'  
    })
}
const changeTheme = () => {
    indexState.changeTheme()
}
   
//请求歌数据
const getSongs = async () => {
    try {
        const {data} = await getSong();
        let songs = data.value.data;
        const randomIndex = Math.floor(Math.random() * songs.length);
        song.lrc = parseLrc(songs[randomIndex].lrc);
        song.url = songs[randomIndex].url;
        song.name = songs[randomIndex].name;
    } catch (error) {
        console.error(error);
    }
}
// 解析歌词，格式化
const parseLrc = (lrc) => {
    const lines = lrc.split('\n');
    const result = [];
    for (let i = 0; i < lines.length; i++) {
        const str = lines[i];
        const parts = str.split(']');
        const timeStr = parts[0].substring(1);
        const obj = {
            time:parseTime(timeStr),
            words:parts[1]
        };
        result.push(obj);
    }
    return result;
}
const parseTime = (timeStr) => {
    const parts = timeStr.split(':');
    return +parts[0] * 60 + +parts[1];
}
// 得到now 歌词
const findIndex = () => {
    const audio = document.querySelector('audio')
    const curTime = audio.currentTime;
    for (let i = 0; i < song.lrc.length; i++) {
        if (curTime < song.lrc[i].time) {
            return i - 1;
        }
    }
    //最后一句
    return song.lrc.length - 1;
}
//移动歌词
const setOffset = () => {
    const ul = document.querySelector('.lrc ul');
    const container = document.querySelector('.lrc');
    const containerHeight = container.clientHeight;
    const liHeight = ul.children[0].clientHeight;
    const maxOffset = ul.clientHeight - containerHeight;
    // 偏移量
    const index = findIndex();
    var offset = liHeight * index + liHeight / 2
        - containerHeight / 2;
    if (offset < 0) {
        offset = 0;
    }
    if (offset > maxOffset) {
        offset = maxOffset;
    }
    ul.style.transform = `translateY(-${offset}px)`;
    const li = ul.children[index];
    if (li) {
        li.classList.add('active');
    }
}
const ToHome = () => {
   router.push("/");
}
const TOAbout = () => {
    router.push("/about");
}
const likePost = async () => {
    state.isLiked = !state.isLiked;
    const likes = indexState.likePosts;
    if (likes) {
        if (state.isLiked) {
            likes.push(state.post._id);
            indexState.setLikePost(likes);
            state.post.likes++;
        } else {
            indexState.setLikePost(likes.filter((i) => i != state.post._id));
            state.post.likes--;
        }
    } else {
        let likes = [];
        likes.push(state.post._id);
        indexState.setLikePost(likes)
    }
    try {
        await LikePost({ _id: state.post._id, isLiked:state.isLiked });
        const post = await GetOnePost({ _id: params.id });
        state.post = result.data.value.data;
    } catch (err) {
        console.log(err);
    }
}

const isLike = (postId) => {
    let likes = indexState.likePosts;
    return likes.includes(postId);
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

.myfoot {
    margin: 0;
    padding: 0;
    position: fixed;
    bottom: 0;
    right: 0;
    height: 0;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    border-top: 1px solid #ccc;
    /* 设置上边框 */
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.1);
    /* 添加内阴影 */
    background-color: #f1f1f1;
}

.myhead.show {
    height: 40px;
}

.myfoot.show {
    height: 40px;
}


audio {
    width: 350px;
    height: 35px;
}

.myhead img {
    height: 35px;
    width: 35px;
}

.lrc {
    text-align: center;
    overflow: hidden;
    height: 35px;
    width: 350px;
}

.lrc ul {
    transition: 0.6s;
    list-style: none;
    overflow: hidden;
}

.lrc li {
    height: 35px;
    line-height: 35px;
    overflow: hidden;
}

.lrc li.active {
    color: #000000;
    transform: scale(1.2);
    transition: 0.2s;
}

.button span {
    font-size: 20px;
    margin-left: 10px;
    color: #716666;
}

.button span:hover {
    color: rgb(0, 0, 255);
}

.button p {
    font-size: 5px;
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
</style>