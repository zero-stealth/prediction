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
          <tbody v-for="item in cardData" :key="item">
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
          <tbody v-for="item in predictionData">
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
          <tbody v-for="item in freeTipData">
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
          <tbody v-for="item in upcomingData">
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
          <tbody v-for="item in vipData">
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
          <tbody v-for="item in tennisData">
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
          <tbody v-for="item in basketBallData">
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
    </div>
  </div>
  <Teleport to="body">
    <div class="game-edit" :class="[isGameOpen ? 'showEdit' : 'closeEdit']">
      <div class="mobile-exit">
        <ExitIcon class="icon-exit" @click="showEdit()" />
      </div>
      <div class="game-main-p">
        <component @formSubmit="updateGame" @formSubmitSport="updateSport" :is="activePage" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import axios from 'axios'
import { ref, watchEffect, onMounted, computed, watch, shallowRef } from 'vue'
import ExitIcon from '../icons/ExitIcon.vue'
import FileIcon from '../icons/FileIcon.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
import BetOfTheDay from '../components/BetOfTheDayEdit.vue'
import Predictionpicks from '../components/PredictionpicksEdits.vue'
import Freetips from '../components/FreetipsEdit.vue'
import UpcomingGames from '../components/UpcomingGamesEdits.vue'
import TennisGames from '../components/TennisGamesEdits.vue'
import BasketballGames from '../components/BasketballEdit.vue'
import VipGames from './VipGamesEdits.vue'

const username = ref(null)
const accountInfo = ref([])
const currentDate = ref('')
const offset = ref(0)
const message = ref()
const isGameOpen = ref(false)
const cardData = ref([])
const vipData = ref([])
const predictionData = ref([])
const freeTipData = ref([])
const upcomingData = ref([])
const tennisData = ref([])
const basketBallData = ref([])


const getBetOfTheDay = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `https://predictions-reg9.onrender.com/predictions/bet/betOfTheDay/${currentDate.value}`
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
      `https://predictions-reg9.onrender.com/predictions/vipPredictions/vip/${currentDate.value}`
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
      `https://predictions-reg9.onrender.com/predictions/${currentDate.value}`
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
      `https://predictions-reg9.onrender.com/predictions/tips/freeTip/${currentDate.value}`
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
      `https://predictions-reg9.onrender.com/predictions/upcomingPredictions/upcoming/${currentDate.value}`
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
      `https://predictions-reg9.onrender.com/sports/sport/Tennis/${currentDate.value}`
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
      `https://predictions-reg9.onrender.com/sports/sport/Basketball/${currentDate.value}`
    )
    console.log(response.data)
    basketBallData.value = response.data.length > 0 ? [response.data] : []
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

async function updateGame(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataa = new FormData()
    if (formData.teamA !== '') {
    formDataa.append('teamA', formData.teamA)
    }
    if(formData.teamAIcon !== ''){
      formDataa.append('teamAIcon', formData.teamAIcon);
    }
    if(formData.leagueIcon !== ''){
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
    if(formData.teamBIcon !== ''){
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
      `https://predictions-reg9.onrender.com/predictions/update/${gameId.value}`, formDataa,
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

async function updateSport(formData) {
    try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataa = new FormData()
    if (formData.teamA !== '') {
    formDataa.append('teamA', formData.teamA)
    }
    if(formData.teamAIcon !== ''){
      formDataa.append('teamAIcon', formData.teamAIcon);
    }
    if(formData.status !== ''){
      formDataa.append('status', formData.status);
    }
    if(formData.leagueIcon !== ''){
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
    if(formData.teamBIcon !== ''){
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
      `https://predictions-reg9.onrender.com/sports/update/${sportId.value}`, formDataa,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response.data)
  } catch (error) {
    console.log(error);
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
  getBetOfTheDay()
  getPredictions()
  getVipGames()
  getFreeTips()
  getUpcoming()
  getTennisBets()
  getBasketballBets()
})

const accountData = computed(() => {
  return accountInfo.value
})

const deletePrediction = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(
      `https://predictions-reg9.onrender.com/predictions/delete/${id}`,
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
      `https://predictions-reg9.onrender.com/sports/delete/${id}`,
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
const showscore = ref(localStorage.getItem('showscore') === 'true')

watch(showscore, (value) => {
  localStorage.setItem('showscore', value.toString())
})

watch(currentDate, () => {
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
