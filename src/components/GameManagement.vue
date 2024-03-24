<template>
  <div class="game-container">
    <div class="game-game-p">
      <!-- loop this  -->
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Bet of the day ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset > 0 }"
              @click="previousDay"
            >
              previous
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 0 }"
              @click="setOffset(0)"
            >
              Today
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 1 }"
              @click="setOffset(1)"
            >
              Tomorrow
            </button>
          </div>
        </div>
        <div class="game-table">
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
            <tbody v-for="item in cardData">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
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
                  <div class="game-delete" @click="editGame(BetOfTheDay, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deletePrediction(data._id)">
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
      </div>
      <!-- loop this  -->
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Prediction Tips ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset > 0 }"
              @click="previousDay"
            >
              previous
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 0 }"
              @click="setOffset(0)"
            >
              Today
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 1 }"
              @click="setOffset(1)"
            >
              Tomorrow
            </button>
          </div>
        </div>
        <div class="game-table">
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
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
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
                  <div class="game-delete" @click="editGame(Predictionpicks, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deletePrediction(data._id)">
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
      </div>

      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Free tips ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset > 0 }"
              @click="previousDay"
            >
              previous
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 0 }"
              @click="setOffset(0)"
            >
              Today
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 1 }"
              @click="setOffset(1)"
            >
              Tomorrow
            </button>
          </div>
        </div>
        <div class="game-table">
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
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
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
                  <div class="game-delete" @click="editGame(Freetips, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deletePrediction(data._id)">
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
      </div>

      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Upcoming games ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset > 0 }"
              @click="previousDay"
            >
              previous
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 0 }"
              @click="setOffset(0)"
            >
              Today
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 1 }"
              @click="setOffset(1)"
            >
              Tomorrow
            </button>
          </div>
        </div>
        <div class="game-table">
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
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
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
                  <div class="game-delete" @click="editGame(UpcomingGames, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deletePrediction(data._id)">
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
      </div>

      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Vip games ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset > 0 }"
              @click="previousDay"
            >
              previous
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 0 }"
              @click="setOffset(0)"
            >
              Today
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 1 }"
              @click="setOffset(1)"
            >
              Tomorrow
            </button>
          </div>
        </div>
        <div class="game-table">
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
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
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
                  <div class="game-delete" @click="editGame(VipGames, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deletePrediction(data._id)">
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
      </div>
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Tennis bets ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset > 0 }"
              @click="previousDay"
            >
              previous
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 0 }"
              @click="setOffset(0)"
            >
              Today
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 1 }"
              @click="setOffset(1)"
            >
              Tomorrow
            </button>
          </div>
        </div>
        <div class="game-table">
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
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
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
                  <div class="game-delete" @click="editSport(TennisGames, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deleteSport(data._id)">
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
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Basketball bets ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset > 0 }"
              @click="previousDay"
            >
              previous
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 0 }"
              @click="setOffset(0)"
            >
              Today
            </button>
            <button
              class="btn-h game-h-b"
              :class="{ 'active-btn': offset === 1 }"
              @click="setOffset(1)"
            >
              Tomorrow
            </button>
          </div>
        </div>
        <div class="game-table">
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
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
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
                  <div class="game-delete" @click="editSport(BasketballGames, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deleteSport(data._id)">
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
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Ads Posted</h1>
          </div>
        </div>
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Type</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-for="item in adData">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.image" alt="game-p" class="game-pi pi-ads" />
                  </div>
                </td>
                <td>
                  <span>
                    {{ data.title }}
                  </span>
                </td>
                <td>
                  <div class="game-delete" @click="editAds(AdsPage, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deleteAds(data._id)">
                    <DeleteIcon class="icon-delete" />
                  </div>
                </td>
              </tr>
              <tr v-if="adData.length === 0">
                <td colspan="8">No Ads Posted!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Time Posted</h1>
          </div>
        </div>
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-for="item in TimeData">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <span>{{ data.time }}</span>
                </td>
                <td>
                  <div class="game-delete" @click="editTime(TimePage, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deleteTime(data._id)">
                    <DeleteIcon class="icon-delete" />
                  </div>
                </td>
              </tr>
              <tr v-if="TimeData.length === 0">
                <td colspan="8">No games yet!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Vip Result Posted</h1>
          </div>
        </div>
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>Date&Day</th>
                <th>Result</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-for="item in vipResultData">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <span>{{ data.gameName }}</span>
                </td>
                <td>
                  <span>{{ data.gameScore }}</span>
                </td>
                <td>
                  <div class="game-delete" @click="editVipResult(VipEditPage, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deleteVipResult(data._id)">
                    <DeleteIcon class="icon-delete" />
                  </div>
                </td>
              </tr>
              <tr v-if="vipResultData.length === 0">
                <td colspan="8">No Result yet!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Payment Posted</h1>
          </div>
        </div>
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Weekly price</th>
                <th>Monthly price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-for="item in paymentData">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <span>{{ data.country }}</span>
                </td>
                <td>
                  <span>{{ data.weeklyPrice }}</span>
                </td>
                <td>
                  <span>{{ data.monthlyPrice }}</span>
                </td>
                <td>
                  <div class="game-delete" @click="editPayment(PaymentEditsPage, data._id)">
                    <FileIcon class="icon-delete" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deletePayment(data._id)">
                    <DeleteIcon class="icon-delete" />
                  </div>
                </td>
              </tr>
              <tr v-if="paymentData.length === 0">
                <td colspan="8">No payment yet!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div class="game-edit" :class="[isGameOpen ? 'showEdit' : 'closeEdit']">
      <div class="mobile-exit">
        <ExitIcon class="icon-exit" @click="showEdit" />
      </div>
      <div class="game-main-p">
        <component
          @formSubmit="updateGame"
          @formSubmitSport="updateSport"
          @formSubmitTime="updateTime"
          @formSubmitAds="updateAds"
          @formPaymentSubmit="updatePayment"
          @formVipResultSubmit="updateVipResult"
          :is="activePage"
        />
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
import { useToast } from 'vue-toastification'
import DeleteIcon from '../icons/DeleteIcon.vue'
import BetOfTheDay from '../components/BetOfTheDayEdit.vue'
import Predictionpicks from '../components/PredictionpicksEdits.vue'
import Freetips from '../components/FreetipsEdit.vue'
import TimePage from '../components/TimeEdit.vue'
import UpcomingGames from '../components/UpcomingGamesEdits.vue'
import TennisGames from '../components/TennisGamesEdits.vue'
import BasketballGames from '../components/BasketballEdit.vue'
import VipEditPage from '../components/VipresultsComponentEdits.vue'
import VipGames from './VipGamesEdits.vue'
import PaymentEditsPage from './PostPaymentsEdits.vue'

