<template>
  <div>
    <div class="form-container-h">
      <h1>Upcoming picks updates</h1>
    </div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <h1>Team A</h1>
        <div class="form-group">
          <label for="teamAscore">Score:</label>
          <input
            v-model="teamAscore"
            type="text"
            class="form-g-input"
            placeholder="0"
            id="teamAscore"
          />
        </div>
      </div>
      <button type="submit" class="btn-f-f f-desktop">Submit</button>
      <div class="form-wrapper">
        <h1>Team B</h1>
        <div class="form-group">
          <label for="teamBscore">Score:</label>
          <input
            v-model="teamBscore"
            type="text"
            class="form-g-input"
            placeholder="0"
            id="teamBscore"
          />
        </div>
        <button type="submit" class="btn-f-f f-mobile">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const emit = defineEmits('formSubmit')

const teamAscore = ref()
const teamBscore = ref()

async function handleSubmit() {
  if (

    teamAscore.value !== null &&
    teamBscore.value !== null 
  ) {
    try {
      emit('formSubmit', teamAscore.value, teamBscore.value)
    } catch (err) {
      console.log(err)
    }
  } else {
    alert('No empty fields allowed')
  }
}
</script>

<style>
@import '../style/games.css';
</style>
