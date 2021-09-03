<template>
  <div class="playlist">
    <div class="container">
      <div class="col-12">
        <div class="alert-warning w-100 py-2">
          Delete a playlist by unfollowing it. Please see
          <a
            href="https://developer.spotify.com/documentation/general/guides/working-with-playlists/#following-and-unfollowing-a-playlist"
            target="_blank"
            >here</a
          >
          for a detailed explanation from Spotify.
        </div>
      </div>

      <div
        class="col-12 mt-2 d-flex justify-content-between align-items-center"
      >
        <span class="title">Playlist</span>
        <div class="d-flex">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createPlaylistModal"
          >
            Create New Playlist
          </button>
          <RefreshButton @click="reloadSelectedPlaylist" class="ms-2" />
        </div>
      </div>

      <div class="col-12 mt-2">
        <div class="row" v-if="playlistList.length > 0">
          <div class="col-6">
            <PlaylistButton
              :playlist="playlist"
              v-for="(playlist, index) in playlistList"
              :is-selected="index == selectedIndex"
              :key="'playlist-' + index"
              @click="setSelectedPlaylist(playlist, index)"
              @success="initPlaylist"
            />
          </div>
          <div class="col-6">
            <div v-show="isLoading" class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div v-show="!isLoading" class="row">
              <div v-if="selectedPlaylistItemList.length > 0">
                <PlaylistItemButton
                  class="col-12"
                  v-for="(item, index) in selectedPlaylistItemList"
                  :key="'item-' + index"
                  :item="item"
                />
              </div>
              <div v-else>No Songs</div>
              <Pagination
                class="mt-3"
                :totalPages="selectedPlaylistTotalPages"
                v-model="selectedPlaylistCurrentPage"
                v-if="selectedPlaylistTotalPages > 0"
              />
            </div>
          </div>
        </div>
        <div v-else>No playlist</div>
      </div>
    </div>
  </div>
  <CreatePlaylistModal @success="initPlaylist" />
  <Toast message="Link copied to clipboard" :isSuccess="true" />
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";

import checkAccessTokenExpired from "@/helpers/accessToken";
import API from "@/helpers/api";
import track from "@/helpers/getTrackList";

import PlaylistButton from "@/components/PlaylistButton";
import PlaylistItemButton from "@/components/PlaylistItemButton";
import CreatePlaylistModal from "@/components/CreatePlaylistModal";
import RefreshButton from "@/components/RefreshButton";
import Pagination from "@/components/Pagination";
import Toast from "@/components/Toast";

