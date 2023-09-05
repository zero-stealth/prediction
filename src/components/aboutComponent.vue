<template>
  <div class="abt-info-p">
    <div class="abt-p-in">
      <h1>{{$t('section2.abt-h1')}}</h1>
      <p>{{$t('section2.abt-p1')}}</p>
    </div>
    <div class="abt-p-in">
      <h1>{{$t('section2.abt-h2')}}</h1>
      <p>{{$t('section2.abt-p2')}}</p>
    </div>
    <div class="abt-p-in">
      <h1>{{$t('section2.abt-h3')}}</h1>
      <p>{{$t('section2.abt-p3')}}</p>
    </div>
    <div class="abt-p-in">
      <h1>{{$t('section4.abt-h1')}}</h1>
      <p>{{$t('section4.abt-p1')}}</p>
      <ul>
        <li>{{$t('section4.ul.0')}}</li>
        <li>{{$t('section4.ul.1')}}</li>
        <li>{{$t('section4.ul.2')}}</li>
        <li>{{$t('section4.ul.3')}}</li>
        <li>{{$t('section4.ul.4')}}</li>
      </ul>
      <p>{{$t('section4.abt-p2')}}</p>
    </div>
    <div class="abt-p-in">
      <h1>{{$t('section5.abt-h1')}}</h1>
      <p>{{$t('section5.abt-p1')}}</p>
    </div>
    <div class="abt-p-in p-in">
      <h1>{{$t('section6.abt-h1')}}</h1>
      <p>{{$t('section6.abt-p1')}}</p>
      <ul>
        <li @click="goToB()">{{$t('section6.ul.0')}}</li>
        <li @click="goTo('Over 1.5 Goals')">{{$t('section6.ul.1')}}</li>
        <li @click="goTo('Over 2.5 Goals')">{{$t('section6.ul.2')}}</li>
        <li @click="goTo('Both Teams To Score')">{{$t('section6.ul.3')}}</li>
        <li @click="goTo('Double Chance')">{{$t('section6.ul.4')}}</li>
        <li @click="goTo('Under 2.5 Goals')">{{$t('section6.ul.5')}}</li>
      </ul>
    </div>
    <div class="abt-p-in">
      <h1>{{$t('section7.abt-h1')}}</h1>
      <p>{{$t('section7.abt-p1')}}<span @click="goAlogin()">.</span></p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; 

const router = useRouter();

const goTo = (liName) => {
  router.push({ name: 'Bet', params: { betName: liName } })
}

const goToB = () => {
  router.push({ name: 'Banker' })
}

const goAlogin = () => {
  router.push({ name: 'AdminLogin' })
}


</script>
<style>
@import '../style/info.css';
</style>
