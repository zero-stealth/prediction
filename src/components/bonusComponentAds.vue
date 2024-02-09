<template>
  <div class="bonus">
    <div class="bo-img">
      <img :src="bonusData.imgSrc" :alt="bonusData.alt" class="img-offer" :class="[bonusData.imgSrc === '' ? 'img-offer-skeleton' : '']" />
    </div>
    <div class="bo-off">
      <span>{{bonusData.info}}</span>
    </div>
    <div class="bonus-form-c">
      <div v-if="bonusData.code == ''" class="bonus-noc">
        <span>No code required</span>
      </div>
      <div class="bonus-form" v-else>
        <div class="Promo-h">
          <span>Promo code</span>
          <h2 class="input-code">{{ bonusData.code }}</h2>
        </div>
        <button type="submit" class="bonus-btn" @click="copyCode">
          <copyIcon class="icon-bonus" />
        </button>
      </div>
    </div>
    <a :href="bonusData.link" class="btn-offer-spy">get offer</a>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import copyIcon from '../icons/COPYIcon.vue'

const toast = useToast()


const props = defineProps(['bonusData'])

const bonusCode = ref(props.bonusData.code)

const copyCode = () => {
  const tempElement = document.createElement('textarea')
  tempElement.value = bonusCode.value

  document.body.appendChild(tempElement)

  tempElement.select()
  document.execCommand('copy')

  document.body.removeChild(tempElement)
  toast.success('Copied to clipboard')
  
}
</script>

<style scoped>
@import '../style/bonusAds.css';
</style>
