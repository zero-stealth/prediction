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
      <div v-if="showStripe" class="pay-controller">
        <img :src="stripeImg" alt="mpesa logo" class="payment-image" />

        <button @click="handleCheckout" class="btn-pay">Pay with card</button>
      </div>
      <form v-if="showStripe" @submit.prevent="createCheckoutSession" lass="pay-controller">
        <button id="checkout-and-portal-button" type="submit" class="btn-pay">Checkout</button>
      </form>
      <div v-if="showPaypal" class="pay-controller" id="paypal-button-container">
        <img :src="paypalImg" alt="paypal logo" class="payment-paypal-image" />
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
      <div v-if="showSkrill" class="pay-controller">
        <img :src="skrill" alt="skrill logo" class="payment-image" />
        <button type="button" @click="payManually" class="btn-pay">Pay Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import coinbase from '../assets/coinbase.png'
import skrill from '../assets/skrill.png'
import mpesa from '../assets/mpesa.png'
import PaystackPop from '@paystack/inline-js'
import paypalImg from '../assets/paypal.png'
import stripeImg from '../assets/stripe.png'
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const COINBASE_KEY = import.meta.env.VITE_COINBASE_KEY
const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_KEY
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

const reveal = ref('')
const isPaid = ref(false)
const isCancel = ref(false)
const paymentStatus = ref('')
const toast = useToast()
const route = useRoute()
const router = useRouter()
const paymentResult = ref(null)

const payManually = () => {
  router.push({
    name: 'Pay',
    params: {
      country: route.params.currency,
      plan: route.params.plan,
      price: route.params.price
    }
  })
}

let showMpesa = false
let showCoinbase = false
let showPaypal = false
let showStripe = false
let showManual = false
let showSkrill = false
const priceLookupKey = '{{PRICE_LOOKUP_KEY}}';

watchEffect(() => {
  const selectedCountry = route.params.currency || 'others'
  reveal.value = selectedCountry

  

  showMpesa = ['kenya'].includes(selectedCountry) && selectedCountry !== ''
  showManual = !['others'].includes(selectedCountry) && selectedCountry !== ''
  showSkrill = ['others'].includes(selectedCountry) && selectedCountry !== ''
  showCoinbase =
    [
      'kenya',
      'others',
      'nigeria',
      'cameroon',
      'ghana',
      'southA',
      'tanzania',
      'uganda',
      'zambia',
      'rwanda',
      'malawi'
    ].includes(selectedCountry) && selectedCountry !== ''
  showStripe =
    [
      'kenya',
      'others',
      'nigeria',
      'cameroon',
      'ghana',
      'southA',
      'tanzania',
      'uganda',
      'zambia',
      'rwanda',
      'malawi'
    ].includes(selectedCountry) && selectedCountry !== ''
  showPaypal =
    [
      'others',
      'kenya',
      'nigeria',
      'cameroon',
      'ghana',
      'southA',
      'tanzania',
      'uganda',
      'zambia',
      'rwanda',
      'malawi'
    ].includes(selectedCountry) && selectedCountry !== ''
})

const createCheckoutSession = async () => {
  try {
    const response = await axios.post('/stripe/create-checkout-session', {
      lookup_key: priceLookupKey
    });

    // Redirect the customer to the Checkout Session
    window.location.href = response.data.sessionUrl;
  } catch (error) {
    console.error('Error creating Checkout Session:', error);
    // Handle error
  }
};

const payMpesa = () => {
  const email = localStorage.getItem('email') || null
  console.log(email)
  if (email !== null) {
    const paystack = new PaystackPop()
    paystack.newTransaction({
      key: `${PAYSTACK_KEY}`,
      email: email,
      amount: route.params.price * 100,
      currency: 'KES',
      ref: `ref_${Math.floor(Math.random() * 1000000000 + 1)}`,
      callback: (response) => {
        if (response.status === 'success') {
          isPaid.value = true
          paymentStatus.value = 'success'
        } else {
          isCancel.value = true
          paymentStatus.value = 'cancelled'
        }
      },
      onClose: () => {
        isCancel.value = true
        paymentStatus.value = 'cancelled'
      }
    })
  } else {
    toast.error('login or create an account to pay')
  }
}

const coinbasePay = async () => {
  let amount = route.params.price
  if (
    [
      'kenya',
      'nigeria',
      'cameroon',
      'ghana',
      'southA',
      'tanzania',
      'uganda',
      'zambia',
      'rwanda',
      'malawi'
    ].includes(route.params.currency)
  ) {
    amount = route.params.plan === 'weekly' ? 25 : 45
  }

  try {
    const response = await axios.post(
      'https://api.commerce.coinbase.com/charges/',
      {
        name: 'Vip subscription',
        description: 'Subscribe for vip',
        pricing_type: 'fixed_price',
        local_price: {
          amount: amount,
          currency: 'USD'
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': COINBASE_KEY
        }
      }
    )

    const hostedUrl = response.data.data.hosted_url
    const newWindow = window.open(hostedUrl, '_blank')

    if (newWindow) {
      newWindow.focus()
    } else {
      toast.error('Please enable pop-ups for this website to complete the payment process.')
    }

    const redirects = response.data.redirects
    const cancel_url = redirects ? redirects.cancel_url : ''
    const success_url = redirects ? redirects.success_url : ''
    const will_redirect_after_success = redirects ? redirects.will_redirect_after_success : false

    isPaid.value = success_url ? true : false
    isCancel.value = cancel_url ? true : false
  } catch (error) {
    console.error(error)
    toast.error('An error occurred')
  }

  window.addEventListener('beforeunload', handleCoinbaseClose)
}

const handleCoinbaseClose = () => {
  if (!isPaid.value && !isCancel.value) {
    isCancel.value = true
    paymentStatus.value = 'cancelled'
  }
}

onMounted(async () => {
  let amount = route.params.price
  if (
    [
      'kenya',
      'nigeria',
      'cameroon',
      'ghana',
      'southA',
      'tanzania',
      'uganda',
      'zambia',
      'rwanda',
      'malawi'
    ].includes(route.params.currency)
  ) {
    amount = route.params.plan === 'weekly' ? 25 : 45
  }

  try {
    const paypalScript = await loadScript(
      `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=USD`
    )

    if (paypalScript && window.paypal) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount
                  }
                }
              ]
            })
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              paymentResult.value = details
              isPaid.value = true
              paymentStatus.value = 'success'
            })
          },
          onError: (err) => {
            isCancel.value = true
            paymentStatus.value = 'error'
            console.error('PayPal error:', err)
          },
          onCancel: () => {
            isCancel.value = true
            paymentStatus.value = 'cancelled'
          }
        })
        .render('#paypal-button-container')
    } else {
      console.error('PayPal SDK is not available')
      toast.error('An error occurred while loading PayPal SDK')
    }
  } catch (error) {
    console.error('Error loading PayPal SDK:', error)
    toast.error('An error occurred while loading PayPal SDK')
  }
})

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
</script>
<style>
@import '../style/paymentMethods.css';
</style>
