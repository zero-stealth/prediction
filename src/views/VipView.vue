<script setup>
import axios from 'axios'
import Arrow from '@/icons/arrow.vue'
import { useRouter } from 'vue-router'
import MoneyIcon from '../icons/payIcon.vue'
import Card from '../components/CardComponent.vue'
import ProfileIcon from '../icons/profileIcon.vue'
import { ref, onMounted, watchEffect, watch } from 'vue'

const isPaid = ref(true)
const router = useRouter()
const username = ref(null)
const isAdmin = ref(false)
const cardData = ref([])
const currentDate = ref('');
const offset = ref(0);

watchEffect(() => {
  isPaid.value = localStorage.getItem('paid') === 'true'
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
  const token = JSON.parse(localStorage.getItem('token'))

  try {
    const response = await axios.get(
      `https://predictions-server.onrender.com/predictions/vipPredictions/vip/${currentDate.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response.data);
    cardData.value = response.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getPrediction()
})

const previousDay = () => {
  offset.value--;
  updateCurrentDate();
};

const nextDay = () => {
  if (offset.value < 1) {
    offset.value++;
    updateCurrentDate();
  }
};

const updateCurrentDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + offset.value);
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = today.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  currentDate.value = `${formattedDay}-${formattedMonth}-${today.getFullYear()}`;
};

updateCurrentDate();

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-');
  }
  return [];
};

watch(currentDate, () => {
  getPrediction();
});
</script>

<template>
  <div class="vip-container">
    <div class="vip-wrapper">
      <div class="vip-notpaid" v-if="!isPaid">
        <h1>Your VIP account is inactive 🌵</h1>
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
        <div class="main-header">
          <div class="header-info">
            <h1>VIP tips {{ currentDate }}</h1>
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
    </div>
  </div>
</template>

<style>
@import '../style/vip.css';
@import '../style/Home.css';

</style>
