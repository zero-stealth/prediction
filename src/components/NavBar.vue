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
      <div class="mb-locale">
        <a href="https://sportypredict.com/" class="nav-mb">
          <img
            src="@/assets/logo-spp.png"
            alt="logo"
            class="logo-spp"
            @click="goHome"
            draggable="false"
          />
        </a>

        <div class="language-dropdown">
          <button @click="toggleDropdown" class="language-btn">
            <img :src="getFlag(currentLanguage)" :alt="currentLanguage" class="language-img" />
            <div class="language-inn">
              {{ currentLanguage }}
              <ArrowIcon class="Dropdown-arrowIcon" />
            </div>
          </button>
          <div v-show="isDropdownOpen" class="dropdown-content">
            <div
              v-for="(flag, language) in flags"
              :key="language"
              @click="changeLanguage(language)"
              class="content-dp"
            >
              <img :src="flag" alt="Language Flag" class="language-img" />
              {{ language }}
            </div>
          </div>
        </div>
      </div>
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
            <span @click="goToC('Double Chance')">{{ $t('nav.span1') }}</span>
            <span @click="goToC('Over 2.5 Goals')">{{ $t('nav.span2') }}</span>
            <span @click="goToC('Over 1.5 Goals')">{{ $t('nav.span3') }}</span>
            <span @click="goToC('Both Teams To Score')">{{ $t('nav.span4') }}</span>
            <span @click="goToC('Under 2.5 Goals')">{{ $t('nav.span5') }}</span>
          </div>
        </div>
      </div>
      <div class="nav-btn-container cs-btn" v-if="token !== null">
        <button @click="logOut" class="nav-btn btn-l btn-logout">
          <LogoutIcon class="icon-nav l-icon" />
          {{ $t('nav.btn6') }}
        </button>
      </div>
      <div class="nav-btn-container" v-else>
        <button @click="goSignin()" class="nav-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
          {{ $t('nav.btn7') }}
        </button>
        <button @click="goLogin()" class="nav-btn btn-l">
          <ProfileIcon class="icon-nav l-icon" />
          {{ $t('nav.btn8') }}
        </button>
        <div class="language-dropdown">
          <button @click="toggleDropdown" class="language-btn">
            <img :src="getFlag(currentLanguage)" :alt="currentLanguage" class="language-img" />
            <div class="language-inn">
              {{ currentLanguage }}
              <ArrowIcon class="Dropdown-arrowIcon" />
            </div>
          </button>
          <div v-show="isDropdownOpen" class="dropdown-content">
            <div
              v-for="(flag, language) in flags"
              :key="language"
              @click="changeLanguage(language)"
              class="content-dp"
            >
              <img :src="flag" alt="Language Flag" class="language-img" />
              {{ language }}
            </div>
          </div>
        </div>
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
          {{ $t('nav.link1') }}
        </RouterLink>

        <span @click="goTennis()" class="nav-link">{{ $t('nav.link9') }}</span>
        <span @click="goBasketball()" class="nav-link">{{ $t('nav.link4') }}</span>
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
      <div class="icon-nav-con">
        <facebookIcon class="bk-icon fb-icon" @click="openFacebook" />
        <twitterIcon class="bk-icon t-icon" @click="openTwitter" />
        <telegramIcon class="bk-icon" @click="openTelegram" />
          <instagramIcon class="bk-icon" @click="openInstagram" />
        <tiktokIcon class="bk-icon" @click="openTiktok" />
        <youtubeIcon class="bk-icon" @click="openYoutube" />
        <whatsappIcon class="bk-icon" @click="openYoutube" />
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
import English from '../assets/English.png'
import French from '../assets/French.png'
import German from '../assets/German.png'
import Italian from '../assets/Italian.png'
import Brazilian from '../assets/Brazilian.png'
import Dutch from '../assets/Dutch.png'
import Spanish from '../assets/Spanish.png'
import { ref, watchEffect, watch } from 'vue'
import tiktokIcon from '../icons/tiktokIcon.vue'
import youtubeIcon from '../icons/youtubeIcon.vue'
import twitterIcon from '../icons/twitterIcon.vue'
import whatsappIcon from '../icons/whatsapp.vue'
import instagramIcon from '../icons/instagram.vue'
import facebookIcon from '../icons/facebook.vue'
import telegramIcon from '../icons/telegram.vue'

const token = ref(null)
const isOpen = ref(false)
const router = useRouter()
const isDrpOpen = ref(false)
const isDropOpen = ref(false)
const isDropdownOpen = ref(false)
const currentLanguage = ref('English')

watchEffect(() => {
  token.value = localStorage.getItem('token')
})

const flags = {
  English: English,
  French: French,
  German: German,
  Italian: Italian,
  Brazilian: Brazilian,
  Dutch: Dutch,
  Spanish: Spanish
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

const getFlag = (language) => flags[language]

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const changeLanguage = (locale) => {
  localStorage.setItem('selectedLanguage', locale)
  currentLanguage.value = locale
  isDropdownOpen.value = false
}

changeLanguage(localStorage.getItem('selectedLanguage') || 'English')

watch(currentLanguage, () => {
  window.location.reload()
})

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
  token.value = null
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
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style>
@import '../style/nav.css';
</style>
