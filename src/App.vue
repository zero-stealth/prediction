<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="app-x">
    <div class="app-nav-m">
      <NavBar />
    </div>
    <div class="app-main">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
<style>
@import './style/app.css';
</style>
