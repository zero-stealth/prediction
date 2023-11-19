<template>
 <div class="auth-container">
    <div class="form-l-wrapper">
      <h1>{{$t('auth.h1-1')}}</h1>
      <form @submit.prevent="create" class="l-form">
        <input type="text" class="input-l" placeholder="Full Name" v-model="username" />
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <select class="input-l" v-model="selectedCountry">
          <option disabled value="">{{$t('auth.op')}}</option>
          <option v-for="country in countriesData" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <input type="password" class="input-l" placeholder="Password" v-model="password" />
        <input type="password" class="input-l" placeholder="Confirm password" v-model="confirmPassword" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">{{$t('auth.btn-2')}}</button>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="login">
          {{$t('auth.btn-1')}}
        </button>
         <!-- <div class="auth-google-contain" @click="loginInWithGoogle">
          <googleIcon class="auth-google" />
          <span> sign in with google</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import countriesData from '../components/countries.json'
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const selectedCountry = ref('')
const router = useRouter()
const username = ref('')
const password = ref('')
const errMsg = ref('')
const email = ref('')
const confirmPassword = ref('')

const reset = () => {
  email.value = ''
  password.value = ''
  username.value = ''
  selectedCountry.value = ''
  confirmPassword.value = ''
}

const create = async () => {
  if (username.value !== '' && password.value !== '') {
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/register`, {
        username: username.value,
        email: email.value,
        password: password.value,
        country: selectedCountry.value,
        confirmPassword: confirmPassword.value,
        selectedCountry: selectedCountry.value
      })
      const token = response.data.token
      const isPaid = response.data.paid
      const id = response.data._id
      localStorage.setItem('token', token)
      localStorage.setItem('paid', isPaid)
      localStorage.setItem('id', id)
      alert('varification link sent to your email')
    } catch (error) {
      errMsg.value = 'Invalid email or password';
      alert(errMsg.value)
    }
  } else {
    errMsg.value = 'Write something'
    alert(errMsg.value)
    reset()
  }
}

// const loginInWithGoogle = () => {
  
// }

const login = () => {
  router.push({ name: 'Login' })
}
</script>

<style>
@import '../style/auth.css';
</style>
