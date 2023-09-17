<template>
  <div class="Account-container">
    <div class="Account-header">
      <h1><span>Welcome</span><br />SportyPredict</h1>
    </div>
    <div class="Account-game-p">
      <!-- loop this  -->
      <div class="acc-m gm-m">
        <div class="main-header">
          <div class="header-info">
            <h1>Bet of the day ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay">
              previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
              Today
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
              Tomorrow
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>League</th>
              <th>TeamA</th>
              <th>TeamB</th>
              <th>scoreA</th>
              <th>scoreB</th>
              <th>tip</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody v-for="item in cardData"  :key="item._id">
            <tr v-for="data in item" :key="data._id">
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.leagueIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.league }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamAIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamA }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamBIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamB }}</span>
                </div>
              </td>
              <td>
                <span>{{ data.teamAscore }}</span>
              </td>
              <td>
                <span>{{ data.teamBscore }}</span>
              </td>
              <td>
                <span>{{ data.tip }}</span>
              </td>
              <td>
                <div class="Account-delete" @click="editGame(BetOfTheDay, data._id)">
                  <FileIcon class="icon-delete" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="deletePrediction(data._id)">
                  <DeleteIcon class="icon-delete" />
                </div>
              </td>
            </tr>

            <tr v-if="cardData.length === 0">
              <td colspan="8">No games yet!</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- loop this  -->
      <div class="acc-m gm-m">
        <div class="main-header">
          <div class="header-info">
            <h1>Prediction Tips ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay">
              previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
              Today
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
              Tomorrow
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>League</th>
              <th>TeamA</th>
              <th>TeamB</th>
              <th>scoreA</th>
              <th>scoreB</th>
              <th>tip</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody v-for="item in predictionData"  :key="item._id">
            <tr v-for="data in item" :key="data._id">
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.leagueIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.league }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamAIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamA }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamBIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamB }}</span>
                </div>
              </td>
              <td>
                <span>{{ data.teamAscore }}</span>
              </td>
              <td>
                <span>{{ data.teamBscore }}</span>
              </td>
              <td>
                <span>{{ data.tip }}</span>
              </td>
              <td>
                <div class="Account-delete" @click="editGame(Predictionpicks, data._id)">
                  <FileIcon class="icon-delete" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="deletePrediction(data._id)">
                  <DeleteIcon class="icon-delete" />
                </div>
              </td>
            </tr>
            <tr v-if="predictionData.length === 0">
              <td colspan="8">No games yet!</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="acc-m gm-m">
        <div class="main-header">
          <div class="header-info">
            <h1>Free tips ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay">
              previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
              Today
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
              Tomorrow
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>League</th>
              <th>TeamA</th>
              <th>TeamB</th>
              <th>scoreA</th>
              <th>scoreB</th>
              <th>tip</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody v-for="item in freeTipData"  :key="item._id">
            <tr v-for="data in item" :key="data._id">
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.leagueIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.league }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamAIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamA }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamBIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamB }}</span>
                </div>
              </td>
              <td>
                <span>{{ data.teamAscore }}</span>
              </td>
              <td>
                <span>{{ data.teamBscore }}</span>
              </td>
              <td>
                <span>{{ data.tip }}</span>
              </td>
              <td>
                <div class="Account-delete" @click="editGame(Freetips, data._id)">
                  <FileIcon class="icon-delete" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="deletePrediction(data._id)">
                  <DeleteIcon class="icon-delete" />
                </div>
              </td>
            </tr>
            <tr v-if="freeTipData.length === 0">
              <td colspan="8">No games yet!</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="acc-m gm-m">
        <div class="main-header">
          <div class="header-info">
            <h1>Upcoming games ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay">
              previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
              Today
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
              Tomorrow
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>League</th>
              <th>TeamA</th>
              <th>TeamB</th>
              <th>scoreA</th>
              <th>scoreB</th>
              <th>tip</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody v-for="item in upcomingData"  :key="item._id">
            <tr v-for="data in item" :key="data._id">
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.leagueIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.league }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamAIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamA }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamBIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamB }}</span>
                </div>
              </td>
              <td>
                <span>{{ data.teamAscore }}</span>
              </td>
              <td>
                <span>{{ data.teamBscore }}</span>
              </td>
              <td>
                <span>{{ data.tip }}</span>
              </td>
              <td>
                <div class="Account-delete" @click="editGame(UpcomingGames, data._id)">
                  <FileIcon class="icon-delete" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="deletePrediction(data._id)">
                  <DeleteIcon class="icon-delete" />
                </div>
              </td>
            </tr>
            <tr v-if="upcomingData.length === 0">
              <td colspan="8">No games yet!</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="acc-m gm-m">
        <div class="main-header">
          <div class="header-info">
            <h1>Vip games ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay">
              previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
              Today
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
              Tomorrow
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>League</th>
              <th>TeamA</th>
              <th>TeamB</th>
              <th>scoreA</th>
              <th>scoreB</th>
              <th>tip</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody v-for="item in vipData"  :key="item._id">
            <tr v-for="data in item" :key="data._id">
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.leagueIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.league }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamAIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamA }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamBIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamB }}</span>
                </div>
              </td>
              <td>
                <span>{{ data.teamAscore }}</span>
              </td>
              <td>
                <span>{{ data.teamBscore }}</span>
              </td>
              <td>
                <span>{{ data.tip }}</span>
              </td>
              <td>
                <div class="Account-delete" @click="editGame(VipGames, data._id)">
                  <FileIcon class="icon-delete" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="deletePrediction(data._id)">
                  <DeleteIcon class="icon-delete" />
                </div>
              </td>
            </tr>
            <tr v-if="vipData.length === 0">
              <td colspan="8">No games yet!</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="acc-m gm-m">
        <div class="main-header">
          <div class="header-info">
            <h1>Tennis bets ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay">
              previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
              Today
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
              Tomorrow
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>League</th>
              <th>TeamA</th>
              <th>TeamB</th>
              <th>scoreA</th>
              <th>scoreB</th>
              <th>tip</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody v-for="item in tennisData" :key="item._id">
            <tr v-for="data in item" :key="data._id">
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.leagueIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.league }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamAIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamA }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamBIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamB }}</span>
                </div>
              </td>
              <td>
                <span>{{ data.teamAscore }}</span>
              </td>
              <td>
                <span>{{ data.teamBscore }}</span>
              </td>
              <td>
                <span>{{ data.tip }}</span>
              </td>
              <td>
                <div class="Account-delete" @click="editSport(TennisGames, data._id)">
                  <FileIcon class="icon-delete" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="deleteSport(data._id)">
                  <DeleteIcon class="icon-delete" />
                </div>
              </td>
            </tr>
            <tr v-if="tennisData.length === 0">
              <td colspan="8">No games yet!</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="acc-m gm-m">
        <div class="main-header">
          <div class="header-info">
            <h1>Basketball bets ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button class="btn-h" :class="{ 'active-btn': offset > 0 }" @click="previousDay">
              previous
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 0 }" @click="setOffset(0)">
              Today
            </button>
            <button class="btn-h" :class="{ 'active-btn': offset === 1 }" @click="setOffset(1)">
              Tomorrow
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>League</th>
              <th>TeamA</th>
              <th>TeamB</th>
              <th>scoreA</th>
              <th>scoreB</th>
              <th>tip</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody v-for="item in basketBallData"  :key="item._id">
            <tr v-for="data in item" :key="data._id">
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.leagueIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.league }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamAIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamA }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.teamBIcon" alt="Account-p" class="Account-pi" />
                  <span>{{ data.teamB }}</span>
                </div>
              </td>
              <td>
                <span>{{ data.teamAscore }}</span>
              </td>
              <td>
                <span>{{ data.teamBscore }}</span>
              </td>
              <td>
                <span>{{ data.tip }}</span>
              </td>
              <td>
                <div class="Account-delete" @click="editSport(BasketballGames, data._id)">
                  <FileIcon class="icon-delete" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="deleteSport(data._id)">
                  <DeleteIcon class="icon-delete" />
                </div>
              </td>
            </tr>
            <tr v-if="basketBallData.length === 0">
              <td colspan="8">No games yet!</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="acc-m gm-m">
        <div class="main-header">
          <div class="header-info">
            <h1>Ads Posted </h1>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody v-for="item in adData"  :key="item._id">
            <tr v-for="data in item" :key="data._id">
              <td>
                <div class="Account-tbl-img">
                  <img :src="data.leagueIcon" alt="Account-p" class="Account-pi" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="editAds(AdsPage, data._id)">
                  <FileIcon class="icon-delete" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="deleteAds(data._id)">
                  <DeleteIcon class="icon-delete" />
                </div>
              </td>
            </tr>
            <tr v-if="tennisData.length === 0">
              <td colspan="8">No Ads Posted!</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="acc-m gm-m">
        <div class="main-header">
          <div class="header-info">
            <h1>Time Posted </h1>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody v-for="item in TimeData"  :key="item._id">
            <tr v-for="data in item" :key="data._id">
              <td>
                <span>{{ data.time  }}</span>
              </td>
              <td>
                <div class="Account-delete" @click="editTime(TimePage, data._id)">
                  <FileIcon class="icon-delete" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="deleteTime(data._id)">
                  <DeleteIcon class="icon-delete" />
                </div>
              </td>
            </tr>
            <tr v-if="tennisData.length === 0">
              <td colspan="8">No games yet!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div class="game-edit" :class="[isGameOpen ? 'showEdit' : 'closeEdit']">
      <div class="mobile-exit">
        <ExitIcon class="icon-exit" @click="showEdit()" />
      </div>
      <div class="game-main-p">
        <component @formSubmit="updateGame" @formSubmitSport="updateSport" @formSubmitTime="updateTime" @formSubmitAds="updateAds" :is="activePage" />
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import axios from 'axios'
import { ref, watchEffect, onMounted, watch, shallowRef } from 'vue'
import ExitIcon from '../icons/ExitIcon.vue'
import FileIcon from '../icons/FileIcon.vue'
import AdsPage from '../components/AdsEdit.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
import BetOfTheDay from '../components/BetOfTheDayEdit.vue'
import Predictionpicks from '../components/PredictionpicksEdits.vue'
import Freetips from '../components/FreetipsEdit.vue'
import TimePage from '../components/TimeEdit.vue'
import UpcomingGames from '../components/UpcomingGamesEdits.vue'
import TennisGames from '../components/TennisGamesEdits.vue'
import BasketballGames from '../components/BasketballEdit.vue'
import VipGames from './VipGamesEdits.vue'

