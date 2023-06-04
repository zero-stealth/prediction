<template>
   <ButtonComponent/>
  <div class="main-h">
    <div class="main-header">
      <div class="header-info">
        <h1>Bet of the day {{ currentDate }}</h1>
      </div>
      <div class="header-btn">
        <button
          class="btn-h"
          :class="{'active-btn': offset === -1}"
          @click="setOffset(-1)"
        >
          Yesterday
        </button>
        <button
          class="btn-h"
          :class="{'active-btn': offset === 0}"
          @click="setOffset(0)"
        >
          Today
        </button>
        <button 
          class="btn-h"
          :class="{'active-btn': offset === 1}"
          @click="setOffset(1)"
        >
          Tomorrow
        </button>
      </div>
    </div>
    <div class="main-h-card">
      <Card
        v-for="({ id, tip, status, formationA, formationB, leagueLogo, teamALogo, teamBLogo, teamAName, teamBName, teamAScore, teamBScore, matchTime }, index) in cardData"
        :key="index"
        :tip="tip"
        :status="status"
        :formationA="formationA"
        :formationB="formationB"
        :leagueLogo="leagueLogo"
        :teamALogo="teamALogo"
        :teamBLogo="teamBLogo"
        :teamAName="teamAName"
        :teamBName="teamBName"
        :teamAScore="teamAScore"
        :teamBScore="teamBScore"
        :matchTime="matchTime"
        @click="showCard(id)"
      />
    </div>
  </div>
  <OtherComponent/>
  <Banker/>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import manchester from '../assets/man-logo.png';
import argentina from '../assets/Arg-log.png';
import Card from '../components/CardComponent.vue';
import Banker from '../components/bankerinfo.vue';
import OtherComponent from '../components/OtherComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue';

const router = useRouter();
const currentDate = ref('');
const offset = ref(0);
const cardData = ref([
  {
    id: 1,
    formationA: formationA.value,
    formationB: formationB.value,
    leagueLogo: manchester,
    teamALogo: manchester,
    teamBLogo: argentina,
    tip: tip.value,
    teamAName: 'Team A',
    teamBName: 'Team B',
    teamAScore: teamAScore.value,
    teamBScore: teamBScore.value,
    matchTime: '20:00',
    status: 'live',
  },
  {
    id: 2,
    formationA: formationA.value,
    formationB: formationB.value,
    leagueLogo: manchester,
    teamALogo: argentina,
    teamBLogo: manchester,
    tip: tip.value,
    teamAName: 'Team A',
    teamBName: 'Team B',
    teamAScore: teamAScore.value,
    teamBScore: teamBScore.value,
    matchTime: '20:00',
    status: 'live',
  }
]);

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } });
};

const setOffset = (value) => {
  offset.value = value;
  updateCurrentDate();
};

const getTimestamp = (offset) => {
  const today = new Date();
  today.setDate(today.getDate() + offset);
  return today.toDateString();
};

const updateCurrentDate = () => {
  currentDate.value = getTimestamp(offset.value);
};

updateCurrentDate(); 
</script>

<style>
@import '../style/Home.css';
</style>
