<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const route = useRoute()
const description = ref()

async function getTip() {
  const response = await axios.get(`${SERVER_HOST}/sports/single/${route.params.date}/${route.params.teamA}/${route.params.teamB}`)
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
