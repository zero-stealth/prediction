<script setup>
import axios from 'axios'
import { DateTime } from 'luxon'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted, shallowRef } from 'vue'
import AdsTipComponent from '../components/adsTipComponent.vue'
// pages
import formationSection from '../components/tennis/formationSection.vue'
import overviewSection from '../components/tennis/overviewSection.vue'
import standingsSection from '../components/tennis/standingsSection.vue'
import tipsSection from '../components/tennis/tipsSection.vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const router = useRouter()
const route = useRoute()

const tip = ref('')
const teamA = ref('')
const teamB = ref('')
const league = ref('')
const cardAdsData = ref([])
const teamAscore = ref('')
const teamBscore = ref('')
const teamAIcon = ref('')
const teamBIcon = ref('')
const leagueIcon = ref('')
const cardAdsImg = ref(null)
const cardAdsLink = ref(null)
const teamAPosition = ref('')
const teamBPosition = ref('')
const time = ref('')
const date = ref('')
const showScore = ref('')

const activePage = shallowRef(overviewSection)

const setActivePage = (page) => {
  activePage.value = page
}

const getButtonClass = (page) => {
  return ['nav-tip', activePage.value === page ? 'active-tip' : 'inactive-tip']
}

const getAds = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/ads`)
    cardAdsData.value = response.data
    showAds()
  } catch (err) {
    console.error(err)
  }
}

const filteredAds = computed(() => {
  const AdTitle = 'Card'
  return cardAdsData.value ? cardAdsData.value.filter((Ads) => Ads.title === AdTitle) : []
})

const showAds = () => {
  cardAdsImg.value = filteredAds.value[0]?.description || null
  cardAdsLink.value = filteredAds.value[0]?.link || null
}

async function getTip() {
  const response = await axios.get(
    `${SERVER_HOST}/sports/single/${route.params.date}/${route.params.teamA}/${route.params.teamB}`
  )
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
  date.value = response.data.date
  tip.value = response.data.tip
}

onMounted(() => {
  getTip()
})

const goBack = () => {
  router.go(-1)
}

function formatDate(inputDate) {
  const parts = inputDate.split('-')
  const day = parts[0]
  const month = parts[1]
  const year = parts[2]

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const formattedDate = `${day} | ${months[parseInt(month, 10) - 1]} | ${year}`
  return formattedDate
}

const formattedTime = computed(() => {
  try {
    const eventDate = DateTime.fromISO(time.value, { zone: 'utc' })

    const userTimeZone = DateTime.local().zoneName

    const convertedTime = eventDate.setZone(userTimeZone)

    const adjustedTime = convertedTime.minus({ hours: 3 })

    return adjustedTime.toFormat('HH:mm')
  } catch (error) {
    console.error('Error formatting time:', error)
    return time
  }
})

const shouldShowScore = computed(() => {
  return showScore.value && teamAscore.value !== undefined && teamBscore.value !== undefined
})


onMounted(() => {
  getAds()
})
</script>

<template>
  <div class="detail-apx">
    <div class="apx-byt">
      <div class="details-container">
        <div class="details-h-conx">
          <div class="details-header-title">
            <h1>{{ teamA }} vs {{ teamB }} prediction {{ formatDate(date) }}</h1>
          </div>
        </div>

        <div
          class="card-container tips-card"
          :class="[league === '' ? 'card-skeleton' : '', showScore === true ? 'game-played' : '']"
        >
          <div class="details-h">
            <ArrowIcon class="details-arrow" @click="goBack()" />
            <div class="details-h-inn">
              <img :src="leagueIcon" alt="" class="tbl-f-image tbl-l-i" />
              <h2>{{ league }}</h2>
            </div>
            <span class="pulse"></span>
          </div>
          <div class="card-center">
            <div class="card-a">
              <div class="card-fade">
                <div class="card-inner">
                  <img
                    :src="teamAIcon"
                    alt="card-img"
                    :class="[
                      sport === 'Tennis' ? 'card-img circle-tennis' : 'card-img square-img',
                      teamAIcon === '' ? 'card-img-skeleton' : ''
                    ]"
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
                <span>vs</span>
              </div>
              <div v-if="shouldShowScore" class="card-score">
                <span class="card-s">{{ teamAscore }}</span>
                <span class="card-p">:</span>
                <span class="card-s">{{ teamBscore }}</span>
              </div>
              <div v-if="cardAdsImg" class="bet-adv">
                <a :href="cardAdsLink">
                  <img :src="cardAdsImg" alt="image" class="bet-winner-logo" />
                </a>
              </div>
            </div>
            <div class="card-a">
              <div class="card-fade">
                <div class="card-inner">
                  <img
                    :src="teamBIcon"
                    alt="card-img"
                    :class="[
                      sport === 'Tennis' ? 'card-img circle-tennis' : 'card-img square-img',
                      teamBIcon === '' ? 'card-img-skeleton' : ''
                    ]"
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
        </div>
        <div class="nav-tips">
          <button @click="setActivePage(overviewSection)" :class="getButtonClass(overviewSection)">
            <span>Preview</span>
          </button>
          <button @click="setActivePage(tipsSection)" :class="getButtonClass(tipsSection)">
            <span>Prediction</span>
          </button>
          <button
            @click="setActivePage(standingsSection)"
            :class="getButtonClass(standingsSection)"
          >
            <span>Standing</span>
          </button>
          <button
            @click="setActivePage(formationSection)"
            :class="getButtonClass(formationSection)"
          >
            <span>H2H</span>
          </button>
        </div>
      </div>
      <div class="tips-main">
        <component :is="activePage" />
      </div>
    </div>

    <div class="apx-pin">
      <AdsTipComponent />
    </div>
  </div>
</template>

<style>
@import '../style/tips.css';
@import '../style/card.css';
@import '../style/predictions.css';
</style>
