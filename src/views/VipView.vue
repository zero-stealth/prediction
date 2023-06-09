<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import MoneyIcon from '../icons/payIcon.vue'
import Card from '../components/CardComponent.vue'
import ProfileIcon from '../icons/profileIcon.vue'
import { ref, onMounted, watchEffect } from 'vue'

const isPaid = ref(true)
const router = useRouter()
const username = ref(null)
const isAdmin = ref(false)
const cardData = ref([])

watchEffect(() => {
  isPaid.value = localStorage.getItem('isPaid') === 'true'
  username.value = localStorage.getItem('username')
  isAdmin.value = localStorage.getItem('admin')
})

const PayPage = () => {
  router.push({ name: 'Pay' })
}

const goLogin = () => {
  router.push({ name: 'Login' })
}

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
}

async function getPrediction() {
  try {
    const response = await axios.get(
      'https://predictions-server.onrender.com/predictions/vipPredictions/vip'
    )
    cardData.value = response.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getPrediction()
})
</script>

<template>
  <div class="vip-container">
    <div class="vip-wrapper">
      <div class="vip-notpaid" v-if="!isPaid">
        <h1>Your vip account is inactive 🌵</h1>
        <button class="vip-btn" @click="goLogin()" v-if="!username">
          <ProfileIcon class="vip-pay-icon" />
          Log in
        </button>
        <button class="vip-btn" @click="PayPage()" v-else>
          <MoneyIcon class="vip-pay-icon" />
          Pay to activate
        </button>
      </div>
      <div v-else>
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
              :formationA="Array.isArray(card.formationA) ? card.formationA[0].split('-') : []"
              :formationB="Array.isArray(card.formationB) ? card.formationB[0].split('-') : []"
              :time="card.time"
              @click="showCard(card._id)"
            />
          </div>
        </template>
        <template v-else>
          <div class="home-freetip">
            <h1>No predictions and tips today, check back tomorrow</h1>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
@import '../style/vip.css';
</style>
