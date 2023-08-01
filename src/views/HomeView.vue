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
      <a href="https://bwredir.com/1bkh?p=%2Fregistration%2F" class="betw-banner-comp" @click="goAdds">
        <img src="../assets/BannerBet.png" alt="bet winner" class="betw-banner" />
      </a>
      <template v-if="cardData.length > 0">
        <div class="main-h-card">
          <Card
            v-for="(card, index) in cardData"
            :key="card._id"
            :tip="card.tip"
            :status="card.status"
            :leagueIcon="card.leagueIcon"
            :teamAIcon="card.teamAIcon"
            :teamBIcon="card.teamBIcon"
            :teamA="card.teamA"
            :teamB="card.teamB"
            :league="card.league"
            :showScore="card.showScore"
            :teamAscore="card.teamAscore"
            :teamBscore="card.teamBscore"
            :formationA="formatFormation(card.formationA)"
            :formationB="formatFormation(card.formationB)"
            :time="card.time"
            @click="showCard(card._id)"
          />
        </div>
      </template>
      <template v-else>
        <div class="home-freetip">
          <h1>No predictions yet! Check back later.</h1>
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
          <span v-if="showMoreButton" @click="showMoreNews">see more</span>
          <span v-else @click="showLessNews">see less</span>
          <Arrow class="news-icon" />
        </div>
      </div>
      <div class="news-wrapper">
        <NewsCard
          v-for="(newsItem, index) in visibleNews"
          :key="index"
          :banner="newsItem.image"
          @click="newsInfo(newsItem.id)"
        >
          <h2>{{ newsItem.caption }}</h2>
        </NewsCard>
      </div>
    </div>
    <Upcoming />
    <div
      @click="goAds()"
      class="ads-home"
      :style="{
        backgroundImage: `url(${ads})`
      }"
    ></div>
    <OtherComponent />
    <AboutComponent />
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Arrow from '../icons/arrow.vue'
import ads from '../assets/ads.gif'
import NewsCard from '../components/NewsCard.vue'
import Card from '../components/CardComponent.vue'
import Upcoming from '../components/UpcomingPicks.vue'
import AboutComponent from '../components/aboutComponent.vue'
import HeroComponent from '../components/HeroComponent.vue'
import OtherComponent from '../components/OtherComponent.vue'

const showMoreButton = ref(true)
const maxNewsToShow = ref(8)
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

const goAds = () => {
  window.open(
    'https://wa.me/+254703147237?text=Hi sporty predict, I want to buy VIP subcription'
  )
}


const visibleNews = computed(() => {
  return newsData.value.slice(0, maxNewsToShow.value)
})

const showMoreNews = () => {
  maxNewsToShow.value += 8
  showMoreButton.value = false
}

const showLessNews = () => {
  maxNewsToShow.value -= 8
  if (maxNewsToShow.value <= 8) {
    showMoreButton.value = true
  }
}
const getNews = async () => {
  try {
    const response = await axios.get('https://livescore-football.p.rapidapi.com/soccer/news-list', {
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
      }
    })
    console.log(response.data.data)
    newsData.value = response.data.data
    console.log(newsData.value)
  } catch (err) {
    console.log(err)
  }
}

const getPrediction = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  try {
    const response = await axios.get(
      `https://predictions-reg9.onrender.com/predictions/tips/freeTip/${currentDate.value}`
    )
    cardData.value = response.data
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
  if (offset.value < 1) {
    offset.value++
    updateCurrentDate()
  }
}

const updateCurrentDate = () => {
  const today = new Date()
  today.setDate(today.getDate() + offset.value)
  const month = today.getMonth() + 1
  const formattedMonth = month.toString().padStart(2, '0')
  const day = today.getDate()
  const formattedDay = day.toString().padStart(2, '0')
  currentDate.value = `${formattedDay}-${formattedMonth}-${today.getFullYear()}`
}

updateCurrentDate()

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-')
  }
  return []
}

watch(currentDate, () => {
  getPrediction()
})
</script>
<style scoped>
@import '../style/Home.css';
</style>
