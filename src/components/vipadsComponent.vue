<template>
  <div class="ads-v-main">
    <div class="ads-m1">
      <div class="ads-m1-h">
        <h1>Don't gamble, invest instead</h1>
      </div>
      <p>
        Make 100% profits from our sure VIP football subscription 
      </p>
      <p>Enjoy up to 96% accuracy on our premium plan</p>
      <button class="ads-m-btn" @click="goVip">VIP subscription</button>
    </div>
    <div class="ads-m1 m1-ads">
      <p>
        VIP is recommended by our team of experts for those who consider betting as a way of gaining profit.
      </p>
      <div class="m1-ads-info">
        <h2>Vip results</h2>
        <div class="vip-results-d">
          <div
            class="vip-results-pn"
            v-for="data in vipResultData.slice(0, 6)"
            :key="data._id"
          >
            <span>{{ ShowName(data.gameName) }}</span>
            <div class="vip-results-cont">
              <span>{{ ShowDate(data.gameName) }}</span>
              <div class="results-s">
                <PassedIcon class="icon-rs icon-won" v-if="data.gameScore === 'Passed'" />
                <FailedIcon class="icon-rs icon-fail" v-else-if="data.gameScore === 'Failed'" />
                <CanceledIcon class="icon-rs icon-cancel" v-else-if="data.gameScore === 'Cancel'" />
                <EmptyIcon class="icon-rs" v-else />
              </div>
            </div>
          </div>
        </div>
        <h1>Today's match starts:</h1>
        <div class="m1-ads-time">
          <div class="ads-time">
            <h1>{{ hours }}</h1>
            <span>Hours</span>
          </div>
          <div class="ads-time">
            <h1>{{ minutes }}</h1>
            <span>Minutes</span>
          </div>
          <div class="ads-time">
            <h1>{{ seconds }}</h1>
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import PassedIcon from '../icons/PassedIcon.vue'
import FailedIcon from '../icons/FailedIcon.vue'
import EmptyIcon from '../icons/emptyIcon.vue'
import CanceledIcon from '../icons/canceledIcon.vue'

const router = useRouter()

const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const intervalId = ref(0)
const currentTime = ref(null)
const vipResultData = ref([])
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const goVip = () => {
  router.push({ name: 'Country' })
  scrollToTop()
}

const ShowDate = (gameName) => {
  const matches = gameName.match(/\((\d{1,2}\/\d{1,2})\)/)
  return matches ? matches[1] : gameName
}

const ShowName = (gameName) => {
  const matches = gameName.match(/(.+)(?:\(\d{1,2}\/\d{1,2}\))/)
  return matches ? matches[1] : gameName
}

const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number)
  return { hours, minutes }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const getTimeData = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/time`)
    currentTime.value = parseTime(response.data[0].time)
    startCountdown()
  } catch (err) {
    console.error(err)
  }
}

const getVipResult = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/score/`)
    // console.log(response.data)
    vipResultData.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const startCountdown = () => {
  const waitForCurrentTime = () => {
    if (!currentTime.value) {
      setTimeout(waitForCurrentTime, 1000)
    } else {
      const now = new Date()
      let endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        currentTime.value.hours,
        currentTime.value.minutes
      ).getTime()

      // Check if there's a stored end time in local storage
      const storedEndTime = localStorage.getItem('countdownEndTime')

      if (storedEndTime) {
        // Use the stored end time if available
        endTime = parseInt(storedEndTime)
      } else {
        // Store the end time in local storage
        localStorage.setItem('countdownEndTime', endTime.toString())
      }

      const updateCountdown = () => {
        const currentTimeMillis = new Date().getTime()
        const timeLeft = endTime - currentTimeMillis

        if (timeLeft <= 0) {
          clearInterval(intervalId.value)
          hours.value = minutes.value = seconds.value = 0

          // Remove the countdownEndTime from local storage
          localStorage.removeItem('countdownEndTime')

          return
        }

        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
        const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000)

        hours.value = hoursLeft
        minutes.value = minutesLeft
        seconds.value = secondsLeft
      }

      updateCountdown()
      intervalId.value = setInterval(updateCountdown, 1000)
    }
  }

  waitForCurrentTime()
}

onMounted(() => {
  getTimeData()
  getVipResult()
})

watch(currentTime, () => {
  startCountdown()
})
</script>

<style>
@import '../style/vipads.css';
</style>
