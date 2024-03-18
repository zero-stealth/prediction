<template>
  <div class="hero-section" :style="heroSectionStyle">
    <div class="nav-important">
      <button class="nav-i-btn" @click="goVip">
        <VipIcon class="icon-nav nav-i" />
        VIP PLAN
      </button>
      <button class="nav-i-btn" @click="openTelegram">
        <TelegramIcon class="icon-nav nav-i" />
        JOIN TELEGRAM
      </button>
      <button class="nav-i-btn" @click="goPayNow">
        <PayIcon class="icon-nav nav-i" />
        HOW TO PAY
      </button>
    </div>
    <div class="hero-s-contain">
      <div class="hero-info">
        <h1>
          Enjoy our <span>daily top-notch</span> Sports
          <span>Predictions</span>
          and
          <span>Tips</span>
        </h1>
        <p>We provide the best betting tips and predictions for football, basketball, and tennis. Sit back, relax, and enjoy the benefits. We've taken care of all the hard work for you</p>
      </div>
      <div @click="goPay()" class="hero-img" :style="{ backgroundImage: `url(${ads})` }"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import TelegramIcon from '../icons/telegram.vue'
import banner from '../assets/banner.jpeg'
import PayIcon from '../icons/payIcon.vue'
import VipIcon from '../icons/VipIcon.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const ads = ref(null)
const adsData = ref(null)
const bannerLink = ref(null)
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const router = useRouter()

const goVip = () => {
  router.push({ name: 'Pricing' })
  scrollToTop()

}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
}

const getAds = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/ads`)
    adsData.value = response.data
    showAds()
  } catch (err) {
    console.error(err)
  }
}

const goPay = () => {
  if (bannerLink.value === null) {
    router.push({ name: 'Pay' })
  } else {
    window.open(`${bannerLink.value}`, '_blank')
  }
}

const goPayNow = () => {
  router.push({ name: 'Pay' })

}

const openTelegram = () => {
  window.open('https://t.me/sportypredict_tips', '_blank')
}

const heroSectionStyle = {
  backgroundImage: `url(${banner}), linear-gradient(rgb(17, 51, 86), rgb(17, 51, 86))`
}

const filteredAds = computed(() => {
  const AdTitle = 'Top'
  return adsData.value ? adsData.value.filter((Ads) => Ads.title === AdTitle) : []
})

const showAds = () => {
  ads.value = filteredAds.value[0]?.image || null
  bannerLink.value = filteredAds.value[0]?.link || null
}

onMounted(() => {
  getAds()
})
</script>

<style>
@import '../style/nav.css';
</style>
