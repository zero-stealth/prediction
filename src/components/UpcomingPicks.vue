<template>
  <div class="home-main upcoming-p">
    <div class="main-h">
      <div class="main-header home-up">
        <div class="header-info home-up">
          <h1>Upcoming Picks</h1>
        </div>
      </div>
      <div class="main-h-card">
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
            <h1>No upcoming predictions available today</h1>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Card from '../components/CardComponent.vue'
import axios from 'axios'

const formationA = ref(['l', 'w', 'l', 'w', 'l'])
const formationB = ref(['l', 'w', 'l', 'w', 'l'])
const router = useRouter()
const teamAScore = ref(1)
const teamBScore = ref(0)
const tip = ref(1)

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
}

const cardData = ref([])

async function getPrediction() {
  try {
    const response = await axios.get('https://predictions-server.onrender.com/predictions/upcomingPredictions/upcoming')
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

// const cardData = ref([
//   {
//     id: 1,
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
//   }
// ])
</script>

<style>
@import '../style/Home.css';
</style>
