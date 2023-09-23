<template>
      <div class="prediction-con">
        <h1>{{ $t('nav.link6') }}</h1>
      <div class="prediction-p">
        <OtherPredictions buttonName="Double Chance" />
        <OtherPredictions buttonName="Over 2.5 Goals" />
        <OtherPredictions buttonName="Over 1.5 Goals" />
        <OtherPredictions buttonName="Both Teams To Score" />
        <!-- <OtherPredictions buttonName="Bet Of The Day" /> -->
        <button class="other-p-btn" @click="goToB()">{{ $t('nav.link3') }}</button>
        <OtherPredictions buttonName="Under 2.5 Goals" />
        <button class="other-p-btn fh-btn" @click="goToBO()">{{ $t('nav.link2') }}</button>
      </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'; 
import OtherPredictions from '../components/OtherPredictions.vue'

const router = useRouter();

const goToB = () => {
  router.push({ name: 'Banker' })
  scrollToTop()
  
}

const goToBO = () => {
  router.push({ name: 'Bonus' })
  scrollToTop()

}


const scrollToTop = () => {
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
}

</script>
<style>
@import '../style/other.css';
</style>
