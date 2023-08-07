<template>
    <div class="mybutton z-200" :class="{ 'show': showButton }">
        <span class="iconfont icon-taiyangtianqi" v-show="!$store.state.theme"
         @click="changeTheme" :class="$store.state.theme ? 'active':''"></span>
        <span class="iconfont icon-yueguang" v-show="$store.state.theme" @click="changeTheme"
        :class="$store.state.theme ? 'active':''"></span>
        <span class="iconfont icon-huidaodingbu" @click="backToTop"
        :class="$store.state.theme ? 'active':''"></span>
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

.mybutton span {
    font-size: 30px;
    margin-left: 5px;
    color:black;
}
span.active {
    color:white;
}
</style>