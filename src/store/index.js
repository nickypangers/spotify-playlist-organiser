import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    playlist: null,
    searchResultList: [],
    reconnectModal: null,
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
    setReconnectModal(state, val) {
      state.reconnectModal = val;
    },
  },
  actions: {},
  modules: {},
});