const username = ref(null)
const currentDate = ref('')
const offset = ref(0)
const message = ref()
const adData = ref([])
const TimeData = ref([])
const isGameOpen = ref(false)
const cardData = ref([])
const vipData = ref([])
const predictionData = ref([])
const freeTipData = ref([])
const upcomingData = ref([])
const tennisData = ref([])
const basketBallData = ref([])
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST


const getBetOfTheDay = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/predictions/bet/betOfTheDay/${currentDate.value}`
    )
    console.log(response.data)
    cardData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const getVipGames = async () => {
  try {
    const response = await axios.get(
      `${SERVER_HOST}/predictions/vipPredictions/vip/${currentDate.value}`
    )
    console.log(response.data)
    vipData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const getPredictions = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/predictions/${currentDate.value}`
    )
    console.log(response.data)
    predictionData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const getFreeTips = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/predictions/tips/freeTip/${currentDate.value}`
    )
    console.log(response.data)
    freeTipData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const getUpcoming = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/predictions/upcomingPredictions/upcoming/${currentDate.value}`
    )
    console.log(response.data)
    upcomingData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const getTennisBets = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/sports/sport/Tennis/${currentDate.value}`
    )
    console.log(response.data)
    tennisData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const getBasketballBets = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/sports/sport/Basketball/${currentDate.value}`
    )
    console.log(response.data)
    basketBallData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const getAds = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/ads`
    )
    console.log(response.data)
    adData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const getTime = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/time`
    )
    console.log(response.data)
    TimeData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

