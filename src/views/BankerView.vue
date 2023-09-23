<template>
  <ButtonComponent />
  <QuickComponent />
  <div class="main-bet">
    <div class="main-header">
      <div class="header-info">
        <h1> {{ $t('bank.h1-1') }} ({{ currentDate }})</h1>
      </div>
      <div class="header-btn">
        <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay()">
          {{ $t('bank.btn-1') }}
        </button>
        <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
          {{ $t('bank.btn-2') }}
        </button>
        <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
          {{ $t('bank.btn-3') }}
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
        <h1>{{ $t('upcoming.h1-2') }}</h1>
      </div>
    </template>
    <div>
      <vipads />
    </div>
    <div class="fp-class">
      <h1>{{ $t('BetF.h1') }}</h1>
      <p>{{ $t('BetF.p1') }}</p>
      <h1>{{ $t('BetF.h2') }}</h1>
      <p>{{ $t('BetF.p2') }}</p>
    </div>
  </div>
  <PopUP v-if="showPop" >
      </PopUP>
      <Sticky/>
</template>
<script setup>
import QuickComponent from '../components/QuickComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import vipads from '../components/vipadsComponent.vue'
import Sticky from '../components/stickyComponent.vue'
import PopUP from '../components/popupComponent.vue'
import Card from '../components/CardComponent.vue'
import { useDrawerStore } from "../stores/drawer"
import { ref, watchEffect, onMounted } from 'vue'
import OfferAds from '../components/OfferAds.vue'
import axios from 'axios'

const currentDate = ref('')
const offset = ref(0)

const cardData = ref([])
const showPop = ref(null)
const drawerStore = useDrawerStore();


watchEffect(() => {
  showPop.value = drawerStore.popDrawer;
})



const predictions = async () => {
  try {
    // const token = localStorage.getItem('token')
    const response = await axios.get(
      `https://predictions-reg9.onrender.com/predictions/bet/betOfTheDay/${currentDate.value}`
    )
    cardData.value = response.data.length > 0 ? [response.data] : [];
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  predictions();
});


const previousDay = () => {
  offset.value--
  updateCurrentDate()
}


const setOffset = (value) => {
  offset.value = value;
  updateCurrentDate();
}


const updateCurrentDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + offset.value);
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  currentDate.value = `${day}-${month}-${year}`;
};

updateCurrentDate();
const formatFormation = (formation) => {
  if (formation && formation.length > 0) { // Check if formation exists and has at least one element
    return formation[0].split('-');
  }
  return [];
};

watchEffect(() => {
  predictions();
});
</script>

<style>
@import '../style/Home.css';
@import '../style/Bet.css';
</style>
