<template>
  <div class="hero-section" :style="heroSectionStyle">
    <div class="nav-important">
      <button class="nav-i-btn" @click="goVip">
        <VipIcon class="icon-nav nav-i" />
        Vip plan
      </button>
      <button class="nav-i-btn" @click="openTelegram">
        <TelegramIcon class="icon-nav nav-i" />
        Join telegram
      </button>
      <button class="nav-i-btn" @click="goPay">
        <PayIcon class="icon-nav nav-i" />
        How to pay
      </button>
    </div>
    <div class="hero-s-contain">
      <div class="hero-info">
        <h1>
          Enjoy our <span>daily top-notch</span> Sports <span>Predictions</span> and
          <span>Tips</span>
        </h1>
        <p>
          We provide the best betting tips and predictions for football, basketball, and tennis. Sit
          back, relax, and enjoy the benefits. We've taken care of all the hard work for you
        </p>
      </div>
      <div @click="goPay" class="hero-img" :style="{ backgroundImage: `url(${ads})` }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import TelegramIcon from '../icons/telegram.vue'
import banner from '../assets/banner.jpeg'
import PayIcon from '../icons/payIcon.vue'
import VipIcon from '../icons/VipIcon.vue'
import { useRouter } from 'vue-router'
import ads from '../assets/ads.gif'

const router = useRouter()
const isOpen = ref(false)

const goVip = () => {
  router.push({ name: 'Vip' })
}

const goPay = () => {
  router.push({ name: 'Pay' })
}

const openTelegram = () => {
  window.open('https://t.me/sportypredict_tips', '_blank')
}

const heroSectionStyle = {
  backgroundImage: `url(${banner}), linear-gradient(rgb(17, 51, 86), rgb(17, 51, 86))`
}
</script>

<style>
@import '../style/nav.css';
</style>
