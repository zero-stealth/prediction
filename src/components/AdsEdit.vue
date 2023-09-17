<template>
  <div>
    <div class="form-container-h">
      <h1>Ads update</h1>
    </div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <div class="form-group">
          <label for="adsImage">Ads Image:</label>
          <input
            @change="handleAdsImage"
            type="file"
            class="form-g-input"
            id="adsImage"
            accept="image/*"
          />
        </div>
        <button type="submit" class="btn-f-f">Submit</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['formSubmitAds'])

const adsImage = ref(null);


function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

function handleAdsImage(event) {
  handleFileUpload(event, adsImage)
}

function handleSubmit() {
  try {
    const formData = {
      adsImage: adsImage.value,
    }

    emit('formSubmitAds', formData);
  } catch (err) {
    console.log(err)
  }
}
</script>

<style>
@import '../style/games.css';
</style>
