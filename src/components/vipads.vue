<template>
  <div class="ads-v-main">
    <div class="ads-m1">
      <div class="ads-m1-h">
        <h1>{{ $t('ads.h1-1') }}</h1>
      </div>
      <p>
        {{ $t('ads.span-1') }} {{ $t('ads.span-2') }} from our sure {{ $t('ads.span-4') }} 
        {{ $t('ads.span-5') }}.
      </p>
      <p>{{ $t('ads.p1-1') }}</p>
      <button class="ads-m-btn" @click="goVip">{{ $t('ads.span-4') }}</button>
    </div>
    <div class="ads-m1 m1-ads">
      <p>
        {{ $t('ads.p1-2') }}
      </p>
      <div class="m1-ads-info">
        <h1>{{ $t('ads.h1-2') }}</h1>
        <div class="m1-ads-time">
          <div class="ads-time">
            <h1>{{ hours }}</h1>
            <span>{{ $t('ads.span-6') }}</span>
          </div>
          <div class="ads-time">
            <h1>{{ minutes }}</h1>
            <span>{{ $t('ads.span-7') }}</span>
          </div>
          <div class="ads-time">
            <h1>{{ seconds }}</h1>
            <span>{{ $t('ads.span-8') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const currentTime = ref(null) // Initialize as null
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const goVip = () => {
  router.push({ name: 'Pay' })
}

const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return { hours, minutes };
};

const getTimeData = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/time`)
    console.log(response.data[0].time)
    currentTime.value = parseTime(response.data[0].time); // Parse the time
    startCountdown()
  } catch (err) {
    console.error(err)
  }
}



const startCountdown = () => {
  const waitForCurrentTime = () => {
    if (!currentTime.value) {
      // If currentTime is not loaded, wait and check again after 1 second
      setTimeout(waitForCurrentTime, 1000)
    } else {
      // When currentTime is loaded, calculate endTime and start the countdown
      const now = new Date();
      const endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        currentTime.value.hours,
        currentTime.value.minutes
      ).getTime();
      
      const updateCountdown = () => {
        const currentTimeMillis = new Date().getTime()
        const timeLeft = endTime - currentTimeMillis

        if (timeLeft <= 0) {
          clearInterval(intervalId)
          hours.value = minutes.value = seconds.value = 0
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
      const intervalId = setInterval(updateCountdown, 1000)
    }
  }

  waitForCurrentTime()
}

onMounted(() => {
  getTimeData()
})

watch(currentTime, () => {
  startCountdown()
})
</script>

<style>
@import '../style/vipads.css';
</style>