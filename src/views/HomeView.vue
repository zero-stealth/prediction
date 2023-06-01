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
            :teamAscore="card.teamAscore"
            :teamBscore="card.teamBscore"
            :time="card.time"
            @click="showCard(card._id)"
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
          v-for="({ id, banner, title, description }, index) in newsData"
          :key="index"
          :banner="banner"
          @click="newsInfo(id)"
        >
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
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
import news from '../assets/news.png'
import NewsCard from '../components/NewsCard.vue'
import Card from '../components/CardComponent.vue'
import Upcoming from '../components/UpcomingPicks.vue'
import AboutComponent from '../components/aboutComponent.vue'
import HeroComponent from '../components/HeroComponent.vue'
import OtherComponent from '../components/OtherComponent.vue'

const currentDate = ref('')
const formationA = ref(['l', 'w', 'l', 'w', 'l'])
const formationB = ref(['l', 'w', 'l', 'w', 'l'])
const router = useRouter()
const teamAScore = ref(1)
const teamBScore = ref(0)
const tip = ref(1)

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
}

const newsInfo = (newsID) => {
  router.push({ name: 'News', params: { id: newsID } })
}

const cardData = ref([])

async function getPrediction() {
  try {
    const response = await axios.get('https://predictions-server.onrender.com/predictions')
    console.log(response.data)
    cardData.value.push(response.data)
    console.log(cardData.value)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getPrediction()
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

updateCurrentDate()

const newsData = ref([
  {
    id: 1,
    banner: news,
    title: 'News 1',
    description: 'Description for News 1'
  },
  {
    id: 2,
    banner: news,
    title: 'News 2',
    description: 'Description for News 2'
  },
  {
    id: 3,
    banner: news,
    title: 'News 3',
    description: 'Description for News 3'
  },
  {
    id: 3,
    banner: news,
    title: 'News 3',
    description: 'Description for News 3'
  }
])
</script>

<style>
@import '../style/Home.css';
</style>
