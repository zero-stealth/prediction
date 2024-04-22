<template>
  <ButtonComponent />
  <QuickComponent />
  <div class="main-bet">
    <div class="main-header">
      <div class="header-info">
        <h1>Bet Of The Day Betting Tips And Predictions</h1>
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
          <template v-slot:ads>
            <div class="Preview">
              <button class="btn-preview" @click="showCard(card.date, card.teamA, card.teamB)">
                Match Preview >>
              </button>
            </div> 
          </template
          >
          <template v-slot:button>
            <div class="Tip">
              <h4>Tip:</h4>
              <span>{{ card.tip }}</span>
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
    <div>
      <vipads />
    </div>
    <div class="fp-class">
      <h1>Bet of the day</h1>
      <p>
        On this page we offer Free Bet Of The Day in either football, basketball or tennis
        predictions from our experts, Once you get access to our Bet of The Day prediction you would
        get the opportunity to win huge. We ensure that our predictions are accurate and you can now
        get rid of all confusion.
      </p>
      <h1>What does Bet of the day mean?</h1>
      <p>
        It's the safest tip, usually with low odds. They are perfect for accumulators/ rollovers.
      </p>
    </div>
  </div>
  <PopUP v-if="showPop"> </PopUP>
  <Sticky />
</template>
<script setup>
import QuickComponent from '../components/QuickComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import vipads from '../components/vipadsComponent.vue'
import Sticky from '../components/stickyComponent.vue'
import PopUP from '../components/popupComponent.vue'
import Card from '../components/CardComponent.vue'
import { useDrawerStore } from '../stores/drawer'
import { ref, watchEffect, onMounted } from 'vue'
import OfferAds from '../components/OfferAds.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const currentDate = ref('')
const offset = ref(0)
const cardData = ref([])
const showPop = ref(null)
const router = useRouter()
const drawerStore = useDrawerStore()
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

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
    const response = await axios.get(
      `${SERVER_HOST}/predictions/bet/betOfTheDay/${currentDate.value}`
    )
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

<style>
@import '../style/Home.css';
@import '../style/Bet.css';
</style>
