<template>
  <div class="Account-container">
    <div class="Account-header">
      <h1><span>Welcome</span><br />{{ username }},</h1>
    </div>
    <div class="Account-info">
      <div class="Account-card" v-for="card in accountCards" :key="card.id">
        <h5>{{ card.title }}</h5>
        <div class="Account-card-icon">
          <h1>{{ card.count }}</h1>
          <component :is="card.icon" class="icon-acc" />
        </div>
      </div>
    </div>
    <div class="acc-m">
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Vip status</th>
            <th>Payment</th>
            <th>Period</th>
            <th>Account active</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accountInfo" :key="account.id">
            <td>
              <div class="Account-tbl-img">
                <img :src="Profile" alt="Account-p" class="Account-pi" />
                <span>{{ account.username }}</span>
              </div>
            </td>
            <td>{{ account.paid }}</td>
            <td>{{ account.paid }}</td>
            <td v-if="account.paid == true">
              1 Month
            </td>
            <td v-else>
              0 Month
            </td>
            <td>{{ account.period }}</td>
            <td>
              <div class="Account-t-con">
                <div
                  class="Account-toggle"
                  @click="toggleStatus(account)"
                  :class="{ on: account.status, off: !account.status }"
                >
                  <div class="Account-mode"></div>
                  <span>{{ account.status ? 'Active' : 'Not Active' }}</span>
                </div>
              </div>
            </td>
            <td>
              <div class="Account-delete">
                <DeleteIcon class="icon-delete" />
              </div>
            </td>
          </tr>
          <tr v-if="accountInfo.length === 0">
            <td colspan="6">No accounts yet!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, watchEffect, onMounted } from 'vue'
import NotPaid from '../icons/NotPaid.vue'
import VipIcon from '../icons/VipIcon.vue'
import Profile from '../assets/profile.jpg'
import PaidIcon from '../icons/PaidIcon.vue'
import AdminIcon from '../icons/AdminIcon.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
import ProfileIcon from '../icons/profileIcon.vue'

const username = ref(null)
const accountCards = ref([])
const accountInfo = ref([])

const accountsData = async() => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`https://predictions-server.onrender.com/auth/credentials`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data);
    cardData.value.push(response.data)
    console.log(cardData.value)

  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  accountsData()
})

// Simulated data for account cards
accountCards.value = [
  { id: 1, title: 'Account active', count: 100, icon: ProfileIcon },
  { id: 2, title: 'Vip accounts', count: 100, icon: VipIcon },
  { id: 3, title: 'Paid accounts', count: 100, icon: PaidIcon },
  { id: 4, title: 'Not paid accounts', count: 100, icon: NotPaid },
  { id: 5, title: 'Administrator accounts', count: 100, icon: AdminIcon }
]

watchEffect(() => {
  username.value = localStorage.getItem('username')
})

function toggleStatus(account) {
  account.status = !account.status
}
</script>

<style>
@import '../style/account.css';
@import '../style/Bet.css';
</style>
