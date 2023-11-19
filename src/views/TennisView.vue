<template>
  <div>
    <ButtonComponent />
    <QuickComponent />
    <div class="home-main">
      <div class="main-h">
        <div class="main-header">
          <div class="header-info">
            <h1>{{ $t('tennis.h1-1') }} {{ $t('bank.h1-5') }}</h1>
            <span>({{ currentDate }})</span>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay()">
              {{ $t('bank.btn-1') }}
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
              {{ $t('bank.btn-2') }}
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
              {{ $t('bank.btn-3') }}
            </button>
          </div>
        </div>
        <OfferAds />
        <template v-if="cardData.length > 0">
          <div v-for="item in cardData" class="main-h-card" :key="item._id">
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
              :formationA="formatFormation(card.formationA) ? card.formationA[0]?.split('-') : []"
              :formationB="formatFormation(card.formationB) ? card.formationB[0]?.split('-') : []"
              @click="showCard(card.teamA, card.teamB, card._id)"
              :time="card.time"
              :sport="card.sport"
            />
          </div>
        </template>
        <template v-else>
          <div class="home-freetip">
            <h1>{{ $t('upcoming.h1-2') }}</h1>
          </div>
        </template>
      </div>
    </div>
    <div>
      <vipads />
    </div>
    <div class="fp-class">
      <h1>{{ $t('ten.h1') }}</h1>
      <p>{{ $t('ten.p1') }}</p>
      <p>{{ $t('ten.p2') }}</p>
    </div>
  </div>
  <PopUP v-if="showPop"> </PopUP>
  <Sticky />
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/game'
import { useDrawerStore } from '../stores/drawer'
import OfferAds from '../components/OfferAds.vue'
import Card from '../components/CardComponent.vue'
import PopUP from '../components/popupComponent.vue'
import Sticky from '../components/stickyComponent.vue'
import vipads from '../components/vipadsComponent.vue'
import { ref, onMounted, watch, watchEffect } from 'vue'
import QuickComponent from '../components/QuickComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'


const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const gameStore = useGameStore()
const currentDate = ref('')
const router = useRouter()
const cardData = ref([])
const url = ref('')

const showPop = ref(null)
const drawerStore = useDrawerStore()

watchEffect(() => {
  showPop.value = drawerStore.popDrawer
})

const showCard = (gameA, gameB ,cardID) => {
  router.push({ name: 'TennisTips', params: { tennisName: `${gameA} vs ${gameB}`  } })
  gameStore.updateGameId(cardID)
}

async function getPrediction() {
  url.value =`${SERVER_HOST}/sports/sport/Tennis/${currentDate.value}`

  try {
    const response = await axios.get(url.value)
    cardData.value = response.data.length > 0 ? [response.data] : [] // Set the data or an empty array
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
  currentDate.value = `${formattedDay}-${formattedMonth}-${today.getFullYear()}`
}

updateCurrentDate()

watch(currentDate, () => {
  getPrediction()
})

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-')
  }
  return []
}
</script>

<style>
@import '../style/Home.css';
</style>
