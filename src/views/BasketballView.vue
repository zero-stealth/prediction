<template>
  <div>
    <ButtonComponent />
    <div class="home-main">
      <div class="main-h">
        <div class="main-header">
          <div class="header-info">
            <h1>Basketball Free tips {{ currentDate }}</h1>
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
        <a href="https://bwredir.com/1bkh?p=%2Fregistration%2F" class="betw-banner-comp" @click="goAdds">
        <img src="../assets/BannerBet.png" alt="bet winner" class="betw-banner" />
      </a>
        <template v-if="cardData.length > 0">
          <div v-for="item in cardData" class="main-h-card" :key="item">
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
              :showScore="card.showScore"
              :formationA="formatFormation(card.formationA) ? card.formationA[0]?.split('-') : []"
              :formationB="formatFormation(card.formationB) ? card.formationB[0]?.split('-') : []"
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
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import Card from '../components/CardComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import { ref, onMounted, watch } from 'vue';

const upcomingDates = ref('');
const currentDate = ref('');
const cardData = ref([]);

async function getPrediction() {
  const token = JSON.parse(localStorage.getItem('token'));

  try {
    const response = await axios.get(
      `https://predictions-reg9.onrender.com/sports/sport/Basketball/${currentDate.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    cardData.value = response.data.length > 0 ? [response.data] : []; // Set the data or an empty array
    console.log(cardData.value);
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  getPrediction();
});

const offset = ref(0);

const previousDay = () => {
  offset.value--;
  updateCurrentDate();
};

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
  const today = new Date();
  today.setDate(today.getDate() + offset.value);
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = today.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  upcomingDates.value = `${formattedDay}-${formattedMonth}-${today.getFullYear()}`;
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

<style>
@import '../style/Home.css';
</style>
