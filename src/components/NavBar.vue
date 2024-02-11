<template>
  <div class="nav-main">
    <div class="nav-container">
      <a href="https://sportypredict.com/" class="nav-l">
        <img
          src="@/assets/logo-spp.png"
          alt="logo"
          class="logo-spp"
          @click="goHome"
          draggable="false"
        />
      </a>
      <GoogleTranslateSelect
        class="mb-locale"
        default-language-code="en"
        default-page-language-code="en"
        :fetch-browser-language="false"
        trigger="click"
        @select="handleGoogleTranslateSelect"
      />
      <a href="https://sportypredict.com/" class="mb-locale">
        <img
          src="@/assets/logo-spp.png"
          alt="logo"
          class="logo-spp"
          @click="goHome"
          draggable="false"
        />
      </a>
    
      <div class="nav-link-container">
        <RouterLink :to="{ name: 'Home' }" class="nav-link">Home</RouterLink>
        <RouterLink :to="{ name: 'Bonus' }" class="nav-link">Betting Offers</RouterLink>
        <RouterLink :to="{ name: 'Banker' }" class="nav-link">Bet Of The Day</RouterLink>
        <RouterLink :to="{ name: 'Football' }" class="nav-link">Football</RouterLink>
        <RouterLink :to="{ name: 'Basketball' }" class="nav-link">Basketball</RouterLink>
        <RouterLink :to="{ name: 'Tennis' }" class="nav-link">Tennis</RouterLink>
        <div class="drop-container">
          <div class="drop-down" @click="showDrop">
            <span>Extra Predictions</span>
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panel" :class="[isDropOpen ? 'show' : 'hide']">
            <span @click="goToC('Double Chance')">Double Chance</span>
            <span @click="goToC('Over 2.5 Goals')">Over 2.5 Goals</span>
            <span @click="goToC('Over 1.5 Goals')">Over 1.5 Goals</span>
            <span @click="goToC('Both Teams To Score')">Both Teams To Score</span>
            <span @click="goToC('Under 2.5 Goals')">Under 2.5 Goals</span>
          </div>
        </div>
      </div>
      <div class="nav-btn-container cs-btn" v-if="authStore.token !== null">
        <GoogleTranslateSelect
          default-language-code="en"
          default-page-language-code="en"
          :fetch-browser-language="false"
          trigger="click"
          @select="handleGoogleTranslateSelect"
        /> 
        <button @click="logOut" class="nav-btn btn-l btn-logout">
          <LogoutIcon class="icon-nav l-icon" />
          Logout
        </button>
        <button @click="goToPanel" v-if="isAdmin" class="mobile-btn btn-l btn-logout">
          Go to panel
        </button>
      </div>
      <div class="nav-btn-container" v-else>
        <GoogleTranslateSelect
          default-language-code="en"
          default-page-language-code="en"
          :fetch-browser-language="false"
          trigger="click"
          @select="handleGoogleTranslateSelect"
        />
        <button @click="goSignin()" class="nav-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
          Sign up
        </button>
        <button @click="goLogin()" class="nav-btn btn-l">
          <ProfileIcon class="icon-nav l-icon" />
          Login
        </button>
      </div>
      <div class="nav-menu" @click="showMenu()" v-if="!isOpen">
        <MobileMenuIcon class="menu-icon-nav" />
      </div>
      <div class="mobile-exit" v-else>
        <ExitIcon class="icon-exit" @click="showMenu()" />
      </div>
    </div>
  </div>

  <!-- mobile responsive -->
  <div class="mobile-bar" :class="[isOpen ? 'open' : 'close']">
    <div class="mobile-container">
      <div class="mobile-link-container">
        <RouterLink :to="{ name: 'Home' }" @click="showMenu()" class="mobile-link">
          Home
        </RouterLink>

        <span @click="goTennis()" class="nav-link">Tennis </span>
        <span @click="goBasketball()" class="nav-link">Basketball</span>
        <RouterLink :to="{ name: 'Bonus' }" @click="showMenu()" class="mobile-link">
          Betting Offers
        </RouterLink>
        <div @click="openTelegramX" class="mobile-link">Telegram</div>
        <div @click="openBetOfDay" class="mobile-link">Bet of the day</div>
        <div class="drop-container">
          <div class="drop-down" @click="showDrp()">
            <span>Extra Predictions</span>
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panels" :class="[isDrpOpen ? 'show' : 'hide']">
            <span @click="goTo('Double Chance')">Double Chance</span>
            <span @click="goTo('Over 2.5 Goals')">Over 2.5 Goals</span>
            <span @click="goTo('Over 1.5 Goals')">Over 1.5 Goals</span>
            <span @click="goTo('Both Teams To Score')">Both Teams To Score</span>
            <span @click="goTo('Under 2.5 Goals')">Under 2.5 Goal</span>
          </div>
        </div>
      </div>
      <div class="mobile-btn-container" v-if="authStore.token !== null">
        <button @click="logOut" class="mobile-btn btn-l btn-logout">
          <LogoutIcon class="icon-nav l-icon" />
          Log out
        </button>
        <button @click="goToPanel" v-if="isAdmin" class="mobile-btn btn-l btn-logout">
          Go to panel
        </button>
      </div>
      <div class="mobile-btn-container" v-else>
        <button @click="goSignin" class="mobile-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
          Sign up
        </button>
        <button @click="goLogin" class="mobile-btn btn-l">
          <ProfileIcon class="icon-nav l-icon" />
          Log in
        </button>
      </div>
      <div class="icon-nav-con">
        <facebookIcon class="bk-icon fb-icon" @click="openFacebook" />
        <twitterIcon class="bk-icon t-icon" @click="openTwitter" />
        <telegramIcon class="bk-icon" @click="openTelegram" />
        <instagramIcon class="bk-icon" @click="openInstagram" />
        <tiktokIcon class="bk-icon" @click="openTiktok" />
        <youtubeIcon class="bk-icon" @click="openYoutube" />
        <whatsappIcon class="bk-icon" @click="openWhatsapp" />
      </div>
    </div>
  </div>
  <!-- mobile responsive -->
