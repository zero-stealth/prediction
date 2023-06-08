<template>
  <div>
    <ButtonComponent />
    <div class="home-main">
      <div class="main-h">
        <div class="main-header">
          <div class="header-info">
            <h1>Basketball Free tips {{ currentDate }}</h1>
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
              :league="card.league"
              :teamAscore="card.teamAscore"
              :teamBscore="card.teamBscore"
              :time="card.time"
            />
          </div>
        </template>
        <template v-else>
          <div class="home-freetip">
            <h1>no predictions and tips today, check back tomorrow</h1>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import Arrow from '../icons/arrow.vue'
import Card from '../components/CardComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'

const currentDate = ref('')
const cardData = ref([])

async function getPrediction() {
  const token = JSON.parse(localStorage.getItem('token'))

  try {
    const response = await axios.get(
      'https://predictions-server.onrender.com/sports/sport/Basketball',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
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
</script>

<style>
@import '../style/Home.css';
</style>
