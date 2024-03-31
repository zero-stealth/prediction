<template>
  <div class="home-main upcoming-p">
    <div class="main-h">
      <div class="main-header home-up">
        <div class="header-info home-up">
          <h1>Upcoming Tips</h1>
        </div>
      </div>
      <template v-if="cardData.length > 0">
      <div  class="main-h-card booom-h">
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
          showBtn="false"
          :showScore="card.showScore"
          :teamAscore="card.teamAscore"
          :teamBscore="card.teamBscore"
          :formationA="formatFormation(card.formationA)"
            :formationB="formatFormation(card.formationB)"
          :time="card.time"
        >
          <template v-slot:ads>
            <div v-if="cardAdsImg" class="bet-adv">
              <a :href="cardAdsLink">
                <img :src="cardAdsImg" alt="image" class="bet-winner-logo" />
              </a>
            </div>
          </template>
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
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification'
import Card from '../components/CardComponent.vue';
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST


const toast = useToast()
const currentDate = ref('');



const cardData = ref([]);

const getPrediction = async () => {
  try {
    const response = await axios.get(
      `${SERVER_HOST}/predictions/upcomingPredictions/upcoming/${currentDate.value}`
    );
    cardData.value = response.data;
  } catch (err) {
    toast.error(err.response.data.error)
  }
};

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

const formatFormation = (formation) => {
  return Array.isArray(formation) ? formation[0].split('-') : [];
};
</script>

<style>
@import '../style/Home.css';
</style>