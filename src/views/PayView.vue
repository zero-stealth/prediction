<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

const reveal = ref(route.params.country)
const plan = ref(route.params.plan)
const price = ref(route.params.price)

const logIn = () => {
  router.push({ name: 'Login' })
}

const signIn = () => {
  router.push({ name: 'Signin' })
}


</script>

<template>
  <div class="pay-monitor">
    <div class="pay-contain">
      <div class="pay-info" v-if="reveal === 'kenya'">
        <div class="method-head">
          <h1>SEND TO MPESA</h1>
        </div>
        <div class="method-pay">
          <ul>
            <li>Name <span>Thwell Gichovi</span></li>
            <li>Mpesa Number : <span>0703 147 237</span></li>
            <li>
              Amount to pay: <span>{{ price }} ksh</span>
            </li>

            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'nigeria'">

        <div class="method-head">
          <h1>PAY WITH BANK</h1>
        </div>
        <div class="method-pay">
          <ul>
            <li>Bank Name <span>FirstBank</span></li>
            <li>Account Number : <span>3087875918</span></li>
            <li>
              Amount to pay : <span>{{ price }} NGN</span>
            </li>
            <li>Account Name : <span>Mboutidem akpan</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'ghana'">
        <div class="method-head">
          <h1>Pay</h1>
        </div>
        <div class="method-pay">
          <ul>
            <li>Name <span>David Agyevi</span></li>
            <li>Mobile Number : <span>0594577146</span></li>
            <li>
              Amount to pay : <span>{{ price }} GHC</span>
            </li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'cameroon'">
        <div class="method-head">
          <h1>PAY WITH MTN MOBILE MONEY</h1>
        </div>
        <div class="method-pay">
          <ul>
            <li>Name <span>Promise Amadi</span></li>
            <li>Mobile Number : <span>(+237) 678 832 736</span></li>
            <li>
              Amount to pay : <span>{{ price }} XAF</span>
            </li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'uganda'">
        <div class="method-head">
          <h1>MTN UGANDA TO MPESA</h1>
        </div>
        <div class="method-pay">
          <ul>
            <li>Dial <span>*165# or via Mpesa App </span></li>
            <li>Name <span>Thwell Gichovi</span></li>
            <li>Mpesa Number : <span>(+254) 703 147 237</span></li>
            <li>
              Amount to pay : <span>{{ price }} UGX</span>
            </li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'tanzania'">
        <div class="method-head">
          <h1>SEND TO MPESA</h1>
        </div>
        <div class="method-pay">
          <ul>
            <li>Name <span>Thwell Gichovi</span></li>
            <li>Mpesa Number : <span>(+254) 703 147 237</span></li>
            <li>
              Amount to pay : <span>{{ price }} TZS</span>
            </li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'southA'">
        <div class="method-head">
          <h1>PAY USING CRYPTO</h1>
        </div>
        <div class="method-pay">
          <h1>PAY USING BITCOIN</h1>

          <ul>
            <li>Go to your bitcoin wallet</li>
            <li>
              Pay using this bitcoin address:
              <span>bc1qvzny5ffjym462y35qw7qqr6ucgtkcqcu402dl5</span>
            </li>
            <li>
              Amount to pay : <span>{{ price }} ZAR</span>
            </li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>PAY USING SKRILL</h1>
          <ul>
            <li @click="logIn()">Go to your account</li>
            <li>Use <span>contact@sportypredict.com</span></li>
            <li>
              Amount to pay : <span>{{ price }} ZAR</span>
            </li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>PAY USING PAYPAL</h1>
          <ul>
            <li>Go to your account</li>
            <li>Use <span>contact@sportypredict.com</span></li>
            <li>
              Amount to pay : <span>{{ price }} ZAR</span>
            </li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'zambia'">
      
        <div class="method-head">
          <h1>ONLY USE AIRTEL MONEY</h1>
        </div>
        <div class="method-pay">
          <ul>
            <li>Dial <span>*778# or use Airtel money mobile app</span></li>
            <li>Select international money transfer(choose kenya)</li>
            <li>Airtel Number : <span>(+254) 783 719 791</span></li>
            <li>
              Amount to pay : <span>{{ price }} ZMW</span>
            </li>
            <li>Name : <span> John</span></li>
            
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'malawi'">
       
        <div class="method-head">
          <h1>ONLY USE AIRTEL MONEY LINE:</h1>
        </div>
        <div class="method-pay">
          <ul>
            <li>Dial <span>Use Airtel money mobile app</span></li>
            <li>Select international money transfer(choose kenya)</li>
            <li>Airtel Number : <span>(+254) 783 719 791</span></li>
            <li>
              Amount to pay : <span>{{ price }} MWK</span>
            </li>
            <li>Name : <span> John</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'rwanda'">
        <div class="method-head">
          <h1>MTN LINE TO MPESA KENYA:</h1>
        </div>
        <div class="method-pay">
          <ul>
            <li>Dial <span> *830# </span></li>
            <li>Send money from your Mtn line to Kenya</li>
            <li>Number : <span>(+254) 703 147 237</span></li>
            <li>
              Amount to pay : <span>{{ price }} RWF</span>
            </li>
            <li>Name : <span> Thwell Gichovi</span></li>
            <li>Your VIP account will be activated once we receive your payment.</li>
          </ul>
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
