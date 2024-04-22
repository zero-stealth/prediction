<template>
  <div>
    <ButtonComponent />
    <QuickComponent />
    <div class="home-main">
      <div class="main-h">
        <div class="main-header">
          <div class="header-info">
            <h1>Tennis Betting Tips and Predictions</h1>
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
          <div v-for="item in cardData" class="main-h-card" :key="item._id">
            <Card
              v-for="card in item"
              :key="card._id"
              :tip="card.tip"
              :status="card.status"
              :leagueIcon="card.leagueIcon"
              :teamAIcon="card.teamAIcon"
              :teamBIcon="card.teamBIcon"
              :teamA="card.teamA"
              :teamB="card.teamB"
              :league="card.league"
              showBtn="false"
              :showScore="card.showScore"
              :teamAscore="card.teamAscore"
              :teamBscore="card.teamBscore"
              :formationA="formatFormation(card.formationA) ? card.formationA[0]?.split('-') : []"
              :formationB="formatFormation(card.formationB) ? card.formationB[0]?.split('-') : []"
              :time="card.time"
              :sport="card.sport"
            >
            <template v-slot:ads>
            <div class="Preview">
              <button class="btn-preview" @click="showCard(card.date, card.teamA, card.teamB)">
                Match Preview >>
              </button>
            </div> 
          </template
          >
          <template v-slot:button>
            <div class="Tip">
              <h4>Tip:</h4>
              <span>{{ card.tip }}</span>
            </div>
          </template>
          </Card>
          </div>
        </template>
        <template v-else>
          <div class="home-freetip">
            <h1>No predictions yet! Check back later.</h1>
          </div>
        </template>
      </div>
    </div>
    <div>
      <vipads />
    </div>
    <div class="fp-class">
      <h1>Tennis Predictions.</h1>
      <p>Get Today's Over 1.5 goals Predictions from our experts for free on this page.  Over 1.5 goals is a popular football (soccer) betting strategy one can use to make profit daily.</p>
      <p>It's one of the simplest and more popular betting options for those looking to bet on the total number of goals in a game. We use various strategies to consider when making over 1.5 goals predictions. The predictions in this case are from Experts at <a href="https://sportypredict.com/" target="_blank">sportypredict.com</a> .</p>
    </div>
  </div>
  <PopUP v-if="showPop"> </PopUP>
  <Sticky />
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useDrawerStore } from '../stores/drawer'
import OfferAds from '../components/OfferAds.vue'
import Card from '../components/CardComponent.vue'
import PopUP from '../components/popupComponent.vue'
import Sticky from '../components/stickyComponent.vue'
import vipads from '../components/vipadsComponent.vue'
import { ref, onMounted, watch, watchEffect } from 'vue'
import QuickComponent from '../components/QuickComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'


const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const currentDate = ref('')
const router = useRouter()
const cardData = ref([])
const url = ref('')

const showPop = ref(null)
const drawerStore = useDrawerStore()

watchEffect(() => {
  showPop.value = drawerStore.popDrawer
})


const showCard = (date, teamA, teamB) => {
  router.push({
    name: 'TennisTips',
    params: {
      date: date,
      teamA: teamA,
      teamB: teamB,
    },
  });
};

async function getPrediction() {
  url.value =`${SERVER_HOST}/sports/sport/Tennis/${currentDate.value}`

  try {
    const response = await axios.get(url.value)
    cardData.value = response.data.length > 0 ? [response.data] : [] // Set the data or an empty array
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

// const nextDay = () => {
//   if (offset.value < 1) {
//     offset.value++;
//     updateCurrentDate();
//   }
// };

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

watch(currentDate, () => {
  getPrediction()
})

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-')
  }
  return []
}
</script>

<style>
@import '../style/Home.css';
</style>
