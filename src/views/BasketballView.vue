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
        <template v-if="filterData.length > 0">
          <div v-for="item in filterData" class="main-h-card" :key="item">
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
              :formationA="Array.isArray(card.formationA) ? card.formationA[0]?.split('-') : []"
              :formationB="Array.isArray(card.formationB) ? card.formationB[0]?.split('-') : []"
              :time="card.time"
            />
          </div>
        </template>

        <template v-else>
          <div class="home-freetip">
            <h1>no upcoming predictions yet! check back later</h1>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import Arrow from '../icons/arrow.vue'
import Card from '../components/CardComponent.vue'
import { ref, onMounted, watch } from 'vue'
import ButtonComponent from '../components/ButtonComponent.vue'

const currentDate = ref()
const cardData = ref([])
const filterData = ref([])

watch(cardData, () => {
  filterData.value = cardData.value.filter((d) => d.date && d.date.includes(currentDate.value));
});

async function getPrediction() {
  const token = JSON.parse(localStorage.getItem('token'))

  try {
    const response = await axios.get(
      'https://predictions-server.onrender.com/sports/sport/Basketball',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    cardData.value.push(response.data)
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

const nextDay = () => {
  offset.value++
  updateCurrentDate()
}

const updateCurrentDate = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const today = new Date();
  today.setDate(today.getDate() + offset.value);

  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = months[today.getMonth()];
  const date = today.getDate();
  const year = today.getFullYear();

  currentDate.value = `${dayOfWeek}, ${month} ${date}, ${year}`;
};

updateCurrentDate()

</script>

<style>
@import '../style/Home.css';
</style>
