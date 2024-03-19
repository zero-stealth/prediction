<script setup>
import countriesData from '../components/countries.json';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const Selectedcountry = ref('');
const reveal = ref('');
const errMsg = ref('');
const searchTerm = ref('');

const filteredCountries = computed(() => {
  return countriesData.filter(country => {
    return country.name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

const showPayment = () => {
  if (Selectedcountry.value === '') {
    errMsg.value = 'Empty field is not supported';
  } else {
    switch (Selectedcountry.value) {
      case 'KE':
        reveal.value = 'kenya';
        break;
      case 'NG':
        reveal.value = 'nigeria';
        break;
      case 'CM':
        reveal.value = 'cameroon';
        break;
      case 'GH':
        reveal.value = 'ghana';
        break;
      case 'ZA':
        reveal.value = 'southA';
        break;
      case 'TZ':
        reveal.value = 'tanzania';
        break;
      case 'UG':
        reveal.value = 'uganda';
        break;
      case 'ZM':
        reveal.value = 'zambia';
        break;
      case 'RW':
        reveal.value = 'rwanda';
        break;
      case 'MW':
        reveal.value = 'malawi';
        break;
      default:
        reveal.value = 'others';
    }
  }
};

const showPricing = (country) => {
  router.push({ name: 'Pricing', params: { country: country } });
};
</script>

<template>
  <div class="pay-payment">
    <div class="pay-contain">
      <div class="pay-main">
        <div class="sport-s-contain">
          <label>Choose your country to get payment method</label>
          <input type="text" class="sport-selector" v-model="searchTerm" placeholder="Search country" />
          <select class="sport-selector" v-model="Selectedcountry">
            <option disabled value="">Select a country</option>
            <option v-for="country in filteredCountries" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>
          <button class="pay-btn" @click="showPayment(); showPricing(reveal)">Proceed</button>
          <p>{{ errMsg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '../style/Home.css';
@import '../style/Pay.css';
</style>