<template>
  <div class="container flex-col items-center relative w-screen h-screen">
    <Loading v-if="state.isLoading" />
    <div class="w-screen h-screen relative ">
      <div class="overflow-hidden">
        <div class="relative">
          <!-- <img :src="state.initData.bgImg" class="w-full h-screen" /> -->
          <img :src="state.initData.bgImg" class="w-full h-screen" />
        </div>
      </div>
      <div class="absolute top-10vh w-50 text-bg-primary z-200 px-10vw flex items-center justify-between">
        <div class="flex items-center justify-center w-30">
          <img src="@/assets/image/logo/logo.svg" class="w-20 h-10" />
          <p class="" style="font-size: 25px;color:white">Sakura</p>
        </div>
      </div>
      <div class="absolute top-50vh left-15vw text-white w-50vw transform -translate-y-1/2">
        <div class="time ">{{ state.initData.currentTime }}</div>
        <div class="content my-7 text-7 w-full">{{ state.initData.headContent.hitokoto }}</div>
        <div class="my-7 text-5">——{{ state.initData.headTile }}:{{ state.initData.headContent.from }}</div>
      </div>
    </div>
    <template v-if="state.initData.posts.length > 0">
      <div class="content relative py-10 w-screen sm:px-1/8" :class="indexState.theme ? 'dark-theme' : 'light-theme'">
        <div class="flex flex-col items-center w-full ">
          <div
            class="box w-full lg:h-60vh md:40vh 65vh my-7vh flex flex-col justify-center items-center border-1 rounded-2 border-gray-200 border-solid md:border-none md:even:flex-row-reverse md:flex-row "
            v-for="item in state.initData.posts" :key="item._id">
            <div class="imgbox md:w-3/5 w-full h-full">
              <img :src="item.imgs" class="w-full h-full rounded-2 object-fill hover:opacity-75 cursor-pointer"
                @click="toPost(item._id)">
            </div>
            <div
              class="textbox  flex flex-col justify-center  p-10 md:h-9/10 md:w-2/5  md:border-1 md:border-gray-200 md:border-solid rounded-2">
              <div class="time my-3 opacity-60 text-2">{{ item.createdAt.split('T')[0] }}</div>
              <div class="title my-3 text-6 cursor-pointer hover:underline" @click="toPost(item._id)">{{ item.title }}
              </div>
              <div class="content mb-10 opacity-60">{{ item.sketch }}</div>
              <div class="action opacity-60 flex  items-center">
                <span class="iconfont icon-yanjing mx-1"></span>
                <p class="mr-5" style="font-size: 8px;">{{ item.views }}</p>
                <span class="iconfont icon-xinxi mx-1"></span>
                <p class="mr-5" style="font-size: 8px;">{{ item.comments ? item.comments.length : 0 }}</p>
                <span class="iconfont icon-aixin"></span>
                <p class="mr-5" style="font-size: 8px;">{{ item.likes }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="more">
        <!-- <LoadMore /> -->
      </div>
    </template>
    <template v-else>
      <div class="py-30vh text-center">主人太懒了，还没发表任何文章！！</div>
    </template>
    <Actions />
    <Modal />
    <div id="rocket" class="z-100 pointer-events-none">
      <img src="@/assets/image/rocket.svg" class="w-full h-full" style="pointer-events: none;">
    </div>
  </div>
</template>
<script setup >
import { GetPosts , GetHeadText } from '@/api'
import { useIndexState } from '@/stores/index'
import axios from 'axios'
import PCimg1 from '../assets/image/pcbg/1.jpg'
import PCimg2 from '../assets/image/pcbg/2.jpg'
import PCimg3 from '../assets/image/pcbg/3.jpg'
import PCimg4 from '../assets/image/pcbg/4.jpg'
import PCimg5 from '../assets/image/pcbg/5.jpg'
import PHimg1 from '../assets/image/phbg/1.jpg'
import PHimg2 from '../assets/image/phbg/2.jpg'
import PHimg3 from '../assets/image/phbg/3.jpg'
import PHimg4 from '../assets/image/phbg/4.jpg'
import PHimg5 from '../assets/image/phbg/5.jpg'
const router = useRouter();

useHead({
  title: 'Sakura'
});

const state = reactive({
  initData :{
    headContent:[],
    headTile:'',
    currentTime: '',
    bgImg:'',
    posts:[],
  },
  isLoading: true
});
const PCImage = [PCimg1, PCimg2, PCimg3, PCimg4, PCimg5];
const PHImage = [PHimg1, PHimg2, PHimg3, PHimg4, PHimg5];
const indexState = useIndexState()
onMounted(() => {
  if (useisMobile()) {
    indexState.isMobile = false;
  }else {
    indexState.isMobile = true;
  }
  getInitData();
  getPosts();
  fly();
  state.isLoading = false;
});
onActivated(() => {
  getPosts();
});

const getInitData = async () => {
  state.initData.currentTime = new Date().toLocaleString();
  setInterval(() => {
    state.initData.currentTime = new Date().toLocaleString()
  }, 1000);
  let randomInt = Math.floor(Math.random() * 5) + 1;
  // state.initData.bgImg = `../assets/image/bg/${randomInt}.jpg`;
  if(indexState.isMobile){
    state.initData.bgImg = PHImage[randomInt];
  }else {
    state.initData.bgImg = PCImage[randomInt];
  }
  try {
    const {data} = await axios.get('https://v1.hitokoto.cn?c=a&c=c&c=h&c=i');
    console.log(data);
    state.initData.headContent = data;
    if (data.type === 'a') {
      state.initData.headTile = '动画';
    } else if (data.type === 'c') {
      state.initData.headTile = '游戏';
    } else if (data.type === 'h') {
      state.initData.headTile = '电影';
    } else {
      state.initData.headTile = '诗词';
    };
    
  } catch (e) {
    console.log(e);
  }
}

const getPosts = async () => {
  try {
    const result = await axios.post('http://8.137.16.32:3000/getAll');
    state.initData.posts = result.data.data;
    console.log(state.initData.posts);
  } catch (err) {
    console.log(err);
  }
}

const fly = () => {
  let oRocket = document.querySelector('#rocket');
  let deg = 0, ex = 0, ey = 0, vx = 0, vy = 0, count = 0;

  window.addEventListener('mousemove', (e) => {
    ex = e.x - oRocket.offsetLeft - oRocket.clientWidth / 2;
    ey = e.y - oRocket.offsetTop - oRocket.clientHeight / 2;
    deg = Math.atan(ey / ex) / (2 * Math.PI) * 360 + 45;
    if (ex < 0) {
      deg += 180;
    }
    count = 0;
  });
  function move() {
    oRocket.style.transform = `rotate(${deg}deg)`;
    if (count < 100) {
      vx += ex / 100;
      vy += ey / 100;
    }
    oRocket.style.left = vx + 'px';
    oRocket.style.top = vy + 'px';
    count++;
  }
  setInterval(move, 1);
}
const toPost = (id) => {
  router.push(`/posts/${id}`);
}
</script>
<style scoped>
#rocket {
  position: fixed;
  width: 40px;
  height: 40px;
}
.light-theme {}

.dark-theme {
  /* 在这里编写黑夜主题相关的样式 */
  background-color: black;
  color: white;
}
</style>