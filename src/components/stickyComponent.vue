<template>
  <div class="sticky-ads" :class="[openSticky ? 'show-s' : 'hide-s']">
    <div
      class="sticky-inner"
      :style="{ backgroundImage: `url(${adsImage})` }"
    >
      <div class="pop-circle-container" @click="drawerStore.toggleSticky">
        <ExitIcon class="pop-exit-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useDrawerStore } from '../stores/drawer'
import ExitIcon from '../icons/ExitIcon.vue'
import axios from 'axios'

const adsData = ref([])
const openSticky = ref(null)
const adsImage = ref(null)
const drawerStore = useDrawerStore()
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
  const AdTitle = 'Bottom'
  return adsData.value ? adsData.value.filter((Ads) => Ads.title === AdTitle) : []
})

const showAds = () => {
  adsImage.value = filteredAds.value[0]?.image || null
}

watchEffect(() => {
  openSticky.value = drawerStore.popSticky
  console.log(openSticky.value)
})

onMounted(() => {
  getAds()
})
</script>

<style>
@import '../style/sticky.css';
@import '../style/popup.css';
</style>
