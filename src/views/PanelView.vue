<template>
  <div class="panel-container">
    <div class="panel-bar" :class="[isOpen != false ? 'open-p' : 'close-p']">
      <div class="panel-exit">
        <ExitIcon class="panel-icon-exit" @click="showMenu()" />
      </div>
      <div class="panel-profile">
        <div class="panel-img" :style="{ backgroundImage: `url(${banner})` }"></div>
        <h1>Penguin</h1>
        <span>Administrator</span>
      </div>
      <div class="panel-nav">
        <div class="panel-btn-container">
          <button
            @click="setActivePage(AccountManagement)"
            :class="getButtonClass(AccountManagement)"
          >
            <GroupIcon class="icon-panel" />
            <span>account management</span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="setActivePage(VipGames)" :class="getButtonClass(VipGames)">
            <VipIcon class="icon-panel" />
            <span> vip prediction </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="setActivePage(Freetips)" :class="getButtonClass(Freetips)">
            <FileIcon class="icon-panel" />
            <span> Free tips </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="setActivePage(Upcomingtips)" :class="getButtonClass(Upcomingtips)">
            <FileIcon class="icon-panel" />
            <span> upcoming tips </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="setActivePage(BasketballGames)" :class="getButtonClass(OtherGames)">
            <basketballIcon class="icon-panel" />
            <span> Basketball </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="setActivePage(TennisGames)" :class="getButtonClass(OtherGames)">
            <tennisIcon class="icon-panel" />
            <span>Tennis </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="Logout(Logout)" :class="getButtonClass(Logout)">
            <LogoutIcon class="icon-panel" />
            <span>Logout </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
        </div>
      </div>
    </div>
    <div class="panel-main">
      <div class="panel-menu" @click="showMenu()">
        <DrawIcon class="panel-icon-nav" />
      </div>
      <component :is="activePage" />
    </div>
  </div>
</template>
<script setup>
import basketballIcon from '../icons/basketballIcon.vue'
import tennisIcon from '../icons/tennisIcon.vue'
import LogoutIcon from '../icons/logoutIcon.vue'
import GroupIcon from '../icons/GroupIcon.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import ExitIcon from '../icons/ExitIcon.vue'
import DrawIcon from '../icons/DrawIcon.vue'
import FileIcon from '../icons/FileIcon.vue'
import VipIcon from '../icons/VipIcon.vue'
import banner from '../assets/banner.jpeg'
import { useRouter } from 'vue-router'
import { shallowRef } from 'vue'
import { ref } from 'vue'

const router = useRouter()
const isOpen = ref(false)

const showMenu = () => {
  isOpen.value = !isOpen.value
}
// pages
import AccountManagement from '../components/AccountManagement.vue'
import BasketballGames from '../components/BasketballGames.vue'
import Upcomingtips from '../components/UpcomingGames.vue'
import TennisGames from '../components/TennisGames.vue'
import VipGames from '../components/VipGames.vue'
import Freetips from '../components/Freetips.vue'

const activePage = shallowRef(AccountManagement)

const setActivePage = (page) => {
  activePage.value = page
}

const getButtonClass = (page) => {
  return ['panel-btn', activePage.value === page ? 'active-cp' : 'inactive-cp']
}

const Logout = () => {
  router.push({ name: 'Home' })
}
</script>

<style>
@import '../style/panel.css';
</style>
