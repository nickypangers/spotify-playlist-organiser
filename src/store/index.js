import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    playlist: null,
    searchResultList: [],
    toastEl: null,
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
    setPlaylist(state, val) {
      state.playlist = val;
    },
    setSearchResultList(state, val) {
      state.searchResultList = val;
    },
    setToastEl(state, val) {
      state.toastEl = val;
    },
  },
  actions: {},
  modules: {},
});
