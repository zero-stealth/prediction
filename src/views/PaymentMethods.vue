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

const reveal = ref('')
const isPaid = ref(false)
const isCancel = ref(false)
const paymentStatus = ref('')
const toast = useToast()
const route = useRoute()
const router = useRouter()
const paymentResult = ref(null)
const customerID = ref(localStorage.getItem('id') || null)
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

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

const handleCheckout = () => {
  const checkoutUrl =
    route.params.plan === 'weekly'
      ? 'https://buy.stripe.com/6oE4jh3oEh1R4jCeV2'
      : 'https://buy.stripe.com/7sI3fd3oE26X4jCaEN'
  window.open(checkoutUrl, '_blank')
  addVIPAccess()
}

const payMpesa = () => {
  const email = localStorage.getItem('email') || null

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
          addVIPAccess()
        } else {
          isCancel.value = true
          paymentStatus.value = 'cancelled'
          toast.error('Payment failed')
        }
      },
      onClose: () => {
        isCancel.value = true
        paymentStatus.value = 'cancelled'
        toast.error('Payment failed')
      }
    })
  } else {
    toast.error('Login or create an account to pay')
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
        },
        cancel_url: '',
        success_url: 'https://sportypredict.com/vip'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': COINBASE_KEY
        }
      }
    )

    const hostedUrl = response.data.data.hosted_url
    const chargeId = response.data.data.id

    window.location.href = hostedUrl
    const pollPaymentStatus = async () => {
      try {
        const statusResponse = await axios.get(
          `https://api.commerce.coinbase.com/charges/${chargeId}`,
          {
            headers: {
              'X-CC-Api-Key': COINBASE_KEY
            }
          }
        )

        const paymentStatus =
          statusResponse.data.data.timeline[statusResponse.data.data.timeline.length - 1].status

        if (paymentStatus === 'Completed') {
          addVIPAccess()
          window.location.href = 'https://sportypredict.com/vip'
        } else if (paymentStatus === 'Canceled') {
          toast.error('Payment was canceled')
        } else {
          setTimeout(pollPaymentStatus, 5000)
        }
      } catch (error) {
        console.error(error)
        toast.error('An error occurred while checking payment status')
      }
    }

    pollPaymentStatus()
  } catch (error) {
    console.error(error)
    toast.error('An error occurred')
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
              addVIPAccess()
            })
          },
          onError: (err) => {
            isCancel.value = true
            paymentStatus.value = 'error'
            toast.error('Payment failed')
            console.error('PayPal error:', err)
          },
          onCancel: () => {
            isCancel.value = true
            paymentStatus.value = 'cancelled'
            toast.error('Payment failed')
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

const addVIPAccess = async () => {
  if (isPaid.value) {
    if (customerID.value !== null) {
      try {
        const currentDate = new Date()
        const formattedDate = `${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}-${currentDate.getFullYear()}`

        const account = JSON.parse(localStorage.getItem('account'))

        const response = await axios.put(`${SERVER_HOST}/auth/update/${customerID.value}`, {
          paid: true,
          plan: route.params.plan,
          activationDate: formattedDate,
          days: route.params.plan === 'weekly' ? 7 : 30
        })
        account.status = true
        localStorage.setItem('account', JSON.stringify(account))
        localStorage.setItem('paid', 'true')

        toast.success('Payment successful!')
        window.location.href = 'https://sportypredict.com/vip'
      } catch (err) {
        toast.error('An error occurred while updating your account.')
      }
    } else {
      toast.error('Login or create an account to pay')
    }
  } else {
    toast.error('Payment failed')
  }
}
</script>

<style>
@import '../style/paymentMethods.css';
</style>
