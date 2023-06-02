<template>
  <div class="nav-main">
    <div class="nav-container">
      <!-- <div class="language-drop-down">
      </div> -->
      <div class="nav-logo">logo</div>
      <div class="nav-link-container">
        <RouterLink :to="{ name: 'Home' }" class="nav-link"> Home </RouterLink>
        <div @click="openTelegram" class="nav-link">Telegram tips</div>
        <RouterLink :to="{ name: 'Banker' }" class="nav-link"> Banker tips </RouterLink>
        <div class="drop-container">
          <div class="drop-down" @click="showDrop()">
            <span>Predictions</span>
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panel" :class="[isDropOpen ? 'show' : 'hide']">
            <span @click="goTo('Double chance')">Double chance</span>
            <span @click="goTo('Over 2.5 Goals')">Over 2.5 Goals</span>
            <span @click="goTo('Over 1.5 Goals')">Over 1.5 Goals</span>
            <span @click="goTo('Both Team To Score')">Both Team To Score</span>
            <span @click="goTo('Bet Of The Day')">Bet Of The Day</span>
            <span @click="goTo('Under 2.5 Goals')">Under 2.5 Goals</span>
          </div>
        </div>
        <div class="drop-container">
          <div class="drop-down" @click="showDrp()">
            <span>Other sports</span>
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panel" :class="[isDrpOpen ? 'show' : 'hide']">
            <span @click="goBasketball()">Basketball</span>
            <span @click="goTennis()"> Tennis</span>
          </div>
        </div>
      </div>
      <div class="nav-btn-container" v-if="!token">
        <button @click="goSignin" class="nav-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
          sign up
        </button>
        <button @click="goLogin" class="nav-btn btn-l">
          <ProfileIcon class="icon-nav l-icon" />
          log in
        </button>
      </div>
      <div class="nav-btn-container" v-else>
        <button @click="logOut" class="nav-btn btn-l">
          <LogoutIcon class="icon-nav l-icon" />
          log out
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
      <div class="mobile-logo">logo</div>
      <div class="mobile-link-container">
        <RouterLink :to="{ name: 'Home' }" class="mobile-link"> Home </RouterLink>
        <div class="drop-container">
          <div class="drop-down" @click="showDrp()">
            <span>Other sports</span>
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panel drp-down-panel" :class="[isDrpOpen ? 'showDrp' : 'hideDrp']">
            <span @click="goBasketball()">Basketball</span>
            <span @click="goTennis()"> Tennis</span>
          </div>
        </div>
        <div @click="openTelegram" class="mobile-link">Telegram tips</div>
        <RouterLink :to="{ name: 'Banker' }" class="mobile-link"> Banker tips </RouterLink>
        <div class="drop-container">
          <div class="drop-down" @click="showDrop()">
            <span>Predictions</span>
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panel" :class="[isDropOpen ? 'show' : 'hide']">
            <span @click="goTo('Double chance')">Double chance</span>
            <span @click="goTo('Over 2.5 Goals')">Over 2.5 Goals</span>
            <span @click="goTo('Over 1.5 Goals')">Over 1.5 Goals</span>
            <span @click="goTo('Both Team To Score')">Both Team To Score</span>
            <span @click="goTo('Bet Of The Day')">Bet Of The Day</span>
            <span @click="goTo('Under 2.5 Goals')">Under 2.5 Goals</span>
          </div>
        </div>
      </div>
      <div class="mobile-btn-container" v-if="!token">
        <button @click="goSignin" class="mobile-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
          sign up
        </button>
        <button @click="goLogin" class="mobile-btn btn-l">
          <ProfileIcon class="icon-nav l-icon" />
          log in
        </button>
      </div>
      <div class="mobile-btn-container"  v-else>
        <button @click="logOut" class="mobile-btn btn-l btn-logout">
          <LogoutIcon class="icon-nav l-icon" />
          log out
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
import { useAuthStore } from '../stores/auth'
import ProfileIcon from '../icons/profileIcon.vue'
import GroupIcon from '../icons/GroupIcon.vue'
import ExitIcon from '../icons/ExitIcon.vue'
import LogoutIcon from '../icons/logoutIcon.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import { ref, watchEffect } from 'vue'

const router = useRouter()
const authStore = useAuthStore()
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
  token.value = null
}

const goTo = (betname) => {
  router.push({ name: 'Bet', params: { betName: betname } })
}

const goTennis = () => {
  router.push({ name: 'Tennis' })
}

const goBasketball = () => {
  router.push({ name: 'Basketball' })
}

const goLogin = () => {
  router.push({ name: 'Login' })
}

const goSignin = () => {
  router.push({ name: 'Signin' })
}

const openTelegram = () => {
  window.open('https://telegram.me/telegramUsername', '_blank')
}
</script>

<style>
@import '../style/nav.css';
</style>
