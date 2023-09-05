<template>
  <div class="quick-main">
    <h1>Quick links</h1>
    <div class="quick-nav">
    <RouterLink :to="{ name: 'Bonus' }" class="quick-link">{{ $t('nav.link2') }}</RouterLink>
    <RouterLink :to="{ name: 'Banker' }" class="quick-link">{{ $t('nav.link3') }}</RouterLink>
    <RouterLink :to="{ name: 'Basketball' }" class="quick-link">{{ $t('nav.link4') }}</RouterLink>
    <RouterLink :to="{ name: 'Tennis' }" class="quick-link">{{ $t('nav.link9') }}</RouterLink>
  </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
<style>
@import '../style/quick.css';
</style>
