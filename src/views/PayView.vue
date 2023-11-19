<script setup>
import countriesData from '../components/countries.json'
import MoneyIcon from '../icons/payIcon.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const Selectedcountry = ref('')
const reveal = ref('')
const errMsg = ref('')
const searchTerm = ref('')

const logIn = () => {
  router.push({ name: 'Login' })
  scrollToTop()

}

const signIn = () => {
  router.push({ name: 'Signin' })
  scrollToTop()

}

const goVip = () => {
  router.push({ name: 'Vip' })
  scrollToTop()

}


const scrollToTop = () => {
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
}

const showPayment = () => {
  if (Selectedcountry.value === '') {
    errMsg.value = 'Empty field is not supported'
  } else {
    switch (Selectedcountry.value) {
      case 'KE':
        reveal.value = 'kenya'
        break
      case 'NG':
        reveal.value = 'Nigeria'
        break
      case 'CM':
        reveal.value = 'Cameroon'
        break
      case 'GH':
        reveal.value = 'ghana'
        break
      case 'ZA':
        reveal.value = 'southA'
        break
      case 'TZ':
        reveal.value = 'Tanzania'
        break
      case 'UG':
        reveal.value = 'Uganda'
        break
      case 'ZM':
        reveal.value = 'Zambia'
        break
      case 'RW':
        reveal.value = 'Rwanda'
        break
      case 'MW':
        reveal.value = 'Malawi'
        break
      default:
        reveal.value = 'others'
    }
  }
}

const filteredCountries = computed(() => {
  const term = searchTerm.value.toLowerCase()
  return countriesData.filter(
    (country) =>
      country.name.toLowerCase().includes(term) || country.code.toUpperCase().includes(term)
  )
})
</script>