const username = ref(null)
const currentDate = ref('')
const offset = ref(0)
const adData = ref([])
const TimeData = ref([])
const isGameOpen = ref(false)
const cardData = ref([])
const toast = useToast()
const vipData = ref([])
const paymentData = ref([])
const predictionData = ref([])
const freeTipData = ref([])
const upcomingData = ref([])
const vipResultData = ref([])
const tennisData = ref([])
const basketBallData = ref([])
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const getBetOfTheDay = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/predictions/bet/betOfTheDay/${currentDate.value}`
    )
    // console.log(response.data)
    cardData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const getVipGames = async () => {
  try {
    const response = await axios.get(
      `${SERVER_HOST}/predictions/vipPredictions/vip/${currentDate.value}`
    )
    // console.log(response.data)
    vipData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const getPredictions = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/predictions/${currentDate.value}`)
    // console.log(response.data)
    predictionData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const getPayment = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/currencyPrices`)
    paymentData.value = response.data.length > 0 ? [response.data] : []
    console.log(paymentData.value.data)
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const getFreeTips = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/predictions/tips/freeTip/${currentDate.value}`)
    // console.log(response.data)
    freeTipData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const getUpcoming = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(
      `${SERVER_HOST}/predictions/upcomingPredictions/upcoming/${currentDate.value}`
    )
    // console.log(response.data)
    upcomingData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const getTennisBets = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/sports/sport/Tennis/${currentDate.value}`)
    // console.log(response.data)
    tennisData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const getBasketballBets = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/sports/sport/Basketball/${currentDate.value}`)
    // console.log(response.data)
    basketBallData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const getAds = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/ads`)
    // console.log(response.data)
    adData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const getTime = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/time`)
    // console.log(response.data)
    TimeData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const getVipResult = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/score/`)
    // console.log(response.data)
    vipResultData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const showEdit = () => {
  isGameOpen.value = !isGameOpen.value
}

const activePage = shallowRef(BetOfTheDay)
const paymentId = ref('')
const gameId = ref('')
const sportId = ref('')
const ScoreId = ref('')
const TimeId = ref('')
const AdsId = ref('')

const editGame = (game, id) => {
  activePage.value = game
  gameId.value = id
  showEdit()
}

const editPayment = (payment, id) => {
  activePage.value = payment
  paymentId.value = id
  showEdit()
}

const editSport = (sport, id) => {
  activePage.value = sport
  sportId.value = id
  showEdit()
}

const editTime = (time, id) => {
  activePage.value = time
  TimeId.value = id
  showEdit()
}

const editVipResult = (vip, id) => {
  activePage.value = vip
  ScoreId.value = id
  showEdit()
}

const editAds = (ads, id) => {
  activePage.value = ads
  AdsId.value = id
  showEdit()
}

async function updatePayment(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataa = new FormData()
    if (formData.country !== '') {
      formDataa.append('country', formData.country)
    }
    if (formData.weeklyPrice !== '') {
      formDataa.append('weeklyPrice', formData.weeklyPrice)
    }
    if (formData.monthlyPrice !== '') {
      formDataa.append('monthlyPrice', formData.monthlyPrice)
    }
    const response = await axios.put(
      `${SERVER_HOST}/single/currencyPrices/update/${paymentId.value}`,
      formDataa,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    toast.success('payment updated')
  } catch (error) {
   toast.error(error.response.data.error)
  }
}

async function updateGame(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataa = new FormData()
    if (formData.teamA !== '') {
      formDataa.append('teamA', formData.teamA)
    }
    if (formData.teamAIcon !== null) {
      formDataa.append('teamAIcon', formData.teamAIcon)
    }
    if (formData.leagueIcon !== null) {
      formDataa.append('leagueIcon', formData.leagueIcon)
    }
    if (formData.status !== '') {
      formDataa.append('status', formData.status)
    }
    if (formData.formationA !== '') {
      formDataa.append('formationA', formData.formationA)
    }
    if (formData.teamAPosition !== '') {
      formDataa.append('teamAPosition', formData.teamAPosition)
    }
    if (formData.teamAscore !== '') {
      formDataa.append('teamAscore', formData.teamAscore)
    }
    if (formData.teamB !== '') {
      formDataa.append('teamB', formData.teamB)
    }
    if (formData.teamBIcon !== null) {
      formDataa.append('teamBIcon', formData.teamBIcon)
    }
    if (formData.formationB !== '') {
      formDataa.append('formationB', formData.formationB)
    }
    if (formData.teamBPosition !== '') {
      formDataa.append('teamBPosition', formData.teamBPosition)
    }
    if (formData.teamBscore !== '') {
      formDataa.append('teamBscore', formData.teamBscore)
    }
    if (formData.time !== '') {
      formDataa.append('time', formData.time)
    }
    if (formData.league !== '') {
      formDataa.append('league', formData.league)
    }
    if (formData.date !== '') {
      formDataa.append('date', formData.date)
    }
    if (formData.tip !== '') {
      formDataa.append('tip', formData.tip)
    }
    if (formData.showScore !== '') {
      formDataa.append('showScore', formData.showScore)
    }
    if (formData.description !== '') {
      formDataa.append('description', formData.description)
    }
    const response = await axios.put(
      `${SERVER_HOST}/predictions/update/${gameId.value}`,
      formDataa,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    toast.success('game updated')
  } catch (error) {
   toast.error(error.response.data.error)
  }
}

async function updateVipResult(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDatass = new FormData()
    if (formData.Result !== '') {
      formDatass.append('gameScore', formDatass.Result)
    }
    if (formData.dayDate !== '') {
      formDatass.append('gameName', formDatass.dayDate)
    }

    const response = await axios.put(
      `${SERVER_HOST}/score/updatescore/${ScoreId.value}`,
      formDatass,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    toast.success('Vip result updated')
    getVipGames()
  } catch (error) {
    toast.error(error.response.data.message)

  }
}

async function updateTime(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDatas = new FormData()
    if (formData.time !== '') {
      formDatas.append('time', formDatas.time)
    }

    const response = await axios.put(`${SERVER_HOST}/time/update/${TimeId.value}`, formDatas, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    toast.success('Time updated')
  } catch (error) {
   toast.error(error.response.data.error)
  }
}

async function updateAds(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataaa = new FormData()
    if (formData.adsImage !== null) {
      formDataaa.append('image', formData.adsImage)
    }

    const response = await axios.put(`${SERVER_HOST}/ads/update/${AdsId.value}`, formDataaa, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(response.data)
    toast.success('Ads updated')
  } catch (error) {
   toast.error(error.response.data.error)
  }
}

async function updateSport(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataa = new FormData()
    if (formData.teamA !== '') {
      formDataa.append('teamA', formData.teamA)
    }
    if (formData.teamAIcon !== null) {
      formDataa.append('teamAIcon', formData.teamAIcon)
    }
    if (formData.status !== '') {
      formDataa.append('status', formData.status)
    }
    if (formData.leagueIcon !== null) {
      formDataa.append('leagueIcon', formData.leagueIcon)
    }
    if (formData.formationA !== '') {
      formDataa.append('formationA', formData.formationA)
    }
    if (formData.teamAPosition !== '') {
      formDataa.append('teamAPosition', formData.teamAPosition)
    }
    if (formData.teamAscore !== '') {
      formDataa.append('teamAscore', formData.teamAscore)
    }
    if (formData.teamB !== '') {
      formDataa.append('teamB', formData.teamB)
    }
    if (formData.teamBIcon !== null) {
      formDataa.append('teamBIcon', formData.teamBIcon)
    }
    if (formData.formationB !== '') {
      formDataa.append('formationB', formData.formationB)
    }
    if (formData.teamBPosition !== '') {
      formDataa.append('teamBPosition', formData.teamBPosition)
    }
    if (formData.teamBscore !== '') {
      formDataa.append('teamBscore', formData.teamBscore)
    }
    if (formData.time !== '') {
      formDataa.append('time', formData.time)
    }
    if (formData.league !== '') {
      formDataa.append('league', formData.league)
    }
    if (formData.date !== '') {
      formDataa.append('date', formData.date)
    }
    if (formData.tip !== '') {
      formDataa.append('tip', formData.tip)
    }
    if (formData.showScore !== '') {
      formDataa.append('showScore', formData.showScore)
    }

    if (formData.description !== '') {
      formDataa.append('description', formData.description)
    }

    const response = await axios.put(`${SERVER_HOST}/sports/update/${sportId.value}`, formDataa, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    toast.success('game updated')
  } catch (error) {
   toast.error(error.response.data.error)
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
  getPayment()
  getBetOfTheDay()
  getPredictions()
  getVipGames()
  getFreeTips()
  getUpcoming()
  getTennisBets()
  getBasketballBets()
  getVipResult()
})

const deletePrediction = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(`${SERVER_HOST}/predictions/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    toast.success(response.data.message)
    await getPredictions()
    await getFreeTips()
    await getUpcoming()
    await getBetOfTheDay()
    await getVipGames()

  } catch (err) {
  toast.error(err.response.data.error)

  }
}

