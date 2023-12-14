<template>
  <div class="vip-container">
    <div class="vip-wrapper">
      <div class="vip-notpaid" :style="{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), #042f59), url(${banner})` }" v-if="!paid">
        <div v-if="!username" class="vip-p">
          <h1>Create an account 🌵</h1>
          <div class="vip-sp">
            <button class="vip-btn" @click="goSignin()">
              <ProfileIcon class="vip-pay-icon" />
              Sign up
            </button>
            <button class="vip-btn" @click="goLogin()">
              Log in
              <ProfileIcon class="vip-pay-icon" />
            </button>
          </div>
        </div>
        <div class="vip-p" v-else>
          <h1> Your're currently on free plan 🌵</h1>
          <button class="vip-btn" @click="payPage()">
            <MoneyIcon class="vip-pay-icon" />
            Pay now
          </button>
        </div>
      </div>
      <div v-else>
        <div class="main-header vip-m">
          <div class="header-info">
            <h1>VIP tips ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay()">
              Previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
              Today
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
              Tomorrow
            </button>
          </div>
        </div>
        <template v-if="paid && username && cardData.length > 0">
          <div class="main-h-card booom-h">
            <Card
              v-for="(card) in cardData"
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
        <template v-else-if="paid && username && cardData.length === 0">
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
import banner from '../assets/back.jpeg'
import MoneyIcon from '../icons/payIcon.vue'
import Card from '../components/CardComponent.vue'
import ProfileIcon from '../icons/profileIcon.vue'
import { ref, onMounted, watch } from 'vue'

const router = useRouter()
const username = ref(null)
const cardData = ref([])
const currentDate = ref('')
const paid = ref(false)
const offset = ref(0)
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST


const updateAuthStatus = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  username.value = localStorage.getItem('username')
  if (!token) {
    cardData.value = []
  }
}

const payPage = () => {
  router.push({ name: 'Pay' })
  scrollToTop()

}

const goSignin = () => {
  router.push({ name: 'Signin' })
  scrollToTop()

}

const goLogin = () => {
  router.push({ name: 'Login' })
  scrollToTop()

}

const scrollToTop = () => {
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
}

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
}

const getPrediction = async () => {
  const token = JSON.parse(localStorage.getItem('token'))

  try {
    const response = await axios.get(
      `${SERVER_HOST}/predictions/vipPredictions/vip/${currentDate.value}`,
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
  const token = JSON.parse(localStorage.getItem('token'))
  const id = localStorage.getItem('id')

  try {
    const response = await axios.get( `${SERVER_HOST}/auth/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    username.value = response.data.username
    paid.value = response.data.paid
    localStorage.setItem('paid', paid.value)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getPrediction()
  updateAuthStatus()
  getAccountDetails()
})

const previousDay = () => {
  offset.value--
  updateCurrentDate()
}

// const nextDay = () => {
//   if (offset.value < 1) {
//     offset.value++
//     updateCurrentDate()
//   }
// }


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

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-')
  }
  return []
}

watch([offset, username, paid], () => {
  updateAuthStatus()
  getPrediction()
})
</script>

<style scoped>
@import '../style/vip.css';
@import '../style/Home.css';
</style>
