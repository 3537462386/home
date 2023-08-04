<template>
  <div class="container flex-col items-center relative w-screen h-screen">
    <div class="w-screen h-screen relative ">
      <div class="overflow-hidden">
        <div class="relative">
          <img :src="initData.bg" class="w-full h-screen" />
        </div>
      </div>
      <div class="absolute top-10vh w-full text-bg-primary z-200 px-10vw flex items-center justify-between">
        <div>
          <img src="/image/logo/logo1.png" class="w-20 h-10" />
        </div>
        <div>
          <img src="/image/button/actions.png" class="bg-white w-7 h-7 p-1 rounded-1 cursor-pointer" @click="showModal"
            v-show="!initData.modalVisible" />
          <img src="/image/button/unaction.svg" class="bg-white w-7 h-7 p-1 rounded-1 cursor-pointer" @click="showModal"
            v-show="initData.modalVisible" />
        </div>
      </div>
      <div class="absolute top-50vh left-15vw text-white w-50vw transform -translate-y-1/2">
        <div class="time ">{{ initData.currentTime }}</div>
        <div class="content my-7 text-7 w-full">{{ initData.head.hitokoto }}</div>
        <div class="my-7 text-5">——{{ initData.head.ty }}:{{ initData.head.from }}</div>
      </div>
    </div>

    <template v-if="initData.posts.length > 0">
      <div class="content relative my-10 w-screen sm:px-1/8" :class="$store.state.theme ? 'dark-theme' : 'light-theme'">
        <div class="flex flex-col items-center w-full ">
          <div
            class="box w-full  my-7vh flex flex-col items-center border-1 rounded-2 border-gray-200 border-solid md:border-none md:even:flex-row-reverse md:flex-row "
            v-for="item in initData.posts" :key="item._id">
            <div class="imgbox md:w-3/5 ">
              <img :src="item.imgs" class="w-full  max-h-100 rounded-2 hover:opacity-75 cursor-pointer" @click="toPost(item._id)">
            </div>
            <div
              class="textbox lg:h-55vh min-h-65 flex flex-col justify-center px-10 md:w-2/5  md:border-1 md:border-gray-200 md:border-solid rounded-2">
              <div class="time my-3 opacity-60 text-2">{{ item.createdAt.split('T')[0] }}</div>
              <div class="title my-3 text-6 cursor-pointer hover:underline" @click="toPost(item._id)">{{ item.title }}
              </div>
              <div class="content my-3 opacity-60">{{ item.sketch }}</div>
              <div class="action opacity-60">{{ item.views }}</div>
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
    <modal :visible="initData.modalVisible" />
    <div id="rocket" class="z-100 pointer-events-none" >
      <img src="/image/rocket.svg" class="w-full h-full" style="pointer-events: none;">
    </div>

  </div>
</template>

<script>
import Actions from '@/components/Actions.vue';
import Modal from '@/components/Modal.vue';
export default ({
  name: 'index',
  components: {
    Actions,
    Modal
  },
  data() {
    return {
      initData: {
        head: {
          ty: '',
        },
        currentTime: '',
        bg: '',
        posts: [],
        modalVisible: false,
      }
    }
  },
  head() {

  },
  mounted() {
    this.getInitData();
    if (window.device.mobile()) {
      this.$store.commit('setMobile')
    };
    this.fly();
  },
  methods: {
    async getInitData() {
      this.initData.currentTime = new Date().toLocaleString();
      setInterval(() => {
        this.initData.currentTime = new Date().toLocaleString()
      }, 1000);
      let randomInt = Math.floor(Math.random() * 11) + 1;
      this.initData.bg = `/image/bg/${randomInt}.jpg`;


      try {
        const result = await this.$axios.$post('http://localhost:3000/getAll');
        this.initData.posts = result.data
        console.log(this.initData.posts)



        const data = await this.$axios.$get(
          'https://v1.hitokoto.cn?c=a&c=c&c=h&c=i'
        );
        console.log(data);
        this.initData.head = data;
        if (data.type === 'a') {
          this.initData.head.ty = '动画';
        } else if (data.type === 'c') {
          this.initData.head.ty = '游戏';
        } else if (data.type === 'h') {
          this.initData.head.ty = '电影';
        } else {
          this.initData.head.ty = '诗词';
        };
      } catch (e) {
        console.log(e)
      }
    },
    showModal() {
      this.initData.modalVisible = !this.initData.modalVisible;
    },
    //小火箭飞飞飞！！！！！！！！！！
    fly() {
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
    },
    toPost(id) {
      this.$router.push(`/posts/${id}`);
    }
  }
})
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