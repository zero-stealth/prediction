<template>
  <ButtonComponent/>
  <div class="main-bet">
    <div class="main-header">
      <div class="header-info">
        <h1>{{ paramValue }} ({{ currentDate }})</h1>
      </div>
      <div class="header-btn">
        <button class="btn-h" :class="{ 'active-btn': offset === -1 }" @click="setOffset(-1)">
          Yesterday
        </button>
        <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
          Today
        </button>
        <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
          Tomorrow
        </button>
      </div>
    </div>
    <div class="match-table">
      <table>
        <thead>
          <tr>
            <th>Match</th>
            <th>Prediction</th>
            <th>Time</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="matches.length > 0">
            <tr v-for="({ match, prediction, time, result }, index) in matches" :key="index">
              <td>{{ match }}</td>
              <td>{{ prediction }}</td>
              <td>{{ time }}</td>
              <td>{{ result }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4">no predictions and tips today, check back tomorrow</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from '../components/ButtonComponent.vue';
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const currentDate = ref('')
const offset = ref(0)
const paramValue = ref('')

const props = defineProps({
  betName: String
})

const predictions = async() => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`https://predictions-server.onrender.com/predictions/prediction/${props.betName}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    //handle all predictions in the category of the button name e.g Over 2.5
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  predictions()
  console.log(props.betName);
})

const setOffset = (value) => {
  offset.value = value
  updateCurrentDate()
}

const getTimestamp = (offset) => {
  const today = new Date()
  today.setDate(today.getDate() + offset)
  return today.toDateString()
}

const updateCurrentDate = () => {
  currentDate.value = getTimestamp(offset.value)
}

watchEffect(() => {
  paramValue.value = router.currentRoute.value.params.betName
  updateCurrentDate()
})

updateCurrentDate()

const matches = [
  {
    match: 'GER RGN Rain / Lech vs FC Wurzburger Kickers',
    prediction: '(1:0)2',
    time: '13:00',
    result: '? - ?'
  },
  {
    match: 'GER RGN Rain / Lech vs FC Wurzburger Kickers',
    prediction: '(1:0)2',
    time: '13:00',
    result: '? - ?'
  },
  
  {
    match: 'AUSLIA Canberra Olympic vs Woden Vellet',
    prediction: '(0:1)1',
    time: '06:00',
    result: '? - ?'
  },
  {
    match: 'GER Borussia Dortmund vs FSV Mainz 05',
    prediction: '(0:1)1',
    time: '14:30',
    result: '? - ?'
  },
  {
    match: 'GER Borussia Dortmund vs FSV Mainz 05',
    prediction: '(0:1)1',
    time: '14:30',
    result: '? - ?'
  },
  {
    match: 'FRA Lens vs Ajaccio',
    prediction: '(0:1)1',
    time: '20:00',
    result: '? - ?'
  }
]
</script>

<style>
@import '../style/Home.css';
@import '../style/Bet.css';
</style>
