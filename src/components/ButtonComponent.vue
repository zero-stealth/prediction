<script setup>
import TelegramIcon from '../icons/telegram.vue'
import basketball from '../assets/basketball.jpg'
import banner from '../assets/banner.jpeg'
import tennis from '../assets/tennis.jpg'
import PayIcon from '../icons/payIcon.vue'
import VipIcon from '../icons/VipIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goVip = () => {
  router.push({ name: 'Vip' })
}

const goPay = () => {
  router.push({ name: 'Pay' })
}

const openTelegram = () => {
  window.open('https://t.me/sportypredict_tips', '_blank')
}

const getBackgroundImage = () => {
  if (router.currentRoute.value.name === 'Tennis') {
    return `url(${tennis}), linear-gradient(rgb(17, 51, 86), rgb(17, 51, 86))`;
  } else if (router.currentRoute.value.name === 'Basketball') {
    // Update with the desired background for the Basketball route
    return `url(${basketball}), linear-gradient(rgb(17, 51, 86), rgb(17, 51, 86))`;
  } else {
    return `url(${banner}), linear-gradient(rgb(17, 51, 86), rgb(17, 51, 86))`;
  }
}
</script>
<template>
  <div
    class="hero-section btn-view"
    :style="{
      backgroundImage: getBackgroundImage(),
    }"
  >
    <div class="nav-important">
      <button class="nav-i-btn" @click="goVip()">
        <VipIcon class="icon-nav nav-i" />
        Vip plan
      </button>
      <button class="nav-i-btn" @click="openTelegram()">
        <TelegramIcon class="icon-nav nav-i" />
        Join telegram
      </button>
      <button class="nav-i-btn" @click="goPay()">
        <PayIcon class="icon-nav nav-i" />
        How to pay
      </button>
    </div>
  </div>
</template>

<style>
@import '../style/nav.css';
</style>
