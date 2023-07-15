<template>
  <div class="vip-container">
    <div class="vip-wrapper">
      <div class="vip-notpaid" :style="{ backgroundImage: `url(${SportBg})` }" v-if="!isPaid">
        <h1>Your VIP account is inactive 🌵</h1>
        <button class="vip-btn" @click="goLogin()" v-if="!username">
          <ProfileIcon class="vip-pay-icon" />
          Log in
        </button>
        <button class="vip-btn" @click="payPage()" v-else>
          <MoneyIcon class="vip-pay-icon" />
          Pay to activate
        </button>
      </div>
      <div v-else>
        <div class="main-header vip-m">
          <div class="header-info">
            <h1>VIP tips {{ currentDate }}</h1>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay">
              <Arrow class="btn-icon icon-left" />
              Previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset < 0 }" @click="nextDay">
              <Arrow class="btn-icon icon-right" />
              Next
            </button>
          </div>
        </div>
        <template v-if="isPaid && username && cardData.length > 0">
          <div class="main-h-card">
            <Card
              v-for="(card, index) in cardData"
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
              :formationA="formatFormation(card.formationA)"
              :formationB="formatFormation(card.formationB)"
              :time="card.time"
              @click="showCard(card._id)"
            />
          </div>
        </template>
        <template v-else-if="isPaid && username && cardData.length === 0">
          <div class="home-freetip">
            <h1>No predictions yet! Check back later.</h1>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import SportBg from '../assets/stadium.jpg'
import MoneyIcon from '../icons/payIcon.vue'
import Card from '../components/CardComponent.vue'
import ProfileIcon from '../icons/profileIcon.vue'
import { ref, onMounted, watch } from 'vue'

const isPaid = ref(false)
const router = useRouter()
const username = ref(null)
const cardData = ref([])
const currentDate = ref('')
const paid = ref(null)
const offset = ref(0)

const updateAuthStatus = () => {
  const token = localStorage.getItem('token')
  isPaid.value = token && paid.value === true
  username.value = localStorage.getItem('username')

  // Clear cardData if token does not exist
  if (!token) {
    cardData.value = []
  }
}

const payPage = () => {
  router.push({ name: 'Pay' })
}

const goLogin = () => {
  router.push({ name: 'Login' })
}

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
}

const getPrediction = async () => {
  const token = JSON.parse(localStorage.getItem('token'))

  try {
    const response = await axios.get(
      `https://predictions-reg9.onrender.com/predictions/vipPredictions/vip/${currentDate.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response.data)
    cardData.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const getAccountDetails = async () => {
  const id = localStorage.getItem('id')

  try {
    const response = await axios.get(
      `https://predictions-reg9.onrender.com/auth/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response.data);
    username.value = response.data.username;
    paid.value = response.data.paid;
    
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  getPrediction()
  updateAuthStatus()
  getAccountDetails()
})

const previousDay = () => {
  offset.value--
  updateCurrentDate()
}

const nextDay = () => {
  if (offset.value < 1) {
    offset.value++
    updateCurrentDate()
  } 
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

watch([offset, username,isPaid], () => {
  updateAuthStatus()
  getPrediction()
})
</script>

<style scoped>
@import '../style/vip.css';
@import '../style/Home.css';
</style>
