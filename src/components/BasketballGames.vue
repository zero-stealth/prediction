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
    </div>
    <div class="form-wrapper">
      <div class="form-group">
        <div class="form-group">
        <label for="playerBTime">Basketball Time:</label>
        <input v-model="Time" type="time" class="form-g-input" placeholder="12.00pm" id="playerBTime" />
      </div>
        <label for="playerALeague">League:</label>
        <input v-model="League" type="text" class="form-g-input" placeholder="Basketball League" id="playerALeague" />
      </div>
      <div class="form-group">
        <label for="gamePrediction">Basketball Prediction:</label>
        <input v-model="gamePrediction" type="text" class="form-g-input" placeholder="Lebron wins the game" id="gamePrediction" />
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
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const League = ref('')
const playerAName = ref('')
const playerBName = ref('')
const playerALogo = ref(null)
const playerBLogo = ref(null)
const gamePrediction = ref('')
const Time = ref('')
const sport = ref('Basketball')

function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

function handlePlayerALogo(event) {
  handleFileUpload(event, playerALogo)
}

function handlePlayerBLogo(event) {
  handleFileUpload(event, playerBLogo)
}

const reset = () => {
  playerAName.value = ''
  playerALogo.value = null
  playerBName.value = ''
  playerBLogo.value = null
  League.value = ''
  gamePrediction.value = ''
  Time.value = ''
  sport.value = ''

  alert('prediction posted successfully');
}

async function handleSubmit() {
  if (
    playerAName.value.trim() !== '' &&
    playerALogo.value !== null &&
    playerBName.value.trim() !== '' &&
    playerBLogo.value !== null &&
    League.value.trim() !== '' &&
    gamePrediction.value.trim() !== '' &&
    Time.value.trim() !== '' &&
    sport.value.trim() !== ''
  ) {
    const user = JSON.parse(localStorage.getItem('token'))
    try {
      const formData = new FormData()
      formData.append('playerA', playerAName.value)
      formData.append('playerALogo', playerALogo.value)
      formData.append('league', League.value)
      formData.append('time', Time.value)
      formData.append('playerB', playerBName.value)
      formData.append('playerBLogo', playerBLogo.value)
      formData.append('gamePrediction', gamePrediction.value)

      const response = await axios.post(
        'https://predictions-server.onrender.com/sports/create/Basketball',
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user}`
          }
        }
      )
      console.log(response.data)
      reset();
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
