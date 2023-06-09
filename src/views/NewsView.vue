<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import news from '../assets/news.png'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import { ref, onMounted, computed } from 'vue'

const newsData = ref([])
const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const getNews = async () => {
  try {
    const response = await axios.get(
      'https://football98.p.rapidapi.com/premierleague/news',
      {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        },
      }
    )
    console.log(response.data)
    newsData.value = response.data // Set the newsData to the response directly
    console.log(newsData.value)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getNews()
})

const filteredNewsData = computed(() => {
  const newsID = router.currentRoute.value.params.id
  const index = parseInt(newsID) - 1 // Subtract 1 to convert to array index
  return index >= 0 && index < newsData.value.length ? [newsData.value[index]] : []
})
</script>

<template>
  <div class="details-container news-pin">
    <div class="details-wrapper" v-for="newsItem in filteredNewsData" :key="newsItem._id">
      <div
        class="details-image"
        :style="{
          backgroundImage: `url(${newsItem.Image})`
        }"
      >
        <div class="details-h">
          <ArrowIcon class="details-arrow" @click="goBack()" />
          <h2>{{ newsItem.PublisherName }}</h2>
          <span></span>
        </div>
      </div>
      <div class="news-details-i">
        <h1>{{ newsItem.Title }}</h1> 
        <span>{{ newsItem.PublisherDate }}</span>
        <a :href="newsItem.NewsLink">more info</a>
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