const deleteSport = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(`${SERVER_HOST}/sports/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    toast.success(response.data.message)
    await getTennisBets()
    await getBasketballBets()
  } catch (err) {
  toast.error(err.response.data.error)

  }
}

const deleteAds = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(`${SERVER_HOST}/ads/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    toast.success(response.data.message)
    await getAds()
  } catch (err) {
  toast.error(err.response.data.error)

  }
}

const deletePayment = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(`${SERVER_HOST}/currencyPrices/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    toast.success(response.data.message)
    await getPayment()
  } catch (err) {
  toast.error(err.response.data.error)

  }
}

const deleteTime = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(`${SERVER_HOST}/time/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    toast.success(response.data.message)
    await getTime()
  } catch (err) {
  toast.error(err.response.data.error)

  }
}

const deleteVipResult = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(`${SERVER_HOST}/score/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    toast.success(response.data.message)
    await getVipResult()
  } catch (err) {
  toast.error(err.response.data.error)

  }
}

const showscore = ref(localStorage.getItem('showscore') === 'true')

watch(showscore, (value) => {
  localStorage.setItem('showscore', value.toString())
})

watch(currentDate, () => {
  // getAds()
  // getTime()
  getBetOfTheDay()
  getVipResult()
  getVipGames()
  getPredictions()
  getFreeTips()
  getUpcoming()
  getTennisBets()
  getBasketballBets()
})
</script>
<style scoped>
@import '../style/gameManagement.css';
</style>
