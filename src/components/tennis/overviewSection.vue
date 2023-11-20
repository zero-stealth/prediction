<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useGameStore } from '../../stores/game.js'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const gameStore = useGameStore()
const description = ref()

async function getTip() {
  const response = await axios.get(`${SERVER_HOST}/sports/prediction/${gameStore.gameId}`)
  description.value = response.data.description
}

onMounted(() => {
  getTip()
})
</script>

<template>
  <div class="description-container">
    <h1>Description</h1>
    <div class="description-info"  v-if="description">
      <p>{{ description }}</p>
    </div>
    <div class="description-nop"  v-else>
        <p >No description added</p>
    </div>

  </div>
</template>

<style>
@import '../../style/tips.css';
@import '../../style/card.css';
@import '../../style/predictions.css';
</style>
