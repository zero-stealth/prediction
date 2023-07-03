<template>
  <div class="card-container">
    <div class="card-title">
      <div class="card-status">
        <!-- <span></span>
        <h4>Gam</h4> -->
      </div>
      <div class="title-m">
        <img :src="leagueIcon" alt="league-img" class="league-c-img" />
        <span>{{ league }}</span>
      </div>
    </div>
    <div class="card-center">
      <div class="card-a">
        <div class="card-fade">
          <div class="card-inner">
            <img :src="teamAIcon" alt="card-img" class="card-img" />
          </div>
        </div>
        <h2>{{ teamA }}</h2>
      </div>
      <div class="card-in">
        <div class="card-in-s">
          <span>{{ teamAscore }}</span>
          <span>[{{ time }}]</span>
          <span>{{ teamBscore }}</span>
        </div>
        <div  class="card-score">
          <span class="card-s">{{ teamAscore }}</span>
          <span class="card-p">:</span>
          <span class="card-s">{{ teamBscore }}</span>
        </div>
        <div class="Tip">
          <h4>Tip:</h4>
          <span>{{ tip }}</span>
        </div>
      </div>
      <div class="card-a">
        <div class="card-fade">
          <div class="card-inner">
            <img :src="teamBIcon" alt="card-img" class="card-img" />
          </div>
        </div>
        <h2>{{ teamB }}</h2>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-f" v-for="formationA in formationsA" :key="formationA">
        <span :class="[formationA === 'l' ? 'loose' : (formationA === 'w' ? 'win' : 'draw')]">{{ formationA }}</span>
      </div>
      <div class="card-fi">form</div>
      <div class="card-f" v-for="formationB in formationsB" :key="formationB">
        <span :class="[formationB === 'l' ? 'loose' : (formationB === 'w' ? 'win' : 'draw')]">{{ formationB }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  formationA: {
    required: true,
    default: () => ['l', 'w', 'd', 'l', 'w']
  },
  formationB: {
    required: true,
    default: () => ['l', 'w', 'd', 'l', 'w']
  },
  leagueIcon: {
    required: true
  },
  teamAIcon: {
    required: true
  },
  teamBIcon: {
    required: true
  },
  tip: {
    default: '0'
  },
  status: {},
  league: {
    required: true
  },
  teamA: {
    required: true
  },
  teamB: {
    required: true
  },
  teamAscore: {
    required: true
  },
  teamBscore: {
    required: true
  },
  time: {
    required: true
  },
  // showscore: {
  //   default: false
  // }
});

const formationsA = props.formationA;
const formationsB = props.formationB;
// const showscore = props.showscore;
</script>

<style scoped>
@import '../style/card.css';
</style>
