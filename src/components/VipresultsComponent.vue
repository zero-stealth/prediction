<template>
   <div class="form-con">
      <form @submit.prevent="handleSubmit" class="form-container" enctype="multipart/form-data">
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
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification'
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

const dayDate = ref('');
const toast = useToast()
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
      toast.success('Vip result posted')
    } catch (err) {
      toast.error(err.response.data.error)
    }
  } else {
    toast.error('No empty fields allowed')
  }
}
</script>
<style scoped>
@import '../style/games.css';
</style>
