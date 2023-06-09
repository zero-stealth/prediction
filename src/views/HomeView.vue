<template>
  <HeroComponent />
  <div class="home-main">
    <div class="main-h">
      <div class="main-header">
        <div class="header-info">
          <h1>Free tips {{ currentDate }}</h1>
        </div>
        <div class="header-btn">
          <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay">
            <Arrow class="btn-icon icon-left" />
            Previous
          </button>
          <button class="btn-h" :class="{ 'active-btn': offset < 0 }" @click="nextDay">
            Next
            <Arrow class="btn-icon icon-right" />
          </button>
        </div>
      </div>
      <template v-if="cardData.length > 0">
        <div v-for="item in cardData" class="main-h-card">
          <Card
            v-for="(card, index) in item"
            :key="card._id"
            :tip="card.tip"
            :status="card.status"
            :leagueIcon="card.leagueIcon"
            :teamAIcon="card.teamAIcon"
            :teamBIcon="card.teamBIcon"
            :teamA="card.teamA"
            :teamB="card.teamB"
            :league="card.league"
            :teamAscore="card.teamAscore"
            :teamBscore="card.teamBscore"
            :formationA="Array.isArray(card.formationA) ? card.formationA[0].split('-') : []"
            :formationB="Array.isArray(card.formationB) ? card.formationB[0].split('-') : []"
            :time="card.time"
          />
        </div>
      </template>
      <template v-else>
        <div class="home-freetip">
          <h1>no predictions and tips today, check back tomorrow</h1>
        </div>
      </template>
    </div>
    <div class="news-main">
      <div class="news-header">
        <div class="news-info">
          <h1>Sport News</h1>
        </div>
        <div class="news-link">
          <Arrow class="news-icon icon-left" />
          <span>see more</span>
          <Arrow class="news-icon" />
        </div>
      </div>
      <div class="news-wrapper">
        <NewsCard
          v-for="(newsItem, index) in newsData"
          :key="index"
          :banner="newsItem.Image"
          @click="newsInfo(index)"
        >
          <h2>{{ newsItem.Title }}</h2>
        </NewsCard>
      </div>
    </div>
    <Upcoming />
    <OtherComponent />
    <AboutComponent />
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Arrow from '../icons/arrow.vue'
import NewsCard from '../components/NewsCard.vue'
import Card from '../components/CardComponent.vue'
import Upcoming from '../components/UpcomingPicks.vue'
import AboutComponent from '../components/aboutComponent.vue'
import HeroComponent from '../components/HeroComponent.vue'
import OtherComponent from '../components/OtherComponent.vue'

const currentDate = ref('')
const router = useRouter()
const cardData = ref([])
const newsData = ref([])

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
}

const newsInfo = (newsID) => {
  router.push({ name: 'News', params: { id: newsID } })
}

const getNews = async () => {
  try {
    const response = await axios.get('https://football98.p.rapidapi.com/premierleague/news', {
      headers: {
        'X-RapidAPI-Key': '324865d09cmsh592fb6c5fcae2abp189c83jsnf98e0d363d77',
        'X-RapidAPI-Host': 'football98.p.rapidapi.com'
      }
    })
    console.log(response.data)
    newsData.value = response.data // Set the newsData to the response directly
    console.log(newsData.value)
  } catch (err) {
    console.log(err)
  }
}

async function getPrediction() {
  try {
    const response = await axios.get(
      'https://predictions-server.onrender.com/predictions/tips/freeTip'
    )
    console.log(response.data)
    cardData.value.push(response.data)
    console.log(cardData.value)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getPrediction()
  getNews()
})

const offset = ref(0)

const previousDay = () => {
  offset.value--
  updateCurrentDate()
}

const nextDay = () => {
  offset.value++
  updateCurrentDate()
}

const updateCurrentDate = () => {
  const today = new Date()
  today.setDate(today.getDate() + offset.value)
  currentDate.value = today.toDateString()
}
</script>

<style>
@import '../style/Home.css';
</style>
