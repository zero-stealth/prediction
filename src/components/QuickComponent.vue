<template>
  <div class="quick-main">
    <div class="quick-nav">
      <router-link :to="{ name: 'Home' }" class="quick-link sos-link">
        <HomeIcon class="nav-home-icon" />
      </router-link>
      <router-link :to="{ name: 'Football' }" class="quick-link">Football</router-link>
      <router-link :to="{ name: 'Basketball' }" class="quick-link">Basketball</router-link>
      <router-link :to="{ name: 'Tennis' }" class="quick-link">Tennis</router-link>
      <router-link :to="{ name: 'Bonus' }" class="quick-link">Betting Offers</router-link>
      <router-link :to="{ name: 'Banker' }" class="quick-link">Bet of the day</router-link>
      <span
        v-for="betItem in betItems"
        :key="betItem.name"
        class="drp-q"
        :class="{ active: isBetActive(betItem.name) }"
        @click="goToC(betItem.name)"
      >
        {{ betItem.translationKey }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomeIcon from '../icons/homeIcon.vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'

const isDropOpen = ref(false)
const router = useRouter()
const route = useRoute()

const betItems = [
  { name: 'Double Chance', translationKey: 'Double Chance' },
  { name: 'Over 2.5 Goals', translationKey: 'Over 2.5 Goals' },
  { name: 'Over 1.5 Goals', translationKey: 'Over 1.5 Goals' },
  { name: 'Both Teams To Score', translationKey: 'Both Teams To Score' },
  { name: 'Under 2.5 Goals', translationKey: 'Under 2.5 Goals' }
]

const isBetActive = (betName) => {
  return route.params.betName === betName
}

const showDrop = () => {
  isDropOpen.value = !isDropOpen.value
}

const goToC = (betname) => {
  router.push({ name: 'Bet', params: { betName: betname } })
  showDrop()
  scrollToTop()
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
@import '../style/quick.css';
@import '../style/nav.css';
</style>
