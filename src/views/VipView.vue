<script setup>
import{ ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import MoneyIcon from '../icons/payIcon.vue'
import argentina from '../assets/Arg-log.png'
import manchester from '../assets/man-logo.png'
import Card from '../components/CardComponent.vue'
import ProfileIcon from '../icons/profileIcon.vue'



const formationA = ref(['l', 'w', 'l', 'w', 'l'])
const formationB = ref(['l', 'w', 'l', 'w', 'l'])
const router = useRouter()
const authStore = useAuthStore()
const teamAscore = ref(1)
const teamBscore = ref(0)
// const isAuth = localStorage.getItem('isAuth')
const isPaid = authStore.isPaid
const tip = ref(1)

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

async function getPrediction () {
  try {
    const response = await axios.get("https://predictions-server.onrender.com/predictions/vipPredictions/vip")
    console.log(response.data)
    cardData.value.push(response.data)
    console.log(cardData.value);

  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  getPrediction()
})
// const cardData = ref([
//   {
//     id: 1,
//     formationA: formationA.value,
//     formationB: formationB.value,
//     leagueIcon: manchester,
//     teamAIcon: argentina,
//     teamBIcon: argentina,
//     tip: tip.value,
//     teamA: 'Team A',
//     teamB: 'Team B',
//     teamAscore: teamAscore.value,
//     teamBscore: teamBscore.value,
//     time: '20:00',
//     status: 'live'
//   },
//   {
//     id: 2,
//     formationA: formationA.value,
//     formationB: formationB.value,
//     leagueLogo: manchester,
//     teamALogo: argentina,
//     teamBLogo: argentina,
//     tip: tip.value,
//     teamAName: 'Team A',
//     teamBName: 'Team B',
//     teamAScore: teamAScore.value,
//     teamBScore: teamBScore.value,
//     matchTime: '20:00',
//     status: 'live'
//   },
//   {
//     id: 3,
//     formationA: formationA.value,
//     formationB: formationB.value,
//     leagueLogo: manchester,
//     teamALogo: argentina,
//     teamBLogo: argentina,
//     tip: tip.value,
//     teamAName: 'Team A',
//     teamBName: 'Team B',
//     teamAScore: teamAScore.value,
//     teamBScore: teamBScore.value,
//     matchTime: '20:00',
//     status: 'live'
//   },
//   {
//     id: 4,
//     formationA: formationA.value,
//     formationB: formationB.value,
//     leagueLogo: manchester,
//     teamALogo: argentina,
//     teamBLogo: argentina,
//     tip: tip.value,
//     teamAName: 'Team A',
//     teamBName: 'Team B',
//     teamAScore: teamAScore.value,
//     teamBScore: teamBScore.value,
//     matchTime: '20:00',
//     status: 'live'
//   }
// ])

</script>
<template>
  <div class="vip-container">
    <div class="vip-wrapper">
      <div class="vip-notpaid" v-if="isPaid = false">
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
          <div v-for="item in cardData">
            <Card v-for="(card,index) in item"
            :key="card._id"
    :tip="card.tip"
    :status="card.status"
    :formationA="card.formationA"
    :formationB="card.formationB"
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
</div>
      </div>
    </div>
  </div>
</template>
<style>
@import '../style/vip.css';
</style>
