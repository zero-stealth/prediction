<script setup>
import {  computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

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

const weeklyPrices = {
  'kenya': 500,
  'nigeria': 2500,
  'cameroon': 2500,
  'ghana': 30,
  'southA': 75,
  'tanzania': 10000,
  'uganda': 18000,
  'zambia': 50,
  'rwanda': 4000,
  'malawi': 35000,
  'others': 4.5
};

const monthlyPrices = {
  'kenya': 1500,
  'nigeria': 7500,
  'cameroon': 7500,
  'ghana': 90,
  'southA': 225,
  'tanzania': 30000,
  'uganda': 54000,
  'zambia': 150,
  'rwanda': 12000,
  'malawi': 105000,
  'others': 11.19
};

const weeklyPrice = computed(() => {
  const country = route.params.country ? route.params.country : 'others';
  return weeklyPrices[country] || 0;
});

const monthlyPrice = computed(() => {
  const country = route.params.country ? route.params.country : 'others';
  return monthlyPrices[country] || 0;
});

const goToPricing = (plan) => {
  router.push({ name: 'Pay', params: { plan: plan, currency: route.params.country } });
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
        <button class="pricingBtn-card" @click="goToPricing('weekly')">Choose plan</button>
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
        <button class="pricingBtn-card" @click="goToPricing('monthly')">Choose plan</button>
      </div>
    </div>
  </div>
</template>

<style>
@import '../style/pricing.css';
</style>