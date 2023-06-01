<script setup>
import pic from '@/assets/news.png';
import { useRouter } from 'vue-router';
import argentina from '../assets/Arg-log.png';
import ArrowIcon from '@/icons/ArrowIcon.vue';
import Manchester from '../assets/man-logo.png';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="details-container">
    <div class="desknav-layout">
      <DesktopNav class="desk-show" />
    </div>
    <div class="details-wrapper">
      <div
        class="details-image"
        :style="{
          backgroundImage: `linear-gradient(to bottom, transparent, #031e3c), url(${pic})`
        }"
      >
        <div class="details-h">
          <ArrowIcon class="details-arrow" @click="goBack" />
          <h2>UEFA Champion</h2>
          <span></span>
        </div>
        <div class="details-image-d">
          <div class="details-d">
            <img :src="argentina" alt="" class="details-d-img" />
            <span>Argentina</span>
          </div>
          <div class="details-score">
            <div class="score-p">
              <span>2</span>
              <span>-</span>
              <span>7</span>
            </div>
            <span>90:12</span>
          </div>
          <div class="details-d">
            <img :src="Manchester" alt="" class="details-d-img" />
            <span>Manchester</span>
          </div>
        </div>
      </div>
      <div class="details-details">
        <h1>Match Details</h1>
        <div class="details-match">
          <div class="match-su">
            <span>8</span>
            <span>Shooting</span>
            <span>12</span>
          </div>
          <div class="match-su">
            <span>10</span>
            <span>Attack</span>
            <span>11</span>
          </div>
          <div class="match-su">
            <span>20</span>
            <span>Possession</span>
            <span>32</span>
          </div>
          <div class="match-su">
            <span>7</span>
            <span>Corner</span>
            <span>9</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import '../style/predictions.css';
</style>
