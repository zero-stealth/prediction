<template>
  <div class="Account-container">
    <div class="Account-header">
      <h1><span>Welcome</span><br />{{ username }},</h1>
    </div>
    <div class="Account-game-p">
      <!-- loop this  -->
      <div class="acc-m gm-m">
        <h2>Bet of the day</h2>
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
          <tbody>
            <tr v-for="account in accountData" :key="account.id">
              <td>
                <div class="Account-tbl-img">
                  <img :src="Profile" alt="Account-p" class="Account-pi" />
                  <span>{{ account.username }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="Profile" alt="Account-p" class="Account-pi" />
                  <span>{{ account.username }}</span>
                </div>
              </td>
              <td>
                <div class="Account-tbl-img">
                  <img :src="Profile" alt="Account-p" class="Account-pi" />
                  <span>{{ account.username }}</span>
                </div>
              </td>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>tip 2.5</span>
              </td>
              <td>
                <div class="Account-delete" @click="editGame(BetOfTheDay)">
                  <FileIcon class="icon-delete" />
                </div>
              </td>
              <td>
                <div class="Account-delete" @click="deleteAccount(account._id)">
                  <DeleteIcon class="icon-delete" />
                </div>
              </td>
            </tr>
            <tr v-if="accountData.length === 0">
              <td colspan="8">No games yet!</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- loop this  -->

    </div>
  </div>
  <Teleport to="body">
  <div class="game-edit" :class="[isGameOpen ? 'showEdit' : 'closeEdit']">
    <div class="mobile-exit">
      <ExitIcon class="icon-exit" @click="showEdit()" />
    </div>
    <div class="game-main-p">
      <component :is="activePage" />
    </div>
  </div>
</Teleport>
</template>

<script setup>
import axios from 'axios';
import { ref, watchEffect, onMounted, computed, watch, shallowRef } from 'vue';
import Profile from '../assets/profile.jpg';
import ExitIcon from '../icons/ExitIcon.vue';
import FileIcon from '../icons/FileIcon.vue';
import DeleteIcon from '../icons/DeleteIcon.vue';
import BetOfTheDay from '../components/BetOfTheDayEdit.vue';

const username = ref(null);
const accountInfo = ref([]);
const message = ref();
const isGameOpen = ref(false);

const showEdit = () => {
  isGameOpen.value = !isGameOpen.value;
};

const activePage = shallowRef(BetOfTheDay);

const editGame = (game) => {
  activePage.value = game;
  showEdit();
};

const accountsData = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`https://predictions-server.onrender.com/auth`, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    console.log(response.data);
    accountInfo.value = response.data.map((account) => ({
      ...account,
      status: account.paid,
    }));
    console.log(accountInfo.value);
  } catch (err) {
    console.log(err);
  }
};

watchEffect(() => {
  username.value = localStorage.getItem('username');
});

onMounted(() => {
  accountsData();
});

const accountData = computed(() => {
  return accountInfo.value;
});

const deleteAccount = async (id) => {
  try {
    const response = await axios.delete(`https://predictions-server.onrender.com/auth/delete/${id}`);
    message.value = response.message;
    await accountsData();
  } catch (err) {
    message.value = err.message;
  }
  alert(message.value);
};

const showscore = ref(localStorage.getItem('showscore') === 'true');

watch(showscore, (value) => {
  localStorage.setItem('showscore', value.toString());
});

async function toggleStatus(account) {
  account.status = !account.status;

  try {
    const response = await axios.put(`https://predictions-server.onrender.com/auth/update/${account._id}`, {
      paid: account.status,
    });

    await accountsData();
  } catch (err) {
    console.log(err);
  }
}
</script>

<style>
@import '../style/account.css';
@import '../style/Bet.css';
</style>
