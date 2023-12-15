<template>
  <div class="auth-container">
    <div class="form-l-wrapper">
      <h1>Reset Password</h1>
      <form @submit.prevent="resetPassword" class="l-form">
        <input type="password" class="input-l" placeholder="New Password" v-model="password" />
        <input type="password" class="input-l" placeholder="Confirm password" v-model="confirmPassword" />
        <button class="btn-f" type="submit">Reset</button>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="login">Log in</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter, useRoute } from 'vue-router';

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

const router = useRouter();
const toast = useToast();
const route = useRoute();
const password = ref('');
const token = ref(null);
const confirmPassword = ref('');

const reset = () => {
  password.value = '';
  confirmPassword.value = '';
};

onMounted(() => {
  token.value = route.params.token;
});

const resetPassword = async () => {
  if (password.value !== '') {
    try {
      const response = await axios.post(
        `${SERVER_HOST}/auth/change-password`,
        {
          confirmPassword: confirmPassword.value,
          password: password.value,
          token: token.value
        }
      );

      router.push({ name: 'Login' });
      toast.success(response.data.message)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error('An error occurred while processing your request')
      }
    }
  } else {
    toast.error('Please enter all the required fields')
 
  }

  reset();
};

const login = () => {
  router.push({ name: 'Login' });
};
</script>

<style>
@import '../style/auth.css';
</style>
