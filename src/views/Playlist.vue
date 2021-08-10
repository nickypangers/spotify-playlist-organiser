<template>
  <div class="playlist">
    <div class="container">
      <div class="col-12">
        <div class="alert-warning w-100 py-2">
          Deleting a playlist simply means unfollowing it. Please see
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
          <RefreshButton @click="getPlaylistItemList(0, 10)" class="ms-2" />
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
            </div>
          </div>
        </div>
        <div v-else>No playlist</div>
      </div>

      <!-- <div class="col-12">
        <div class="w-100 d-flex justify-content-end">
          <label for="page">Page</label>
          <select
            name="page"
            id="page"
            v-model="selectedPlaylistCurrentPage"
            @change="getPlaylistItemList(offset, 10)"
          >
            <option
              v-for="(e, i) in selectedPlaylistTotalPages"
              :key="'page-' + e"
              :value="i"
            >
              {{ e }}
            </option>
          </select>
        </div>
      </div> -->
    </div>
  </div>

  <CreatePlaylistModal @success="initPlaylist" />
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

export default {
  name: "Playlist",
  components: {
    // draggable,
    PlaylistButton,
    PlaylistItemButton,
    CreatePlaylistModal,
    RefreshButton,
  },
  setup() {
    const store = useStore();

    const playlistList = ref([]);
    const selectedIndex = ref(0);
    const selectedPlaylistItemList = ref({
      total: 0,
    });
    const isLoading = ref(false);
    const selectedPlaylistItemIndex = ref(0);
    const selectedPlaylistCurrentPage = ref(1);

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
      let totalPage = Math.ceil(selectedPlaylistItemList.value.total / 10);
      if (totalPage == 0) {
        return 1;
      }
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
      await checkAccessTokenExpired(store);

      let response = await API.getSpotifyUserPlaylist(
        user.value.display_name,
        accessToken.value
      );

      playlistList.value = response.data.items;
    }

    async function getPlaylistItemList(offset, limit) {
      isLoading.value = true;

      await checkAccessTokenExpired(store);

      let response = await API.getPlaylistItemList(
        selectedPlaylist.value.id,
        offset,
        limit,
        accessToken.value
      );

      let trackList = await track.getTrackListFromPlaylist(
        response.data.items,
        accessToken.value
      );

      selectedPlaylistItemList.value = trackList;

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

    watch(selectedIndex, async (newVal, oldVal) => {
      if (newVal != oldVal) {
        isLoading.value = true;
        await getPlaylistItemList(0, 10);
        isLoading.value = false;
      }
    });

    onMounted(async () => {
      await initPlaylist();
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
    };
  },
};
</script>

<style scoped></style>
