import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { inject } from "vue";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: parseJSON(localStorage.getItem("token")),
    isPaid: localStorage.getItem("isPaid")
  }),
  getters: {},
  actions: {}
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

export function useAuth() {
  const store = inject(useAuthStore);
  const router = useRouter();
  const route = useRoute();

  // Your authentication-related functions and logic here

  return {
    store,
    router,
    route
  };
}

// Helper function to parse JSON safely
function parseJSON(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null; // Return null if JSON parsing fails
  }
}