const showEdit = () => {
  isGameOpen.value = !isGameOpen.value
}

const activePage = shallowRef(BetOfTheDay)
const gameId = ref('')
const sportId = ref('')
const TimeId = ref('')
const AdsId = ref('')

const editGame = (game, id) => {
  activePage.value = game
  gameId.value = id
  showEdit()
}

const editSport = (sport, id) => {
  activePage.value = sport
  sportId.value = id
  showEdit()
}

const editTime  = (time, id) => {
  activePage.value = time
  TimeId.value = id
  showEdit()
}

const editAds = (ads, id) => {
  activePage.value = ads
  AdsId.value = id
  showEdit()
}

async function updateGame(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataa = new FormData()
    if (formData.teamA !== '') {
    formDataa.append('teamA', formData.teamA)
    }
    if(formData.teamAIcon !== null){
      formDataa.append('teamAIcon', formData.teamAIcon);
    }
    if(formData.leagueIcon !== null){
      formDataa.append('leagueIcon', formData.leagueIcon);
    }
    if(formData.status !== ''){
      formDataa.append('status', formData.status);
    }
    if(formData.formationA !== ''){
      formDataa.append('formationA', formData.formationA);
    }
    if(formData.teamAPosition !== ''){
      formDataa.append('teamAPosition', formData.teamAPosition);
    }
    if(formData.teamAscore !== ''){
      formDataa.append('teamAscore', formData.teamAscore);
    }
    if(formData.teamB !== ''){
      formDataa.append('teamB', formData.teamB);
    }
    if(formData.teamBIcon !== null){
      formDataa.append('teamBIcon', formData.teamBIcon);
    }
    if(formData.formationB !== ''){
      formDataa.append('formationB', formData.formationB);
    }
    if(formData.teamBPosition !== ''){
      formDataa.append('teamBPosition', formData.teamBPosition);
    }
    if(formData.teamBscore !== ''){
      formDataa.append('teamBscore', formData.teamBscore);
    }
    if(formData.time !== ''){
      formDataa.append('time', formData.time);
    }
    if(formData.league !== ''){
      formDataa.append('league', formData.league);
    }
    if(formData.date !== ''){
      formDataa.append('date', formData.date);
    }
    if(formData.tip !== ''){
      formDataa.append('tip',formData.tip);
    }
    if(formData.showScore !== ''){
      formDataa.append('showScore', formData.showScore);
    }
    const response = await axios.put(
      `${SERVER_HOST}/predictions/update/${gameId.value}`, formDataa,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    console.log(response.data)
    alert("game updated")

  } catch (error) {
    console.error('Error updating game:', error);
  }
}


