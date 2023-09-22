<script setup>
import Sticky from './components/stickyComponent.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="app-x">
    <div class="app-nav-m">
    </div>
    <div class="app-main">
      <NavBar />
      <RouterView />
    </div>
    <Sticky/>
    <Footer />
  </div>
</template>
<style>
@import './style/app.css';
</style>
