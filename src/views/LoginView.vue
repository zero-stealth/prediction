<template>
  <div class="auth-container">
    <div class="form-l-wrapper">
      <h1>{{ title }}</h1>
      <form @submit.prevent="login" class="l-form" v-if="!resetPage">
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <input type="password" class="input-l" placeholder="Password" v-model="password" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Login</button>
        <span @click="forgot">{{ $t('auth.span1') }}</span>
      </form>
      <form @submit.prevent="resetAuth" class="l-form" v-else>
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Request reset</button>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="create">
          {{ $t('auth.h1-1') }}
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
// import googleIcon from '../icons/googleIcon.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'


const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const authStore = useAuthStore()
const resetPage = ref(false)
const router = useRouter()
const title = ref('login')
const errMsg = ref('')
const email = ref('')
const password = ref('')


const reset = () => {
  password.value = ''
  email.value = ''
}




const login = async () => {
  if (email.value !== '' && password.value !== '') {
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/login`, {
        email: email.value,
        password: password.value
      })

      const responseData = response.data
      const token = responseData.token

      if (token) {
        const isPaid = responseData.paid
        const username = responseData.username
        const id = responseData._id
        authStore.toggleToken(JSON.stringify(token))
        localStorage.setItem('username', username)
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('paid', isPaid)
        localStorage.setItem('id', id)

        router.push({ name: 'Vip' })
      } else {
        errMsg.value = 'Invalid email or password'
      }
    } catch (error) {
      errMsg.value = 'Login failed. Please check your email or password.'
    }
  } else {
    errMsg.value = 'Please enter your email and password.'
    alert(errMsg.value)
    reset()
  }
}

const forgot = () => {
  title.value = 'write your email account'
  resetPage.value = !resetPage.value
}

const create = () => {
  router.push({ name: 'Signin' })
}

const resetAuth = async () => {
  if (email.value !== '') {
    try {
      await axios.post(`${SERVER_HOST}/auth/request-reset`, {
        email: email.value,
      })
      alert('Reset link sent to your email')
      errMsg.value = 'Reset link sent to your email'
    } catch (error) {
      errMsg.value = 'Failed to send reset link'
    }
  } else {
    errMsg.value = 'Write your email something'
    reset()
  }
}

// const loginInWithGoogle = () => {
  
// }

</script>

<style>
@import '../style/auth.css';
</style>
