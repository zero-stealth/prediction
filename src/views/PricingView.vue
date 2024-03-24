<script setup>
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router';
import { computed, ref, onMounted } from 'vue';

const toast = useToast()
const route = useRoute();
const router = useRouter();
const paymentData = ref([])
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const countryCurrencies = {
  'kenya': 'KES',
  'nigeria': 'NGN',
  'cameroon': 'XAF',
  'ghana': 'GHS',
  'southA': 'ZAR',
  'tanzania': 'TZS',
  'uganda': 'UGX',
  'zambia': 'ZMW',
  'rwanda': 'RWF',
  'malawi': 'MWK',
  'others': 'USD'
};

const currencyCode = computed(() => {
  const country = route.params.country ? route.params.country.toLowerCase() : 'others';
  return countryCurrencies[country] || 'USD';
});

const getPayment = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/currencyPrices`)
    paymentData.value = response.data || [];
  } catch (err) {
    toast.error(err.response?.data?.error || 'Failed to fetch payment data');
  }
}

onMounted(() => {
  getPayment()
})

const weeklyPrice = computed(() => {
  const country = route.params.country ? route.params.country.toLowerCase() : 'others';
  const countryData = paymentData.value.find(data => data.country.toLowerCase() === country);
  return countryData ? countryData.weeklyPrice : 0;
});

const monthlyPrice = computed(() => {
  const country = route.params.country ? route.params.country.toLowerCase() : 'others';
  const countryData = paymentData.value.find(data => data.country.toLowerCase() === country);
  return countryData ? countryData.monthlyPrice : 0;
});

const goToPricing = (plan, price) => {
  router.push({ name: 'Method', params: { plan: plan,  price: price, currency: route.params.country } });
};
</script>

<template>
  <div class="pay-main-contain">
    <h1>Choose your vip plan</h1>
    <div class="main-contain-card">
      <div class="pricing-card">
        <div class="pricing-card-h">
          <h1>Weekly Plan</h1>
        </div>
        <div class="pricing">
          <span>{{ currencyCode }}</span>
          <h1>{{ weeklyPrice }}</h1>
          <h5>/weekly</h5>
        </div>
        <button class="pricingBtn-card" @click="goToPricing('weekly', weeklyPrice )">Choose plan</button>
      </div>
      <div class="pricing-card">
        <div class="pricing-card-h">
          <h1>Monthly Plan</h1>
        </div>
        <div class="pricing">
          <span>{{ currencyCode }}</span>
          <h1>{{ monthlyPrice }}</h1>
          <h5>/monthly</h5>
        </div>
        <div class="popular-card">Popular</div>
        <button class="pricingBtn-card" @click="goToPricing('monthly', monthlyPrice)">Choose plan</button>
      </div>
    </div>
  </div>
</template>
<style>
@import '../style/pricing.css';
</style>
