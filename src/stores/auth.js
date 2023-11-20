import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const state = {
    token : ref(null)
  };

  

  const toggleToken = (token) => {
    state.token.value = token;
  };


  return {
    ...state, 
    toggleToken,
  };
});
