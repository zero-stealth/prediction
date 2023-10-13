<template>
  <div class="bn-snap">
    <div class="form-container">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="form-wrapper">
          <h1>Vip results</h1>
          <div class="form-group">
            <label for="dayDate">Day and Date:</label>
            <input v-model="dayDate" type="text" class="form-g-input" placeholder="Fri (13/10)" id="dayDate" />
          </div>
          <div class="form-group">
            <label for="Result">Result:</label>
            <select v-model="Result" class="form-g-input" id="Result">
            <option disabled value="">Choose result category</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
            <option value="Cancel">Cancel</option>
            <option value="Empty">Empty</option>
          </select>
          </div>
          <button type="submit" class="btn-f-f">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

const dayDate = ref('');
const Result = ref('');

async function handleSubmit() {
  if (dayDate.value !== '' && Result.value !== '') {
    const user = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await axios.post(
        `${SERVER_HOST}/score/addScore`,
        {
          gameScore: Result.value, 
          gameName: dayDate.value, 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user}`,
          },
        }
      );
      alert('Vip result posted');
    } catch (err) {
      console.error(err);
      alert('An error occurred while posting Vip result');
    }
  } else {
    alert('No empty fields allowed');
  }
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
