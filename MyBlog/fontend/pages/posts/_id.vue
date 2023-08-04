<template>
  <div class="w-screen ">
    <Head />
    <div class="post p-10 flex flex-col justify-center items-center w-full md:px-10vw lg:px-22vw ">
      <h1>{{ post.title }}</h1>
      <!-- <pre>{{ state.post.content }}</pre> -->
      <p class="" style="white-space:pre-wrap;line-height: 2;">{{ post.content }}</p>
    </div>
  </div>
</template>
  

<script>
import Head from '@/components/Head.vue';
export default ({
  components: {
    Head
  },
  data() {
    return {
      post: []
    }
  },
  head() {

  },
  mounted() {
    this.getPost()
  },
  methods: {
    async getPost() {
      try {
        const params = this.$route.params
        console.log(params)
        const result = await this.$axios.$post('http://localhost:3000/getOne', { _id: params.id });
        // const result = await this.$axios.$post('http://localhost:3000/getOne',{_id:'64cc973f7935b4b8c770afc1'});
        console.log(result.data)
        this.post = result.data
      } catch (error) {
        console.error(error);
      }
    }
  }
})
</script>
<style scoped></style>