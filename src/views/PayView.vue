<script setup>
import { useRouter, useRoute } from 'vue-router';
import MoneyIcon from '../icons/payIcon.vue'
import { ref } from 'vue'

const route = useRoute();
const router = useRouter()

const reveal = ref(route.params.currency)

const logIn = () => {
  router.push({ name: 'Login' })

}

const signIn = () => {
  router.push({ name: 'Signin' })

}

const goVip = () => {
  router.push({ name: 'Vip' })

}


</script>

<template>
  <div class="pay-monitor">
    <div class="pay-contain">
      <div class="pay-title">
        <span></span>
        <MoneyIcon class="icon-pay" />
        <span>Subscribe to VIP plan</span>
      </div>
      <div class="pay-info-spx">
        <h1>
          <span>NOTE:</span>
          This subscription is valid for 30 days and no extra charges or hidden charges
        </h1>
        <p>Your SportyPredict VIP account will be activated once your payment is received.</p>
        <p>Choose your country to get payment details:</p>
      </div>
      <div class="pay-info" v-if="reveal === 'others'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid:<span>( 35 USD ) </span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p>
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country:</h1>
        </div>
        <div class="method-pay">
          <h1>PAY USING SKRILL</h1>
          <ul>
            <li>Go to your account</li>
            <li>Use <span>contact@sportypredict.com</span></li>
            <li>Pay the required amount</li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>PAY USING CRYPTO (BITCOIN)</h1>
          <ul>
            <li>Go to your bitcoin wallet</li>
            <li>Pay using this bitcoin address: <span>bc1qvzny5ffjym462y35qw7qqr6ucgtkcqcu402dl5</span></li>
            <li>Pay the required amount</li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>PAY USING PAYPAL</h1>
          <ul>
            <li>Go to your account</li>
            <li>Use <span>contact@sportypredict.com</span></li>
            <li>Pay the required amount</li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <p>
          <span>Moneygram and Western Union are available for those who want to make payment.</span>
        </p>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span> <a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a> </span
              >.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'kenya'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid: <span>(1,500ksh)</span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p>
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country: kenya:</h1>
        </div>
        <div class="method-pay">
          <h1>SEND TO MPESA</h1>
          <ul>
            <li>Name <span>Thwell Gichovi</span></li>
            <li>Mpesa Number : <span>0703 147 237</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"> <a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span>.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'nigeria'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid: <span>(8,500 NGN)</span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p> 
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country: Nigeria:</h1>
        </div>
        <div class="method-pay">
          <h1>PAY WITH BANK</h1>
          <ul>
            <li>Bank Name <span>FirstBank</span></li>
            <li>Account Number : <span>3087875918</span></li>
            <li>Account Name : <span>Mboutidem akpan</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"><a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span
              >.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'ghana'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid: <span>(130 GHC)</span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p>
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country: Ghana:</h1>
        </div>
        <div class="method-pay">
          <h1>Pay </h1>
          <ul>
            <li>Name <span>David Agyevi</span></li>
            <li>Mobile Number : <span>0594577146</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"><a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span
              >.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'cameroon'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid: <span>(11500 CFA)</span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p>
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country: Cameroon:</h1>
        </div>
        <div class="method-pay">
          <h1>PAY WITH MTN MOBILE MONEY</h1>
          <ul>
            <li>Name <span>Promise Amadi</span></li>
            <li>Mobile Number : <span>(+237) 678 832 736</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"><a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span
              >.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'uganda'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid: <span>(70,000 UGX)</span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p>
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country: Uganda:</h1>
        </div>
        <div class="method-pay">
          <h1>MTN UGANDA TO MPESA</h1>
          <ul>
            <li>Dial <span>*165# or via Mpesa App </span></li>
            <li>Name <span>Thwell Gichovi</span></li>
            <li>Mpesa Number : <span>(+254) 703 147 237</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"><a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span
              >.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'tanzania'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid: <span>(45000 TZS)</span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p>
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country: Tanzania:</h1>
        </div>
        <div class="method-pay">
          <h1>SEND TO MPESA</h1>
          <ul>
            <li>Name <span>Thwell Gichovi</span></li>
            <li>Mpesa Number : <span>(+254) 703 147 237</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"><a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span
              >.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'southA'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid: <span>(620 ZAR)</span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p>
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country: southAfrica:</h1>
        </div>
        <div class="method-pay">
          <h1>PAY USING CRYPTO (BITCOIN)</h1>
          <ul>
            <li>Go to your bitcoin wallet</li>
            <li>Pay using this bitcoin address: <span>bc1qvzny5ffjym462y35qw7qqr6ucgtkcqcu402dl5</span></li>
            <li>Pay the required amount</li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>PAY USING SKRILL</h1>
          <ul>
            <li @click="logIn()">Go to your account</li>
            <li>Use <span>contact@sportypredict.com</span></li>
            <li>Pay the required amount</li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>PAY USING PAYPAL</h1>
          <ul>
            <li>Go to your account</li>
            <li>Use <span>contact@sportypredict.com</span></li>
            <li>Pay the required amount</li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"><a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span
              >.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'zambia'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid: <span>(550 ZMW)</span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p>
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country: Zambia:</h1>
        </div>
        <div class="method-pay">
          <h1>ONLY USE AIRTEL MONEY</h1>
          <ul>
            <li>Dial <span>*778# or use Airtel money mobile app</span></li>
            <li>Select international money transfer(choose kenya)</li>
            <li>Airtel Number : <span>(+254) 783 719 791</span></li>
            <li>Name : <span> John</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"><a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span
              >.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'malawi'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid: <span>(30,000 MWK )</span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p>
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country: Malawi:</h1>
        </div>
        <div class="method-pay">
          <h1>ONLY USE AIRTEL MONEY LINE</h1>
          <ul>
            <li>Dial <span>Use Airtel money mobile app</span></li>
            <li>Select international money transfer(choose kenya)</li>
            <li>Airtel Number : <span>(+254) 783 719 791</span></li>
            <li>Name : <span> John</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"><a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span
              >.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'rwanda'">
        <div class="info-pay-h">
          <h1>
            Duration of <span>30 days</span> <br />
            Amount paid: <span>(35,0000 RWF )</span> <br />
            <span>"2 - 4" odds</span> daily
          </h1>
        </div>
        <div class="step-pay">
          <h1>Login or Register</h1>
          <p>
           <span @click="logIn()"> Log in</span> or <span @click="signIn()">Create an account</span>
          </p>
        </div>
        <div class="method-head">
          <h1>Available Payment Methods for your country: Rwanda:</h1>
        </div>
        <div class="method-pay">
          <h1>MTN LINE TO MPESA KENYA</h1>
          <ul>
            <li>Dial <span> *830# </span></li>
            <li>Send money from your Mtn line to Kenya</li>
            <li>Number : <span>(+254) 703 147 237</span></li>
            <li>Name : <span> Thwell Gichovi</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>Q: How guaranteed are your games?</h1>
            <p>
              <span>Answer:</span> We have a team of top-notch, well-researched/informed experts that score up to 96% in their accuracy rate. You are guaranteed to make substantial profits.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: What happens for failed predictions?</h1>
            <p>
              <span>Answer:</span> Keep in mind that in case of any loss, we will add an extra one day FREE as a replacement on your subscription. We will keep adding an extra day until you WIN! This is exclusive for VIP subscribers ONLY.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: How do I get these daily games sent to me?</h1>
            <p>
              <span>Answer:</span> We post games on our platform:
              <span @click="goVip()"><a href="https://sportyPredict.com/vip">https://sportyPredict.com/vip</a></span
              >.
              You need to log in on the website using your email and password or through social accounts to view games.
            </p>
          </div>
          <div class="Question-con">
            <h1>Q: Why don't we post results?</h1>
            <p>
              <span>Answer:</span>We don't disclose results because fraudsters take screenshots and swindle unsuspecting victims.
            </p>
          </div>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<style>
@import '../style/Home.css';
@import '../style/Pay.css';
</style>
