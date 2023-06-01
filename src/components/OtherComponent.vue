<template>
      <div class="prediction-con">
      <h1>Other Predictions</h1>
      <div class="prediction-p">
        <OtherPredictions buttonName="Double chance" />
        <OtherPredictions buttonName="Over 2.5 Goals" />
        <OtherPredictions buttonName="Over 1.5 Goals" />
        <OtherPredictions buttonName="Both Team To Score" />
        <OtherPredictions buttonName="Bet Of The Day" />
        <OtherPredictions buttonName="Under 2.5 Goals" />
      </div>
    </div>
</template>
<script setup>
import OtherPredictions from '../components/OtherPredictions.vue'
</script>
<style>
@import '../style/other.css';
</style>
