<template>
  <QuickComponent />
  <div class="bon-comp">
    <div class="bonus-h">
      <h1>{{ $t('bonus.h1-1') }}</h1>
      <span>{{ $t('bonus.span') }}</span>
    </div>
    <div class="bonus-component">
      <Bonus v-for="(bonusItem, index) in bonusData" :key="index" :bonusData="bonusItem" />
    </div>
  </div>
  <div class="fp-class fp-bon">
    <h1>{{ $t('BonusInfo.h1') }}</h1>
    <p>{{ $t('BonusInfo.p1') }}</p>
    <ol>
      <li>{{ $t('BonusInfo.li1') }}</li>
      <li>{{ $t('BonusInfo.li2') }}</li>
      <li>{{ $t('BonusInfo.li3') }}</li>
      <li>{{ $t('BonusInfo.li4') }}</li>
      <li>{{ $t('BonusInfo.li5') }}</li>
    </ol>
    <p>{{ $t('BonusInfo.p2') }}</p>
  </div>
  <PopUP v-if="showPop"> </PopUP>
  <Sticky />
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { useDrawerStore } from '../stores/drawer'
import betImage from '../assets/betwinner.png'
import stakeImage from '../assets/stake.png'
import melbetImage from '../assets/melbet.png'
import Bonus from '../components/bonusComponent.vue'
import QuickComponent from '../components/QuickComponent.vue'
import PopUP from '../components/popupComponent.vue'
import Sticky from '../components/stickyComponent.vue'

const showPop = ref(null)
const drawerStore = useDrawerStore()

watchEffect(() => {
  showPop.value = drawerStore.popDrawer
})

const bonusData = ref([
  {
    imgSrc: betImage,
    alt: 'Bet-offer',
    info: 'Bonus upto 130 USD',
    description: 'Offers and welcome bonuses available',
    code: 'SPBW',
    link: 'https://bwredir.com/1bkh?p=%2Fregistration%2F'
  },
  {
    imgSrc: melbetImage,
    alt: 'Bet-offer',
    info: 'Bonus upto 130 USD',
    description: 'Offers and welcome bonuses available',
    code: 'BSTIPS',
    link: 'https://refpakrtsb.top/L?tag=d_2503393m_45415c_&site=2503393&ad=45415'
  },
  {
    imgSrc: stakeImage,
    alt: 'Bet-offer',
    info: 'Bonus upto 1000 USD',
    description: 'Offers and welcome bonuses available',
    code: 'SPTIPS',
    link: 'https://stake.com/?c=e2abbfbd54'
  }
])
</script>
