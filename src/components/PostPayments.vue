<template>
  <div class="form-con">
     <form @submit.prevent="handleSubmit" class="form-container" enctype="multipart/form-data">
       <div class="form-wrapper">
         <h1>Post payment</h1>
         <div class="form-group">
           <label for="weeklyPrice">Weekly price:</label>
           <input v-model="weeklyPrice" type="text" class="form-g-input" placeholder="500" id="weeklyPrice" />
         </div>
         <div class="form-group">
           <label for="monthlyPrice">Monthly price:</label>
           <input v-model="monthlyPrice" type="text" class="form-g-input" placeholder="1500" id="monthlyPrice" />
         </div>
         <div class="form-group">
           <label for="country">country:</label>
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
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification'
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

const weeklyPrice = ref('');
const monthlyPrice = ref('');
const toast = useToast()
const country = ref('');

async function handleSubmit() {
 if (weeklyPrice.value !== '' && monthlyPrice.value !== '' && country.value !== '') {
   const user = JSON.parse(localStorage.getItem('token'));
   try {
     const response = await axios.post(
       `${SERVER_HOST}/currencyPrices/create`,
       {
        country: country.value, 
        weeklyPrice : weeklyPrice.value, 
        monthlyPrice  : monthlyPrice.value, 
       },
       {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${user}`,
         },
       }
     );
     toast.success('payment posted')
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