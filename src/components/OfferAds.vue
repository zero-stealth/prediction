<script setup>
import { ref, onMounted, computed } from 'vue';
import ArrowIcon from '../icons/ArrowIcon.vue'
import axios from 'axios';


const adsData = ref([]);
const adsImage = ref(null);
const Description = ref(null);
const OfferAdsLink = ref(null);
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

const getAds = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/ads`);
    adsData.value = response.data;
    // console.log(response.data);
    showAds();
  } catch (err) {
    console.log(err);
  }
};


const filteredAds = computed(() => {
  const AdTitle = 'Banner';
  return adsData.value ? adsData.value.filter((Ads) => Ads.title === AdTitle) : [];
});

const showAds = () => {
  adsImage.value = filteredAds.value[0]?.image || null;
  Description.value = filteredAds.value[0]?.description || null;
  OfferAdsLink.value = filteredAds.value[0]?.link || null;

};

onMounted(() => {
  getAds();
});

const openLink = () => {
  window.open(`${OfferAdsLink.value}`, '_blank')
}



</script>
<template>
  <div class="offer-container">
    <div class="offerA-comp" @click="openLink()">
      <h1>{{ $t('Offer.Oh1') }}</h1>
      <div class="offerA-inner">
        <img :src="adsImage" alt="bet winner logo" class="bet-win" />
        <h2>{{ $t('Offer.Oh2') }} {{ Description }}</h2>
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
