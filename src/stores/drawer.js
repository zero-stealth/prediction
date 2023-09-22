import { ref } from "vue";
import { defineStore } from "pinia";

export const useDrawerStore = defineStore("drawer", () => {
  const state = {
    popDrawer: ref(true),
    popSticky: ref(true),
  };

  const togglePop = () => {
    state.popDrawer.value = !state.popDrawer.value;
  };

  const toggleSticky = () => {
    state.popSticky.value = !state.popSticky.value;
  };

  return {
    ...state, // Spread the state object to expose its properties
    toggleSticky,
    togglePop,
  };
});
