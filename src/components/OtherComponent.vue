<template>
      <div class="prediction-con">
      <h1>Other Predictions</h1>
      <div class="prediction-p">
        <OtherPredictions buttonName="Double Chance" />
        <OtherPredictions buttonName="Over 2.5 Goals" />
        <OtherPredictions buttonName="Over 1.5 Goals" />
        <OtherPredictions buttonName="Both Teams To Score" />
        <!-- <OtherPredictions buttonName="Bet Of The Day" /> -->
        <button class="other-p-btn" @click="goToB()">Bet Of The Day</button>
        <OtherPredictions buttonName="Under 2.5 Goals" />
      </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'; 
import OtherPredictions from '../components/OtherPredictions.vue'

const router = useRouter();

const goToB = () => {
  router.push({ name: 'Banker' })
}
</script>
<style>
@import '../style/other.css';
</style>
