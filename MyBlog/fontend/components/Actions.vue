<template>
    <div class="mybutton z-200" :class="{ 'show': showButton }">
        <img src="/image/button/dark.svg" v-show="$store.state.theme" @click="changeTheme" class="w-8 h-8">
        <img src="/image/button/sun.svg" v-show="!$store.state.theme" @click="changeTheme" class="w-8 h-8">
        <img src="/image/button/totop.svg" @click="backToTop" class="w-9 h-9">
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            showButton: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            this.showButton = window.scrollY > 500
        },
        backToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        changeTheme() {
            this.$store.commit('setTheme')
        }
        
    }
}
</script>
  
<style>
.mybutton {
    position: fixed;
    bottom: 25px;
    right: 25px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    cursor: pointer;
}

.mybutton.show {
    opacity: 1;
}

</style>