import { ref } from "vue";
import { defineStore } from "pinia";

export const useDrawerStore = defineStore("drawer", () => {
  const popDrawer = ref(true);

  const togglePop = () => {
    popDrawer.value = !popDrawer.value;
  };

  return {
    popDrawer,
    togglePop,
  };
});
