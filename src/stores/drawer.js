import { ref } from "vue";
import { defineStore } from "pinia";

export const useDrawerStore = defineStore("drawer", () => {
  const state = {
    popDrawer: ref(true),
    popSticky: ref(true),
    showUserSpecific : ref(true),
  };

  const togglePop = () => {
    state.popDrawer.value = !state.popDrawer.value;
  };

  const toggleUserSpecific = () => {
    state.showUserSpecific.value = !state.showUserSpecific.value;
  }
  const toggleSticky = () => {
    state.popSticky.value = !state.popSticky.value;
  };

  return {
    ...state, 
    toggleSticky,
    togglePop,
    toggleUserSpecific
  };
});
