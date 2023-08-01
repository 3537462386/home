<template>
    <div class="mybutton" :class="{ 'show': showButton }">
        <img src="/image/action/dark.svg" v-show="$store.state.theme" @click="changeTheme" class="w-8 h-8">
        <img src="/image/action/sun.svg" v-show="!$store.state.theme" @click="changeTheme" class="w-8 h-8">
        <img src="/image/action/totop.svg" @click="backToTop" class="w-9 h-9">
        <img src="/image/action/actions.png" class="bg-blue w-8 h-8 p-1 rounded-1" />
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