<template>
  <div class="Account-container">
    <div class="Account-header">
      <h1><span>Welcome</span><br />penguin,</h1>
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
          <tr v-for="account in accounts" :key="account.id">
            <td>
              <div class="Account-tbl-img">
                <img :src="account.imageUrl" alt="Account-p" class="Account-pi" />
                <span>{{ account.username }}</span>
              </div>
            </td>
            <td>{{ account.vipStatus }}</td>
            <td>{{ account.payment }}</td>
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
          <tr v-if="accounts.length === 0">
            <td colspan="5">No predictions yet!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NotPaid from '../icons/NotPaid.vue'
import VipIcon from '../icons/VipIcon.vue'
import Profile from '../assets/profile.jpg'
import PaidIcon from '../icons/PaidIcon.vue'
import AdminIcon from '../icons/AdminIcon.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
import ProfileIcon from '../icons/profileIcon.vue'

const accountCards = ref([])

// Simulated data for account cards
accountCards.value = [
  { id: 1, title: 'Account active', count: 100, icon: ProfileIcon },
  { id: 2, title: 'Vip accounts', count: 100, icon: VipIcon },
  { id: 3, title: 'Paid accounts', count: 100, icon: PaidIcon },
  { id: 4, title: 'Not paid accounts', count: 100, icon: NotPaid },
  { id: 5, title: 'Administrator accounts', count: 100, icon: AdminIcon }
]

const accounts = ref([])

// Simulated data for accounts
accounts.value = [
  {
    id: 1,
    username: 'penguin',
    imageUrl: Profile,
    vipStatus: 'active',
    payment: 'paid',
    period: '1 month',
    status: true
  },
  {
    id: 2,
    username: 'macmillian',
    imageUrl: Profile,
    vipStatus: 'inactive',
    payment: 'not paid',
    period: '3 months',
    status: false
  }
]

function toggleStatus(account) {
  account.status = !account.status
}
</script>

<style>
@import '../style/account.css';
@import '../style/Bet.css';
</style>
