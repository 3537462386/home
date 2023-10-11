<template>
    <div class="container">
        <button class="btn" v-show="!Loading" @click="LoadMore">
            加载更多
        </button>
        <div class="dots" v-show="Loading">
            <div class="bg-red-500"></div>
            <div class="bg-emerald-500"></div>
            <div class="bg-yellow-400"></div>
            <div class="bg-indigo-500"></div>
        </div>
    </div>
</template>

<script setup>
const Loading = ref(false);

const LoadMore = () => {
    Loading.value = true;
    setTimeout(() => {
        Loading.value = false;
    },1500);
}
</script>

<style scoped>
.container {
    width: 300px;
    height: 60px;
    display:flex;
    justify-content: center;
    align-items: center;
}
button {
  z-index: 1;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: #161616;
  padding: 0.5em 1em;
  outline: none;
  border: 0.5px solid #d0c8c8;
  border-radius: 5px;
  opacity: 0.6; 
  background-color: white;
  overflow: hidden;
  transition: color 0.4s ease-in-out;
}

button::before {
  content: '';
  z-index: -1;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #3cefff;
  transform-origin: center;
  transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 0);
  transition: transform 0.45s ease-in-out;
}

button:hover {
  cursor: pointer;
  color: white;
}

button:hover::before {
  transform: translate3d(-50%, -50%, 0) scale3d(15, 15, 15);
}
.dots {
    width: 5em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
}

.dots div {
    width: 1em;
    height:1em;
    border-radius: 50%;
    animation: fade 0.5s ease-in-out alternate infinite;
}

.dots div:nth-of-type(1) {
    animation-delay: -0.4s;
}

.dots div:nth-of-type(2) {
    animation-delay: -0.2s;
}

@keyframes fade {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>