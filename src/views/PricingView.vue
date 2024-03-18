<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()



const goToPricing = (plan) => {
  router.push({ name: 'Pay', params: {plan: plan}})
}
</script>

<template>
  <div class="pay-main-contain">
    <h1>Choose your pricing plan</h1>
    <div class="main-contain-card">
      <div class="pricing-card">
        <div class="pricing-card-h">
          <h1>Basic</h1>
          <h3>Starter</h3>
        </div>
        <div class="pricing">
          <span>$</span>
          <h1>2.21</h1>
          <h5>/daily</h5>
        </div>
        <button class="pricingBtn-card" @click="goToPricing('basic')">Choose plan</button>
      </div>
      <div class="pricing-card">
        <div class="pricing-card-h">
          <h1>Standard</h1>
          <h3>Better results</h3>
        </div>
        <div class="pricing">
          <span>$</span>
          <h1>4.50</h1>
          <h5>/weekly</h5>
        </div>
        <div class="popular-card">Popular</div>
        <button class="pricingBtn-card" @click="goToPricing('popular')">Choose plan</button>
      </div>
      <div class="pricing-card">
        <div class="pricing-card-h">
          <h1>Premium</h1>
          <h3>Amaizing results</h3>
        </div>
        <div class="pricing">
          <span>$</span>
          <h1>11.19</h1>
          <h5>/monthly</h5>
        </div>
        <button class="pricingBtn-card" @click="goToPricing('premium')">Choose plan</button>
      </div>
    </div>
  </div>
</template>

<style>
@import '../style/pricing.css';
</style>
