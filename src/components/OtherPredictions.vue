<template>
    <button class="other-p-btn" @click="goTo()">{{ buttonName }}</button>
</template>

<script setup>
import { useRouter } from 'vue-router'; 

const router = useRouter();

const props = defineProps({
  buttonName: {
    type: String,
    required: true,
  },

});



const goTo = () => {
  router.push({ name: 'Bet', params: { betName: props.buttonName } })
  scrollToTop()

}


const scrollToTop = () => {
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
}

</script>
<style>
@import '../style/other.css';
</style>
