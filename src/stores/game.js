import { ref } from "vue";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const state = {
    Date: ref(null),
    TeamA: ref(null),
    TeamB: ref(null),

    
  };

  const updateGame = (Date, TeamA, TeamB) => {
    state.Date.value = Date;
    state.TeamA.value = TeamA;
    state.TeamB.value = TeamB;
  };

  return {
    ...state,
    updateGame,
  };
});
