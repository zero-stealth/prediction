<template>
  <div class="ads-v-main">
    <div class="ads-m1">
      <div class="ads-m1-h">
        <h1>{{ $t('ads.h1-1') }}</h1>
      </div>
      <p>
        {{ $t('ads.span-1') }} {{ $t('ads.span-2') }} from our sure {{ $t('ads.span-4') }} in a football
        {{ $t('ads.span-5') }}.
      </p>
      <p>{{ $t('ads.p1-1') }}</p>
      <button class="ads-m-btn" @click="goVip">{{ $t('ads.span-4') }}</button>
    </div>
    <div class="ads-m1 m1-ads">
      <p>
        {{ $t('ads.p1-2') }}
      </p>
      <div class="m1-ads-info">
        <h1>{{ $t('ads.h1-2') }}</h1>
        <div class="m1-ads-time">
          <div class="ads-time">
            <span>--</span>
            <span>{{ $t('ads.span-6') }}</span>
          </div>
          <div class="ads-time">
            <span>--</span>
            <span>{{ $t('ads.span-7') }}</span>
          </div>
          <div class="ads-time">
            <span>--</span>
            <span>{{ $t('ads.span-6') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goVip = () => {
  router.push({ name: 'Vip' })
}
</script>

<style>
@import '../style/vipads.css';
</style>
