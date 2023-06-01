import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios"
import { useRouter } from "vue-router";
const router = useRouter()

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("token")),
    isPaid: localStorage.getItem("isPaid")
  }),
  getters: {},

  actions: {

  }
})  

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
  }