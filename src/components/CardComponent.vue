<template>
  <div class="card-container">
    <div class="card-title">
      <div class="title-m">
        <img :src="leagueIcon" alt="league-img" class="league-c-img" />
        <span>{{ league }}</span>
      </div>
    </div>
    <div class="card-center">
      <div class="card-a">
        <div class="card-fade">
          <div class="card-inner">
            <img
              :src="teamAIcon"
              alt="card-img"
              :class="[sport === 'Tennis' ? 'card-img circle-tennis' : 'card-img square-img']"
            />
          </div>
        </div>
        <h2>{{ teamA }}</h2>
      </div>
      <div class="card-in">
        <div class="card-in-s">
          <span>[{{ formattedTime }}]</span>
        </div>
        <span class="status-p">{{ status }}</span>
        <div v-if="!showScore">
          <span>{{$t('section11.vc')}} </span>
        </div>
        <div v-if="shouldShowScore" class="card-score">
          <span class="card-s">{{ teamAscore }}</span>
          <span class="card-p">:</span>
          <span class="card-s">{{ teamBscore }}</span>
        </div>
        <a href="https://bwredir.com/1bkh?p=%2Fregistration%2F" class="bet-adv">
          <img src="../assets/Bet.png" alt="Bet winner" class="bet-winner-logo" />
        </a>
      </div>
      <div class="card-a">
        <div class="card-fade">
          <div class="card-inner">
            <img
              :src="teamBIcon"
              alt="card-img"
              :class="[sport === 'Tennis' ? 'card-img circle-tennis' : 'card-img square-img']"
            />
          </div>
        </div>
        <h2>{{ teamB }}</h2>
      </div>
    </div>
    <div class="Tip">
      <h4>Tip:</h4>
      <span>{{ tip }}</span>
    </div>
    <div class="card-footer">
      <div class="card-f" v-for="formationA in formationsA" :key="formationA">
        <span :class="[formationA === 'l' ? 'loose' : formationA === 'w' ? 'win' : 'draw']">{{
          formationA 
        }}</span>
      </div>
      <div class="card-fi">Recent form</div>
      <div class="card-f" v-for="formationB in formationsB" :key="formationB">
        <span :class="[formationB === 'l' ? 'loose' : formationB === 'w' ? 'win' : 'draw']">{{
          formationB
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { DateTime } from 'luxon'
import axios from 'axios'

const formattedTime = ref()

const props = defineProps({
  formationA: {
    type: Array,
    required: true,
    default: () => ['l', 'w', 'd', 'l', 'w']
  },
  formationB: {
    type: Array,
    required: true,
    default: () => ['l', 'w', 'd', 'l', 'w']
  },
  leagueIcon: {
    type: String,
    required: true
  },
  teamAIcon: {
    type: String,
    required: true
  },
  teamBIcon: {
    type: String,
    required: true
  },
  tip: {
    type: String,
    default: '0'
  },
  league: {
    type: String,
    required: true
  },
  teamA: {
    type: String,
    required: true
  },
  teamB: {
    type: String,
    required: true
  },
  teamAscore: {
    type: Number,
    required: true
  },
  teamBscore: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false
  },
  sport: {
    type: String,
    required: false
  },
  showScore: {
    type: Boolean,
    default: false
  }
})


const formationsA = ref(props.formationA);
const formationsB = ref(props.formationB);

const shouldShowScore = computed(() => {
  return props.showScore && props.teamAscore !== undefined && props.teamBscore !== undefined;
});

onMounted(async () => {
  try {
    const response = await axios.get('https://ipinfo.io/');
    const userTimeZone = response.data.timezone;

    const originalTime = props.time;
    const convertedTime = DateTime.fromISO(originalTime, { zone: 'utc' })
      .setZone(userTimeZone)
      .toLocaleString(DateTime.TIME_SIMPLE);

    formattedTime.value = convertedTime;
  } catch (error) {
    console.error('Error fetching user timezone or formatting time:', error);
  }
});
</script>

<style scoped>
@import '../style/card.css';
</style>