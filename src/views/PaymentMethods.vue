<template>
  <div class="payment-layout-container">
    <h1>Choose your preferred payment method</h1>
    <div class="payment-layout">
      <div v-if="showMpesa" class="pay-controller">
        <img :src="mpesa" alt="mpesa logo" class="payment-image" />
        <div class="btn-wp">
          <button type="submit" @click="payMpesa" class="btn-pay">Pay Now</button>
        </div>
      </div>
      <div v-if="showCoinbase" class="pay-controller">
        <img :src="coinbase" alt="coinbase logo" class="payment-image" />
        <button type="button" @click="coinbasePay" class="btn-pay">Pay Now</button>
      </div>
      <div v-if="showPaystack" class="pay-controller">
        <img :src="paystack" alt="paystack logo" class="payment-image" />
        <button type="button" @click="paystackPay" class="btn-pay">Pay Now</button>
      </div>
      <div v-if="showPaypal" class="pay-controller" id="paypal-button-container">
        <img :src="paypalImg" alt="paypal logo" class="payment-image" />
        <button type="button" @click="payPaypal" class="btn-pay">Pay Now</button>
      </div>
      <div class="pay-controller">
        <h1>Manual payment</h1>
        <p><span>Note:</span>Manual payment takes longer to process</p>
        <button type="button" @click="payManually" class="btn-pay">Pay Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import coinbase from '../assets/coinbase.png'
import mpesa from '../assets/mpesa.png'
import paypalImg from '../assets/paypal.png'
import paystack from '../assets/paystack.png'

const reveal = ref('')
const toast = useToast()
const route = useRoute()
const router = useRouter()
const paymentResult = ref(null)

const payManually = () => {
  router.push({ name: 'Pay', params: {
    country: route.params.currency,
    plan: route.params.plan
  } })
}

let showMpesa = false
let showCoinbase = false
let showPaystack = false
let showPaypal = false

watchEffect(() => {
  const selectedCountry = route.params.currency || 'others'
  reveal.value = selectedCountry

  showMpesa = ['kenya', 'tanzania', 'uganda'].includes(selectedCountry)
  showCoinbase = !['kenya', 'nigeria', 'cameroon', 'ghana', 'southA', 'tanzania', 'uganda', 'zambia', 'rwanda', 'malawi'].includes(selectedCountry) && selectedCountry !== ''
  showPaystack = !['kenya', 'nigeria', 'cameroon', 'ghana', 'southA', 'tanzania', 'uganda', 'zambia', 'rwanda', 'malawi'].includes(selectedCountry) && selectedCountry !== ''
  showPaypal = ['nigeria', 'cameroon', 'ghana', 'southA', 'zambia', 'rwanda', 'malawi'].includes(selectedCountry) && selectedCountry !== ''
})

const payMpesa = () => {
  toast.success('redirected successfully')
  window.open('https://paystack.com/pay/82o4airsxo', '_blank')
}

const coinbasePay = () => {
  toast.success('redirected successfully')
  window.open(
    'https://commerce.coinbase.com/checkout/e3707e6f-689f-4309-b5db-5bf9b5f6f5de',
    '_blank'
  )
}

const paystackPay = () => {
  toast.success('redirected successfully')
  window.open('https://paystack.com/pay/82o4airsxo', '_blank')
}

const payPaypal = async () => {
  paypal
    .Buttons({
      createOrder: (data, actions) => {
        // Create an order with your purchase details
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: '43.00'
              }
            }
          ]
        })
      },
      onApprove: (data, actions) => {
        // Capture the payment when the user approves
        return actions.order.capture().then((details) => {
          paymentResult.value = details
          toast.success('Payment Successful')
        })
      }
    })
    .render('#paypal-button-container')
}
</script>
<style>
@import '../style/paymentMethods.css';
</style>