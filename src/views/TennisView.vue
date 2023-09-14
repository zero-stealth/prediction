<template>
  <div>
    <ButtonComponent />
    <QuickComponent />
    <div class="home-main">
      <div class="main-h">
        <div class="main-header">
          <div class="header-info">
            <h1>{{ $t('tennis.h1-1') }} ({{ currentDate }})</h1>
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
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import vipads from '../components/vipads.vue'
import OfferAds from '../components/OfferAds.vue'
import Card from '../components/CardComponent.vue'
import QuickComponent from '../components/QuickComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'

const currentDate = ref('')
const cardData = ref([])
const url = ref('')

async function getPrediction() {
  // const token = JSON.parse(localStorage.getItem('token'))
  url.value = `https://predictions-reg9.onrender.com/sports/sport/Tennis/${currentDate.value}`
  console.log(url.value)

  try {
    const response = await axios.get(url.value)
    console.log(response.data)
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
