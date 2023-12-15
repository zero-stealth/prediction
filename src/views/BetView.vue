<template>
  <ButtonComponent @change="handleBetNameChange" />
  <QuickComponent />
  <div class="main-bet">
    <div class="main-header">
      <div class="header-info"> 
        <h1>{{ paramValue }} Betting Tips and Predictions</h1>
        <span>({{ currentDate }})</span>
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
    <OfferAds />
    <template v-if="cardData.length > 0">
      <div v-for="item in cardData" class="main-h-card booom-h" :key="item._id">
        <Card
          v-for="(card) in item"
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
          :formationA="formatFormation(card.formationA) ? card.formationA[0].split('-') : []"
          :formationB="formatFormation(card.formationB) ? card.formationB[0].split('-') : []"
          :time="card.time"
        />
      </div>
    </template>
    <template v-else>
      <div class="home-freetip">
        <h1>No predictions yet! Check back later.</h1>
      </div>
    </template>
  </div>
  <div>
      <vipads />
    </div>
  <div class="fp-class" v-if="betName === 'Double Chance'">
      <h1>Double Chance Predictions (1X,12 X2)</h1>
      <p>On this page we deal with double chance (1X, 12, X2) Predictions from our experts, double chance prediction is popular when you believe a match is likely to be closely contested, and you want to cover multiple possible outcomes.</p>
      <h1>"What Does Double Chance Prediction Mean (1X,12 X2)?</h1>
      <p>It involves selecting two of the three possible match outcomes to increase your chances of winning. These double chance options provide a higher probability of winning compared to betting on the outcome of the match (1 for a home win, X for a draw, or 2 for an away win), and this strategy reduces the risk of losing a bet.</p>
    </div>
    <div class="fp-class" v-if="betName === 'Over 2.5 Goals'">
      <h1>Over 2.5 goals predictions</h1>
      <p>o win over 2.5 goals predictions on your ticket, the total goals scored must be at least 3 goals in both teams at the end of 90 Minutes.  Sportypredict deal with Over 2.5 goals Predictions from our experts. It's a popular betting option for those looking for more excitement and potentially higher odds than simply predicting the outcome of a match</p>
      <h1>What Do Over 2.5 Prediction Mean?</h1>
      <p>It means we are predicting that there will be more than two goals scored in a particular match. If three or more goals are scored by the end of the game (Full Time: 90 minutes), your prediction would be considered successful.</p>
      <p>This type of prediction is often used by bettors who expect an offensive and high-scoring game, as it implies that both teams are likely to score multiple goals or that the total goals scored in the match will exceed two.</p>
    </div>
      <div class="fp-class" v-if="betName === 'Over 1.5 Goals'">
      <h1>Over 1.5 goals predictions</h1>
      <p>Get Today's Over 1.5 goals Predictions from our experts for free on this page.  Over 1.5 goals is a popular football (soccer) betting strategy one can use to make profit daily.</p>
      <p>It's one of the simplest and more popular betting options for those looking to bet on the total number of goals in a game. We use various strategies to consider when making over 1.5 goals predictions. The predictions in this case are from Experts at <a href="https://sportypredict.com"> sportypredict.com</a>.</p>
      <h1>What Do Over 1.5 Prediction Mean?</h1>
      <p>It means you are betting that there will be at least two (2) goals scored in the game. If two or more goals are scored by the end of the game (Full Time:90-minutes), your prediction would be considered successful.</p>
    </div>
    <div class="fp-class" v-if="betName === 'Both Teams To Score'">
      <h1>Both Teams To Score Predictions</h1>
      <p>On this page we deal with Both Teams to Score (BTTS) Predictions from our experts, BTTS predictions are popular because they add excitement to a match, regardless of who ultimately wins. It doesn't matter if it's a high-scoring game or a 1-1 draw; as long as both teams find the back of the net, a 'Yes' bet wins. Factors we consider when making BTTS predictions include team offensive and defensive strengths, recent goal-scoring records, head-to-head history, and the playing style of both teams.</p>
      <h1>What Does Both Teams To Score Predictions Mean?</h1>
      <p>'Both Teams to Score' (BTTS) predictions in football (soccer) betting involve wagering on whether both teams in a match will score at least one goal each during the game. Here's how BTTS predictions work:</p>
      <ol>
        <li>Yes (BTTS-Yes): If you predict 'Yes' for BTTS, it means you believe both teams will score at least one goal in the match. If both teams score, your bet is successful, regardless of the final scoreline.</li>
        <li>No (BTTS-No): If you predict 'No' for BTTS, you are betting that at least one of the teams will fail to score in the match. If either team fails to score, your bet wins.</li>
      </ol>
    </div>
     <div class="fp-class" v-if="betName === 'Under 2.5 Goals'">
      <h1>Under 2.5 Goals Predictions</h1>
      <p>On this page we deal with under 2.5 goals Predictions from our experts, this betting involves wagering that a particular match will have fewer than three goals scored in total. This type of prediction is often used when we anticipate a low-scoring or defensive match, or when we believe that both teams may struggle to score. Factors we consider when making under 2.5 goals predictions include team defensive strengths, recent low-scoring records, head-to-head history, and any other factors that might suggest a lack of goal-scoring opportunities in the game.</p>
      <h1>What Does Under 2.5 Goals Predictions Mean?</h1>
      <p>This means If you predict 'Under 2.5 goals,' you win your bet if the match ends with a total of two goals or fewer. This includes scorelines like 0-0, 1-0, 0-1, or 1-1. If the match has three or more goals (such as 2-1, 1-2, or any higher-scoring result), your bet is not successful.</p>
    </div>
     <PopUP v-if="showPop"> </PopUP>
  <Sticky />
</template>

<script setup>
import ButtonComponent from '../components/ButtonComponent.vue'
import QuickComponent from '../components/QuickComponent.vue'
import vipads from '../components/vipadsComponent.vue'
import Sticky from '../components/stickyComponent.vue'
import PopUP from '../components/popupComponent.vue'
import Card from '../components/CardComponent.vue'
import { useDrawerStore } from '../stores/drawer'
import OfferAds from '../components/OfferAds.vue'
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const currentDate = ref('')
const offset = ref(0)
const paramValue = ref('')
const betName = ref('')

const cardData = ref([])
const showPop = ref(null)
const drawerStore = useDrawerStore()
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST


watchEffect(() => {
  showPop.value = drawerStore.popDrawer
})



const predictions = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/predictions/prediction/${betName.value}/${currentDate.value}`
    )

    cardData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const handleBetNameChange = async (newBetName) => {
  betName.value = newBetName
  await predictions()
}

onMounted(() => {
  watchEffect(() => {
    predictions()
  })
})

const previousDay = () => {
  offset.value--
  updateCurrentDate()
}

const setOffset = (value) => {
  offset.value = value
  updateCurrentDate()
}

const getFormattedDate = (offset) => {
  const today = new Date()
  today.setDate(today.getDate() + offset)
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = today.getFullYear()
  return `${day}-${month}-${year}`
}

const updateCurrentDate = () => {
  currentDate.value = getFormattedDate(offset.value)
}

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-')
  }
  return []
}

watchEffect(() => {
  paramValue.value = router.currentRoute.value.params.betName
  betName.value = paramValue.value
  updateCurrentDate()
})

updateCurrentDate()
</script>

<style>
@import '../style/Home.css';
@import '../style/Bet.css';
</style>