async function updateTime(formData) {
    try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDat = new FormData()
    if(formData.time !== ''){
      formDat.append('time', formData.time);
    }

    const response = await axios.put(
      `${SERVER_HOST}/time/update/${TimeId.value}`, formDat,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response.data)
    alert("Time updated")

  } catch (error) {
    console.error('Error updating game:', error);
  }
}

async function updateAds(formData) {
    try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataaa = new FormData()
    if(formData.adsImage !== null){
      formDataaa.append('ads', formData.adsImage);
    }

    const response = await axios.put(
      `${SERVER_HOST}/ads/update/${AdsId.value}`, formDataaa,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response.data)
    alert("Ads updated")

  } catch (error) {
    console.error('Error updating game:', error);
  }
}


async function updateSport(formData) {
    try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataa = new FormData()
    if (formData.teamA !== '') {
    formDataa.append('teamA', formData.teamA)
    }
    if(formData.teamAIcon !== null){
      formDataa.append('teamAIcon', formData.teamAIcon);
    }
    if(formData.status !== ''){
      formDataa.append('status', formData.status);
    }
    if(formData.leagueIcon !== null){
      formDataa.append('leagueIcon', formData.leagueIcon);
    }
    if(formData.formationA !== ''){
      formDataa.append('formationA', formData.formationA);
    }
    if(formData.teamAPosition !== ''){
      formDataa.append('teamAPosition', formData.teamAPosition);
    }
    if(formData.teamAscore !== ''){
      formDataa.append('teamAscore', formData.teamAscore);
    }
    if(formData.teamB !== ''){
      formDataa.append('teamB', formData.teamB);
    }
    if(formData.teamBIcon !== null){
      formDataa.append('teamBIcon', formData.teamBIcon);
    }
    if(formData.formationB !== ''){
      formDataa.append('formationB', formData.formationB);
    }
    if(formData.teamBPosition !== ''){
      formDataa.append('teamBPosition', formData.teamBPosition);
    }
    if(formData.teamBscore !== ''){
      formDataa.append('teamBscore', formData.teamBscore);
    }
    if(formData.time !== ''){
      formDataa.append('time', formData.time);
    }
    if(formData.league !== ''){
      formDataa.append('league', formData.league);
    }
    if(formData.date !== ''){
      formDataa.append('date', formData.date);
    }
    if(formData.tip !== ''){
      formDataa.append('tip',formData.tip);
    }
    if(formData.showScore !== ''){
      formDataa.append('showScore', formData.showScore);
    }

    const response = await axios.put(
      `${SERVER_HOST}/sports/update/${sportId.value}`, formDataa,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response.data)
    alert("game updated")

  } catch (error) {
    console.error('Error updating game:', error);
  }
}



