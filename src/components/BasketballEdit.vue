<template>
  <div>
    <div class="form-container-h">
      <h1>Basketball update</h1>
    </div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <h1>Team A</h1>
        <div class="form-group">
          <label for="teamAscore">Score:</label>
          <input v-model="teamAscore" type="text" class="form-g-input" placeholder="2" id="teamAscore" />
        </div>
      </div>
      <button type="submit" class="btn-f-f f-desktop">Submit</button>
      <div class="form-wrapper">
        <h1>Team B</h1>
        <div class="form-group">
          <label for="teamBscore">Score:</label>
          <input v-model="teamBscore" type="text" class="form-g-input" placeholder="5" id="teamBscore" />
        </div>
        <button type="submit" class="btn-f-f f-mobile">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const emit = defineEmits('formSubmitSport')


const teamAscore = ref(0);
const teamBscore = ref(0);

function handleFileUpload(event, targetRef) {
  const file = event.target.files[0];
  if (file) {
    targetRef.value = file;
  }
}


async function handleSubmit() {
  if (

    teamAscore.value !== null &&
 
    teamBscore.value !== null

  ) {
    const user = JSON.parse(localStorage.getItem('token'));
    try {
      const formData = new FormData();
      formData.append('teamAscore', teamAscore.value);
      formData.append('teamBscore', teamBscore.value);

      emit('formSubmitSport', formData)
    } catch (err) {
      console.log(err);
    }
  } else {
    alert('No empty fields allowed');
  }
}
</script>

<style>
@import '../style/games.css';
</style>
