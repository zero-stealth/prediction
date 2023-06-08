<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import MoneyIcon from '../icons/payIcon.vue'
import Card from '../components/CardComponent.vue'
import ProfileIcon from '../icons/profileIcon.vue'

const router = useRouter()
const authStore = useAuthStore()
const isPaid = ref(false)

watchEffect(() => {
  isPaid.value = authStore.isPaid
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

const cardData = ref([])

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
        <button class="vip-btn" @click="PayPage()" v-if="authStore.user">
          <MoneyIcon class="vip-pay-icon" />
          Pay to activate
        </button>
        <button class="vip-btn" @click="goLogin()" v-else>
          <ProfileIcon class="vip-pay-icon" />
          Log in
        </button>
      </div>
      <div class="vip-paid" v-else>
        <div v-if="cardData.length > 0">
          <div v-for="item in cardData" :key="item._id">
            <Card
              v-for="(card, index) in item.cards"
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
              @click="showCard(card._id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '../style/vip.css';
</style>