const setOffset = (value) => {
  offset.value = value
  updateCurrentDate()
}

const previousDay = () => {
  offset.value--
  updateCurrentDate()
}

const getFormattedDate = (offset) => {
  const today = new Date()
  today.setDate(today.getDate() + offset)
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = today.getFullYear()
  return `${day}-${month}-${year}`
}

const updateCurrentDate = () => {
  currentDate.value = getFormattedDate(offset.value)
}

watchEffect(() => {
  username.value = localStorage.getItem('username')
  updateCurrentDate()
})

onMounted(() => {
  getAds()
  getTime()
  getBetOfTheDay()
  getPredictions()
  getVipGames()
  getFreeTips()
  getUpcoming()
  getTennisBets()
  getBasketballBets()
})



const deletePrediction = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(
      `${SERVER_HOST}/predictions/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    message.value = response.data.message
    await getPredictions()
    await getFreeTips()
    await getUpcoming()
    await getBetOfTheDay()
    await getVipGames()
  } catch (err) {
    message.value = 'deletion failed'
  }
  alert('deleted')
}

const deleteSport = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(
      `${SERVER_HOST}/sports/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    message.value = response.data.message
    await getTennisBets()
    await getBasketballBets()
  } catch (err) {
    message.value = 'deletion failed'
  }
  alert('deleted')
}

const deleteAds = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(
      `${SERVER_HOST}/ads/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    message.value = response.data.message
    await getAds()
  } catch (err) {
    message.value = 'deletion failed'
  }
  alert('deleted')
}

const deleteTime = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(
      `${SERVER_HOST}/time/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    message.value = response.data.message
    await getTime()
  } catch (err) {
    message.value = 'deletion failed'
  }
  alert('deleted')
}
const showscore = ref(localStorage.getItem('showscore') === 'true')

watch(showscore, (value) => {
  localStorage.setItem('showscore', value.toString())
})

watch(currentDate, () => {
  // getAds()
  // getTime()
  getBetOfTheDay()
  getVipGames()
  getPredictions()
  getFreeTips()
  getUpcoming()
  getTennisBets()
  getBasketballBets()
})
</script>

<style>
@import '../style/account.css';
@import '../style/Bet.css';
</style>
