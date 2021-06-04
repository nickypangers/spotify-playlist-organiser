import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    user: null,
    accessToken: null,
  },
  mutations: {
    toggleIsLoggedIn(state, val) {
      state.isLoggedIn = val;
    },
    setUser(state, val) {
      state.user = val;
    },
    setAccessToken(state, val) {
      state.accessToken = val;
    },
  },
  actions: {},
  modules: {},
});
