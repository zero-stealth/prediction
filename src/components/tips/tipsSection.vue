<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const route = useRoute()


const tip = ref('')


async function getTip() {
  const response = await axios.get(`${SERVER_HOST}/predictions/single/${route.params.date}/${route.params.teamA}/${route.params.teamB}`)
  tip.value = response.data.tip
}

onMounted(() => {
  getTip()
})

</script>

<template>
  <div class="description-container">
    <h1>Tip</h1>
    <div class="description-nop">
        <p >{{  tip  }}</p>
    </div>

  </div>
</template>

<style>
@import '../../style/tips.css';
@import '../../style/card.css';
@import '../../style/predictions.css';
</style>
