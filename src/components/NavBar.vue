<template>
  <div class="nav-main">
    <div class="nav-container">
      <select v-model="$i18n.locale" class="locale-changer mb-locale">
          <option 
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            class="locale-op"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
      <img src="../assets/logo-spp.png" alt="logo" class="logo-spp" @click="goHome" />
      <div class="nav-link-container">
        <RouterLink :to="{ name: 'Home' }" class="nav-link">{{ $t('nav.link1') }}</RouterLink>
        <RouterLink :to="{ name: 'Bonus' }" class="nav-link">{{ $t('nav.link2') }}</RouterLink>
        <RouterLink :to="{ name: 'Banker' }" class="nav-link">{{ $t('nav.link3') }}</RouterLink>
        <RouterLink :to="{ name: 'Football' }" class="nav-link">{{ $t('nav.link10') }}</RouterLink>
        <RouterLink :to="{ name: 'Basketball' }" class="nav-link">{{ $t('nav.link4') }}</RouterLink>
        <RouterLink :to="{ name: 'Tennis' }" class="nav-link">{{ $t('nav.link9') }}</RouterLink>
        <div class="drop-container">
          <div class="drop-down" @click="showDrop()">
            <span>{{ $t('nav.link6') }}</span> 
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panel" :class="[isDropOpen ? 'show' : 'hide']">
            <span @click="goToC($t('nav.span1'))">{{ $t('nav.span1') }}</span>
            <span @click="goToC($t('nav.span2'))">{{ $t('nav.span2') }}</span>
            <span @click="goToC($t('nav.span3'))">{{ $t('nav.span3') }}</span>
            <span @click="goToC($t('nav.span4'))">{{ $t('nav.span4') }}</span>
            <span @click="goToC($t('nav.span5'))">{{ $t('nav.span5') }}</span>
          </div>
        </div>
      </div>
      <div class="nav-btn-container" v-if="token !== null">
        <button @click="logOut" class="nav-btn btn-l btn-logout">
          <LogoutIcon class="icon-nav l-icon" />
          {{ $t('nav.btn6') }}
        </button>
      </div>
      <div class="nav-btn-container" v-else>
        <button @click="goSignin" class="nav-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
          {{ $t('nav.btn7') }}
        </button>
        <button @click="goLogin" class="nav-btn btn-l">
          <ProfileIcon class="icon-nav l-icon" />
          {{ $t('nav.btn8') }}
        </button>
        <div class="drop-container">
          <div class="drop-down" @click="showDrop()">
            <span>{{ $t('nav.link6') }}</span> 
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panel" :class="[isDropOpen ? 'show' : 'hide']">
            <span @click="goToC($t('nav.span1'))">{{ $t('nav.span1') }}</span>
            <span @click="goToC($t('nav.span2'))">{{ $t('nav.span2') }}</span>
            <span @click="goToC($t('nav.span3'))">{{ $t('nav.span3') }}</span>
            <span @click="goToC($t('nav.span4'))">{{ $t('nav.span4') }}</span>
            <span @click="goToC($t('nav.span5'))">{{ $t('nav.span5') }}</span>
          </div>
        </div>
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
      <div class="mobile-link-container">
        <RouterLink :to="{ name: 'Home' }" @click="showMenu()" class="mobile-link">
          {{ $t('nav.link1') }}
        </RouterLink>

        <div class="drop-container">
          <span @click="goTennis()" class="nav-link">{{ $t('nav.link9') }}</span>
          <span @click="goBasketball()" class="nav-link">{{ $t('nav.link4') }}</span>
        </div>
        <RouterLink :to="{ name: 'Bonus' }" @click="showMenu()" class="mobile-link">
          {{ $t('nav.link2') }}
        </RouterLink>
        <div @click="openTelegramX" class="mobile-link">{{ $t('nav.link8') }}</div>
        <div @click="openBetOfDay" class="mobile-link">{{ $t('nav.link3') }}</div>
        <div class="drop-container">
          <div class="drop-down" @click="showDrp()">
            <span>{{ $t('nav.link6') }}</span>
            <ArrowIcon class="drop-icon" />
          </div>
          <div class="drop-down-panels" :class="[isDrpOpen ? 'show' : 'hide']">
            <span @click="goTo('Double Chance')">{{ $t('nav.span1') }}</span>
            <span @click="goTo('Over 2.5 Goals')">{{ $t('nav.span2') }}</span>
            <span @click="goTo('Over 1.5 Goals')">{{ $t('nav.span3') }}</span>
            <span @click="goTo('Both Teams To Score')">{{ $t('nav.span4') }}</span>
            <span @click="goTo('Under 2.5 Goals')">{{ $t('nav.span2') }}</span>
          </div>
        </div>
      </div>
      <div class="mobile-btn-container" v-if="token !== null">
        <button @click="logOut" class="mobile-btn btn-l btn-logout">
          <LogoutIcon class="icon-nav l-icon" />
          {{ $t('nav.btn6') }}
        </button>
      </div>
      <div class="mobile-btn-container" v-else>
        <button @click="goSignin" class="mobile-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
          {{ $t('nav.btn7') }}
        </button>
        <button @click="goLogin" class="mobile-btn btn-l">
          <ProfileIcon class="icon-nav l-icon" />
          {{ $t('nav.btn8') }}
        </button>
      </div>
    </div>
  </div>
  <!-- mobile responsive -->
</template>

<script setup>
import MobileMenuIcon from '../icons/mobileMenuIcon.vue'
import { RouterLink, useRouter } from 'vue-router'
import ProfileIcon from '../icons/profileIcon.vue'
import GroupIcon from '../icons/GroupIcon.vue'
import ExitIcon from '../icons/ExitIcon.vue'
import LogoutIcon from '../icons/logoutIcon.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import { ref, watchEffect } from 'vue'

const token = ref(null)
const isOpen = ref(false)
const router = useRouter()
const isDrpOpen = ref(false)
const isDropOpen = ref(false)
const openLanguage = ref(false)


watchEffect(() => {
  token.value = localStorage.getItem('token')
})

const showMenu = () => {
  isOpen.value = !isOpen.value
  isDrpOpen.value = false
}

const showDrop = () => {
  isDropOpen.value = !isDropOpen.value
}

const showLanguage = () => {
  openLanguage.value = !openLanguage.value
}

const showDrp = () => {
  isDrpOpen.value = !isDrpOpen.value
}

const logOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  token.value = null
  isPaid.value = false
  username.value = null
  isAdmin.value = false
  window.location.reload()
}



// Check if a preferred language is stored in local storage and set it
const storedLocale = localStorage.getItem('locale')
if (storedLocale) {
  i18n.global.locale = storedLocale
}

const openBetOfDay = () => {
  router.push({ name: 'Banker' })
  showMenu()
}

const goToC = (betname) => {
  router.push({ name: 'Bet', params: { betName: betname } })
  showDrop()
}

const goTo = (betname) => {
  router.push({ name: 'Bet', params: { betName: betname } })
  showMenu()
  showDrp()
}

const goTennis = () => {
  router.push({ name: 'Tennis' })
  showMenu()
}

const goBasketball = () => {
  router.push({ name: 'Basketball' })
  showMenu()
}

const goLogin = () => {
  router.push({ name: 'Login' })
}

const goHome = () => {
  router.push({ name: 'Home' })
}

const goSignin = () => {
  router.push({ name: 'Signin' })
}

const openTelegramX = () => {
  window.open('https://t.me/sportypredict_tips', '_blank')
  showMenu()
}
</script>

<style>
@import '../style/nav.css';
</style>
