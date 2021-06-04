import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    user: null,
  },
  mutations: {
    toggleIsLoggedIn(state, val) {
      state.isLoggedIn = val;
    },
    setUser(state, val) {
      state.user = val;
    },
  },
  actions: {},
  modules: {},
});
