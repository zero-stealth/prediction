<template>
  <ButtonComponent @change="handleBetNameChange" />
  <QuickComponent />
  <div class="main-bet">
    <div class="main-header">
      <div class="header-info"> 
        <h1>{{ paramValue }} ({{ currentDate }})</h1>
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
      <div v-for="item in cardData" class="main-h-card booom-h" :key="item._id">
        <Card
          v-for="(card) in item"
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
          @click="showCard(card._id)"
        />
      </div>
    </template>
    <template v-else>
      <div class="home-freetip">
        <h1>{{ $t('upcoming.h1-2') }}</h1>
      </div>
    </template>
  </div>
  <div>
      <vipads />
    </div>
  <div class="fp-class" v-if="betName === 'Double Chance'">
      <h1>{{ $t('double.h1') }}</h1>
      <p>{{ $t('double.p1') }}</p>
      <h1>{{ $t('double.h2') }}</h1>
      <p>{{ $t('double.p2') }}</p>
    </div>
    <div class="fp-class" v-if="betName === 'Over 2.5 Goals'">
      <h1>{{ $t('overT.h1') }}</h1>
      <p>{{ $t('overT.p1') }}</p>
      <h1>{{ $t('overT.h2') }}</h1>
      <p>{{ $t('overT.p2') }}</p>
      <p>{{ $t('overT.p3') }}</p>
    </div>
      <div class="fp-class" v-if="betName === 'Over 1.5 Goals'">
      <h1>{{ $t('overO.h1') }}</h1>
      <p>{{ $t('overO.p1') }}</p>
      <p>{{ $t('overO.p2') }}</p>
      <h1>{{ $t('overO.h2') }}</h1>
      <p>{{ $t('overO.d1') }}</p>
    </div>
    <div class="fp-class" v-if="betName === 'Both Teams To Score'">
      <h1>{{ $t('Teams.h1') }}</h1>
      <p>{{ $t('Teams.p1') }}</p>
      <h1>{{ $t('Teams.h2') }}</h1>
      <p>{{ $t('Teams.p2') }}</p>
      <ol>
        <li>{{ $t('Teams.li1') }}</li>
        <li>{{ $t('Teams.li2') }}</li>
      </ol>
    </div>
     <div class="fp-class" v-if="betName === 'Under 2.5 Goals'">
      <h1>{{ $t('Under.h1') }}</h1>
      <p>{{ $t('Under.p1') }}</p>
      <h1>{{ $t('Under.h2') }}</h1>
      <p>{{ $t('Under.p2') }}</p>
    </div>
     <PopUP v-if="showPop"> </PopUP>
  <Sticky />
</template>

<script setup>
import ButtonComponent from '../components/ButtonComponent.vue'
import QuickComponent from '../components/QuickComponent.vue'
import vipads from '../components/vipadsComponent.vue'
import Sticky from '../components/stickyComponent.vue'
import PopUP from '../components/popupComponent.vue'
import Card from '../components/CardComponent.vue'
import { useDrawerStore } from '../stores/drawer'
import OfferAds from '../components/OfferAds.vue'
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const currentDate = ref('')
const offset = ref(0)
const paramValue = ref('')
const betName = ref('')

const cardData = ref([])
const showPop = ref(null)
const drawerStore = useDrawerStore()

watchEffect(() => {
  showPop.value = drawerStore.popDrawer
})



const predictions = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `https://predictions-reg9.onrender.com/predictions/prediction/${betName.value}/${currentDate.value}`
    )

    cardData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const handleBetNameChange = async (newBetName) => {
  betName.value = newBetName
  await predictions()
}

onMounted(() => {
  watchEffect(() => {
    predictions()
  })
})

const previousDay = () => {
  offset.value--
  updateCurrentDate()
}

const setOffset = (value) => {
  offset.value = value
  updateCurrentDate()
}

const getFormattedDate = (offset) => {
  const today = new Date()
  today.setDate(today.getDate() + offset)
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = today.getFullYear()
  return `${day}-${month}-${year}`
}

const updateCurrentDate = () => {
  currentDate.value = getFormattedDate(offset.value)
}

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-')
  }
  return []
}

watchEffect(() => {
  paramValue.value = router.currentRoute.value.params.betName
  betName.value = paramValue.value
  updateCurrentDate()
})

updateCurrentDate()
</script>

<style>
@import '../style/Home.css';
@import '../style/Bet.css';
</style>
