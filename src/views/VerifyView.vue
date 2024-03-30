<template>
  <div class="verify-container">
    <div class="verify-inn">
      <VerifyIcon class="verify-icon" v-if="isVerified" />
      <NotVerifyIcon class="verify-icon" v-else />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import VerifyIcon from '../icons/VerifyIcon.vue'
import NotVerifyIcon from '../icons/NotVerifyIcon.vue'
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const router = useRouter()
const toast = useToast()
const isVerified = ref(false)

const verifyAccount = async () => {
  try {
    const response = await axios.post(`${SERVER_HOST}/auth/verify/${response.data.token}`);

    if (response.data.message === "Account successfully verified") {
      isVerified.value = !isVerified.value;
      toast.success('Account Verified');
      setTimeout(() => router.push({ name: 'Login' }), 1000);
    } else {
    toast.error('Account not Verified');
    setTimeout(() => router.push({ name: 'Signin' }), 1000);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

onMounted(() => {
  verifyAccount()
})
</script>

<style>
@import '../style/auth.css';
</style>