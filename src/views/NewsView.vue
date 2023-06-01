<script setup>
import { useRouter } from 'vue-router'
import news from '../assets/news.png'
import ArrowIcon from '@/icons/ArrowIcon.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>
<template>
  <div class="details-container news-pin">
    <div class="details-wrapper">
      <div
        class="details-image"
        :style="{
          backgroundImage: ` url(${news})`
        }"
      >
        <div class="details-h">
          <ArrowIcon class="details-arrow" @click="goBack()" />
          <h2>news</h2>
          <span></span>
        </div>
      </div>
      <div class="news-details-i">
        <h1>Titl</h1>
        <p>skskksk</p>
      </div>
    </div>
  </div>
  <div class="mobilenav-layout">
    <mobileNav />
  </div>
</template>
<style>
@import '../style/specific.css';
@import '../style/predictions.css';
</style>
