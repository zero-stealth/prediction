<template>
    <div class="scroll-contain" @click="scrollToTop">
      <Arrow class="scroll-icon"/>
    </div>
  </template>
<script setup>
import Arrow from '../icons/arrow.vue';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

  <style scoped>
  @import '../style/scroll.css';
  </style>
  