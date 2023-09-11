<template>
  <div class="quick-main">
    <div class="quick-nav">
      <router-link :to="{ name: 'Bonus' }" class="quick-link">{{ $t('nav.link2') }}</router-link>
      <router-link :to="{ name: 'Banker' }" class="quick-link">{{ $t('nav.link3') }}</router-link>
      <router-link :to="{ name: 'Basketball' }" class="quick-link">{{ $t('nav.link4') }}</router-link>
      <router-link :to="{ name: 'Tennis' }" class="quick-link">{{ $t('nav.link9') }}</router-link>
      <div class="drop-container drp-q">
        <div class="drop-down" @click="showDrop()">
          <span :class="{ 'active': addClass, 'inactive': !addClass }">{{ $t('nav.link6') }}</span>
          <arrow-icon class="q-icon" />
        </div>
        <div class="q-panel" :class="{ 'show': isDropOpen, 'hide': !isDropOpen }">
          <span @click="goToC($t('nav.span1'))">{{ $t('nav.span1') }}</span>
          <span @click="goToC($t('nav.span2'))">{{ $t('nav.span2') }}</span>
          <span @click="goToC($t('nav.span3'))">{{ $t('nav.span3') }}</span>
          <span @click="goToC($t('nav.span4'))">{{ $t('nav.span4') }}</span>
          <span @click="goToC($t('nav.span5'))">{{ $t('nav.span5') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'

const isDropOpen = ref(false)
const addClass = ref(false)
const router = useRouter()
const route = useRoute()

watch(route, () => {
  switch (route.name) {
    case 'Bet':
      addClass.value = true
      break
    default:
      addClass.value = false
      break
  }
})

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
