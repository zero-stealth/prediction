<template>
  <div
    class="news-info-contain"
    v-if="newsData.length > 0"
    :style="{
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), #042f59), url('${newsData[0].enclosure.url}')`
    }"
  >
  <div class="info-bar">
    <ArrowIcon class="back-arrow" @click="goBack()" />
    <span>
      {{ newsData[0].pubDate }}
    </span>  
  </div>
    <div class="news-info-content">
      <h1>{{ newsData[0].title }}</h1>
      <p>{{ newsData[0].content }}</p>
    </div>
  </div>
  <div class="news-no" v-else>
    <span>...getting news</span>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArrowIcon from '@/icons/ArrowIcon.vue'

const newsData = ref([])
const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const getNews = async () => {
  try {
    const response = await axios.get(
      'https://real-time-sports-news-api.p.rapidapi.com/live-articles',
      {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        }
      }
    )
    newsData.value = response.data.filter((newsItem) => {
      const { enclosure, title } = newsItem
      return enclosure && enclosure.url && title === route.params.title
    })
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getNews()
})
</script>

<style>
@import '../style/newsInfo.css';
</style>
