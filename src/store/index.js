import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    playlist: null,
    searchResultList: [],
    toastEl: null,
    editPlaylistModalEl: null,
    isLoading: false,
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
    setEditPlaylistModalEl(state, val) {
      state.editPlaylistModalEl = val;
    },
    toggleIsLoading(state, val) {
      state.isLoading = val;
    },
  },
  actions: {},
  modules: {},
});
