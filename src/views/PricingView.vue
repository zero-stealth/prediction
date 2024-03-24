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
  <div class="pay-main-wrapper">
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
    <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts
              that score up to 96% in their accuracy rate. You are guaranteed to make substantial
              profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one
              day FREE as a replacement on your subscription. We will keep adding an extra day until
              you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"
                ><a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span
              >. You need to log in on the website using your email and password or through social
              accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and
              swindle unsuspecting victims.
            </p>
          </div>
        </div>
  </div>
 
</template>
<style>
@import '../style/pricing.css';
@import '../style/Pay.css';

</style>
