<template>
    <div class="form-container-h">
      <h1>Free Tips</h1>
    </div>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="form-wrapper">
        <h1>Team A</h1>
        <div class="form-group">
          <label for="teamAName">Name:</label>
          <input v-model="teamAName" type="text" class="form-g-input" placeholder="Manchester" id="teamAName" />
        </div>
        <div class="form-group">
          <label for="teamALogo">Logo:</label>
          <input
            @change="handleTeamALogo"
            type="file"
            class="form-g-input"
            id="teamALogo"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="teamAFormation">Formation:</label>
          <input v-model="teamAFormation" type="text" class="form-g-input" placeholder="4-2-0-4" id="teamAFormation" />
        </div>
        <div class="form-group">
          <label for="teamAPosition">Position:</label>
          <input v-model="teamAPosition" type="text" class="form-g-input" placeholder="1" id="teamAPosition" />
        </div>
        <div class="form-group">
          <label for="teamAScore">Score:</label>
          <input v-model="teamAScore" type="text" class="form-g-input" placeholder="2" id="teamAScore" />
        </div>
      </div>
      <div class="form-wrapper">
        <div class="form-group">
          <label for="LeagueLogo">League logo</label>
          <input
            @change="handleLeagueLogo"
            type="file"
            class="form-g-input"
          id="leagueLogo"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="matchTime">Match Time:</label>
          <input v-model="matchTime" type="time" class="form-g-input" placeholder="12.00pm" id="matchTime" />
        </div>
        <div class="form-group">
          <label for="matchStatus">Match Status:</label>
          <select v-model="matchStatus" class="form-g-input" placeholder="Upcoming" id="matchStatus">
            <option disabled value="">Choose status</option>
            <option value="live">Live</option>
            <option value="past">Past</option>
            <option value="future">Upcoming</option>
          </select>
        </div>
        <button type="submit" class="btn-f-f f-desktop">Submit</button>
      </div>
      <div class="form-wrapper">
        <h1>Team B</h1>
        <div class="form-group">
          <label for="teamBName">Name:</label>
          <input v-model="teamBName" type="text" class="form-g-input" placeholder="Arsenal" id="teamBName" />
        </div>
        <div class="form-group">
          <label for="teamBLogo">Logo:</label>
          <input
            @change="handleTeamBLogo"
            type="file"
            class="form-g-input"
            id="teamBLogo"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="teamBFormation">Formation:</label>
          <input v-model="teamBFormation" type="text" class="form-g-input" placeholder="4-1-3-0" id="teamBFormation" />
        </div>
        <div class="form-group">
          <label for="teamBPosition">Position:</label>
          <input v-model="teamBPosition" type="text" class="form-g-input" placeholder="2" id="teamBPosition" />
        </div>
        <div class="form-group">
          <label for="teamBScore">Score:</label>
          <input v-model="teamBScore" type="text" class="form-g-input" placeholder="5" id="teamBScore" />
        </div>
        <button type="submit" class="btn-f-f f-mobile">Submit</button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const teamAName = ref('')
  const teamBName = ref('')
  const teamALogo = ref(null)
  const teamBLogo = ref(null)
  const leagueLogo = ref(null)
  const teamAFormation = ref('4-4-2')
  const teamBFormation = ref('4-4-2')
  const teamAPosition = ref('')
  const teamBPosition = ref('')
  const matchTime = ref('')
  const teamAScore = ref(0)
  const teamBScore = ref(0)
  const matchStatus = ref('')
  
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
  
  function handleTeamALogo(event) {
    handleFileUpload(event, teamALogo)
  }
  
  function handleTeamBLogo(event) {
    handleFileUpload(event, teamBLogo)
  }
  
  function handleLeagueLogo(event) {
    handleFileUpload(event, leagueLogo)
  }
  
  function handleSubmit() {
    if (
      teamAName.value.trim() !== '' &&
      teamALogo.value !== null &&
      leagueLogo.value !== null &&
      teamAFormation.value.trim() !== '' &&
      teamAPosition.value.trim() !== '' &&
      teamAScore.value !== null &&
      teamBName.value.trim() !== '' &&
      teamBLogo.value !== null &&
      teamBFormation.value.trim() !== '' &&
      teamBPosition.value.trim() !== '' &&
      teamBScore.value !== null &&
      matchTime.value.trim() !== '' &&
      matchStatus.value.trim() !== ''
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
  