<template>
  <div class="sticky-ads" :class="[openSticky ? 'show-s' : 'hide-s']" v-if="openSticky">
   <div class="sticky-c">
    <div class="pop-circle-container" @click="drawerStore.toggleSticky">
      <ExitIcon class="pop-exit-icon" />
    </div>
   </div>
    <div
      @click="openAdlink()"
      class="sticky-inner"
      :style="{ backgroundImage: `url(${adsImage})` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useDrawerStore } from '../stores/drawer'
import ExitIcon from '../icons/ExitIcon.vue'
import axios from 'axios'

const adsData = ref([])
const adsImage = ref(null)
const adsLink = ref(null)
const openSticky = ref(null)
const drawerStore = useDrawerStore()
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

watchEffect(() => {
  openSticky.value = drawerStore.popSticky
})

const getAds = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/ads`)
    adsData.value = response.data
    showAds()
  } catch (err) {
    console.error(err)
    autoClose() // Call autoClose in case of an error
  }
}

const filteredAds = computed(() => {
  const AdTitle = 'Bottom'
  return adsData.value ? adsData.value.filter((Ads) => Ads.title === AdTitle) : []
})

const showAds = () => {
  adsImage.value = filteredAds.value[0]?.description || null
  adsLink.value = filteredAds.value[0]?.link || null
  // Call autoClose after setting adsBannerImage
  autoClose()
}

// When there is no data in the server
const autoClose = () => {
  if (adsImage.value === null || adsImage.value === '') {
    drawerStore.toggleSticky()
  }
}

const openAdlink = () => {
  if (adsLink.value) {
    window.open(adsLink.value, '_blank')
  }
}

onMounted(() => {
  getAds()
})
</script>

<style>
@import '../style/sticky.css';
@import '../style/popup.css';
</style>
