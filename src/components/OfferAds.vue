<script setup>
import ArrowIcon from '../icons/ArrowIcon.vue'
import BetWin from '../assets/betwin.png'

const openLink = () => {
  window.open('https://bwredir.com/1bkh?p=%2Fregistration%2F', '_blank')
}
</script>
<template>
  <div class="offer-container">
    <div class="offerA-comp" @click="openLink()">
      <h1>{{ $t('Offer.Oh1') }}</h1>
      <div class="offerA-inner">
        <img :src="BetWin" alt="bet winner logo" class="bet-win" />
        <h2>{{ $t('Offer.Oh2') }}</h2>
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
