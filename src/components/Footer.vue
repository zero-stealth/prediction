<script setup>
import { ref } from 'vue'
import Ios from '../assets/ios.png'
import { RouterLink } from 'vue-router'
import emailIcon from '../icons/email.vue'
import Android from '../assets/android.png'
import tiktokIcon from '../icons/tiktokIcon.vue'
import youtubeIcon from '../icons/youtubeIcon.vue'
import twitterIcon from '../icons/twitterIcon.vue'
import whatsappIcon from '../icons/whatsapp.vue'
import instagramIcon from '../icons/instagram.vue'
import facebookIcon from '../icons/facebook.vue'
import telegramIcon from '../icons/telegram.vue'

const booknow = ref('')
const errMessage = ref('')
const phoneNumber = ref('+254703147237')

const openWhatsapp = () => {
  window.open(
    'https://wa.me/+254703147237?text=Hi sporty predict, I want to buy VIP subcription',
    '_blank'
  )
}

const openIos = () => {
  window.open('https://itunes.apple.com/app/idYOUR_APP_ID', '_blank')
}

const openTelegram = () => {
  window.open('https://t.me/sportypredict_tips', '_blank')
}

const openAndroid = () => {
  window.open('https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME', '_blank')
}

const openFacebook = () => {
  window.open('https://www.facebook.com/profile.php?id=100093225097104&mibextid=LQQJ4d', '_blank')
}

const openTwitter = () => {
  window.open('https://twitter.com/sportypredict?s=21&t=ordgrMn8HjrBLUy3PdpsBA', '_blank')
}

const openInstagram = () => {
  window.open('https://instagram.com/sportypredict_?igshid=MTIzZWMxMTBkOA==', '_blank')
}

const openTiktok = () => {
  window.open('https://www.tiktok.com/@sportypredict?_t=8dxjShAnRI5&_r=1', '_blank')
}

const openYoutube = () => {
  window.open('https://www.youtube.com/@Sportypredict', '_blank')
}

const book = () => {
  if (booknow.value !== '') {
    window.open(`https://wa.me/${phoneNumber.value}?text=${booknow.value}`, '_blank')
  } else {
    errMessage.value = 'Write something'
  }

  reset()
}


// // const scrollToTop = () => {
// //   // Scroll to the top of the page
// //   window.scrollTo({
// //     top: 0,
// //     behavior: "smooth", 
// //   });
// }
const reset = () => {
  booknow.value = ''
}
</script>

<template>
  <div class="contact-contain" id="foot">
    <div class="contact-wrapper">
      <div class="contact-d1">
        <h1>Contact Information</h1>
        <p>
          For queries or help, please feel free to contact us on:
        </p>
        <div class="d1-contact">
          <div class="d1-icon" @click="openWhatsapp">
            <whatsappIcon class="icon-d1" />
            <span>+254703147237</span>
          </div>
          <div class="d1-icon">
            <emailIcon class="icon-d1" />
            <span>contact@sportypredict.com</span>
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
            <h1>Quick Links</h1>
          </div>
          <div class="d2-con">
            <RouterLink :to="{ name: 'Home' }" class="nav-link">Home</RouterLink>
            <RouterLink :to="{ name: 'Banker' }" class="nav-link">Bet of the day</RouterLink>
            <RouterLink :to="{ name: 'Tennis' }" class="nav-link">Tennis</RouterLink>
            <RouterLink :to="{ name: 'Basketball' }" class="nav-link">Basketball</RouterLink>
          </div>
        </div>
        <div class="contact-d2">
          <div>
            <h1>Information</h1>
          </div>
          <div class="d2-con">
            <RouterLink :to="{ name: 'Policy' }" class="nav-link">Policy</RouterLink>
            <!-- <RouterLink :to="{ name: 'Sitemap' }" class="nav-link">Sitemap</RouterLink> -->
            <RouterLink :to="{ name: 'Disclaimer' }" class="nav-link">Disclaimer</RouterLink>
            <RouterLink :to="{ name: 'Refund' }" class="nav-link">Refund policy</RouterLink>
            <RouterLink :to="{ name: 'Terms' }" class="nav-link">Terms & Conditions</RouterLink>
          </div>
        </div>
      </div>
      <div class="contact-d3">
        <h1>Talk with us</h1>
        <p>Know more about our service or consultancy in advance</p>
        <form @submit.prevent="book" class="book-f">
          <div class="book-con">
            <div class="con-s">
              <input v-model="booknow" class="input-book" placeholder="Whatsapp us" />
            </div>
            <button type="submit" class="book-btn">
              <whatsappIcon class="book-icon" />
            </button>
          </div>
        </form>
        <div class="book-social">
          <!-- Social Media: -->
          <facebookIcon class="bk-icon fb-icon" @click="openFacebook" />
          <twitterIcon class="bk-icon t-icon" @click="openTwitter" />
          <telegramIcon class="bk-icon" @click="openTelegram" />
          <instagramIcon class="bk-icon" @click="openInstagram" />
          <tiktokIcon class="bk-icon" @click="openTiktok" />
          <youtubeIcon class="bk-icon" @click="openYoutube" />
        </div>
      </div>
    </div>
    <div class="footer-x">
      <span>© 2023 SportyPredict. All rights reserved</span>
    </div>
  </div>
</template>
<style>
@import '../style/footer.css';
</style>
