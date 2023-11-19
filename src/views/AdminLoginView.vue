<template>
  <div
    class="auth-container">
    <div class="form-l-wrapper">
      <h1>{{ title }}</h1>
      <form @submit.prevent="login" class="l-form" v-if="!resetPage">
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <input type="password" class="input-l" placeholder="Password" v-model="password" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">{{$t('auth.btn-1')}}</button>
        <span @click="forgot">{{$t('auth.span1')}}</span>
      </form>
      <form @submit.prevent="resetAuth" class="l-form" v-else>
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Request reset</button>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="create">
          {{$t('auth.h1-1')}}
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
// import googleIcon from '../icons/googleIcon.vue'
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const resetPage = ref(false)
const router = useRouter()
const password = ref('')
const title = ref('Login')
const errMsg = ref('')
const email = ref('')

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
      });

      console.log(response.data); 
      
      const token = response.data.token;
      if (token) {
        const isAdmin = response.data.isAdmin;
        const adminusername = response.data.username;

        localStorage.setItem('admin', isAdmin);
        localStorage.setItem('username', adminusername);
        localStorage.setItem('token', JSON.stringify(token));

        router.push({ name: 'Panel' });
      } else {
        errMsg.value = 'Invalid email or password';
      }
    } catch (error) {
      console.error(error);
      errMsg.value = 'Login failed. Please check your email and password.';
    }
  } else {
    errMsg.value = 'Please enter your email and password.';
    alert(errMsg.value);
  }
};
const forgot = () => {
  title.value = 'Reset Your Account'
  resetPage.value = !resetPage.value
}

const create = () => {
  router.push({ name: 'AdminSignin' })
}

const resetAuth = async () => {
  if (email.value !== '') {
    try {
      await axios.post(`${SERVER_HOST}/auth/request-reset`, {
        email: email.value,
      })
      alert('Reset link sent to your email')
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
