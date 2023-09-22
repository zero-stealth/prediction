<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const adsImage = ref(null)
const adsData = ref([])
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const getAds = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/ads`)
    adsData.value = response.data
    // console.log(response.data);
    showAds()
  } catch (err) {
    console.log(err)
  }
}

const filteredAds = computed(() => {
  const AdTitle = 'Bottom'
  return adsData.value ? adsData.value.filter((Ads) => Ads.title === AdTitle) : []
})

const showAds = () => {
  adsImage.value = filteredAds.value[0]?.image || null
}

onMounted(() => {
  getAds()
})

</script>
<template>
  <div class="sticky-ads">
    <img :src="adsImage" alt="sticy bet ads" class="sticky-img" />
  </div>
</template>
<style>
@import '../style/sticky.css';
</style>
