<template>
  <div class="home-main upcoming-p">
    <div class="main-h">
      <div class="main-header home-up">
        <div class="header-info home-up">
          <h1>Upcoming Picks for {{ currentDate }}</h1>
        </div>
      </div>
      <div class="main-h-c">
        <template v-if="cardData.length > 0">
          <div v-for="item in cardData" :key="item.id" class="main-h-card">
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
              :formationA="Array.isArray(card.formationA) ? card.formationA[0].split('-') : []"
              :formationB="Array.isArray(card.formationB) ? card.formationB[0].split('-') : []"
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Card from '../components/CardComponent.vue';
import axios from 'axios';

const router = useRouter();
const currentDate = ref('');

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } });
};

const cardData = ref([]);

async function getPrediction() {
  try {
    const response = await axios.get(
      `https://predictions-server.onrender.com/predictions/upcomingPredictions/upcoming/${currentDate.value}`
    );
    console.log(response.data);
    cardData.value = response.data.length > 0 ? response.data : [];
    console.log(cardData.value);
  } catch (err) {
    console.log(err);
  }
}

async function deleteTip(id) {
  try {
    const response = await axios.delete(
      `https://predictions-server.onrender.com/predictions/delete/${id}`
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  updateCurrentDate();
  getPrediction();
});

const offset = ref(1);

const updateCurrentDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + offset.value);
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = today.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  currentDate.value = `${formattedDay}-${formattedMonth}-${today.getFullYear()}`;
};
</script>

<style>
@import '../style/Home.css';
</style>
