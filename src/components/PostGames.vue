<template>
  <div class="form-con">
    <div class="sd-container">
      <div class="fx-container" v-if="postType === 'Automatic'">
        <label for="date">Select fixture date</label>
        <input
          type="date"
          @change="onFixtureDateChange"
          v-model="fixtureDate"
          class="date-fixt"
          id="date"
        />
      </div>
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
      <div class="drop-container-l">
        <div class="drop-down-k" @click="showDrp" :class="[isDrpOpen ? 'active' : '']">
          <span>{{ category ? category : 'Game category' }}</span>
          <ArrowIcon class="drop-icon" />
        </div>
        <div
          class="drop-down-panel-g game-drop-down"
          :class="[isDrpOpen ? 'show' : 'hide']"
          v-show="isDrpOpen"
        >
          <div v-for="c in categories" :key="c.id" class="drop-item-k" @click="updateUrl(c.name)">
            <span>{{ c.name }}</span>
          </div>
        </div>
      </div>
      <div class="drop-container-l" v-if="postType === 'Automatic'">
        <div class="drop-down-k" @click="showDrop" :class="[isDropOpen ? 'active' : '']">
          <span>{{ leagueName ? leagueName : 'Choose fixture league' }}</span>
          <ArrowIcon class="drop-icon" />
        </div>
        <div
          class="drop-down-panel-g game-drop-down"
          :class="[isDropOpen ? 'show' : 'hide']"
          v-show="isDropOpen"
          v-if="fixtureData && fixtureData.length"
        >
        <div class="league-s-contain">
          <searchIcon class="search-icon-l" />
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search leagues..."
            class="search-leagues"
          />
        </div>
     
          <div
            v-for="f in filteredFixtures"
            :key="f.id"
            v-show="matchesSearchQuery(f.league.name)"
            class="drop-down down-side"
            @click="loadFixtures(f.league.id, f.league.season, f.league.name)"
          >
            <span>{{ f.league.name }}</span>
            <img :src="f.league.logo" :alt="f.league.name + ' logo'" class="drop-img" />
          </div>
        </div>

        <div class="no-data" :class="[isDropOpen ? 'show' : 'hide']" v-show="isDropOpen" v-else>
          Select a fixture date first
        </div>
      </div>
    </div>
    <div v-if="postType === 'Automatic'">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
        <div class="form-wrapper">
          <h1>Team A</h1>
          <div class="form-group">
            <label for="teamA">Name:</label>
            <span class="form-g-input" v-if="fixtureData && fixtureData.length">{{ teamA }}</span>
            <input
              v-if="!fixtureData || !fixtureData.length"
              type="text"
              class="form-g-input"
              placeholder="Man City"
              id="teamA"
              v-model="teamA"
            />
          </div>
          <div class="form-group">
            <label for="teamAIcon">Logo:</label>
            <img
              :src="teamAIcon"
              :alt="teamA"
              class="form-i-image"
              v-if="fixtureData && fixtureData.length"
            />
            <input
              v-if="!fixtureData || !fixtureData.length"
              @change="handleTeamALogo"
              type="file"
              class="form-g-input"
              id="teamAIcon"
              accept="image/*"
            />
          </div>
          <div class="form-group">
            <label for="formationA">Formation:</label>
            <input
              v-model="formationA"
              type="text"
              class="form-g-input"
              :placeholder="formationA"
              id="formationA"
              
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
          <div class="form-group">
            <label for="leagueIcon">League logo</label>
            <img
              :src="leagueIcon"
              :alt="league"
              class="form-i-image"
              v-if="fixtureData && fixtureData.length"
            />
            <input
              v-if="!fixtureData || !fixtureData.length"
              @change="handleLeagueLogo"
              type="file"
              class="form-g-input"
              id="leagueIcon"
              accept="image/*"
            />
          </div>
          <div class="form-group">
            <label for="league">Match league:</label>
            <span class="form-g-input" v-if="fixtureData && fixtureData.length">{{ league }}</span>
            <input
              v-if="!fixtureData || !fixtureData.length"
              type="text"
              class="form-g-input"
              placeholder="Premier League"
              id="league"
              v-model="league"
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
          <button type="submit" class="btn-f-f f-desktop">Submit</button>
        </div>
        <div class="form-wrapper">
          <h1>Team B</h1>
          <div class="form-group">
            <label for="teamB">Name:</label>
            <span class="form-g-input" v-if="fixtureData && fixtureData.length">{{ teamB }}</span>
            <input
              v-if="!fixtureData || !fixtureData.length"
              type="text"
              class="form-g-input"
              placeholder="Man City"
              id="teamB"
              v-model="teamB"
            />
          </div>
          <div class="form-group">
            <label for="teamBIcon">Logo:</label>
            <img
              :src="teamBIcon"
              :alt="teamB"
              class="form-i-image"
              v-if="fixtureData && fixtureData.length"
            />
            <input
              v-if="!fixtureData || !fixtureData.length"
              @change="handleTeamBLogo"
              type="file"
              class="form-g-input"
              id="teamBIcon"
              accept="image/*"
            />
          </div>
          <div class="form-group">
            <label for="formationB">Formation:</label>
            <input
              v-model="formationB"
              type="text"
              class="form-g-input"
              :placeholder="formationB"
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
              placeholder="l-w-d-w"
              id="formationA"
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
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import searchIcon from '../icons/searchIcon.vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const SPORT_API = import.meta.env.VITE_SPORT_API
const SPORT_KEY = import.meta.env.VITE_SPORT_KEY

