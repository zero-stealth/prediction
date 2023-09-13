<template>
  <div class="quick-main">
    <div class="quick-nav">
      <router-link :to="{ name: 'Home' }" class="quick-link">{{ $t('Offer.Ohr') }}</router-link>
      <router-link :to="{ name: 'Football' }" class="quick-link">{{ $t('nav.link10') }}</router-link>
      <router-link :to="{ name: 'Basketball' }" class="quick-link">{{ $t('nav.link4')  }}</router-link>
      <router-link :to="{ name: 'Tennis' }" class="quick-link">{{ $t('nav.link9') }}</router-link>
      <router-link :to="{ name: 'Bonus' }" class="quick-link">{{ $t('nav.link2') }}</router-link>
      <router-link :to="{ name: 'Banker' }" class="quick-link">{{ $t('nav.link3') }}</router-link>
      <span
        v-for="betItem in betItems"
        :key="betItem.name"
        class="drp-q"
        :class="{ active: isBetActive(betItem.name) }"
        @click="goToC(betItem.name)"
      >
        {{ $t(betItem.translationKey) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'

const isDropOpen = ref(false)
const addClass = ref(false)
const router = useRouter()
const route = useRoute()


const betItems = [
  { name: 'Double Chance', translationKey: 'nav.span1' },
  { name: 'Over 2.5 Goals', translationKey: 'nav.span2' },
  { name: 'Over 1.5 Goals', translationKey: 'nav.span3' },
  { name: 'Both Team To Score', translationKey: 'nav.span4' },
  { name: 'Under 2.5 Goals', translationKey: 'nav.span5' },
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
}
</script>

<style scoped>
@import '../style/quick.css';
@import '../style/nav.css';
</style>