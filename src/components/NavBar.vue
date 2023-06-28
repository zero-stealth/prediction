<template>
  <div class="nav-main">
    <div class="nav-container">
      <!-- <div class="language-drop-down">
      </div> -->
      <div class="nav-logo">
        <img src="../assets/logo-spp.png" alt="logo" class="logo-spp">
      </div>
      <div class="nav-link-container">
        <RouterLink :to="{ name: 'Home' }" class="nav-link"> Home </RouterLink>
        <div @click="openTelegram" class="nav-link">Telegram tips</div>
        <RouterLink :to="{ name: 'Banker' }" class="nav-link"> Bet of the day </RouterLink>
        <div class="drop-container">
          <div class="drop-down" @click="showDrop()">
            <span>Predictions</span>
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panel" :class="[isDropOpen ? 'show' : 'hide']">
            <span @click="goToC('Double chance')">Double chance</span>
            <span @click="goToC('Over 2.5 Goals')">Over 2.5 Goals</span>
            <span @click="goToC('Over 1.5 Goals')">Over 1.5 Goals</span>
            <span @click="goToC('Both Team To Score')">Both Team To Score</span>
            <!-- <span @click="goTo('Bet Of The Day')">Bet Of The Day</span> -->
            <span @click="goToC('Under 2.5 Goals')">Under 2.5 Goals</span>
          </div>
        </div>
        <div class="drop-container">
          <div class="drop-down" @click="showDrp()">
            <span>Other sports</span>
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panel" :class="[isDrpOpen ? 'show' : 'hide']">
            <span @click="goBasketballC()">Basketball</span>
            <span @click="goTennisC()"> Tennis</span>
          </div>
        </div>
      </div>
      <div class="nav-btn-container" v-if="token !== null">
        <button @click="logOut" class="nav-btn btn-l btn-logout">
          <LogoutIcon class="icon-nav l-icon" />
          log out
        </button>
      </div>
      <div class="nav-btn-container" v-else>
        <button @click="goSignin" class="nav-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
          sign up
        </button>
        <button @click="goLogin" class="nav-btn btn-l">
          <ProfileIcon class="icon-nav l-icon" />
          log in
        </button>
      </div>
      <div class="nav-menu" @click="showMenu()">
        <MobileMenuIcon class="menu-icon-nav" />
      </div>
    </div>
  </div>

  <!-- mobile responsive -->
  <div class="mobile-bar" :class="[isOpen ? 'open' : 'close']">
    <div class="mobile-exit">
      <ExitIcon class="icon-exit" @click="showMenu()" />
    </div>
    <div class="mobile-container">
      <!-- <div class="mobile-logo">
        <img src="../assets/logo-spp.png" alt="logo" class="logo-spp">
      </div> -->
      <div class="mobile-link-container">
        <RouterLink :to="{ name: 'Home' }" @click="showMenu()" class="mobile-link"> Home </RouterLink>
        <div class="drop-container">
          <!-- <div class="drop-down" @click="showDrp()">
            <span>Other sports</span>
            <ArrowIcon class="drop-icon" />
          </div> -->
          <!-- <div class="drop-down-panel drp-down-panel" :class="[isDrpOpen ? 'showDrp' : 'hideDrp']">
            <span @click="goBasketball()">Basketball</span>
            <span @click="goTennis()"> Tennis</span>
          </div> -->
          <span @click="goBasketball()" class="nav-link">Basketball</span>
            <span @click="goTennis()"  class="nav-link"> Tennis</span>
        </div>
        <div @click="openTelegramX" class="mobile-link">Telegram tips</div>
        <RouterLink :to="{ name: 'Banker' }" class="mobile-link"> Bet Of the day </RouterLink>
        <span @click="goTo('Over 2.5 Goals')" class="nav-link">Over 2.5 Goals</span>
        <span @click="goTo('Over 1.5 Goals')" class="nav-link">Over 1.5 Goals</span>
        <span @click="goTo('Double chance')" class="nav-link">Double chance</span>
        <span @click="goTo('Under 2.5 Goals')" class="nav-link">Under 2.5 Goals</span>
        <span @click="goTo('Both Team To Score')" class="nav-link">Both Team To Score</span>
        <!-- <span @click="goTo('Bet Of The Day')" class="nav-link">Bet Of The Day</span> -->
      </div>
      <div class="mobile-btn-container" v-if="token !== null">
        <button @click="logOut" class="mobile-btn btn-l btn-logout">
          <LogoutIcon class="icon-nav l-icon" />
          log out
        </button>
      </div>
      <div class="mobile-btn-container" v-else>
        <button @click="goSignin" class="mobile-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
          sign up
        </button>
        <button @click="goLogin" class="mobile-btn btn-l">
          <ProfileIcon class="icon-nav l-icon" />
          log in
        </button>
      </div>
    </div>
  </div>
  <!-- mobile responsive -->
</template>

<script setup>
import MobileMenuIcon from '../icons/mobileMenuIcon.vue'
import { RouterLink, useRouter } from 'vue-router'
import { countries } from 'country-flags-svg'
import ProfileIcon from '../icons/profileIcon.vue'
import GroupIcon from '../icons/GroupIcon.vue'
import ExitIcon from '../icons/ExitIcon.vue'
import LogoutIcon from '../icons/logoutIcon.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import { ref, watchEffect } from 'vue'

const router = useRouter()
const isOpen = ref(false)
const isDropOpen = ref(false)
const isDrpOpen = ref(false)
const token = ref(null)
const countryData = countries

watchEffect(() => {
  token.value = localStorage.getItem('token')
})

const showMenu = () => {
  isOpen.value = !isOpen.value
}

const showDrop = () => {
  isDropOpen.value = !isDropOpen.value
}

const showDrp = () => {
  isDrpOpen.value = !isDrpOpen.value
}

const logOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('isPaid')
  localStorage.removeItem('username')
  token.value = null
  
}

const goToC = (betname) => {
  router.push({ name: 'Bet', params: { betName: betname } })
  showDrop();
}

const goTo = (betname) => {
  router.push({ name: 'Bet', params: { betName: betname } })
  showMenu();
}

const goTennis = () => {
  router.push({ name: 'Tennis' })
  showMenu();
}
const goTennisC = () => {
  router.push({ name: 'Tennis' })
  showDrp();
}


const goBasketballC = () => {
  router.push({ name: 'Basketball' })
  showDrp();
}
const goBasketball = () => {
  router.push({ name: 'Basketball' })
  showMenu();

}

const goLogin = () => {
  router.push({ name: 'Login' })
  // showMenu();
}

const goSignin = () => {
  router.push({ name: 'Signin' })
  // showMenu();
}

const openTelegram = () => {
  window.open('https://telegram.me/telegramUsername', '_blank')
}

const openTelegramX = () => {
  window.open('https://telegram.me/telegramUsername', '_blank')
  showMenu();
}
</script>

<style>
@import '../style/nav.css';
</style>
