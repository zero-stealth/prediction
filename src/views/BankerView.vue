<template>
  <ButtonComponent />
  <div class="main-bet">
    <div class="main-header">
      <div class="header-info">
        <h1> Bet of the day {{ currentDate }}</h1>
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

const props = defineProps({
  betName: String
})

const cardData = ref([])

const predictions = async() => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`https://predictions-server.onrender.com/predictions/bet/betOfTheDay`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data);
    cardData.value.push(response.data)
    console.log(cardData.value)

  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  predictions()
  console.log(props.betName);
})

const setOffset = (value) => {
  offset.value = value
  updateCurrentDate()
}

const getTimestamp = (offset) => {
  const today = new Date()
  today.setDate(today.getDate() + offset)
  return today.toDateString()
}

const updateCurrentDate = () => {
  currentDate.value = getTimestamp(offset.value)
}

watchEffect(() => {
  paramValue.value = router.currentRoute.value.params.betName
  updateCurrentDate()
})

updateCurrentDate()

</script>

<style>
@import '../style/Home.css';
@import '../style/Bet.css';
</style>
