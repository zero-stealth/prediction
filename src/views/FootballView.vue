<template>
  <ButtonComponent />
  <QuickComponent />
  <div class="home-main">
    <div class="main-h">
      <div class="main-header">
        <div class="header-info">
          <h1>Football Betting Tips And Predictions</h1>
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
        <div v-for="item in cardData" class="main-h-card booom-h" :key="item._id">
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
            :showScore="card.showScore"
            :teamAscore="card.teamAscore"
            :teamBscore="card.teamBscore"
            :formationA="formatFormation(card.formationA) ? card.formationA[0].split('-') : []"
            :formationB="formatFormation(card.formationB) ? card.formationB[0].split('-') : []"
            :time="card.time"
          >
            <template v-slot:button>
              <div class="Tip">
                <button class="btn-preview" @click="showCard(card.date, card.teamA, card.teamB)">
                  Predictions and Preview >>
                </button>
              </div>
            </template>
          </Card>
        </div>
      </template>
      <template v-else>
        <div class="home-freetip">
          <h1>No predictions yet! Check back later.</h1>
        </div>
      </template>
    </div>
    <div />
    <div>
      <vipads />
    </div>
    <div class="fp-class">
      <h1>Football Predictions</h1>
      <p>
        Football predictions involve trying to predict the outcome of football (soccer) matches.
        People make football predictions for various purposes, including betting, sports analysis,
        or simply for fun. Some common types of football predictions include: Match Outcome
        Predictions (1 for home team, 2 for away team, X for draw, Over/Under Predictions (i.e 0ver
        1.5 goals under 2.5 goals), Both Teams to Score (BTTS) Predictions (i.e BTTS-Yes and
        BTTS-No), Double Chance Predictions (1X, 12,X2), and many more.
      </p>
      <p>
        When making football predictions, it's essential to consider factors like team form, player
        injuries, head-to-head statistics, home-field advantage, weather conditions, and other
        relevant data. Keep in mind that predicting the outcome of sports events always carries an
        element of uncertainty, and responsible betting is crucial. Additionally, some people make
        predictions for fun or as part of sports analysis without involving betting.
      </p>
    </div>
  </div>
  <PopUP v-if="showPop"> </PopUP>
  <Sticky />
</template>
<script setup>
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
import ButtonComponent from '../components/ButtonComponent.vue'
import QuickComponent from '../components/QuickComponent.vue'
import Sticky from '../components/stickyComponent.vue'
import vipads from '../components/vipadsComponent.vue'
import PopUP from '../components/popupComponent.vue'
import Card from '../components/CardComponent.vue'
import { useDrawerStore } from '../stores/drawer'
import OfferAds from '../components/OfferAds.vue'
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const offset = ref(0)
const cardData = ref([])
const showPop = ref(null)
const router = useRouter()
const currentDate = ref('')
const drawerStore = useDrawerStore()

watchEffect(() => {
  showPop.value = drawerStore.popDrawer
})

const showCard = (date, teamA, teamB) => {
  router.push({
    name: 'Tips',
    params: {
      date: date,
      teamA: teamA,
      teamB: teamB
    }
  })
}

const predictions = async () => {
  try {
    // const token = localStorage.getItem('token')
    const response = await axios.get(`${SERVER_HOST}/predictions/tips/freeTip/${currentDate.value}`)
    cardData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  predictions()
})

const previousDay = () => {
  offset.value--
  updateCurrentDate()
}

const setOffset = (value) => {
  offset.value = value
  updateCurrentDate()
}

const updateCurrentDate = () => {
  const today = new Date()
  today.setDate(today.getDate() + offset.value)
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = today.getFullYear()
  currentDate.value = `${day}-${month}-${year}`
}

updateCurrentDate()
const formatFormation = (formation) => {
  if (formation && formation.length > 0) {
    // Check if formation exists and has at least one element
    return formation[0].split('-')
  }
  return []
}

watchEffect(() => {
  predictions()
})
</script>

<style scoped>
@import '../style/Home.css';
</style>
