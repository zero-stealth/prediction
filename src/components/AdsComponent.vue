<template>
  <div>
    <div class="form-container-h">
    </div>
    <div class="form-container snap-time ">
      <form @submit.prevent="handleSubmitT" enctype="multipart/form-data">
      <div class="form-wrapper">
        <div class="form-group">
          <label for="time">Match Time:</label>
          <input v-model="time" type="string"  class="form-g-input" placeholder="12:00" id="time" />
        </div>
        <button type="submit" class="btn-f-f">Submit</button>
      </div>
    </form>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div class="form-wrapper">
      <h1>Ads</h1>
        <div class="form-group">
          <label for="adsImage">Image:</label>
          <input @change="handleAdsimage" type="file" class="form-g-input" id="adsImage" accept="image/*" />
        </div>
        <div class="form-group">
          <label for="link">Link:</label>
          <input v-model="link" type="text" class="form-g-input" placeholder="https://" id="link" />
        </div>
        <div class="form-group">
          <label for="link">Description:</label>
          <input v-model="description" type="text" class="form-g-input" placeholder="description" id="description" />
        </div>
        <div class="form-group">
          <label for="category">Ads category:</label>
          <select v-model="category" class="form-g-input" id="category">
            <option value="" disabled>Choose category</option>
            <option value="Top">Top</option>
            <option value="Popup">Popup</option>p
            <option value="Middle">Middle</option>
            <option value="Banner">Banner</option>
            <option value="Sticky">Sticky</option>
            <option value="Card">Card</option>
            <option value="Bottom">Bottom</option>
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
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const description = ref('');
const adsImage = ref(null);
const category = ref('');
const link = ref('');
const time = ref('');

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
    description.value !== null ,
    adsImage.value !== null,
    category.value !== null,
    link.value !== null
    

  ) {
    const user = JSON.parse(localStorage.getItem('token'));
    try {
      const formData = new FormData();
      formData.append('link', link.value);
      formData.append('image', adsImage.value);
      formData.append('title', category.value);
      formData.append('description', description.value);
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

async function handleSubmitT() {
  const timeValue = time.value.trim();

  if (timeValue !== '') {
    const user = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await axios.post(
        `${SERVER_HOST}/time/post`,
        { time: timeValue },
        {
          headers: {
            'Content-Type': 'application/json', // Change to JSON content type
            Authorization: `Bearer ${user}`,
          },
        }
      );
      alert('Time posted');
      // You can use response.data here if needed
    } catch (err) {
      console.error(err);
      alert('An error occurred while posting time');
    }
  } else {
    alert('No empty fields allowed');
  }
}
</script>

<style>
@import '../style/games.css';
</style>
