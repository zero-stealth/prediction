<script setup>
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import { ref, onMounted, computed } from 'vue'

const newsData = ref([])
const router = useRouter()
const route = useRoute()

const goBack = () => {
  router.go(-1)
}

const getNews = async () => {
  try {
    const response = await axios.get(
      'https://football-news-aggregator-live.p.rapidapi.com/news/onefootball',
      {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        },
      }
    )
    newsData.value = response.data
  } catch (err) {
    console.error(err)
  }
}

onMounted(getNews)

const filteredNewsData = computed(() => {
  const newsTitle = route.params.title
  return newsData.value.filter(newsItem => newsItem.title === newsTitle)
})
</script>

<template>
  <div class="details-container news-pin">
    <div v-if="filteredNewsData.length > 0" class="details-wrapper">
      <div
        class="details-image"
        :style="{ backgroundImage: `url(${filteredNewsData[0].img})` }"
      >
        <div class="details-h">
          <ArrowIcon class="details-arrow" @click="goBack" />
          <h2>Sport News</h2>
          <span></span>
        </div>
      </div>
      <div class="news-details-i">
        <h1>{{ filteredNewsData[0].title }}</h1>
        <a :href="filteredNewsData[0].url">"more info</a>
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
