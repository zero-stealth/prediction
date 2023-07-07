<script setup>
import { ref } from 'vue'
import Ios from '../assets/ios.png'
import { useRouter } from 'vue-router'
import phoneIcon from '../icons/phone.vue'
import emailIcon from '../icons/email.vue'
import Android from '../assets/android.png'
import twitterIcon from '../icons/twitterIcon.vue'
import whatsappIcon from '../icons/whatsapp.vue'
import instagramIcon from '../icons/instagram.vue'
import facebookIcon from '../icons/facebook.vue'

const booknow = ref('')
const errMessage = ref('')
const router = useRouter()
const phoneNumber = ref('+254706272207')

const goAlogin = () => {
  router.push({ name: 'AdminLogin' })
}

const openWhatsapp = () => {
  window.open('https://wa.me/+254706272207?text=How can I help', '_blank')
}

const openIos = () => {
  window.open('https://itunes.apple.com/app/idYOUR_APP_ID', '_blank')
  // Replace 'YOUR_APP_ID' with the actual App Store ID of your iOS app
}

const openAndroid = () => {
  window.open('https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME', '_blank')
  // Replace 'YOUR_PACKAGE_NAME' with the actual package name of your Android app
}

const book = () => {
  if (booknow.value !== '') {
    window.open(`https://wa.me/${phoneNumber.value}?text=*Message*: ${booknow.value}`, '_blank')
  } else {
    errMessage.value = 'Write something'
  }

  reset()
}

const reset = () => {
  booknow.value = ''
}
</script>
<template>
  <div class="contact-contain">
    <div class="contact-wrapper">
      <div class="contact-d1">
        <h1>Contact information</h1>
        <p>
          For queries or help, please feel <span @click="goAlogin()">free</span> to contact us on:
        </p>
        <div class="d1-contact">
          <div class="d1-icon">
            <phoneIcon class="icon-d1" />
            <span>+254706272207</span>
          </div>
          <div class="d1-icon">
            <emailIcon class="icon-d1" />
            <span>prediction@gmail.com</span>
          </div>
        </div>
        <div class="app-d-link">
          <div
            class="download-app"
            @click="openIos"
            :style="{ backgroundImage: `url(${Ios})` }"
          ></div>
          <div
            class="download-app"
            @click="openAndroid"
            :style="{ backgroundImage: `url(${Android})` }"
          ></div>
        </div>
      </div>
      <div class="contact-dp2">
        <div class="contact-d2">
        <div>
          <h1>Quick links</h1>
        </div>
        <div class="d2-con">
          <RouterLink :to="{ name: 'Home' }" class="nav-link">Home</RouterLink>
          <RouterLink :to="{ name: 'Banker' }" class="nav-link">Banker tips</RouterLink>
          <RouterLink :to="{ name: 'Tennis' }" class="nav-link">Tennis</RouterLink>
          <RouterLink :to="{ name: 'Basketball' }" class="nav-link">Basketball</RouterLink>
        </div>
      </div>
      <div class="contact-d2">
        <div>
          <h1>Information</h1>
        </div>
        <div class="d2-con">
          <RouterLink :to="{ name: 'Disclaimer' }" class="nav-link">Disclaimer</RouterLink>
          <RouterLink :to="{ name: 'Policy' }" class="nav-link">Policy</RouterLink>
          <RouterLink :to="{ name: 'Refund' }" class="nav-link">Refund policy</RouterLink>
          <RouterLink :to="{ name: 'Terms' }" class="nav-link">Terms & Condition</RouterLink>
        </div>
      </div>
      </div>
      <div class="contact-d3">
        <h1>Talk with us</h1>
        <p>Know more about our service or consultancy in advance</p>
        <form @submit.prevent="book" class="book-f">
          <div class="book-con">
            <div class="con-s">
              <emailIcon class="book-icon" />
              <input v-model="booknow" class="input-book" placeholder="Company email" />
            </div>
            <button type="submit" class="book-btn">Start now</button>
          </div>
        </form>
        <div class="book-social">
          Social media:
          <facebookIcon class="bk-icon" />
          <twitterIcon class="bk-icon" />
          <whatsappIcon class="bk-icon" @click="openWhatsapp" />
          <instagramIcon class="bk-icon" />
        </div>
      </div>
    </div>
    <div class="footer-x">
      <span>sportyPredict@2023</span>
      <span>FAQ Terms and Services Refund Policy</span>
    </div>
  </div>
</template>
<style>
@import '../style/footer.css';
</style>
