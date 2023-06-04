<template>
  <div class="card-container">
    <div class="card-title">
      <div class="card-status">
        <h4>{{ time }} ATP</h4>
      </div>
      <div class="title-m">
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="card-center">
      <div class="card-a">
        <div class="card-fade">
          <div
            class="card-inner Tcard-inner"
            :style="{
              backgroundImage: `url(${playerAIcon})`
            }"
          ></div>
        </div>
        <h2>{{ playerA }}</h2>
      </div>
      <div class="card-in">
        <div class="Tip">
          <span>Betting Tips</span>
        </div>
      </div>
      <div class="card-a">
        <div class="card-fade">
          <div
            class="card-inner Tcard-inner"
            :style="{
              backgroundImage: `url(${playerBIcon})`
            }"
          ></div>
        </div>
        <h2>{{ playerB }}</h2>
      </div>
    </div>
    <div class="card-footer tfooter">
      <div>{{ status }}</div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  playerAIcon: {
    type: String,
    required: true
  },
  playerBIcon: {
    type: String,
    required: true
  },
  playerA: {
    type: String,
    required: true
  },
  playerB: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },
  
  status: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
@import '../style/card.css';
</style>