const teamA = ref('')
const teamB = ref('')
const postType = ref('Manual')
const leagueName = ref(null)
const isDropOpen = ref(false)
const isDrpOpen = ref(false)
const isDropOpenType = ref(false)
const category = ref(null)
const teamAIcon = ref(null)
const teamBIcon = ref(null)
const leagueIcon = ref(null)
const formationA = ref('l-w-d-w')
const formationB = ref('l-w-d-w')
const statistics = ref([])
const teamAPosition = ref('')
const teamBPosition = ref('')
const time = ref('')
const league = ref('')
const jackpot = ref('')
const toast = useToast()
const status = ref('')
const searchQuery = ref('');
const currentDate = ref('')
const fixtureDate = ref('')
const fixtureData = ref([])
const selectedFixture = ref(null)
const tip = ref('')
const url = ref(null)

const showDrop = () => {
  isDropOpen.value = !isDropOpen.value
}

const showDrp = () => {
  isDrpOpen.value = !isDrpOpen.value
}

const updateUrl = (name) => {
  category.value = name
  showDrp()
}

const showDropType = () => {
  isDropOpenType.value = !isDropOpenType.value
}

const updatePostType = (type) => {
  postType.value = type
  showDropType()
}


const filteredFixtures = computed(() => {
  return fixtureData.value.filter(f => {
    return matchesSearchQuery(f.league.name);
  });
});

function matchesSearchQuery(leagueName) {
  return leagueName.toLowerCase().includes(searchQuery.value.toLowerCase());
}

const categories = [
  { name: 'Upcoming games', endpoint: '/predictions/create/upcoming/upcoming' },
  { name: 'Bet of the day', endpoint: '/predictions/create/bet/betOfTheDay' },
  { name: 'Basketball', endpoint: '/sports/create/Basketball' },
  { name: 'Freetips', endpoint: '/predictions/create/tip/freeTip' },
  { name: 'Tennis', endpoint: '/sports/create/Tennis' },
  { name: 'vip', endpoint: '/predictions/create/vip' }
]

watch(category, () => {
  const selectedCategory = categories.find((c) => c.name === category.value)

  if (selectedCategory) {
    url.value = `${SERVER_HOST}/${selectedCategory.endpoint}`
  } else if (!category.value) {
    toast.error('Please select game category')
  }
})

