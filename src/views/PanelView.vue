<template>
  <div class="panel-container">
    <div class="panel-bar" :class="[isOpen ? 'close-dash' : '']">
      <div class="panel-nav">
        <div>
          <div class="pan-arrow-container " @click="goBack()">
            <span>Go home</span>
            <HomeIcon class="pan-arrow" />
          </div>
          <div class="panel-profile">
            <div class="panel-img" :style="{ backgroundImage: `url(${logo})` }"></div>
            <div class="panel-profile-info">
              <h1>SportyPredict</h1>
              <span>Administrator</span>
            </div>
          </div>
        </div>
        <div class="panel-btn-container">
          <button
            @click="setActivePage(AccountManagement)"
            :class="getButtonClass(AccountManagement)"
          >
            <GroupIcon class="icon-panel" />
            <span>account management</span>
          </button>
          <button @click="setActivePage(GameManagement)" :class="getButtonClass(GameManagement)">
            <GameIcon class="icon-panel" />
            <span>Game management</span>
          </button>
          <button
            @click="setActivePage(VipresultsComponent)"
            :class="getButtonClass(VipresultsComponent)"
          >
            <VipIcon class="icon-panel" />
            <span> Post vip results </span>
          </button>
          <button @click="setActivePage(Predictionpicks)" :class="getButtonClass(Predictionpicks)">
            <PredictionIcon class="icon-panel" />
            <span> Prediction picks </span>
          </button>
          <button @click="setActivePage(PostGames)" :class="getButtonClass(PostGames)">
            <GamePostIcon class="icon-panel" />
            <span> Post Games </span>
          </button>
          <button @click="setActivePage(PostPayments)" :class="getButtonClass(PostPayments)">
            <PayIcon class="icon-panel" />
            <span>Payments </span>
          </button>
          <button @click="setActivePage(PostAds)" :class="getButtonClass(PostAds)">
            <AdsIcon class="icon-panel" />
            <span> Post Ads </span>
          </button>
        </div>
      </div>
      <button @click="logout" :class="getButtonClass(logout)">
        <LogoutIcon class="icon-panel" />
        <span>Logout </span>
      </button>
    </div>
    <div class="panel-main">
      <component :is="activePage" />
      <div class="float-menu" @click="showMenu">
        <DashIcon class="float-m-icon" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect, shallowRef } from 'vue'
import PredictionIcon from '../icons/PredictionIcon.vue'
import GamePostIcon from '../icons/gamePostIcon.vue'
import LogoutIcon from '../icons/logoutIcon.vue'
import GroupIcon from '../icons/GroupIcon.vue'
import AdsIcon from '../icons/adsPostIcon.vue'
import VipIcon from '../icons/VipIcon.vue'
import GameIcon from '../icons/gameIcon.vue'
import PayIcon from '../icons/payIcon.vue'
import DashIcon from '../icons/DashIcon.vue'
import HomeIcon from '../icons/homeIcon.vue'
import logo from '../assets/logo.png'
import { useRouter } from 'vue-router'

const username = ref('admin')
const router = useRouter()
const isOpen = ref(false)

watchEffect(() => {
  username.value = localStorage.getItem('username')
})

const showMenu = () => {
  isOpen.value = !isOpen.value
}

// const goBack = () => {
//   router.go(-1)
// }

const goBack = () => {
  router.push({ name: 'Home' })
}
// pages
import VipresultsComponent from '../components/VipresultsComponent.vue'
import AccountManagement from '../components/AccountManagement.vue'
import Predictionpicks from '../components/Predictionpicks.vue'
import GameManagement from '../components/GameManagement.vue'
import PostPayments from '../components/PostPayments.vue'
import PostGames from '../components/PostGames.vue'
import PostAds from '../components/AdsComponent.vue'

const activePage = shallowRef(AccountManagement)

const setActivePage = (page) => {
  activePage.value = page
}

const getButtonClass = (page) => {
  return ['panel-btn', activePage.value === page ? 'active-cp' : 'inactive-cp']
}

const logout = () => {
  localStorage.removeItem('token')
  router.push({ name: 'Home' })

}
</script>
<style>
@import '../style/panel.css';
</style>
