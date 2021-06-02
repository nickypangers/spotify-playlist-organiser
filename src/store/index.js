import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    user: { name: "testingggggggggffffdfdsfdsfsdfdsfsdsd" },
  },
  mutations: {
    toggleIsLoggedIn(state, val) {
      state.isLoggedIn = val;
    },
  },
  actions: {},
  modules: {},
});
