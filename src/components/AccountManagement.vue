<template>
  <div class="Account-container" v-if="drawerStore.showUserSpecific">
    <div class="Account-info">
      <div
        class="Account-card"
        v-for="card in accountCards"
        :key="card.id"
        @click="selectCard(card.id)"
        :class="{ selected: selectedCard === card.id }"
      >
        <h5>{{ card.title }}</h5>
        <div class="Account-card-icon">
          <h1>{{ getCount(card.id) }}</h1>
          <component :is="card.icon" class="icon-acc" />
        </div>
      </div>
    </div>
    <div class="search-section">
      <input
          v-model="searchAccount"
          type="text"
          class="form-g-input searchAccount-input"
          placeholder="Search account by name"
          id="Accountname"
        />
      <button @click="fetchEmails" class="btn-email">
        copy emails
      </button>
    </div>
    <div class="acc-m hide-ds">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Country</th>
            <th>Payment</th>
            <th>Period</th>
            <th>Date activation</th>
            <th>Vip status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in filterAccount" :key="account.id">
            <td @click="showUserData(account._id)">
              <div class="Account-tbl-img">
                <span>{{ account.email }}</span>
              </div>
            </td>
            <td>{{ account.country }}</td>
            <td>{{ account.paid ? 'paid' : 'not paid' }}</td>
            <td>{{ account.plan === '' ? 'not plan' : account.plan }}</td>
            <td>{{ account.activationDate }}</td>
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
          <tr v-if="accountData.length === 0">
            <td colspan="6">No accounts yet!</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="acc-m hide-mb">
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in filterAccount" :key="account.id">
            <td @click="showUserData(account._id)">
              <div class="Account-tbl-img">
                <span>{{ account.username }}</span>
              </div>
            </td>
            <td>
              <div class="Account-delete" @click="deleteAccount(account._id)">
                <DeleteIcon class="icon-delete" />
              </div>
            </td>
          </tr>
          <tr v-if="accountData.length === 0">
            <td colspan="6">No accounts yet!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <UserDetail :id="userID" :show="drawerStore.showUserSpecific" v-else />
</template>

<script setup>
import axios from 'axios'
import { ref, watchEffect, onMounted, computed } from 'vue'
import NotPaid from '../icons/NotPaid.vue'
import VipIcon from '../icons/VipIcon.vue'
import PaidIcon from '../icons/PaidIcon.vue'
import { useToast } from 'vue-toastification'
import AdminIcon from '../icons/AdminIcon.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
import ProfileIcon from '../icons/profileIcon.vue'
import UserDetail from '../components/UserDetail.vue'
import { useDrawerStore } from '../stores/drawer'

const drawerStore = useDrawerStore()
const accountCards = ref([])
const accountInfo = ref([])
const plan = ref('')
const searchAccount = ref('')
const userID = ref(null)
const toast = useToast()
const statusC = ref(null)
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const showUserData = (id) => {
  if (id !== null && id !== undefined) {
    userID.value = id
    drawerStore.toggleUserSpecific()
  }
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
    accountInfo.value = response.data.map((account) => ({
      ...account,
      status: account.paid
    }))
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  accountsData()
})

const accountData = computed(() => {
  return accountInfo.value
})

const fetchEmails = () => {
  const gmailEmails = accountData.value.filter(account => account.email.endsWith('@gmail.com')).map(account => account.email);
  const emailsString = gmailEmails.join(', ');
  navigator.clipboard.writeText(emailsString)
    .then(() => {
      toast.success('all gmails emails copied to clipboard successfully!');
    })
    .catch(err => {
      toast.error('Failed to copy emails to clipboard.');
    });
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

accountCards.value = [
  { id: 1, title: 'Account active', icon: ProfileIcon },
  { id: 2, title: 'Vip accounts', icon: VipIcon },
  { id: 3, title: 'Paid accounts', icon: PaidIcon },
  { id: 4, title: 'Not paid accounts', icon: NotPaid },
  { id: 5, title: 'Administrator accounts', icon: AdminIcon }
]

const getCount = (cardId) => {
  let count = 0

  switch (cardId) {
    case 1:
      count = accountData.value.filter((account) => account._id).length
      break
    case 2:
      count = accountData.value.filter((account) => account.paid).length
      break
    case 3:
      count = accountData.value.filter((account) => account.paid).length
      break
    case 4:
      count = accountData.value.filter((account) => !account.paid).length
      break
    case 5:
      count = accountData.value.filter((account) => account.isAdmin).length
      break
    default:
      count = 0
  }

  return count
}

const selectedCard = ref(accountCards.value[0].id)

const selectCard = (cardId) => {
  if (selectedCard.value === cardId) {
    selectedCard.value = null
  } else {
    selectedCard.value = cardId
  }
}

const filterAccount = ref([])

watchEffect(() => {
  filterAccount.value = computed(() => {
    if (selectedCard.value !== null) {
      switch (selectedCard.value) {
        case 1:
          return accountData.value.filter((account) => account._id)
        case 2:
        case 3:
          return accountData.value.filter((account) => account.paid)
        case 4:
          return accountData.value.filter((account) => !account.paid)
        case 5:
          return accountData.value.filter((account) => account.isAdmin)
        default:
          return accountData.value
      }
    }

    return accountData.value
  }).value
})

watchEffect(() => {
  filterAccount.value = computed(() => {
    if (searchAccount.value !== '') {
      return accountData.value.filter(
        (account) =>
          account.email.includes(searchAccount.value) ||
          account.email.toUpperCase().includes(searchAccount.value.toUpperCase())
      )
    } else {
      return accountData.value
    }
  }).value
})

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
@import '../style/account.css';
@import '../style/Bet.css';
</style>
