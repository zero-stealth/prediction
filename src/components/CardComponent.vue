<template>
  <div
    class="card-container"
    :class="[league === '' ? 'card-skeleton' : '', showScore === true ? 'game-played' : '']"
  >
    <div class="card-title">
      <div class="title-m">
        <img
          :src="leagueIcon"
          alt="league-img"
          class="league-c-img"
          :class="[leagueIcon === '' ? 'card-img-skeleton' : '']"
        />
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
        <slot name="ads"> </slot>
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
      <slot name="button"></slot>
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
// import moment from 'moment-timezone';
import { DateTime } from 'luxon'
import axios from 'axios'

const cardAdsData = ref([])
const cardAdsImg = ref(null)
const cardAdsLink = ref(null)
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

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
  },
  showBtn: {
    type: Boolean,
    default: true
  }
})

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

const formattedTime = computed(() => {
  try {
    const eventDate = DateTime.fromISO(props.time, { zone: 'utc' })

    const userTimeZone = DateTime.local().zoneName

    const convertedTime = eventDate.setZone(userTimeZone)

    const adjustedTime = convertedTime.minus({ hours: 3 })

    return adjustedTime.toFormat('HH:mm')
  } catch (error) {
    console.error('Error formatting time:', error)
    return props.time
  }
})

// const formattedTime = computed(() => {
//   try {
//     const eventTime = moment(props.time, 'HH:mm');
//     const userTimeZone = moment.tz.guess();
//     console.log(userTimeZone);

//     return eventTime.tz(userTimeZone).format('HH:mm');
//   } catch (error) {
//     console.error('Error formatting time:', error);
//     return props.time;
//   }
// });

const formationsA = ref(props.formationA)
const formationsB = ref(props.formationB)

const shouldShowScore = computed(() => {
  return props.showScore && props.teamAscore !== undefined && props.teamBscore !== undefined
})

onMounted(() => {
  getAds()
})
</script>

<style scoped>
@import '../style/card.css';
</style>
