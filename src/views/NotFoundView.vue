<template>
    <div class="container-not-found">
      <img src="../assets/404.gif" alt="gif_image" class="imag-gif" />
      <button class="not-f-btn" @click="goHome">Go home</button>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
    router.push({ name: 'Home' })
  scrollToTop()

    
}

const scrollToTop = () => {
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
}

</script>
<style>
@import '../style/NotFound.css';
</style>