export default {
  name: "Playlist",
  components: {
    PlaylistButton,
    PlaylistItemButton,
    CreatePlaylistModal,
    RefreshButton,
    Pagination,
    Toast,
  },
  setup() {
    const store = useStore();

    const playlistList = computed({
      get() {
        return store.state.playlistList;
      },
      set(val) {
        store.commit("setPlaylistList", val);
      },
    });
    // const playlistList = ref([]);
    const selectedIndex = ref(0);
    const selectedPlaylistItemList = ref([]);
    const isLoading = ref(false);
    const selectedPlaylistItemIndex = ref(0);
    const selectedPlaylistCurrentPage = ref(0);

    const user = computed(() => {
      return store.state.user;
    });
    const accessToken = computed(() => {
      return store.state.accessToken;
    });
    const selectedPlaylist = computed(() => {
      return playlistList.value[selectedIndex.value];
    });
    const selectedPlaylistTotalPages = computed(() => {
      let totalPage = Math.ceil(selectedPlaylist.value.tracks.total / 10);
      return totalPage;
    });
    const offset = computed(() => {
      return selectedPlaylistCurrentPage.value * 10;
    });

    function isPlaylistItemSelected(val) {
      return selectedPlaylistItemIndex.value == val;
    }

    function setSelectedPlaylist(playlist, index) {
      store.commit("setPlaylist", playlist);
      setSelectedIndex(index);
    }

    function setSelectedPlaylistItemIndex(val) {
      selectedPlaylistItemIndex.value = val;
    }

    function setSelectedIndex(val) {
      selectedIndex.value = val;
    }

    function isActive(val) {
      return {
        active: selectedIndex.value == val,
      };
    }

    async function getPlaylist() {
      await checkAccessTokenExpired();

      let response = await API.getSpotifyUserPlaylist(user.value.id);

      playlistList.value = response.data.items;
    }

    async function getPlaylistItemList(offset, limit) {
      isLoading.value = true;

      await checkAccessTokenExpired();

      let response = await API.getPlaylistItemList(
        selectedPlaylist.value.id,
        offset,
        limit
      );

      let trackList = await track.getTrackListFromPlaylist(response.data.items);

      selectedPlaylistItemList.value = trackList;

      let currentPage = Math.floor(offset / 10);
      setSelectedPlaylistCurrentPage(currentPage);

      isLoading.value = false;
    }

    function displayTrackArtist(track) {
      var displayArtist = "";

      let length = track.artists.length;

      track.artists.forEach((artist, index) => {
        if (index == length - 1) {
          displayArtist += artist.name;
        } else {
          displayArtist += `${artist.name}, `;
        }
      });

      return displayArtist;
    }
    async function initPlaylist() {
      isLoading.value = true;
      await getPlaylist();
      await getPlaylistItemList(0, 10);
      isLoading.value = false;
      if (playlistList.value == null) {
        console.log("No items.");
        return;
      }
      store.commit("setPlaylist", playlistList.value[0]);
      setSelectedIndex(0);
      setSelectedPlaylistCurrentPage(0);
    }

    function setSelectedPlaylistCurrentPage(val) {
      selectedPlaylistCurrentPage.value = val;
    }

    async function getCurrentPlaylistDetail() {
      let response = await API.getSpotifyPlaylistDetail(
        selectedPlaylist.value.id
      );
      // console.debug("current playlist detail=", response.data);
      return response.data;
    }

    async function reloadSelectedPlaylist() {
      isLoading.value = true;

      let playlistDetail = await getCurrentPlaylistDetail();

      if (playlistDetail.error.status != 0) {
        console.debug("playlist detail", playlistDetail.error);
        return;
      }

      playlistList.value[selectedIndex.value] = playlistDetail;

      store.commit("setPlaylist", playlistDetail);

      await getPlaylistItemList(0, 10);
    }

    watch(selectedIndex, async (newVal, oldVal) => {
      if (newVal != oldVal) {
        isLoading.value = true;
        await getPlaylistItemList(0, 10);
        isLoading.value = false;
      }
    });

    watch(selectedPlaylistCurrentPage, async (newVal) => {
      await getPlaylistItemList(newVal * offset.value, 10);
    });

    // function showToast(msg, state) {
    //   console.log(msg);
    //   toastMessage.value = msg;
    //   isReorderSuccess.value = state;
    //   toastEl.value.show();
    // }

    onMounted(async () => {
      await initPlaylist();
      await getCurrentPlaylistDetail();
    });

    return {
      playlistList: playlistList,
      selectedIndex: selectedIndex,
      selectedPlaylistItemList: selectedPlaylistItemList,
      isLoading: isLoading,
      selectedPlaylistItemIndex: selectedPlaylistItemIndex,
      selectedPlaylistCurrentPage: selectedPlaylistCurrentPage,
      user: user,
      accessToken: accessToken,
      selectedPlaylist: selectedPlaylist,
      selectedPlaylistTotalPages: selectedPlaylistTotalPages,
      offset: offset,
      isPlaylistItemSelected: isPlaylistItemSelected,
      setSelectedPlaylist: setSelectedPlaylist,
      setSelectedPlaylistItemIndex: setSelectedPlaylistItemIndex,
      setSelectedIndex: setSelectedIndex,
      isActive: isActive,
      getPlaylist: getPlaylist,
      getPlaylistItemList: getPlaylistItemList,
      displayTrackArtist: displayTrackArtist,
      initPlaylist: initPlaylist,
      setSelectedPlaylistCurrentPage: setSelectedPlaylistCurrentPage,
      reloadSelectedPlaylist: reloadSelectedPlaylist,
    };
  },
};
</script>

<style lang="scss" scoped></style>
