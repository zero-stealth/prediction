<template>
    <div class="form-container-h">
      <h1>Other Games</h1>
    </div>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="form-wrapper  other-fw">
        <h1>Team A</h1>
        <div class="form-group">
          <label for="teamAName">Name:</label>
          <input v-model="teamA" type="text" class="form-g-input" placeholder="Manchester" id="teamAName" />
        </div>
        <div class="form-group">
          <label for="teamAScore">Prediction:</label>
          <input v-model="teamAscore" type="text" class="form-g-input" placeholder="2" id="teamAScore" />
        </div>
      </div>
      <div class="form-wrapper other-fw">
        <div class="form-group">
          <label for="matchTime">Match Time:</label>
          <input v-model="time" type="time" class="form-g-input" placeholder="12.00pm" id="matchTime" />
        </div>
        <div class="form-group">
          <label for="matchPrediction">Prediction:</label>
          <select v-model="matchPrediction" class="form-g-input" placeholder="Upcoming" id="matchPrediction">
            <option disabled value="">Choose Prediction</option>
            <option value="Double">Double chance</option>
            <option value="Over2">Over 2.5 Goals</option>
            <option value="Over1">Over 1.5 Goals</option>
            <option value="Both-Team-To-Score">Both Team To Score</option>
            <option value="Bet-Of-The-Day">Bet Of The Day</option>
            <option value="Under-2.5-Goals">Under 2.5 Goals</option>
          </select>
        </div>
        <button type="submit" class="btn-f-f f-desktop">Submit</button>
      </div>
      <div class="form-wrapper  other-fw">
        <h1>Team B</h1>
        <div class="form-group">
          <label for="teamBName">Name:</label>
          <input v-model="teamB" type="text" class="form-g-input" placeholder="Arsenal" id="teamBName" />
        </div>
        <div class="form-group">
          <label for="teamBScore">Prediction:</label>
          <input v-model="teamBscore" type="text" class="form-g-input" placeholder="5" id="teamBScore" />
        </div>
        <button type="submit" class="btn-f-f f-mobile">Submit</button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const teamA = ref('')
  const teamB = ref('')
  const time = ref('')
  const teamAscore = ref(0)
  const teamBscore = ref(0)
  const matchPrediction = ref('')
  
  function handleSubmit() {
    if (
      teamA.value.trim() !== '' &&
      teamAscore.value !== null &&
      teamB.value.trim() !== '' &&
      teamBscore.value !== null &&
      time.value.trim() !== '' &&
      matchPrediction.value.trim() !== ''
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
  