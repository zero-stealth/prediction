<script setup>
import {onMounted, ref, watchEffect} from 'vue'
import { useRouter } from 'vue-router';
import pic from '@/assets/news.png';
import ArrowIcon from '@/icons/ArrowIcon.vue';
import axios from 'axios';

const router = useRouter();
const props  = defineProps({
  id: String
})
const teamA = ref("")
const teamB = ref("")
const teamAscore = ref("")

const teamBscore = ref("")
const teamAIcon = ref("")
const teamBIcon = ref("")
const league = ref("")
const leagueIcon = ref("")
const time = ref("")

async function getTip(){
  const response = await axios.get(`https://predictions-server.onrender.com/predictions/single/${props.id}`)
  console.log(response.data)
  teamA.value = response.data.teamA
  teamB.value = response.data.teamB
  teamAIcon.value = response.data.teamAIcon
  teamBIcon.value = response.data.teamBIcon
  teamAscore.value = response.data.teamAscore
  teamBscore.value = response.data.teamBscore
  league.value = response.data.league
  leagueIcon.value = response.data.leagueIcon
  time.value = response.data.time
}

onMounted(() => {
  getTip()
})
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="details-container">
    <div class="details-wrapper">
      <div
        class="details-image"
        :style="{
          backgroundImage: `linear-gradient(to bottom, transparent, #031e3c), url(${pic})`
        }"
      >
        <div class="details-h">
          <ArrowIcon class="details-arrow" @click="goBack()" />
          <h2>uefa champion</h2>
          <span></span>
        </div>
        <div class="details-image-d">
          <div class="details-d">
            <img :src="teamAIcon" alt="" class="details-d-img" />
            <span>{{ teamA }}</span>
          </div>
          <div class="details-score">
            <div class="score-p">
              <span>{{ teamAscore }}</span>
              <span>-</span>
              <span>{{ teamBscore }}</span>
            </div>
            <span>{{ time }}</span>
          </div>
          <div class="details-d">
            <img :src="teamBIcon" alt="" class="details-d-img" />
            <span>{{ teamA }}</span>
          </div>
        </div>
      </div>
      <div class="upcoming-in">
        <div class="team-form-u">
          <div class="form-as">
            <div class="team-header">
              <h1>team form</h1>
            </div>
            <div class="form-xs">
              <img :src="teamBIcon" alt="" class="formation-img" />
              <div class="formation-score">
                <span>{{ teamBscore }}</span>
                <span>-</span>
                <span>{{ teamAscore }}</span>
              </div>
              <img :src="teamAIcon" alt="" class="formation-img" />
            </div>
            <div class="form-xs">
              <img :src="teamBIcon" alt="" class="formation-img" />
              <div class="formation-score">
                <span>{{ teamAscore }}</span>
                <span>-</span>
                <span>{{ teamBscore }}</span>
              </div>
              <img :src="teamAIcon" alt="" class="formation-img" />
            </div>
          </div>
        </div>
        <div class="team-form-a">
          <div class="team-header">
            <h1>Liga</h1>
          </div>
          <div class="tbl-slider">
            <table>
              <tr>
                <th>team</th>
                <th></th>
                <th>pl</th>
                <th>w</th>
                <th>D</th>
                <th>+/-</th>
                <th>gd</th>
                <th>pts</th>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <div class="table-formation">
                    <img :src="teamAIcon" alt="" class="tbl-f-image" />
                    <span>{{teamA}}</span>
                  </div>
                </td>
                <td>20</td>
                <td>2</td>
                <td>45</td>
                <td>60-76</td>
                <td>+34</td>
                <td>23</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import '../style/tips.css';
@import '../style/predictions.css';
</style>
