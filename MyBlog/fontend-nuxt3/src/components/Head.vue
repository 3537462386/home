<template>
    <div>
        <div class="w-full myhead z-200 px-5 flex justify-between items-center cursor-pointer" :class="{
            'dark-theme': $store.state.theme,
            'light-theme': !$store.state.theme,
            'show': showButton
        }">
            <img src="/image/logo/logo.svg" @click="ToHome">
            <audio :src="randomSong" controls></audio>
            <img src="/image/actions/about.svg" @click="TOAbout">
        </div>
        <div class="w-full myfoot z-200 px-5 flex justify-around items-center cursor-pointer" :class="{
            'dark-theme': $store.state.theme,
            'light-theme': !$store.state.theme,
            'show': !showButton
        }">
            <div class="lrc">
                <ul>
                    <li v-for="item in lrcData" :key="item.index">{{ item.words }}</li>
                </ul>
            </div>
            <div class="button flex justify-center items-center">
                <span class="iconfont icon-yanjing"></span>
                <p>{{ $store.state.posts.views }}</p>
                <span class="iconfont icon-xinxi"></span>
                <p>{{ $store.state.posts.comments ? $store.state.posts.comments.length : 0 }}</p>
                <span class="iconfont icon-aixin" v-show="isLiked === 'unlike'" @click="likePost"></span>
                <span class="iconfont icon-aixin1" style="color: red;" v-show="isLiked === 'like'" @click="likePost"></span>
                <p>{{ $store.state.posts.likes }}</p>
                <span class="iconfont icon-taiyangtianqi" v-show="!$store.state.theme" @click="changeTheme"></span>
                <span class="iconfont icon-yueguang" v-show="$store.state.theme" @click="changeTheme"></span>
                <span class="iconfont icon-huidaodingbu" @click="backToTop"></span>
            </div>
        </div>
    </div>
</template>
  
<script setup>
const state = reactive({
    showButton: true,
    lastScrollPosition: 0,
    lrcData: [],
    randomIndex: 0,
    randomSong: '',
    isLiked: false,
    post: []
})
onMounted(() => {
    this.isLike()
    // this.getPost()
    // 头栏和脚栏出现事件监听
    this.lastScrollPosition = window.scrollY
    window.addEventListener('scroll', this.handleScroll)
    //得到初始歌数据
    this.getRandomSong()
    this.getSong()
    //监听歌曲
    document.querySelector('audio').addEventListener('timeupdate', this.setOffset);

})

beforeUnmount(() => {
    window.removeEventListener('scroll', this.handleScroll)
});

const getPost = async () => {
    try {
        const params = this.$route.params
        const result = await this.$axios.$post('/getOne', { _id: params.id });
        this.post = result.data
    } catch (error) {
        console.error(error);
    }
}
const handleScroll = () => {
    const currentScrollPosition = window.scrollY
    if (currentScrollPosition > this.lastScrollPosition && this.showButton === true) {
        this.showButton = false
    } else if (currentScrollPosition < this.lastScrollPosition && this.showButton === false) {
        this.showButton = true
    }
    this.lastScrollPosition = currentScrollPosition
}
const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
const changeTheme = () => {
    this.$store.commit('setTheme')
}
// 随机选取首歌曲中的一首
const getRandomSong = () => {
    const songs = [1441758494, 436346833, 1336856864, 567544544, 514761281, 28267530, 64561, 29759733];
    const randomIndex = Math.floor(Math.random() * songs.length);
    this.randomIndex = songs[randomIndex];
    this.randomSong = `https://api.wuenci.com/meting/api/?type=url&id=${this.randomIndex}`;
}
//请求歌数据
const getSong = async () => {
    try {
        const data = await this.$axios.$get(`https://api.wuenci.com/meting/api/?server=netease&type=lrc&id=${this.randomIndex}`);
        this.lrcData = this.parseLrc(data);
        console.log(this.lrcData)
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
            time: this.parseTime(timeStr),
            words: parts[1]
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
    for (let i = 0; i < this.lrcData.length; i++) {
        if (curTime < this.lrcData[i].time) {
            return i - 1;
        }
    }
    //最后一句
    return this.lrcData.length - 1;
}

//移动歌词
const setOffset = () => {
    const ul = document.querySelector('.lrc ul');
    const container = document.querySelector('.lrc');
    const containerHeight = container.clientHeight;
    const liHeight = ul.children[0].clientHeight;
    const maxOffset = ul.clientHeight - containerHeight;
    // 偏移量
    const index = this.findIndex();
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
    this.$router.push("/");
}
const TOAbout = () => {
    this.$router.push("/about");
}
const changeTheme = () => {
    this.$store.commit('setTheme')
}
const likePost = async () => {
    this.isLiked = !this.isLiked;
    const likes = JSON.parse(localStorage.getItem('likePosts'));
    if (likes) {
        if (this.isLiked) {
            likes.push(this.$store.state.posts._id);
            localStorage.setItem('likePosts', JSON.stringify(likes));
        } else {
            likes.filter((i) => i != this.$store.state.posts._id);
            localStorage.setItem('likePosts', JSON.stringify(likes));
        }
    } else {
        let likes = [];
        posts.push(this.$store.state.posts._id);
        localStorage.setItem('likePosts', JSON.stringify(likes));
    }
    try {
        await this.$axios.$post('/likePost', { _id: this.$store.state.posts._id, isLiked: this.isLiked });
        const result = await this.$axios.$post('/getOne', { _id: params.id });
        console.log(result);
        this.$store.commit('setPosts', result.data);
    } catch (err) {
        console.log(err);
    }
}
const likePost = async () => {
    this.isLiked = !this.isLiked;
    const likes = JSON.parse(localStorage.getItem('likePosts'));
    if (likes) {
        if (this.isLiked) {
            likes.push(this.$store.state.posts._id);
            localStorage.setItem('likePosts', JSON.stringify(likes));
        } else {
            likes.filter((i) => i != this.$store.state.posts._id);
            localStorage.setItem('likePosts', JSON.stringify(likes));
        }
    } else {
        let likes = [];
        posts.push(this.$store.state.posts._id);
        localStorage.setItem('likePosts', JSON.stringify(likes));
    }
    try {
        await this.$axios.$post('/likePost', { _id: this.$store.state.posts._id, isLiked: this.isLiked });
        const result = await this.$axios.$post('/getOne', { _id: params.id });
        console.log(result);
        this.$store.commit('setPosts', result.data);
    } catch (err) {
        console.log(err);
    }
}
const isLike = () => {
    let likes = JSON.parse(localStorage.getItem('likePosts'));
    this.isLiked = likes.includes(this.$store.state.posts._id);
}


</script>
  
<style>
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