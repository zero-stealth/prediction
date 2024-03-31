<template>
  <div class="form-con">
    <form @submit.prevent="handleSubmit" class="form-container" enctype="multipart/form-data">
      <div class="form-wrapper">
        <h1>Post payment</h1>
        <div class="form-group">
          <label for="weeklyPrice">Weekly price:</label>
          <input
            v-model="weeklyPrice"
            type="text"
            class="form-g-input"
            placeholder="500"
            id="weeklyPrice"
          />
        </div>
        <div class="form-group">
          <label for="monthlyPrice">Monthly price:</label>
          <input
            v-model="monthlyPrice"
            type="text"
            class="form-g-input"
            placeholder="1500"
            id="monthlyPrice"
          />
        </div>
        <div class="form-group">
          <label for="country">Country:</label>
          <select v-model="country" class="form-g-input" id="country">
            <option disabled value="">Choose country</option>
            <option value="kenya">Kenya</option>
            <option value="nigeria">Nigeria</option>
            <option value="cameroon">Cameroon</option>
            <option value="ghana">Ghana</option>
            <option value="southA">South Africa</option>
            <option value="tanzania">Tanzania</option>
            <option value="uganda">Uganda</option>
            <option value="zambia">Zambia</option>
            <option value="rwanda">Rwanda</option>
            <option value="malawi">Malawi</option>
            <option value="others">Others</option>
          </select>
        </div>
        <button type="submit" class="btn-f-f">Post</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['formPaymentSubmit'])
import { useToast } from 'vue-toastification'

const weeklyPrice = ref('')
const monthlyPrice = ref('')
const country = ref('')
const toast = useToast()

function handleSubmit() {
  try {
    const formData = {
      weeklyPrice: weeklyPrice.value,
      monthlyPrice: monthlyPrice.value,
      country: country.value
    }

    emit('formPaymentSubmit', formData)
  } catch (err) {
    toast.error(err.response.data.error)
  }
}
</script>

<style>
@import '../style/games.css';
</style>