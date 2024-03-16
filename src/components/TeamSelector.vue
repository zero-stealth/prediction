<template>
  <div class="drop-container">
    <div class="form-group">
      <label for="team">Team</label>
      <input
        v-model="searchInput"
        @change="searchTeams"
        id="team"
        type="text"
        class="form-g-input"
        placeholder="Search (min 4 characters, e.g., 'manch')"
      />
    </div>
    <div class="drop-down-panel" :class="{ show: isDropOpen, hide: !isDropOpen }">
      <div
        v-for="t in teamData"
        :key="t.id"
        class="drop-item"
        @click="setTeam(t.team.id, t.team.name, t.team.logo)"
      >
        <span>{{ t.team.name }}</span>
        <img :src="t.team.logo" :alt="t.team.name + ' logo'" class="drop-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY
const SPORT_HOST = import.meta.env.VITE_RAPIDAPI_SPORT_HOST

const emit = defineEmits(['teamSelected'])

const searchInput = ref('')
const teamData = ref([])
const toast = useToast()
const isDropOpen = ref(false)

const showDrop = () => {
  isDropOpen.value = !isDropOpen.value
}

const searchTeams = async () => {
  if (searchInput.value.length < 4) {
    // toast.error('Team search query must be 4 characters or more (e.g., "manch").')
  } else {
    try {
      showDrop()
      const response = await axios.get(`${SPORT_HOST}/teams`, {
        params: {
          search: searchInput.value
        },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      })

      teamData.value = response.data.response
      toast.success('Team data fetched successfully')
    } catch (error) {
      toast.error('Error fetching team data')
      console.log(error)
    }
  }
}

const setTeam = (teamId, name, logo) => {
  emit('teamSelected', teamId, name, logo)
  showDrop()
}
</script>

<style scoped>
@import '../style/teamSelector.css';
</style>
