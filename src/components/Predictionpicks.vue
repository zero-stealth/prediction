<template>
  <div class="form-con">
    <div class="sd-container">
      <div class="drop-container-l">
        <div class="drop-down-k" @click="showDropType" :class="[isDropOpenType ? 'active' : '']">
          <span>{{ postType }}</span>
          <ArrowIcon class="drop-icon" />
        </div>
        <div
          class="game-drop-down"
          :class="[isDropOpenType ? 'show' : 'hide']"
          v-show="isDropOpenType"
        >
          <div class="drop-item-k" @click="updatePostType('Manual')">
            <span>Manual</span>
          </div>
          <div class="drop-item-k" @click="updatePostType('Automatic')">
            <span>Automatic</span>
          </div>
        </div>
      </div> 
    </div>
    <div v-if="postType === 'Automatic'">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
        <div class="form-wrapper">
          <h1>Team A</h1>
          <TeamSelector @teamSelected="handleTeamASelected" />
          <div class="form-group">
            <label for="teamAIcon">Logo:</label>
            <img :src="teamAIcon" :alt="teamA"  class="form-i-image" />
          </div>
          <div class="form-group">
            <label for="formationA">Formation:</label>
            <span class="form-g-input">{{ formationA }}</span>
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
            <label v-if="league === ''">Choose a league</label>
            <span>{{ league }}</span>
            <img :src="leagueIcon" :alt="league" class="form-i-image" />
            <div
              class="drop-down-panel-l"
              v-show="leagueData.length > 0"
              :class="[isLeagueOpen ? 'show' : 'hide']"
            >
              <div v-for="l in leagueData" :key="l.id" class="drop-item-k">
                <div
                  v-for="(ln, index) in l"
                  class="drop-k"
                  :key="index"
                  @click="setLeague(ln.id, ln.name, ln.logo)"
                >
                  <span v-if="ln.logo != undefined">{{ ln.name }}</span>
                  <img
                    v-if="ln.logo !== undefined"
                    :src="ln.logo"
                    :alt="ln.name + ' logo'"
                    class="drop-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="time">Match Time:</label>
            <input
              v-model="time"
              type="time"
              class="form-g-input"
              placeholder="12:00pm"
              id="time"
            />
          </div>
          <div class="form-group">
            <label for="date">Match Date:</label>
            <span class="form-g-input"> {{ currentDate }}</span>
            <input type="date" @change="onDateChange" v-model="currentDate" class="form-g-input" />
          </div>
          <div class="form-group">
            <label for="category">Match category:</label>
            <select v-model="category" class="form-g-input" id="category">
              <option disabled value="">Choose category</option>
              <option value="Double Chance">Double Chance</option>
              <option value="Over 2.5 Goals">Over 2.5 Goals</option>
              <option value="Over 1.5 Goals">Over 1.5 Goals</option>
              <option value="Both Teams To Score">Both Team To Score</option>
              <option value="Under 2.5 Goals">Under 2.5 Goals</option>
            </select>
          </div>
          <button type="submit" class="btn-f-f f-desktop">Submit</button>
        </div>
        <div class="form-wrapper">
          <h1>Team B</h1>
          <TeamSelector  @teamSelected="handleTeamBSelected" />
          <div class="form-group">
            <label for="teamBIcon">Logo:</label>
            <img :src="teamBIcon" :alt="teamB" class="form-i-image" />
          </div>
          <div class="form-group">
            <label for="formationB">Formation:</label>
            <span class="form-g-input">{{ formationB }}</span>
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
          <div class="form-group">
            <label for="teamBscore">Score:</label>
            <input
              v-model="teamBscore"
              type="text"
              class="form-g-input"
              placeholder="5"
              id="teamBscore"
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input v-model="description" type="text" class="form-g-input" placeholder="about game" id="description" />
          </div>
          <button type="submit" class="btn-f-f f-mobile">Submit</button>
        </div>
      </form>
    </div>
    <div v-if="postType === 'Manual'">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
        <div class="form-wrapper">
          <h1>Team A</h1>
          <div class="form-group">
            <label for="teamA">Name:</label>
            <input
              v-model="teamA"
              type="text"
              class="form-g-input"
              placeholder="Manchester"
              id="teamA"
            />
          </div>
          <div class="form-group">
            <label for="teamAIcon">Logo:</label>
            <input
              @change="handleTeamALogo"
              type="file"
              class="form-g-input"
              id="teamAIcon"
              accept="image/*"
              v-if="teamAIcon === null"
            />
            <img :src="teamAIcon" :alt="teamA" class="form-i-image" v-else />
          </div>
          <div class="form-group">
            <label for="formationA">Formation:</label>
            <input
              v-model="formationA"
              type="text"
              class="form-g-input"
              placeholder="4-2-0-4"
              id="formationA"
            />
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
          <div class="form-group">
            <label for="Status">Status:</label>
            <input v-model="status" type="text" class="form-g-input" placeholder="1" id="status" />
          </div>
          <div class="form-group">
            <label for="teamAscore">Score:</label>
            <input
              v-model="teamAscore"
              type="text"
              class="form-g-input"
              placeholder="2"
              id="teamAscore"
            />
          </div>
        </div>
        <div class="form-wrapper">
          <div class="form-group">
            <label for="tip">Match Tip:</label>
            <input v-model="tip" type="text" class="form-g-input" placeholder="1" id="tip" />
          </div>
          <div class="form-group">
            <label for="leagueIcon">League logo</label>
            <input
              @change="handleLeagueLogo"
              type="file"
              class="form-g-input"
              id="leagueIcon"
              accept="image/*"
              v-if="leagueIcon === null"
            />
            <img :src="leagueIcon" :alt="league" class="form-i-image" v-else />
          </div>
          <div class="form-group">
            <label for="league">Match league:</label>
            <input
              v-model="league"
              type="text"
              class="form-g-input"
              placeholder="team league"
              id="league"
            />
          </div>
          <div class="form-group">
            <label for="time">Match Time:</label>
            <input
              v-model="time"
              type="time"
              class="form-g-input"
              placeholder="12:00pm"
              id="time"
            />
          </div>
          <div class="form-group">
            <label for="date">Match Date:</label>
            <span class="form-g-input"> {{ currentDate }}</span>
            <input type="date" @change="onDateChange" v-model="currentDate" class="form-g-input" />
          </div>
          <div class="form-group">
            <label for="category">Match category:</label>
            <select v-model="category" class="form-g-input" id="category">
              <option disabled value="">Choose category</option>
              <option value="Double Chance">Double Chance</option>
              <option value="Over 2.5 Goals">Over 2.5 Goals</option>
              <option value="Over 1.5 Goals">Over 1.5 Goals</option>
              <option value="Both Teams To Score">Both Team To Score</option>
              <option value="Under 2.5 Goals">Under 2.5 Goals</option>
            </select>
          </div>
          <button type="submit" class="btn-f-f f-desktop">Submit</button>
        </div>
        <div class="form-wrapper">
          <h1>Team B</h1>
          <div class="form-group">
            <label for="teamB">Name:</label>
            <input
              v-model="teamB"
              type="text"
              class="form-g-input"
              placeholder="Arsenal"
              id="teamB"
            />
          </div>
          <div class="form-group">
            <label for="teamBIcon">Logo:</label>
            <input
              @change="handleTeamBLogo"
              type="file"
              class="form-g-input"
              id="teamBIcon"
              accept="image/*"
              v-if="teamBIcon === null"
            />
            <img :src="teamBIcon" :alt="teamB" class="form-i-image" v-else />
          </div>
          <div class="form-group">
            <label for="formationB">Formation:</label>
            <input
              v-model="formationB"
              type="text"
              class="form-g-input"
              placeholder="4-1-3-0"
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
          <div class="form-group">
            <label for="teamBscore">Score:</label>
            <input
              v-model="teamBscore"
              type="text"
              class="form-g-input"
              placeholder="5"
              id="teamBscore"
            />
          </div>
           <div class="form-group">
            <label for="description">Description</label>
            <input v-model="description" type="text" class="form-g-input" placeholder="about game" id="description" />
          </div>
          <button type="submit" class="btn-f-f f-mobile">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import TeamSelector from './TeamSelector.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import { useToast } from 'vue-toastification'
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY
const SPORT_HOST = import.meta.env.VITE_RAPIDAPI_SPORT_HOST

