<template>
    <div class="mybutton z-200" :class="{ 'show': showButton }">
        <span class="iconfont icon-taiyangtianqi" v-show="!indexState.theme" @click="changeTheme"></span>
        <span class="iconfont icon-yueguang" v-show="indexState.theme" @click="changeTheme"></span>
        <span class="iconfont icon-huidaodingbu" @click="backToTop"></span>
    </div>
</template>
  
<script setup>
import { useIndexState } from '@/stores/index'
const indexState = useIndexState()

const showButton = ref(false);

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    listenTheme( );
});
const listenTheme = () => {
    const spans = document.getElementsByTagName("span");
    if (indexState.theme) {
        for (let i = 0; i < spans.length; i++) {
            spans[i].classList.add("active");
        }
    } else {
        for (let i = 0; i < spans.length; i++) {
            spans[i].classList.remove("active");
        }
    }
}
const handleScroll = () => {
    showButton.value = window.scrollY > 500
}

const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
const changeTheme = () => {
    indexState.changeTheme()
    listenTheme()  ;
}
</script>
<style scoped>
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
    color: black;
}

.mybutton span.active {
    color: white;
}
</style>