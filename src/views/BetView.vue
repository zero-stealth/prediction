<template>
  <ButtonComponent @change="handleBetNameChange" />
  <div class="main-bet">
    <div class="main-header">
      <div class="header-info">
        <h1>{{ paramValue }} ({{ currentDate }})</h1>
      </div>
      <div class="header-btn">
        <button class="btn-h" :class="{ 'active-btn': offset === -1 }" @click="setOffset(-1)">
          Yesterday
        </button>
        <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
          Today
        </button>
        <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
          Tomorrow
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
        <h1>No predictions yet! Check back later.</h1>
      </div>
    </template>
  </div>
</template>

<script setup>
import ButtonComponent from '../components/ButtonComponent.vue'
import Card from '../components/CardComponent.vue'
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const currentDate = ref('')
const offset = ref(0)
const paramValue = ref('')
const betName = ref('')

const cardData = ref([])

const predictions = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `https://predictions-reg9.onrender.com/predictions/prediction/${betName.value}/${currentDate.value}`
    )

    cardData.value = response.data.length > 0 ? [response.data] : [];
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
    return formation[0].split('-');
  }
  return [];
};

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
