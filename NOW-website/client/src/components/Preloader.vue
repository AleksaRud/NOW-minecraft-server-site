<script setup lang="ts">
import { ref, onMounted } from 'vue';
const show = ref<boolean>(true);

const showToggle = (): void => {
  setTimeout(() => {
    show.value = false;
  }, 4000);
};

onMounted(() => {
  showToggle();
});
</script>

<template>
    <transition name="fade">
        <div v-if="show" class="preloader">
            <div class="square"></div>
        </div>
    </transition>
    

</template>

<style scoped>
@keyframes spin{
  0% {
    transform: rotate(0deg);
    outline-offset: 0px;
  }
  
  15% {
    transform: rotate(90deg);
    outline-offset: 40px;
  }
  25% {
    transform: rotate(90deg);
    outline-offset: 40px;
  }

  40% {
    transform: rotate(180deg);
    outline-offset: 0px;
  }
  
  50% {
    transform: rotate(180deg);
    outline-offset: 0px;
  }

  65% {
    transform: rotate(270deg);
    outline-offset: 40px;
  }
  75% {
    transform: rotate(270deg);
    outline-offset: 40px;
  }
  90% {
    transform: rotate(360deg);
    outline-offset: 0px;
  }
  100% {
    transform: rotate(360deg);
    outline-offset: 0px;
  }
}
.preloader{
    width: 100%;
    height: 100vh;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #121619;
    overflow: hidden;
    gap: 100px;
}

.square{
  width: 80px;
  height: 80px;
  background-color: rgb(156, 255, 255);
  animation: spin 2.6s ease-out infinite;
  outline: 10px rgb(156, 255, 255) solid;
  outline-offset: 0px;
}

.fade-enter-active, .fade-leave-active{
    transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}

@media(max-width: 425px) {
  .square{
    scale: 0.8;
  }
}
</style>