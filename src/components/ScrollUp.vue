<template>
    <div class="scroll-contain" @click="isAtBottom ? scrollToTop : scrollToBottom">
      <Arrow class="scroll-icon" :class="{ 'arrow-up': isAtBottom, 'arrow-down': !isAtBottom }"/>
    </div>
  </template>
<script setup>
import { ref } from 'vue';
import Arrow from '../icons/arrow.vue';

const isAtBottom = ref(false);

const scrollToTop = () => {
  document.getElementById('foot').scrollIntoView({ behavior: 'smooth' });
};

const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

window.addEventListener('scroll', () => {
  isAtBottom.value = window.scrollY > 0;
});
</script>

  <style scoped>
  @import '../style/scroll.css';
  </style>
  