<script setup>
import countriesData from '../components/countries.json';
import MoneyIcon from '../icons/payIcon.vue';
import { ref, computed } from 'vue';

const Selectedcountry = ref('');
const sport = ref('');
const reveal = ref('');
const errMsg = ref('');
const searchTerm = ref('');

const showPayment = () => {
  if (Selectedcountry.value === '' && sport.value === '') {
    errMsg.value = 'Empty field is not supported';
  } else if (
    Selectedcountry.value !== '' &&
    (Selectedcountry.value === 'KE' || Selectedcountry.value === 'TZ')
  ) {
    reveal.value = 'mpesa';
  } else {
    reveal.value = 'others';
  }
};

const filteredCountries = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return countriesData.filter(
    (country) =>
      country.name.toLowerCase().includes(term) ||
      country.code.toUpperCase().includes(term)
  );
});
</script>

<template>
  <div class="pay-monitor">
    <div class="desknav-layout">
      <desktopNav class="desk-show" />
    </div>
    <div class="pay-contain">
      <div class="pay-header">
        <div class="sport-s-contain">
          <div class="game-tips">
            <label class="sport-label">Choose a sport</label>
            <span>Telegram tips</span>
          </div>
          <select class="sport-selector" v-model="sport">
            <option disabled value="">Select a sport</option>
            <option class="pay-op">Football</option>
            <option class="pay-op">Tennis</option>
            <option class="pay-op">Baseball</option>
          </select>
          <p>{{ errMsg }}</p>
        </div>
      </div>
      <div class="pay-title">
        <span></span>
        <MoneyIcon class="icon-pay" />
        <span>Subscribe to VIP plan</span>
      </div>
      <div class="pay-main">
      <div class="sport-s-contain">
        <label>Please select one</label>
        <input type="text" class="sport-selector"  v-model="searchTerm" placeholder="Search country" />
        <select class="sport-selector" v-model="Selectedcountry">
          <option disabled value="">Select a country</option>
          <option
            v-for="country in filteredCountries"
            :key="country.code"
            :value="country.code"
          >{{ country.name }}</option>
        </select>
        <button class="pay-btn" @click="showPayment">Proceed</button>
      </div>
      <p>{{ errMsg }}</p>
    </div>
      <div class="pay-info" v-if="reveal === 'others'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>One Month</span> <br />
            Amount paid: <span>( $50 ) </span> <br />
            <span>"2 - 5" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or register</h1>
          <p>
            Login in with Google or <span>Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available methods of payment for your country:</h1>
        </div>
        <div class="method-pay">
          <h1>PAY USING SKRILL</h1>
          <p>All payments should be made ONLY to <span>client@gmail.com</span></p>
          <p>Send a screenshot of payment or registered email address and date of payment to <span>client@sport.com</span> or through <span>WhatsApp to +254706272207</span></p>
          <p>Your VIP account will be activated once we receive your payment.</p>
        </div>
        <div class="method-pay">
          <h1>PAY USING CRYPTO</h1>
          <ul>
            <li>Go to your coin or wallet and click continue</li>
            <li>Use this account number:</li>
            <li>Pay the required amount</li>
            <li>Send a screenshot of payment or registered email address and date of payment to <span>client@sport.com</span> or through <span>WhatsApp to +254706272207</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>PAY USING PAYPAL</h1>
          <ul>
            <li>Go to your PayPal account</li>
            <li>Use <span>client@sport.com</span></li>
            <li>Pay the required amount</li>
            <li>Send a screenshot of payment or registered email address and date of payment to <span>client@sport.com</span> or through <span>WhatsApp to +254706272207</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p><span>Answer:</span> We have a team of top-notch well-researched/informed experts that score up to 95% in their accuracy rate. You are guaranteed to make substantial profits.</p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p><span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.</p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p><span>Answer:</span> We post games on our platform <span>https://predio/vip</span>. You need to log in on the website using your email and password or through social accounts to view games.</p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results anymore?</h1>
            <p><span>Answer:</span> We no longer disclose results because fraudsters take screenshots and swindle unsuspecting victims.</p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'mpesa'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>One Month</span> <br />
            Amount paid: <span>(2,500ksh)</span> <br />
            <span>"2 - 5" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or register</h1>
          <p>
            Login in with Google or <span>Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available methods of payment for your country:</h1>
        </div>
        <div class="method-pay">
          <h1>PAY USING MPESA</h1>
          <ul>
            <li>Go to your M-Pesa app</li>
            <li>Send money to <span>+254706272207</span></li>
            <li>Pay the required amount</li>
            <li>Send a screenshot of payment or registered email address and date of payment to <span>client@sport.com</span> or through <span>WhatsApp to +254706272207</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p><span>Answer:</span> We have a team of top-notch well-researched/informed experts that score up to 95% in their accuracy rate. You are guaranteed to make substantial profits.</p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p><span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.</p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p><span>Answer:</span> We post games on our platform <span>https://predio/vip</span>. You need to log in on the website using your email and password or through social accounts to view games.</p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results anymore?</h1>
            <p><span>Answer:</span> We no longer disclose results because fraudsters take screenshots and swindle unsuspecting victims.</p>
          </div>
        </div>
      </div>
      <div v-else="reveal === ''"></div>
    </div>
  </div>
  <div class="mobilenav-layout">
    <mobileNav />
  </div>
</template>

<style>
@import '../style/Home.css';
@import '../style/Pay.css';
</style>
