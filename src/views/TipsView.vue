<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import banner from '@/assets/banner.jpeg'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import { onMounted, ref, shallowRef } from 'vue'
import { useGameStore } from '../stores/game'

// pages
import formationSection from '../components/tips/formationSection.vue'
import overviewSection from '../components/tips/overviewSection.vue'
import standingsSection from '../components/tips/standingsSection.vue'
import tipsSection from '../components/tips/tipsSection.vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const gameStore = useGameStore()
const router = useRouter()

const teamA = ref('')
const teamB = ref('')
const teamAscore = ref('')
const teamBscore = ref('')
const teamAIcon = ref('')
const teamBIcon = ref('')
const league = ref('')
const leagueIcon = ref('')
const teamAPosition = ref('')
const teamBPosition = ref('')
const time = ref('')
const showScore = ref('')

const activePage = shallowRef(overviewSection)

const setActivePage = (page) => {
  activePage.value = page
}

const getButtonClass = (page) => {
  return ['nav-tip', activePage.value === page ? 'active-tip' : 'inactive-tip']
}

async function getTip() {
  const response = await axios.get(`${SERVER_HOST}/predictions/single/${gameStore.gameId}`)
  teamA.value = response.data.teamA
  teamB.value = response.data.teamB
  showScore.value = response.data.showScore
  teamAIcon.value = response.data.teamAIcon
  teamBIcon.value = response.data.teamBIcon
  teamAscore.value = response.data.teamAscore
  teamAPosition.value = response.data.teamAPosition
  teamBPosition.value = response.data.teamBPosition
  teamBscore.value = response.data.teamBscore
  league.value = response.data.league
  leagueIcon.value = response.data.leagueIcon
  time.value = response.data.time
}

onMounted(() => {
  getTip()
})

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="details-container">
       <div class="details-h">
        <ArrowIcon class="details-arrow" @click="goBack()" />
        <div class="details-h-inn">
          <img :src="leagueIcon" alt="" class="tbl-f-image tbl-l-i" />
          <h2>{{ league }}</h2>
        </div>
        <span class="pulse"></span>
      </div>
    <div
      class="details-image"
      :style="{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), #042f59), url(${banner})`
      }"
    >
      <div class="details-image-d">
        <div class="details-d">
          <img :src="teamAIcon" alt="" class="details-d-img" />
          <span>{{ teamA }}</span>
        </div>
        <div class="details-midd">
          {{ [time] }}
         
          <div v-if="showScore" class="details-score">
            <div class="score-p">
              <span>{{ teamAscore }}</span>
              <span>-</span>
              <span>{{ teamBscore }}</span>
            </div>
          </div>
        </div>
        <div class="details-d">
          <img :src="teamBIcon" alt="" class="details-d-img" />
          <span>{{ teamB }}</span>
        </div>
      </div>
    </div>
    <div class="nav-tips">
      <button @click="setActivePage(overviewSection)" :class="getButtonClass(overviewSection)">
        <span>Summary</span>
      </button>
      <button @click="setActivePage(standingsSection)" :class="getButtonClass(standingsSection)">
        <span>Standing</span>
      </button>
      <button @click="setActivePage(formationSection)" :class="getButtonClass(formationSection)">
        <span>H2H</span>
      </button>
      <button @click="setActivePage(tipsSection)" :class="getButtonClass(tipsSection)">
        <span>Tips</span>
      </button>
    </div>
    <div class="tips-main">
      <component :is="activePage" />
    </div>
  </div>
</template>

<style>
@import '../style/tips.css';
@import '../style/card.css';
@import '../style/predictions.css';
</style>
