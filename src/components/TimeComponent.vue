<template>
  <div>
    <div class="form-container-h">
      <h1>Time</h1>
    </div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <div class="form-group">
          <label for="time">Match Time:</label>
          <input v-model="time" type="time" class="form-g-input" placeholder="12:00pm" id="time" />
        </div>
        <button type="submit" class="btn-f-f">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST


const time = ref('');

console.log(time.value)

async function handleSubmit() {
  if (

    time.value.trim() !== '' 
  ) {
    const user = JSON.parse(localStorage.getItem('token'));
    try {
      const formData = new FormData();

      formData.append('time', time.value);
      
      await axios.post(
        `${SERVER_HOST}/time/post`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user}`,
          },
        }
      );
      alert('Time posted')
      // console.log(response.data);
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
