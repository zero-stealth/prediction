<template>
  <div>
    <ButtonComponent/>
    <div class="home-main">
      <div class="main-h">
        <div class="main-header">
          <div class="header-info">
            <h1>Tennis Free tips {{ currentDate }}</h1>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay">
              <Arrow class="btn-icon icon-left" />
              Previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset < 0 }" @click="nextDay">
              Next
              <Arrow class="btn-icon icon-right" />
            </button>
          </div>
        </div>
        <template v-if="cardData.length > 0">
          <div v-for="item in cardData" class="main-h-card">
            <TCard
              v-for="(card, index) in item"
              :key="card._id"
              :tip="card.tip"
              :status="card.status"
              :playerAIcon="card.playerAIcon"
              :playerBIcon="card.playerBIcon"
              :playerA="card.playerA"
              :playerB="card.playerB"
              :title="card.title"
              :time="card.time"
              @click="showCard(card._id)"
            />
          </div>
        </template>
        <template v-else>
          <div class="home-freetip">
            <h1>no predictions and tips today, check back tomorrow</h1>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Arrow from '../icons/arrow.vue'
import TCard from '../components/TCardComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue';
import serena from '../assets/serena.jpg'

const currentDate = ref('')
const router = useRouter()

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
}

const cardData = ref([])

// async function getPrediction() {
//   try {
//     const response = await axios.get('https://predictions-server.onrender.com/predictions')
//     console.log(response.data)
//     cardData.value.push(response.data)
//     console.log(cardData.value)
//   } catch (err) {
//     console.log(err)
//   }
// }

// Dummy data for TCard
cardData.value = [
  [
    {
      _id: 1,
      status: 'Status 1',
      playerAIcon: serena,
      playerBIcon: serena,
      playerA: 'serena ',
      playerB: 'serena  ',
      title: 'Tennis league',
      time: '12.01',
      status: 'serena wins the game'
    },
    {
      _id: 2,
      status: 'Status 1',
      playerAIcon: serena,
      playerBIcon: serena,
      playerA: 'serena',
      playerB: 'serena  ',
      title: 'Tennis league',
      time: '11.01',
      status: 'serena wins the game'
    },
  ]
]

// onMounted(() => {
//   getPrediction()
// })

const offset = ref(0)

const previousDay = () => {
  offset.value--
  updateCurrentDate()
}

const nextDay = () => {
  offset.value++
  updateCurrentDate()
}

const updateCurrentDate = () => {
  const today = new Date()
  today.setDate(today.getDate() + offset.value)
  currentDate.value = today.toDateString()
}

updateCurrentDate()
</script>

<style>
@import '../style/Home.css';
</style>
