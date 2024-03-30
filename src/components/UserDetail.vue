<template>
  <div class="user-container" :class="[drawerStore.showUserSpecific === false ? 'hide-user' : '']">
    <div class="user-arrow-container" @click="goBack()">
      <ArrowIcon class="user-arrow" />
      <span>Go back</span>
    </div>
    <div class="user-card" v-for="account in filteredAccountData" :key="account.id">
      <div class="user-img">
        <profileIcon class="user-icon" />
      </div>
      <div class="user-info">
        <div class="user-info-dn">
          <div class="user-in">
            <span>name</span>
            <h1>{{ account.username }}</h1>
          </div>
          <p>{{ account.country }}</p>
        </div>
        <div class="user-in">
          <span>Email</span>
          <h1>{{ account.email }}</h1>
        </div>
        <div class="user-span">
          <div>
            <span>Paid</span>
            <h1>{{ account.paid ? 'paid' : 'not paid' }}</h1>
          </div>
          <div>
            <span>Payment period</span>
            <h1>{{ account.plan }}</h1>
          </div>
          <div>
            <span>Date activation</span>
            <h1>{{ account.activationDate }}</h1>
          </div>
          <div>
            <span>Date of deactivation</span>
            <h1>
              {{ formatDate(account.activationDate, account.plan) }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="acc-m">
      <table>
        <thead>
          <tr>
            <th>Vip status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in filteredAccountData" :key="account.id">
            <td>
              <div class="Account-t-con">
                <div class="form-group">
                  <select v-model="plan" class="frm-g-input" id="plan">
                    <option disabled value="">Choose a plan</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="no plan">No plan</option>
                  </select>
                </div>
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
              <div class="Account-delete" @click="deleteAccount(account._id)">
                <DeleteIcon class="icon-delete" />
              </div>
            </td>
          </tr>
          <tr v-if="filteredAccountData.length === 0">
            <td colspan="6">No accounts yet!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'
import DeleteIcon from '../icons/DeleteIcon.vue'
import { useDrawerStore } from '../stores/drawer'
import ProfileIcon from '../icons/profileIcon.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'

const accountInfo = ref([])
const userData = ref([])
const statusC = ref(null)
const plan = ref('')
const toast = useToast()
const drawerStore = useDrawerStore()
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const goBack = () => {
  drawerStore.toggleUserSpecific()
}

const accountsData = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('token'))
    const response = await axios.get(`${SERVER_HOST}/auth`, {
      headers: {
        Authorization: `Bearer ${user}`
      }
    })
    statusC.value = response.data.paid
    userData.value = response.data
    accountInfo.value = response.data.map((account) => ({
      ...account,
      status: account.paid
    }))
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

const filteredAccountData = computed(() => {
  return accountInfo.value.filter((account) => account._id === props.id)
})

onMounted(() => {
  accountsData()
})

const formatDate = (activationDate, plan) => {
  const activationDateObj = new Date(activationDate)
  const daysToAdd = plan === 'weekly' ? 7 : 30
  const expiryDateObj = new Date(activationDateObj.setDate(activationDateObj.getDate() + daysToAdd))
  const year = expiryDateObj.getFullYear()
  const month = String(expiryDateObj.getMonth() + 1).padStart(2, '0')
  const day = String(expiryDateObj.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}T00:00:00Z`
}

const deleteAccount = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await axios.delete(`${SERVER_HOST}/auth/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    toast.success(response.data.message)
    await accountsData()
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

async function toggleStatus(account) {
  if(plan.value === '') {
    toast.error('choose a plan')
    return
  }

  account.status = !account.status;

  try {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`;

    const response = await axios.put(`${SERVER_HOST}/auth/update/${account._id}`, {
      paid: account.status,
      plan: plan.value,
      activationDate: formattedDate,
      days: plan.value === 'weekly' ? 7 : 30
    });
    await accountsData();
    localStorage.setItem('paid', account.status.toString());
  } catch (err) {
    console.log(err);
  }
}

</script>
<style scoped>
@import '../style/user.css';
@import '../style/account.css';
</style>
