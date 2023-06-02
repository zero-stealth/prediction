<template>
  <div class="form-container-h">
    <h1>Basketball</h1>
  </div>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div class="form-wrapper">
      <h1>Player A</h1>
      <div class="form-group">
        <label for="playerAName">Name:</label>
        <input v-model="playerAName" type="text" class="form-g-input" placeholder="Lebron" id="playerAName" />
      </div>
      <div class="form-group">
        <label for="playerALogo">Logo:</label>
        <input
          @change="handlePlayerALogo"
          type="file"
          class="form-g-input"
          id="playerALogo"
          accept="image/*"
        />
      </div>
      <div class="form-group">
        <label for="playerALeague">League:</label>
        <input v-model="playerALeague" type="text" class="form-g-input" placeholder="Basketball League" id="playerALeague" />
      </div>
      <div class="form-group">
        <label for="playerATime">Basketball Time:</label>
        <input v-model="playerATime" type="time" class="form-g-input" placeholder="12.00pm" id="playerATime" />
      </div>
    </div>
    <div class="form-wrapper">
      <div class="form-group">
        <label for="playerAPrediction">Basketball Prediction:</label>
        <input v-model="playerAPrediction" type="text" class="form-g-input" placeholder="Lebron wins the game" id="playerAPrediction" />
      </div>
      <button type="submit" class="btn-f-f f-desktop">Submit</button>
    </div>
    <div class="form-wrapper">
      <h1>Player B</h1>
      <div class="form-group">
        <label for="playerBName">Name:</label>
        <input v-model="playerBName" type="text" class="form-g-input" placeholder="James" id="playerBName" />
      </div>
      <div class="form-group">
        <label for="playerBLogo">Logo:</label>
        <input
          @change="handlePlayerBLogo"
          type="file"
          class="form-g-input"
          id="playerBLogo"
          accept="image/*"
        />
      </div>
      <div class="form-group">
        <label for="playerBLeague">League:</label>
        <input v-model="playerBLeague" type="text" class="form-g-input" placeholder="Basketball League" id="playerBLeague" />
      </div>
      <div class="form-group">
        <label for="playerBTime">Basketball Time:</label>
        <input v-model="playerBTime" type="time" class="form-g-input" placeholder="12.00pm" id="playerBTime" />
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const playerAName = ref('')
const playerBName = ref('')
const playerALogo = ref(null)
const playerBLogo = ref(null)
const playerALeague = ref('')
const playerBLeague = ref('')
const playerAPrediction = ref('')
const playerATime = ref('')
const playerBTime = ref('')

function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      targetRef.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

function handlePlayerALogo(event) {
  handleFileUpload(event, playerALogo)
}

function handlePlayerBLogo(event) {
  handleFileUpload(event, playerBLogo)
}

function handleSubmit() {
  if (
    playerAName.value.trim() !== '' &&
    playerALogo.value !== null &&
    playerBName.value.trim() !== '' &&
    playerBLogo.value !== null &&
    playerALeague.value.trim() !== '' &&
    playerBLeague.value.trim() !== '' &&
    playerAPrediction.value.trim() !== '' &&
    playerATime.value.trim() !== '' &&
    playerBTime.value.trim() !== ''
  ) {
    submitForm()
  } else {
    alert('No empty fields allowed')
  }
}

function submitForm() {
  // Submit form logic goes here
}
</script>

<style>
@import '../style/games.css';
</style>