async function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

const handleTeamALogo = (event) => handleFileUpload(event, teamAIcon)
const handleTeamBLogo = (event) => handleFileUpload(event, teamBIcon)
const handleLeagueLogo = (event) => handleFileUpload(event, leagueIcon)

const onDateChange = () => {
  currentDate.value = formatDate(new Date(currentDate.value))
}

const updateCurrentDate = () => {
  currentDate.value = formatDate(new Date())
}

const onFixtureDateChange = () => {
  fixtureDate.value = formatFixtureDate(new Date(fixtureDate.value))
  getFixture(fixtureDate.value)
}

const loadFixtures = (leagueID, seasonID, Name) => {
  leagueName.value = Name
  getSpecificFixture(fixtureDate.value, leagueID, seasonID)
  showDrop()
}

const getFixture = async (fdate) => {
  try {
    const response = await axios.get(`${SPORT_API}/fixtures`, {
      params: { date: fdate },
      headers: { 'x-apisports-key': SPORT_KEY }
    })

    fixtureData.value = response.data.response
    toast.success('Fixture data fetched')
    showDrop()
  } catch (error) {
    toast.error('Error fetching fixture data')
  }
}

const getSpecificFixture = async (fdate, fid, sid) => {
  try {
    const response = await axios.get(`${SPORT_API}/fixtures`, {
      params: {
        date: fdate,
        league: fid,
        season: sid
      },
      headers: {
        'x-apisports-key': SPORT_KEY
      }
    })

    selectedFixture.value = response.data.response
    postAFormation(
      selectedFixture.value[0].fixture.id,
      selectedFixture.value[0].league.season,
      selectedFixture.value[0].teams.home.id,
      fdate
    )
    postBFormation(
      selectedFixture.value[0].fixture.id,
      selectedFixture.value[0].league.season,
      selectedFixture.value[0].teams.away.id,
      fdate
    )
    teamA.value = selectedFixture.value[0].teams.home.name
    teamB.value = selectedFixture.value[0].teams.away.name
    league.value = selectedFixture.value[0].league.name
    teamAIcon.value = selectedFixture.value[0].teams.home.logo
    teamBIcon.value = selectedFixture.value[0].teams.away.logo
    leagueIcon.value = selectedFixture.value[0].league.logo
    toast.success('Fixture data fetched')
  } catch (error) {
    toast.error('Error fetching fixture data')
  }
}

const postAFormation = async (leagueID, seasonID, teamID, fdate) => {
  try {
    const response = await axios.get(`${SPORT_API}/teams/statistics`, {
      params: { league: leagueID, season: seasonID, team: teamID, date: fdate },
      headers: { 'x-apisports-key': SPORT_KEY }
    })

    formationA.value = response.data.response.form
    statistics.value.push(response.data.response)
    console.log(response.data.response)
    toast.success('Team A formation fetched')
  } catch (error) {
    toast.error('Error fetching team A formation')
    console.log(error)
  }
}

const postBFormation = async (leagueID, seasonID, teamID, fdate) => {
  try {
    const response = await axios.get(`${SPORT_API}/teams/statistics`, {
      params: { league: leagueID, season: seasonID, team: teamID, date: fdate },
      headers: { 'x-apisports-key': SPORT_KEY }
    })

    formationB.value = response.data.response.form
    statistics.value.push(response.data.response)
    console.log(response.data.response)
    toast.success('Team B formation fetched')
  } catch (error) {
    toast.error('Error fetching team B formation')
  }
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

      const response = await axios.post(`${url.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user}`
        }
      })
      toast.success('game updated')
    } catch (err) {
      toast.error(err.response.data.error)
    }
  } else {
    toast.error('No empty fields allowed')
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

const formatFixtureDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}
</script>

<style>
@import '../style/games.css';
</style>
