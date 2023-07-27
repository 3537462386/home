<template>
  <div class="container flex-col items-center relative">
    <div class="w-screen h-screen relative">
      <div class="overflow-hidden">
        <div class="relative">
          <img :src="initData.bg" class="w-full h-screen" />
        </div>
      </div>
      <div class="absolute top-18 w-full text-bg-primary z-99999 px-25 flex items-center justify-between">
        <div>
          <img src="/image/logo/logo1.png" class="w-20 h-10" />
        </div>
        <div>
          <img src="/image/action/actions.png" class="bg-white w-7 h-7 p-1 rounded-1" />
        </div>
      </div>
      <div class="absolute top-80 left-50 text-white w-90 transform -translate-y-1/2">
        <div class="time ">{{ initData.currentTime }}</div>
        <div class="content my-7 text-7 w-full">{{ initData.head.hitokoto }}</div>
        <div class="title my-7 text-5">——{{ initData.head.ty }}:{{ initData.head.from }}</div>
      </div>
    </div>

    <div>
      
    </div>
  </div>
</template>

<script>
export default ({
  name: 'index',
  components: {
    // Menu,
  },
  data() {
    return {
      initData:{
        head:{
          ty:'',
        },
        currentTime:'',
        bg:''
      }
    }
  },
  head() {

  },
  mounted() {
    this.getData()
  },
  methods: {

    async getData() {
      this.initData.currentTime = new Date().toLocaleString();
      setInterval(() => {
        this.initData.currentTime = new Date().toLocaleString()
      }, 1000);
      let randomInt = Math.floor(Math.random() * 11) + 1;
      this.initData.bg = `/image/bg/${randomInt}.jpg`;
      try {
        const data = await this.$axios.$get(
          'https://v1.hitokoto.cn?c=a&c=c&c=h&c=i'
        );
        console.log(data);
        this.initData.head = data;
        if(data.type === 'a'){
          this.initData.head.ty ='动画';
        }else if(data.type === 'c') {
          this.initData.head.ty ='游戏';
        }else if(data.type === 'h'){
          this.initData.head.ty ='电影';
        }else {
          this.initData.head.ty ='诗词';
        };
      } catch (e) {
        console.log(e)
      }

    }
  }
})
</script>
<style scoped></style>