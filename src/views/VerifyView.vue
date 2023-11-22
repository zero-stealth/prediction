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
import VerifyIcon from '../icons/VerifyIcon.vue'
import NotVerifyIcon from '../icons/NotVerifyIcon.vue'
import { useRouter, useRoute } from 'vue-router'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const router = useRouter()
const route = useRoute()

const token = ref(route.params.token)
const message = ref('')
const isVerified = ref(false)

const verifyAccount = async () => {
  try {
    const response = await axios.post(`${SERVER_HOST}/verify/${token.value}`, {})
    message.value = 'Account Verified'
    isVerified.value = true
    alert(message.value)
    setTimeout(() => router.push({ name: 'Login' }), 2000)
  } catch (error) {
    handleVerificationError(error)
  }
}

const handleVerificationError = (error) => {
  message.value = 'Account not verified'
  alert(message.value)
  setTimeout(() => router.push({ name: 'Login' }), 2000)
}

onMounted(verifyAccount)
</script>

<style>
@import '../style/auth.css';
</style>
