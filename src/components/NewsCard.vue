<template>
  <div class="news-card-con">
    <div v-if="banner" class="card-n-img" :style="{ backgroundImage: `url(${banner})` }"></div>
    <div class="card-n-info">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>  

 defineProps({
  banner: {
    type: String,
    default: null 
  }
});
</script>

<style scoped>
@import '../style/news.css';
</style>
