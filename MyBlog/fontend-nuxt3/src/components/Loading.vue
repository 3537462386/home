<template>
    <div class="fixed w-screen h-screen z-500 flex justify-center items-center" style="background-color: white;">
        <div class="loading"></div>
    </div>
</template>

<script>
export default {
}
</script>

<style  scoped>
.loading {
  position: relative;
  width: 5em;
  height: 5em;
  border: 5px solid #3cefff;
  overflow: hidden;
  animation: spin 2s ease infinite;
}

.loading::before {
  content: '';
  position: absolute;
  top: -7.5px;
  left: -7.5px;
  width: 5em;
  height: 5em;
  background-color: hsla(185, 100%, 62%, 0.75);
  transform-origin: center bottom;
  transform: scaleY(1);
  animation: fill 2s linear infinite;
}

@keyframes spin {
  50%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fill {
  25%,
  50% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}

</style>