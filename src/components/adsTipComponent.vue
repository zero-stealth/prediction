<template>
  <div class="ads-tip-contain">
    <div class="tips-telegram" @click="openTelegram">
      <TelegramIcon class="tips-t-telegram" />
      <h3>Get more tips on telegram</h3>
    </div>
    <div class="ads-show">
      <Bonus v-for="(bonusItem, index) in bonusData" :key="index" :bonusData="bonusItem" />
      <div class="ads-p">
        <div
          @click="goAds()"
          class="ads-home"
          :style="{
            backgroundImage: `url(${adsMiddleImage})`
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
import Bonus from '../components/bonusComponentAds.vue'
import TelegramIcon from '../icons/telegram.vue'
import betImage from '../assets/betwinner.png'
import stakeImage from '../assets/stake.png'
import melbetImage from '../assets/melbet.png'
import { useRouter } from 'vue-router'
const adsMiddleLink = ref(null)
const adsMiddleImage = ref(null)
const router = useRouter()
import axios from 'axios'
const adsData = ref([])

const bonusData = ref([
  {
    imgSrc: betImage,
    alt: 'Bet-offer',
    info: 'Bonus upto 130 USD',
    description: 'Offers and welcome bonuses available',
    code: 'SPBW',
    link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F'
  },
  {
    imgSrc: melbetImage,
    alt: 'Bet-offer',
    info: 'Bonus upto 130 USD',
    description: 'Offers and welcome bonuses available',
    code: 'BSTIPS',
    link: 'https://refpakrtsb.top/L?tag=d_2503393m_45415c_&site=2503393&ad=45415'
  },
  {
    imgSrc: stakeImage,
    alt: 'Bet-offer',
    info: 'Bonus upto 1000 USD',
    description: 'Offers and welcome bonuses available',
    code: 'SPTIPS',
    link: 'https://stake.com/?c=e2abbfbd54'
  }
])


const getMiddleAds = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/ads`)
    adsData.value = response.data
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
    } else {
      window.open(`${adsMiddleLink.value}`, '_blank')
    }
  })
}

const openTelegram = () => {
  window.open('https://t.me/sportypredict_tips', '_blank')
}

onMounted(() => {
  getMiddleAds()
})
</script>
<style>
@import '../style/adsTip.css';
</style>