<template>
  <div class="pay-monitor">
    <div class="pay-contain">
      <div class="pay-title">
        <span></span>
        <MoneyIcon class="icon-pay" />
        <span>{{ $t('pay.span1') }}</span>
      </div>
      <div class="pay-info-spx">
        <h1>
          <span>{{ $t('pay.span2') }}</span>
          {{ $t('pay.h1-1') }}
        </h1>
        <p>{{ $t('pay.p1') }}</p>
        <p>{{ $t('pay.p2') }}</p>
      </div>
      <div class="pay-main">
        <div class="sport-s-contain">
          <label>{{ $t('pay.lb') }}</label>
          <input
            type="text"
            class="sport-selector"
            v-model="searchTerm"
            placeholder="Search country"
          />
          <select class="sport-selector" v-model="Selectedcountry">
            <option disabled value="">{{ $t('pay.op') }}</option>
            <option v-for="country in filteredCountries" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>
          <button class="pay-btn" @click="showPayment">Proceed</button>
        </div>
        <p>{{ errMsg }}</p>
      </div>
      <div class="pay-info" v-if="reveal === 'others'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }}<span>( 35 USD ) </span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p>
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }}</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.h1-4') }}</h1>
          <ul>
            <li>{{ $t('pay.li1') }}</li>
            <li>Use <span>contact@sportypredict.com</span></li>
            <li>{{ $t('pay.li3') }}</li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.h1-5') }}</h1>
          <ul>
            <li>{{ $t('pay.li5') }}</li>
            <li>{{ $t('pay.li6') }} <span>bc1qvzny5ffjym462y35qw7qqr6ucgtkcqcu402dl5</span></li>
            <li>{{ $t('pay.li3') }}</li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.h1-6') }}</h1>
          <ul>
            <li>{{ $t('pay.li1') }}</li>
            <li>Use <span>contact@sportypredict.com</span></li>
            <li>{{ $t('pay.li3') }}</li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <p>
          <span>{{ $t('pay.span4') }}</span>
        </p>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span>{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'kenya'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }} <span>(1,500ksh)</span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p>
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }} kenya:</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.spanh5') }} MPESA</h1>
          <ul>
            {{
              $t('pay.spanh5')
            }}
            <li>Name <span>Thwell Gichovi</span></li>
            <li>Mpesa Number : <span>0703 147 237</span></li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span @click="goVip()">{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'Nigeria'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }} <span>(8,500 NGN)</span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p> 
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }} Nigeria:</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.spanh6') }}</h1>
          <ul>
            <li>Bank Name <span>FirstBank</span></li>
            <li>Account Number : <span>3087875918</span></li>
            <li>Account Name : <span>Mboutidem akpan</span></li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span @click="goVip()">{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'ghana'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }} <span>(130 GHC)</span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p>
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }} Ghana:</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.spanh7') }}</h1>
          <ul>
            <li>Name <span>David Agyevi</span></li>
            <li>Mobile Number : <span>0594577146</span></li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span @click="goVip()">{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'Cameroon'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }} <span>(11500 CFA)</span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p>
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }} Cameroon:</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.spanh8') }}</h1>
          <ul>
            <li>Name <span>Promise Amadi</span></li>
            <li>Mobile Number : <span>(+237) 678 832 736</span></li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span @click="goVip()">{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'Uganda'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }} <span>(70,000 UGX)</span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p>
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }} Uganda:</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.spanh9') }}</h1>
          <ul>
            <li>Dial <span>*165# or via Mpesa App </span></li>
            <li>Name <span>Thwell Gichovi</span></li>
            <li>Mpesa Number : <span>(+254) 703 147 237</span></li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span @click="goVip()">{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'Tanzania'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }} <span>(45000 TZS)</span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p>
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }} Tanzania:</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.spanh10') }}</h1>
          <ul>
            <li>Name <span>Thwell Gichovi</span></li>
            <li>Mpesa Number : <span>(+254) 703 147 237</span></li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span @click="goVip()">{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'southA'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }} <span>(620 ZAR)</span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p>
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }} southAfrica:</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.h1-5') }}</h1>
          <ul>
            <li>{{ $t('pay.li5') }}</li>
            <li>{{ $t('pay.li6') }} <span>bc1qvzny5ffjym462y35qw7qqr6ucgtkcqcu402dl5</span></li>
            <li>{{ $t('pay.li3') }}</li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.h1-4') }}</h1>
          <ul>
            <li @click="login()">{{ $t('pay.li1') }}</li>
            <li>Use <span>contact@sportypredict.com</span></li>
            <li>{{ $t('pay.li3') }}</li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.h1-6') }}</h1>
          <ul>
            <li>{{ $t('pay.li1') }}</li>
            <li>Use <span>contact@sportypredict.com</span></li>
            <li>{{ $t('pay.li3') }}</li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span @click="goVip()">{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'Zambia'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }} <span>(550 ZMW)</span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p>
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }} Zambia:</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.spanh11') }}</h1>
          <ul>
            <li>Dial <span>*778# or use Airtel money mobile app</span></li>
            <li>{{ $t('pay.spanh12') }}</li>
            <li>Airtel Number : <span>(+254) 783 719 791</span></li>
            <li>Name : <span> John</span></li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span @click="goVip()">{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'Malawi'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }} <span>(30,000 MWK )</span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p>
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }} Malawi:</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.spanh11') }} LINE</h1>
          <ul>
            <li>Dial <span>Use Airtel money mobile app</span></li>
            <li>{{ $t('pay.spanh12') }}</li>
            <li>Airtel Number : <span>(+254) 783 719 791</span></li>
            <li>Name : <span> John</span></li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span @click="goVip()">{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
            </p>
          </div>
        </div>
      </div>
      <div class="pay-info" v-else-if="reveal === 'Rwanda'">
        <div class="info-pay-h">
          <h1>
            {{ $t('pay.spanh1') }} <span>{{ $t('pay.spanh2') }}</span> <br />
            {{ $t('pay.spanh3') }} <span>(35,0000 RWF )</span> <br />
            <span>"2 - 4" odds</span> {{ $t('pay.spanh4') }}
          </h1>
        </div>
        <div class="step-pay">
          <h1>{{ $t('pay.h1-2') }}</h1>
          <p>
           <span @click="logIn()"> {{ $t('pay.p3') }}</span> or <span @click="signIn()">{{ $t('pay.span3') }}</span>
          </p>
        </div>
        <div class="method-head">
          <h1>{{ $t('pay.h1-3') }} Rwanda:</h1>
        </div>
        <div class="method-pay">
          <h1>{{ $t('pay.span13') }}</h1>
          <ul>
            <li>Dial <span> *830# </span></li>
            <li>{{ $t('pay.span14') }}</li>
            <li>Number : <span>(+254) 703 147 237</span></li>
            <li>Name : <span> Thwell Gichovi</span></li>
            <li>{{ $t('pay.li8') }}</li>
          </ul>
        </div>
        <div class="Question">
          <div class="Question-con">
            <h1>{{ $t('pay.h1-7') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span6') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-8') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span8') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-10') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span> {{ $t('pay.span9') }}
              <span @click="goVip()">{{ $t('pay.span10') }}</span
              >.
              {{ $t('pay.span11') }}
            </p>
          </div>
          <div class="Question-con">
            <h1>{{ $t('pay.h1-11') }}</h1>
            <p>
              <span>{{ $t('pay.span5') }}:</span>{{ $t('pay.span12') }}
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
