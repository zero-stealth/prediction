<template>
  <div>
    <ButtonComponent />
    <QuickComponent />
    <div class="home-main">
      <div class="main-h">
        <div class="main-header">
          <div class="header-info">
            <h1>Basketball Betting Tips And Predictions</h1>
            <span>({{ currentDate }})</span>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay()">
              Previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
              Today
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
              Tomorrow
            </button>
          </div>
        </div>
        <OfferAds />
        <template v-if="cardData.length > 0">
          <div v-for="item in cardData" class="main-h-card" :key="item">
            <Card
              v-for="card in item"
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
              :showScore="card.showScore"
              showBtn="false"
              :formationA="formatFormation(card.formationA) ? card.formationA[0]?.split('-') : []"
              :formationB="formatFormation(card.formationB) ? card.formationB[0]?.split('-') : []"
              @click="showCard(card.teamA, card.teamB, card._id)"
              :time="card.time"
            />
          </div>
        </template>
        <template v-else>
          <div class="home-freetip">
            <h1>No predictions yet! Check back later.</h1>
          </div>
        </template>
      </div>
    </div>
    <div>
      <vipads />
    </div>
    <div class="fp-class">
      <h1>Basketball Predictions.</h1>
      <p>
        Basketball predictions involve attempting to forecast the outcome of basketball games, such
        as those in the NBA (National Basketball Association) or other professional leagues, college
        basketball, or international competitions.
      </p>
      <p>
        When making basketball predictions, we consider factors like team form, player injuries,
        head-to-head records, home-court advantage, and recent performance. Advanced statistical
        analysis, historical data, and expert opinions are often used to inform predictions. Keep in
        mind that sports predictions are subject to uncertainty, and outcomes can be influenced by
        unexpected events during the game.
      </p>
    </div>
  </div>
  <PopUP v-if="showPop"> </PopUP>
  <Sticky />
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useDrawerStore } from '../stores/drawer'
import OfferAds from '../components/OfferAds.vue'
import Card from '../components/CardComponent.vue'
import PopUP from '../components/popupComponent.vue'
import vipads from '../components/vipadsComponent.vue'
import Sticky from '../components/stickyComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import QuickComponent from '../components/QuickComponent.vue'
import { ref, onMounted, watch, watchEffect } from 'vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const upcomingDates = ref('')
const currentDate = ref('')
const router = useRouter()
const cardData = ref([])

const showPop = ref(null)
const drawerStore = useDrawerStore()

watchEffect(() => {
  showPop.value = drawerStore.popDrawer
})

const showCard = (gameA, gameB) => {
  router.push({
    name: 'BasketballTips',
    params: { basketballName: `${gameA} vs ${gameB} prediction` }
  })
}

async function getPrediction() {
  const token = JSON.parse(localStorage.getItem('token'))

  try {
    const response = await axios.get(
      `${SERVER_HOST}/sports/sport/Basketball/${currentDate.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    cardData.value = response.data.length > 0 ? [response.data] : []
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

// const nextDay = () => {
//   if (offset.value < 1) {
//     offset.value++;
//     updateCurrentDate();
//   }
// };

const setOffset = (value) => {
  offset.value = value
  updateCurrentDate()
}

const updateCurrentDate = () => {
  const today = new Date()
  today.setDate(today.getDate() + offset.value)
  const month = today.getMonth() + 1
  const formattedMonth = month < 10 ? `0${month}` : month
  const day = today.getDate()
  const formattedDay = day < 10 ? `0${day}` : day
  upcomingDates.value = `${formattedDay}-${formattedMonth}-${today.getFullYear()}`
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

<style>
@import '../style/Home.css';
</style>