</template>

<script setup>
import GoogleTranslateSelect from '@google-translate-select/vue3'
import MobileMenuIcon from '../icons/mobileMenuIcon.vue'
import { RouterLink, useRouter } from 'vue-router'
import ProfileIcon from '../icons/profileIcon.vue'
import GroupIcon from '../icons/GroupIcon.vue'
import ExitIcon from '../icons/ExitIcon.vue'
import LogoutIcon from '../icons/logoutIcon.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import tiktokIcon from '../icons/tiktokIcon.vue'
import youtubeIcon from '../icons/youtubeIcon.vue'
import twitterIcon from '../icons/twitterIcon.vue'
import whatsappIcon from '../icons/whatsapp.vue'
import instagramIcon from '../icons/instagram.vue'
import facebookIcon from '../icons/facebook.vue'
import telegramIcon from '../icons/telegram.vue'
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'

const isOpen = ref(false)
const router = useRouter()
const isDrpOpen = ref(false)
const isDropOpen = ref(false)
const authStore = useAuthStore()
const isAdmin = ref(localStorage.getItem('admin') || 'false')

const handleGoogleTranslateSelect = () => {
  // console.log(language)
}

const goToPanel = () => {
  router.push({ name: 'Panel' })
}

const openTelegram = () => {
  window.open('https://t.me/sportypredict_tips', '_blank')
}

const openFacebook = () => {
  window.open('https://www.facebook.com/profile.php?id=100093225097104&mibextid=LQQJ4d', '_blank')
}

const openTwitter = () => {
  window.open('https://twitter.com/sportypredict?s=21&t=ordgrMn8HjrBLUy3PdpsBA', '_blank')
}

const openInstagram = () => {
  window.open('https://instagram.com/sportypredict_?igshid=MTIzZWMxMTBkOA==', '_blank')
}

const openTiktok = () => {
  window.open('https://www.tiktok.com/@sportypredict?_t=8dxjShAnRI5&_r=1', '_blank')
}

const openYoutube = () => {
  window.open('https://www.youtube.com/@Sportypredict', '_blank')
}

const openWhatsapp = () => {
  window.open(
    'https://wa.me/+254703147237?text=Hi sporty predict, I want to buy VIP subcription',
    '_blank'
  )
}

const showMenu = () => {
  isOpen.value = !isOpen.value
  isDrpOpen.value = false
}

const showDrop = () => {
  isDropOpen.value = !isDropOpen.value
}

const showDrp = () => {
  isDrpOpen.value = !isDrpOpen.value
}

const logOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  window.location.reload()
}

const openBetOfDay = () => {
  router.push({ name: 'Banker' })
  scrollToTop()
  showMenu()
}

const goToC = (betname) => {
  router.push({ name: 'Bet', params: { betName: betname } })
  showDrop()
  scrollToTop()
}

const goTo = (betname) => {
  router.push({ name: 'Bet', params: { betName: betname } })
  scrollToTop()
  showMenu()
  showDrp()
}

const goTennis = () => {
  router.push({ name: 'Tennis' })
  scrollToTop()
  showMenu()
}

const goBasketball = () => {
  router.push({ name: 'Basketball' })
  scrollToTop()
  showMenu()
}

const goLogin = () => {
  router.push({ name: 'Login' })
  scrollToTop()
}

const goHome = () => {
  router.push({ name: 'Home' })
  scrollToTop()
}

const goSignin = () => {
  router.push({ name: 'Signin' })
  scrollToTop()
}

const openTelegramX = () => {
  window.open('https://t.me/sportypredict_tips', '_blank')
  showMenu()
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style>
@import '../style/nav.css';
</style>
