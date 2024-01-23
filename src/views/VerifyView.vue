<template>
  <div class="verify-container">
    <div class="verify-inn">
      <VerifyIcon class="verify-icon" v-if="isVerified" />
      <NotVerifyIcon class="verify-icon" v-else />
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import VerifyIcon from '../icons/VerifyIcon.vue'
import NotVerifyIcon from '../icons/NotVerifyIcon.vue'
import { useRouter, useRoute } from 'vue-router'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const router = useRouter()
const toast = useToast()
const route = useRoute()
const isVerified = ref(false)
const token = ref(route.params.token)

const verifyAccount = async () => {
  try {
    const response = await axios.post(`${SERVER_HOST}/verify/${token.value}`)
    isVerified.value = response.data.description
    if(isVerified.value === true) {
      toast.success('Account Verified')
      setTimeout(() => router.push({ name: 'Login' }), 1000)
    } else {
      toast.error('Account Verified')
      setTimeout(() => router.push({ name: 'Signin' }), 1000)
    }

  } catch (error) {
    toast.error(error.response.data.message)
  }
}


onMounted(verifyAccount())
</script>

<style>
@import '../style/auth.css';
</style>
