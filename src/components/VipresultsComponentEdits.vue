<template>
  <div class="bn-snap">
    <div class="form-container">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="form-wrapper">
          <h1>Vip results edit</h1>
          <div class="form-group">
            <label for="dayDate">Day and Date:</label>
            <input v-model="dayDate" type="text" class="form-g-input" placeholder="Fri(13/10)" id="dayDate" />
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
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['formVipResultSubmit'])

const dayDate = ref('');
const Result = ref('');

function handleSubmit() {
  try {
    const formData = {
      gameScore: Result.value,
      gameName: dayDate.value,
    }

    emit('formVipResultSubmit', formData)
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
@import '../style/games.css';
</style>