const teamA = ref('')
const teamB = ref('')
const postType = ref('Manual')
const leagueData = ref([])
const leagueDataA = ref([])
const leagueDataB = ref([])
const isLeagueOpen = ref(false)
const isDrpOpen = ref(false)
const isDropOpenType = ref(false)
const category = ref(null)
const teamAIcon = ref(null)
const teamBIcon = ref(null)
const leagueIcon = ref(null)
const formationA = ref('')
const formationB = ref('')
const statistics = ref([])
const teamAPosition = ref('')
const teamBPosition = ref('')
const description = ref('');
const time = ref('')
const league = ref('')
const jackpot = ref('')
const toast = useToast()
const status = ref('')
const year = ref(new Date().getFullYear() - 1)
const teamIdA = ref('')
const teamIdB = ref('')
const currentDate = ref('')
const tip = ref('')

const handleTeamASelected = (teamId, name, logo) => {
  teamA.value = name
  teamAIcon.value = logo
  teamIdA.value = teamId
  getLeagueA(teamId)
}

const handleTeamBSelected = (teamId, name, logo) => {
  teamB.value = name
  teamBIcon.value = logo
  teamIdB.value = teamId
  getLeagueB(teamId)
}

const showLeague = () => {
  isLeagueOpen.value = !isLeagueOpen.value
}

