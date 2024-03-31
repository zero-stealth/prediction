<template>
  <div class="drop-container">
    <div class="form-group">
      <label for="team">Search a league</label>
      <input
        v-model="searchInput"
        @change="searchLeague"
        id="team"
        type="text"
        class="form-g-input"
        placeholder="Search (min 3 characters, e.g., 'liga ')"
      />
    </div>
    <div class="drop-down-panel" :class="{ show: isDropOpen, hide: !isDropOpen }">
      <div v-for="t in LeagueDataFiltered" :key="t.id" class="drop-item" @click="setLeague(t.id, t.name, t.logo)">
        <span>{{ t.name }}</span>
        <img v-if="t.logo && t.logo.trim() !== ''" :src="t.logo" :alt="t.name + ' logo'" class="drop-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, defineEmits, computed } from 'vue'
import { useToast } from 'vue-toastification'
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY
const BASKETBALL_HOST = import.meta.env.VITE_RAPIDAPI_BASKETBALL_HOST

const emit = defineEmits(['LeagueSelected'])

const searchInput = ref('')
const LeagueData = ref([])
const toast = useToast()
const isDropOpen = ref(false)

const showDrop = () => {
  isDropOpen.value = !isDropOpen.value
}

const searchLeague = async () => {
  if (searchInput.value.length < 3) {
    // toast.error('Team search query must be 3 characters or more (e.g., "manch").')
  } else {
    try {
      showDrop()
      const response = await axios.get(`${BASKETBALL_HOST}/leagues`, {
        params: {
          search: searchInput.value
        },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
        }
      })

      LeagueData.value = response.data.response
      console.log(LeagueData.value)
      toast.success('league data fetched successfully')
    } catch (error) {
      toast.error('Error fetching team data')
    }
  }
}

const setLeague = (leagueId, name, logo) => {
  emit('LeagueSelected', leagueId, name, logo)
  showDrop()
}

// Filter out items with null or empty logo
const LeagueDataFiltered = computed(() => LeagueData.value.filter(t => t.logo && t.logo.trim() !== ''))
</script>

<style scoped>
@import '../style/teamSelector.css';
</style>