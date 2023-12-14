<template>
<div class="form-con">
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
import { ref } from 'vue'
const emit = defineEmits(['formSubmitTime'])
import { useToast } from 'vue-toastification'


const time = ref('');
const toast = useToast()



function handleSubmit() {
  try {
    const formData = {
      time: time.value,
    }

    emit('formSubmitTime', formData)
  } catch (err) {
    toast.error(err.response.data.error)

  }
}
</script>

<style>
@import '../style/games.css';
</style>