const getLeagueA = async (teamId) => {
  try {
    const response = await axios.get(`${SPORT_HOST}/leagues`, {
      params: {
        team: teamId
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    })

    const leaguesWithLogo = response.data.response.map((league) => ({
      ...league,
      logo: league.logo || ''
    }))

    leagueDataA.value.push(...leaguesWithLogo)
    showLeague()
    toast.success('League data fetched successfully')
  } catch (error) {
    toast.error('Error fetching league data')
  }
}

const getLeagueB = async (teamId) => {
  try {
    const response = await axios.get(`${SPORT_HOST}/leagues`, {
      params: {
        team: teamId
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    })

    const leaguesWithLogo = response.data.response.map((league) => ({
      ...league,
      logo: league.logo || ''
    }))

    leagueDataB.value.push(...leaguesWithLogo)
    leagueData.value = [...leagueDataA.value, ...leagueDataB.value]

    showLeague()
    toast.success('League data fetched successfully')
  } catch (error) {
    toast.error('Error fetching league data')
  }
}

const setLeague = (id, name, logo) => {
  league.value = name
  leagueIcon.value = logo
  leagueData.value = []
  showLeague()
  getTeamStatisticsA(id)
  getTeamStatisticsB(id)
}

const getTeamStatisticsA = async (id) => {
  try {
    const response = await axios.get(`${SPORT_HOST}/teams/statistics`, {
      params: {
        league: id,
        season: year.value,
        team: teamIdA.value
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    })

    const form = response.data.response && typeof response.data.response.form === 'string' ? response.data.response.form : '';
    if (form.length >= 2) {
      const formattedForm = form.slice(-5).split('').join('-'); 
      formationA.value = formattedForm;
      console.log(formationA.value)
    } else {
      console.error('Form data is not available or is too short');
    }
    statistics.value.push(response.data.response.fixtures)
    console.log('stat A' +response.data.response.fixtures)
    toast.success('Team statistics fetched successfully')
  } catch (error) {
    toast.error('Error fetching team statistics')
    console.log(error)
  }
}

const getTeamStatisticsB = async (id) => {
  try {
    const response = await axios.get(`${SPORT_HOST}/teams/statistics`, {
      params: {
        league: id,
        season: year.value,
        team:  teamIdB.value
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    })
    const form = response.data.response && typeof response.data.response.form === 'string' ? response.data.response.form : '';
    if (form.length >= 2) {
      const formattedForm = form.slice(-5).split('').join('-'); 
      formationB.value = formattedForm;
      console.log(formationB.value)
    } else {
      console.error('Form data is not available or is too short');
    }
    statistics.value.push(response.data.response.fixtures)
    console.log(response.data.response)
    toast.success('Team statistics fetched successfully')
  } catch (error) {
    toast.error('Error fetching team statistics')
    console.log(error)
  }
}

const showDrp = () => {
  isDrpOpen.value = !isDrpOpen.value
}


const showDropType = () => {
  isDropOpenType.value = !isDropOpenType.value
}
const updatePostType = (type) => {
  postType.value = type
  showDropType()
}


function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

function handleTeamALogo(event) {
  handleFileUpload(event, teamAIcon)
}

function handleTeamBLogo(event) {
  handleFileUpload(event, teamBIcon)
}

function handleLeagueLogo(event) {
  handleFileUpload(event, leagueIcon)
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
    category.value !== null &&
    formationB.value.trim() !== '' &&
    teamBPosition.value.trim() !== '' &&
    time.value.trim() !== '' &&
    tip.value.trim() !== '' &&
    league.value.trim() !== '' &&
    statistics.value.length !== 0 &&
    currentDate.value.trim() !== ''
  ) {
    const user = JSON.parse(localStorage.getItem('token'))
    try {
      const formData = new FormData()
      formData.append('teamA', teamA.value)
      formData.append('teamAIcon', teamAIcon.value)
      formData.append('leagueIcon', leagueIcon.value)
      formData.append('formationA', formationA.value)
      formData.append('teamAPosition', teamAPosition.value)
      formData.append('teamAscore', '0')
      formData.append('teamB', teamB.value)
      formData.append('teamBIcon', teamBIcon.value)
      formData.append('formationB', formationB.value)
      formData.append('teamBPosition', teamBPosition.value)
      formData.append('statistics', JSON.stringify(statistics.value))
      formData.append('teamBscore', '0')
      formData.append('time', time.value)
      formData.append('status', status.value)
      formData.append('league', league.value)
      formData.append('date', currentDate.value)
      formData.append('tip', tip.value)
      formData.append('jackpot', jackpot.value)
      formData.append('description', description.value);

      const response = await axios.post(
        `${SERVER_HOST}/predictions/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user}`
          }
        }
      )
      toast.success('game updated')
    } catch (err) {
      toast.error(err)
      console.log(err)
    }
  } else {
    toast.error('No empty fields allowed')
    console.log(`team A: ${teamA.value}, team A icon: ${teamAIcon.value}, league icon: ${leagueIcon.value}, formation A: ${formationA.value}, team A position: ${teamAPosition.value}, team B: ${teamB.value}, team B icon: ${teamBIcon.value}, formation B: ${formationB.value}, team B position: ${teamBPosition.value}, time: ${time.value}, tip: ${tip.value}, league: ${league.value}, statistics: ${statistics.value}, date: ${currentDate.value}`)
  }
}

onMounted(() => {
  updateCurrentDate()
})
</script>
<script>
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}
</script>

<style>
@import '../style/games.css';
</style>
