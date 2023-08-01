<template>
  <div class="bon-comp">
    <div class="bonus-h">
      <h1>Best Betting Sign Up Offers</h1>
      <span>New customers only | commercial content 18 + age limit | T&Cs apply</span>
    </div>
    <div class="bonus-component">
      <Bonus v-for="(bonusItem, index) in bonusData" :key="index" :bonusData="bonusItem" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import betImage from '../assets/betwinner.png'
import stakeImage from '../assets/stake.png'
import melbetImage from '../assets/melbet.png'
import Bonus from '../components/bonusComponent.vue'

const bonusData = ref([
  {
    imgSrc: betImage,
    alt: 'Bet-offer',
    description: 'Offers and welcome bonuses available',
    code: 'SPBW',
    link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F'
  },
  {
    imgSrc: melbetImage,
    alt: 'Bet-offer',
    description: 'Offers and welcome bonuses available',
    code: 'BSTIPS',
    link: 'https://refpakrtsb.top/L?tag=d_2503393m_45415c_&site=2503393&ad=45415'
  },
  {
    imgSrc: stakeImage,
    alt: 'Bet-offer',
    description: 'Offers and welcome bonuses available',
    code: '',
    link: 'https://stake.com/?c=e2abbfbd54'
  }
])
</script>
