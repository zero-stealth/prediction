<template>
  <div>
    <div class="form-container-h">
      <h1>Ads</h1>
    </div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <div class="form-group">
          <label for="adsImage">Ads image:</label>
          <input @change="handleAdsimage" type="file" class="form-g-input" id="teamAIcon" accept="image/*" />
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

const adsImage = ref(null);


function handleFileUpload(event, targetRef) {
  const file = event.target.files[0];
  if (file) {
    targetRef.value = file;
  }
}

function handleAdsimage(event) {
  handleFileUpload(event, adsImage);
}


async function handleSubmit() {
  if (
    adsImage.value !== null 
  ) {
    const user = JSON.parse(localStorage.getItem('token'));
    try {
      const formData = new FormData();
      formData.append('image', adsImage.value);
      await axios.post(
        `${SERVER_HOST}/ads/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user}`,
          },
        }
      );
      alert('Ads posted')
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
