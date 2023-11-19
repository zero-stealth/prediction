<script setup>
import { ref, onMounted, computed } from 'vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import axios from 'axios'

const adsData = ref([])
const adsImage = ref(null)
const description = ref(null)
const offerAdsLink = ref(null)
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const getAds = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/ads`)
    adsData.value = response.data
    showAds()
  } catch (err) {
    console.error(err)
  }
}

const filteredAds = computed(() => {
  const adTitle = 'Banner'
  return adsData.value ? adsData.value.filter((ads) => ads.title === adTitle) : []
})

const showAds = () => {
  adsImage.value = filteredAds.value[0]?.image || null
  description.value = filteredAds.value[0]?.description || null
  offerAdsLink.value = filteredAds.value[0]?.link || null
}

onMounted(() => {
  getAds()
})

const openLink = () => {
  if (offerAdsLink.value) {
    window.open(`${offerAdsLink.value}`, '_blank')
  }
}

</script>

<template>
  <div class="offer-container">
    <div class="offerA-comp" @click="openLink()">
      <h1>{{ $t('Offer.Oh1') }}</h1>
      <div class="offerA-inner">
        <img
          :src="adsImage"
          :alt="description || 'Bet Winner Logo'"
          class="bet-win"
          :class="[adsImage === null ? 'bet-win-skeleton' : '']"
        />
        <h2>{{ $t('Offer.Oh2') }} {{ description }}</h2>
        <div class="offerA-circle">
          <ArrowIcon class="offer-arrow" />
        </div>
      </div>
    </div>
    <span>{{ $t('Offer.Ospan') }}</span>
  </div>
</template>

<style>
@import '../style/OfferAds.css';
</style>
