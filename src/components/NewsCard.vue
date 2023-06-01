<template>
    <div class="news-card-con">
      <div class="card-n-img" :style="{ backgroundImage: `url(${banner})` }"></div>
      <div class="card-n-info">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>  
  const props = defineProps({
    banner: {
      type: String,
      required: true
    }
  });
  </script>
  <style scoped>
  @import '../style/news.css';
  </style>
  