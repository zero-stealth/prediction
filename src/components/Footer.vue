<script setup>
import { ref } from 'vue'
import Ios from '../assets/ios.png'
import { useRouter, RouterLink } from 'vue-router'
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
const router = useRouter()
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

const reset = () => {
  booknow.value = ''
}
</script>

<template>
  <div class="contact-contain">
    <div class="contact-wrapper">
      <div class="contact-d1">
        <h1>{{ $t('footer.contactInformation') }}</h1>
        <p>
          {{ $t('footer.queriesOrHelp') }}
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
            <h1>{{ $t('footer.quickLinks') }}</h1>
          </div>
          <div class="d2-con">
            <RouterLink :to="{ name: 'Home' }" class="nav-link">{{ $t('footer.home') }}</RouterLink>
            <RouterLink :to="{ name: 'Banker' }" class="nav-link">{{
              $t('footer.betOfTheDay')
            }}</RouterLink>
            <RouterLink :to="{ name: 'Tennis' }" class="nav-link">{{ $t('footer.tennis') }}</RouterLink>
            <RouterLink :to="{ name: 'Basketball' }" class="nav-link">{{
              $t('footer.basketball')
            }}</RouterLink>
          </div>
        </div>
        <div class="contact-d2">
          <div>
            <h1>{{ $t('footer.information') }}</h1>
          </div>
          <div class="d2-con">
            <RouterLink :to="{ name: 'Disclaimer' }" class="nav-link">{{ $t('footer.disclaimer') }}</RouterLink>
            <RouterLink :to="{ name: 'Policy' }" class="nav-link">{{ $t('footer.policy') }}</RouterLink>
            <RouterLink :to="{ name: 'Refund' }" class="nav-link">{{ $t('footer.refundPolicy') }}</RouterLink>
            <RouterLink :to="{ name: 'Terms' }" class="nav-link">{{ $t('footer.termsAndConditions') }}</RouterLink>
          </div>
        </div>
      </div>
      <div class="contact-d3">
        <h1>{{ $t('footer.talkWithUs') }}</h1>
        <p>{{ $t('footer.knowMore') }}</p>
        <form @submit.prevent="book" class="book-f">
          <div class="book-con">
            <div class="con-s">
              <input v-model="booknow" class="input-book" :placeholder="$t('footer.whatsappUs')" />
            </div>
            <button type="submit" class="book-btn">
              <whatsappIcon class="book-icon" />
            </button>
          </div>
        </form>
        <div class="book-social">
          {{ $t('footer.socialMedia') }}:
          <facebookIcon class="bk-icon" @click="openFacebook" />
          <twitterIcon class="bk-icon" @click="openTwitter" />
          <telegramIcon class="bk-icon" @click="openTelegram" />
          <instagramIcon class="bk-icon" @click="openInstagram" />
          <tiktokIcon class="bk-icon" @click="openTiktok" />
          <youtubeIcon class="bk-icon" @click="openYoutube" />
        </div>
      </div>
    </div>
    <div class="footer-x">
      <span>© 2023 SportyPredict. {{ $t('footer.allRightsReserved') }}</span>
    </div>
  </div>
</template>
<style>
@import '../style/footer.css';
</style>
