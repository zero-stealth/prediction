<template>
  <HeroComponent />
  <QuickComponent />
  <div class="home-main">
    <div class="main-h">
      <div class="main-header">
        <div class="header-info">
          <h1>{{ $t('bank.h1-3') }}</h1>
          <span>({{ currentDate }})</span>
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
        <div class="main-h-card">
          <Card
            v-for="card in cardData"
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
            :formationA="formatFormation(card.formationA)"
            :formationB="formatFormation(card.formationB)"
            :time="card.time"
            @click="showCard(card._id)"
          />
        </div>
      </template>
      <template v-else>
        <div class="home-freetip">
          <h1>{{ $t('upcoming.h1-2') }}</h1>
        </div>
      </template>
    </div>
    <div>
      <vipads />
    </div>
    <div class="news-main">
      <div class="news-header">
        <div class="news-info">
          <h1>{{ $t('news.h1-1') }}</h1>
        </div>
        <div class="news-link">
          <Arrow class="news-icon icon-left" />
          <span v-if="showMoreButton" @click="showMoreNews">see more</span>
          <span v-else @click="showLessNews">see less</span>
          <Arrow class="news-icon" />
        </div>
      </div>
      <div class="news-wrapper">
        <NewsCard
          v-for="(newsItem, index) in visibleNews"
          :key="index"
          :banner="newsItem.img"
          @click="newsInfo(newsItem.title)"
        >
          <h2>{{ newsItem.title }}</h2>
        </NewsCard>
      </div>
    </div>
    <Upcoming />
    <div class="ads-p">
      <div
        @click="goAds()"
        class="ads-home"
        :style="{
          backgroundImage: `url(${adsMiddleImage})`
        }"
      ></div>
    </div>
    <OtherComponent />
    <AboutComponent />
    <PopUP v-if="showPop"> </PopUP>
    <Sticky />
  </div>
</template>
<script setup>
import axios from 'axios'
import Arrow from '../icons/arrow.vue'
import { useRouter } from 'vue-router'
import NewsCard from '../components/NewsCard.vue'
import OfferAds from '../components/OfferAds.vue'
import { useDrawerStore } from '../stores/drawer'
import Card from '../components/CardComponent.vue'
import PopUP from '../components/popupComponent.vue'
import Sticky from '../components/stickyComponent.vue'
import Upcoming from '../components/UpcomingPicks.vue'
import vipads from '../components/vipadsComponent.vue'
import QuickComponent from '../components/QuickComponent.vue'
import AboutComponent from '../components/aboutComponent.vue'
import HeroComponent from '../components/HeroComponent.vue'
import OtherComponent from '../components/OtherComponent.vue'
import { ref, watch, computed, watchEffect, onMounted } from 'vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const drawerStore = useDrawerStore()
const showMoreButton = ref(true)
const adsMiddleImage = ref(null)
const adsMiddleLink = ref(null)
const maxNewsToShow = ref(8)
const currentDate = ref('')
const router = useRouter()
const showPop = ref(null)
const cardData = ref([])
const newsData = ref([])
const adsData = ref([])

watchEffect(() => {
  showPop.value = drawerStore.popDrawer
})

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
  scrollToTop()
}

const newsInfo = (newsTitle) => {
  router.push({ name: 'News', params: { title: newsTitle } })
}

const getMiddleAds = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/ads`)
    adsData.value = response.data
    // console.log(response.data);
    showAds()
  } catch (err) {
    console.log(err)
  }
}

const filteredAds = computed(() => {
  const AdTitle = 'Middle'
  return adsData.value ? adsData.value.filter((Ads) => Ads.title === AdTitle) : []
})

const showAds = () => {
  adsMiddleImage.value = filteredAds.value[0]?.image || null
  adsMiddleLink.value = filteredAds.value[0]?.link || ''
}

const goAds = () => {
  watchEffect(() => {
    if (adsMiddleLink.value === null) {
      router.push({ name: 'Pay' })
      scrollToTop()
    } else {
      window.open(`${adsMiddleLink.value}`, '_blank')
    }
  })
}

const visibleNews = computed(() => {
  return newsData.value.slice(0, maxNewsToShow.value)
})

const showMoreNews = () => {
  maxNewsToShow.value += 8
  showMoreButton.value = false
}

const showLessNews = () => {
  maxNewsToShow.value -= 8
  if (maxNewsToShow.value <= 8) {
    showMoreButton.value = true
  }
}
const getNews = async () => {
  try {
    const response = await axios.get(
      'https://football-news-aggregator-live.p.rapidapi.com/news/onefootball',
      {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        }
      }
    )
    console.log(response.data)
    newsData.value = response.data
    console.log(newsData.value)
  } catch (err) {
    console.log(err)
  }
}

const getPrediction = async () => {
  // const token = JSON.parse(localStorage.getItem('token'))
  try {
    const response = await axios.get(`${SERVER_HOST}/predictions/tips/freeTip/${currentDate.value}`)
    cardData.value = response.data
    // console.log(cardData.value)
  } catch (err) {
    console.log(err)
  }
}

const offset = ref(0)

const previousDay = () => {
  offset.value--
  updateCurrentDate()
}

// const nextDay = () => {
//   if (offset.value < 1) {
//     offset.value++
//     updateCurrentDate()
//   }
// }

const setOffset = (value) => {
  offset.value = value
  updateCurrentDate()
}

const updateCurrentDate = () => {
  const today = new Date()
  today.setDate(today.getDate() + offset.value)
  const month = today.getMonth() + 1
  const formattedMonth = month.toString().padStart(2, '0')
  const day = today.getDate()
  const formattedDay = day.toString().padStart(2, '0')
  currentDate.value = `${formattedDay}-${formattedMonth}-${today.getFullYear()}`
}

updateCurrentDate()

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-')
  }
  return []
}

watch(currentDate, () => {
  getPrediction()
})

const scrollToTop = () => {
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
}

onMounted(() => {
  getPrediction()
  getMiddleAds()
  getNews()
})
</script>
<style scoped>
@import '../style/Home.css';
</style>
