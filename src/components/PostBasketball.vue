<template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
    <div class="form-wrapper">
      <h1>Team A</h1>
      <BasketballSelector @teamSelected="handleTeamASelected" />
      <div class="form-group">
        <label for="teamAIcon">Logo:</label>
        <img :src="teamAIcon" :alt="teamA" class="form-i-image" />
      </div>
      <div class="form-group">
            <label for="formationB">Formation:</label>
            <input
              v-model="formationA"
              type="text"
              class="form-g-input"
              placeholder="l-w-d-w"
              id="formationB"
            />
          </div>
      <div class="form-group">
        <label for="Status">Status:</label>
        <input v-model="status" type="text" class="form-g-input" placeholder="1" id="status" />
      </div>
      <div class="form-group">
        <label for="teamAPosition">Position:</label>
        <input
          v-model="teamAPosition"
          type="text"
          class="form-g-input"
          placeholder="1"
          id="teamAPosition"
        />
      </div>
    </div>
    <div class="form-wrapper">
      <div class="form-group">
        <label for="tip">Match Tip:</label>
        <input v-model="tip" type="text" class="form-g-input" placeholder="1" id="tip" />
      </div>
      <div class="form-group-l">
        <BasketballLeague @LeagueSelected="handleLeagueSelected" />
        <img v-if="leagueIcon !== null" :src="leagueIcon" :alt="league" class="form-i-image" />
      </div>
      <div class="form-group">
        <label for="time">Match Time:</label>
        <input v-model="time" type="time" class="form-g-input" placeholder="12:00pm" id="time" />
      </div>
      <div class="form-group">
        <label for="date">Match Date:</label>
        <span class="form-g-input">{{ currentDate }}</span>
        <input type="date" @change="onDateChange" v-model="currentDate" class="form-g-input" />
      </div>
      <button type="submit" class="btn-f-f f-desktop">Submit</button>
    </div>
    <div class="form-wrapper">
      <h1>Team B</h1>
      <BasketballSelector @teamSelected="handleTeamBSelected" />
      <div class="form-group">
        <label for="teamBIcon">Logo:</label>
        <img :src="teamBIcon" :alt="teamB" class="form-i-image" />
      </div>
      <div class="form-group">
        <label for="formationB">Formation:</label>
        <input
          v-model="formationB"
          type="text"
          class="form-g-input"
          placeholder="l-w-d-w"
          id="formationB"
        />
      </div>
      <div class="form-group">
        <label for="teamBPosition">Position:</label>
        <input
          v-model="teamBPosition"
          type="text"
          class="form-g-input"
          placeholder="2"
          id="teamBPosition"
        />
      </div>
      <button type="submit" class="btn-f-f f-mobile">Submit</button>
    </div>
  </form>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import BasketballLeague from './BasketballLeague.vue'
import BasketballSelector from './BasketballSelector.vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const teamA = ref('')
const teamB = ref('')
const teamIdA = ref('')
const teamIdB = ref('')
const teamAIcon = ref(null)
const teamBIcon = ref(null)
const leagueIcon = ref(null)
const formationA = ref('')
const formationB = ref('')
const statistics = ref([])
const teamAPosition = ref('')
const teamBPosition = ref('')
const time = ref('')
const league = ref('')
const toast = useToast()
const status = ref('')
const currentDate = ref('')
const tip = ref('')

const handleTeamASelected = (teamId, name, logo) => {
  teamA.value = name
  teamAIcon.value = logo
  teamIdA.value = teamId
  statistics.value.push = teamId
}

const handleTeamBSelected = (teamId, name, logo) => {
  teamB.value = name
  teamBIcon.value = logo
  teamIdB.value = teamId
  statistics.value.push = teamId
}

const handleLeagueSelected = (leagueId, name, logo) => {
  league.value = name
  leagueIcon.value = logo
}

const onDateChange = () => {
  currentDate.value = formatDate(new Date(currentDate.value))
}

const updateCurrentDate = () => {
  currentDate.value = formatDate(new Date())
}

async function handleSubmit() {
  if (
    teamA.value.trim() !== '' &&
    teamAIcon.value !== null &&
    leagueIcon.value !== null &&
    formationA.value.trim() !== '' &&
    teamAPosition.value.trim() !== '' &&
    teamB.value.trim() !== '' &&
    teamBIcon.value !== null &&
    formationB.value.trim() !== '' &&
    teamBPosition.value.trim() !== '' &&
    time.value.trim() !== '' &&
    tip.value.trim() !== '' &&
    league.value.trim() !== '' &&
    currentDate.value.trim() !== ''
  ) {
    const user = JSON.parse(localStorage.getItem('token'))
    try {
      const formData = new FormData()
      formData.append('teamA', teamA.value)
      formData.append('teamAIcon', teamAIcon.value)
      formData.append('leagueIcon', leagueIcon.value)
      formData.append('formationA', formationA.value.toLowerCase())
      formData.append('teamAPosition', teamAPosition.value)
      formData.append('teamAscore', '0')
      formData.append('teamB', teamB.value)
      formData.append('teamBIcon', teamBIcon.value)
      formData.append('formationB', formationB.value.toLowerCase())
      formData.append('teamBPosition', teamBPosition.value)
      formData.append('statistics', statistics.value)
      formData.append('teamBscore', '0')
      formData.append('time', time.value)
      formData.append('status', status.value)
      formData.append('league', league.value)
      formData.append('date', currentDate.value)
      formData.append('tip', tip.value)

      await axios.post(`${SERVER_HOST}/sports/create/Basketball`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user}`
        }
      })
      toast.success('Basketball posted')
    } catch (err) {
      toast.error('Error posting basketball')
      console.log(err)
    }
  } else {
    toast.error('No empty fields allowed')
  }
}

onMounted(() => {
  updateCurrentDate()
})

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}
</script>

<style>
@import '../style/games.css';
</style>