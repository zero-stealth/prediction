<script setup>
import axios from 'axios'
import moment from 'moment'
import Arrow from '../icons/arrow.vue'
import Card from '../components/CardComponent.vue'
import { ref, onMounted, watchEffect } from 'vue'
import ButtonComponent from '../components/ButtonComponent.vue'

const currentDate = ref(moment().format('dddd, MMMM Do YYYY'))
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
    cardData.value.push(response.data)
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
  offset.value = 1
  updateCurrentDate()
}

const updateCurrentDate = () => {
  const today = moment().add(offset.value, 'days')
  currentDate.value = today.format('dddd, MMMM Do YYYY')
}

const dateParam = ref(moment(currentDate.value, 'dddd, MMMM Do YYYY').toISOString())

watchEffect(() => {
  const isoDate = moment(currentDate.value, 'dddd, MMMM Do YYYY').toISOString()
  dateParam.value = isoDate
})

console.log(dateParam.value)

updateCurrentDate()
</script>

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
          <div v-for="item in cardData" class="main-h-card" :key="item">
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
              :formationA="Array.isArray(card.formationA) ? card.formationA[0]?.split('-') : []"
              :formationB="Array.isArray(card.formationB) ? card.formationB[0]?.split('-') : []"
              :time="card.time"
            />
          </div>
        </template>

        <template v-else>
          <div class="home-freetip">
            <h1>no upcoming predictions yet! check back later</h1>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
@import '../style/Home.css';
</style>
