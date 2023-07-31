<template>
  <div class="bonus">
    <img src="../assets/Bet.png" alt="Bet-offer" class="img-offer" />
    <div class="bonus-title">
      <h1>Sign up offers</h1>
      <span>New customers only| commercial content 18 + age limit | T&Cs apply</span>
    </div>
    <div class="bonus-hlf">Offers and welcome bonuses available</div>
    <div class="bonus-form">
      <div class="Promo-h">
        <span>Promo code</span>
        <h2 class="input-code">{{ bonusCode }}</h2>
      </div>
      <button type="submit" class="bonus-btn" @click="copyCode">
        <copyIcon class="icon-bonus" />
      </button>
    </div>
    <span
      >The bonus code <b>{{ bonusCode }}</b> is used during registration but the offer amount
      doesn't change</span
    >
    <button class="btn-offer-spy" @click="goBetW()">See the offers</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import copyIcon from '../icons/COPYIcon.vue'

const bonusCode = ref('sdsxfs')

const goBetW = () => {
  window.open('https://bwredir.com/1bkh?p=%2Fregistration%2F', '_blank')
}

const copyCode = () => {
  const tempElement = document.createElement('textarea')
  tempElement.value = bonusCode.value

  document.body.appendChild(tempElement)

  tempElement.select()
  document.execCommand('copy')

  document.body.removeChild(tempElement)
  alert('copied to clipboard')
}
</script>

<style>
@import '../style/bonus.css';
</style>
