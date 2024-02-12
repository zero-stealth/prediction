<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const cardView = ref([])
const newsData = ref([])
const router = useRouter()
const filteredData = ref([])
const selectedTitle = ref('')
const selectedContent = ref('')
const selectedImage = ref(null)

const newsInfo = (title) => {
  router.push({ name: 'NewsInfo', params: { title } })
}

const setSelected = (title, content, image) => {
  selectedTitle.value = title
  selectedContent.value = content
  selectedImage.value = image
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

    filteredData.value = response.data.filter(
      (newsItem) => newsItem.enclosure && newsItem.enclosure.url
    )
    cardView.value = filteredData.value.slice(0, 8)
    newsData.value = filteredData.value.slice(8)

    const firstCard = cardView.value[0]
    setSelected(firstCard.title, firstCard.content, firstCard.enclosure.url)
  } catch (err) {
    console.error(err)
  }
}
onMounted(() => {
  getNews()
})
</script>

<template>
  <div class="news-page-contain">
    <div class="news-page-top-contain">
      <div
        class="news-page-top"
        :style="{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), #042f59), url('${selectedImage}')`
        }"
      >
        <div class="top-contain">
          <span> sports news</span>
          <h1>{{ selectedContent   }}</h1>
        </div>
      </div>
      <div class="top-card-contain">
        <h1>Top stories</h1>
        <div class="top-card-wrapper">
          <div
            class="top-card-info"
            :class="{
              'top-card-info-active': selectedTitle === card.title,
              'top-card-info-inactive': selectedTitle !== card.title
            }"
            v-for="(card, index) in cardView"
            :key="index"
            @click="setSelected(card.title, card.content, card.enclosure.url)"
          >
            <img :src="card.enclosure.url" :alt="card.title" class="card-top-img" />
            <div class="card-info-top">
              <span>{{ card.pubDate }}</span>
              <h1>{{ card.title }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="news-down">
      <h1>Hot News</h1>
      <div class="news-down-wrap">
        <div
          class="news-down-card"
          v-for="(news, index) in newsData"
          :key="index"
          @click="newsInfo(news.title)"
        >
          <img :src="news.enclosure.url" :alt="news.title" class="card-img-down" />
          <div class="card-info-down">
            <span>{{ news.pubDate }}</span>
            <h1>{{ news.title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../style/newsPage.css';
</style>
