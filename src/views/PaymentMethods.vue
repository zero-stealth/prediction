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
       <div v-if="showStripe" class="pay-controller" id="paypal-button-container">
        <img :src="stripeImg" alt="paypal logo" class="payment-image" />
        <button type="button" @click="payPaypal" class="btn-pay">Pay with card</button>
      </div>
      <div v-if="showPaypal" class="pay-controller" id="paypal-button-container">
        <img :src="paypalImg" alt="paypal logo" class="payment-image" />
        <button type="button" @click="payPaypal" class="btn-pay">Pay with paypal</button>
      </div>
      <div v-if="showCoinbase" class="pay-controller">
        <img :src="coinbase" alt="coinbase logo" class="payment-image" />
        <button type="button" @click="coinbasePay" class="btn-pay">Pay with crypto</button>
      </div>
   
      <div v-if="showManual" class="pay-controller">
        <h1>Manual payment</h1>
        <p><span>Note:</span>Manual payment takes longer to process</p>
        <button type="button" @click="payManually" class="btn-pay">Pay Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import coinbase from '../assets/coinbase.png'
import mpesa from '../assets/mpesa.png'
import paypalImg from '../assets/paypal.png'
import stripeImg from '../assets/stripe.png'
const COINBASE_KEY = import.meta.env.VITE_COINBASE_KEY


const reveal = ref('')
const isPaid = ref('')
const isCancel = ref('')
const toast = useToast()
const route = useRoute()
const router = useRouter()
const paymentResult = ref(null)

const payManually = () => {
  router.push({ name: 'Pay', params: {
    country: route.params.currency,
    plan: route.params.plan,
    price:route.params.price
  } })
}

let showMpesa = false
let showCoinbase = false
let showPaypal = false
let showStripe = false
let showManual = false

watchEffect(() => {
  const selectedCountry = route.params.currency || 'others'
  reveal.value = selectedCountry

  showMpesa = ['kenya'].includes(selectedCountry)
  showManual = !['others'].includes(selectedCountry) && selectedCountry !== ''
  showCoinbase = ['kenya', 'others', 'nigeria', 'cameroon', 'ghana', 'southA', 'tanzania', 'uganda', 'zambia', 'rwanda', 'malawi'].includes(selectedCountry) && selectedCountry !== ''
  showStripe = ['kenya', 'others','nigeria', 'cameroon', 'ghana', 'southA', 'tanzania', 'uganda', 'zambia', 'rwanda', 'malawi'].includes(selectedCountry) && selectedCountry !== ''
  showPaypal = ['others', 'kenya', 'nigeria', 'cameroon', 'ghana', 'southA', 'tanzania', 'uganda', 'zambia', 'rwanda', 'malawi'].includes(selectedCountry) && selectedCountry !== ''
})

const payMpesa = () => {
  toast.success('redirected successfully')
  window.open('https://paystack.com/pay/82o4airsxo', '_blank')
}


const coinbasePay = async () => {
  try {
    const response = await axios.post(
      'https://api.commerce.coinbase.com/charges/',
      {
        name: 'Vip subscription',
        description: 'Subscribe for vip',
        pricing_type: 'fixed_price',
        local_price: {
          amount: route.params.price,
          currency: 'USD',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': COINBASE_KEY,
        },
      }
    );
    console.log(response.data);
    console.log(response.data.data.hosted_url);

    window.open(response.data.data.hosted_url, '_blank');

    const redirects = response.data.redirects;
    const cancel_url = redirects ? redirects.cancel_url : '';
    const success_url = redirects ? redirects.success_url : '';
    const will_redirect_after_success = redirects ? redirects.will_redirect_after_success : false;

     isPaid.value = success_url ? true : false;
     isCancel.value = cancel_url ? true : false;


    toast.success('redirected successfully');
  } catch (error) {
    console.error(error);
    toast.error('An error occurred');
  }
};



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