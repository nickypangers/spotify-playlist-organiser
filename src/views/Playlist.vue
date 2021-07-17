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
          <button
            type="button"
            class="btn btn-secondary ms-2"
            @click="initPlaylist"
          >
            <BIconArrowRepeat />
          </button>
        </div>
      </div>

      <div class="mt-2">
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
            <div v-show="!isLoading">
              <draggable
                v-if="selectedPlaylistItemList.items.length > 0"
                class="list-group"
                :list="selectedPlaylistItemList.items"
                item-key="selectedPlaylistItemList"
              >
                <template #item="{ element, index }">
                  <PlaylistItemButton
                    :item="element"
                    :is-selected="isPlaylistItemSelected(index)"
                    @click="setSelectedPlaylistItemIndex(index)"
                  />
                </template>
              </draggable>
              <div v-else>No Songs</div>
            </div>
          </div>
        </div>
        <div v-else>No playlist</div>
      </div>

      <div class="col-12">
        <Pagination
          :totalPages="selectedPlaylistTotalPages"
          @update="getPlaylistItemList"
        />
      </div>
    </div>
  </div>

  <CreatePlaylistModal @success="initPlaylist" />
</template>

<script>
import cookieMixin from "@/mixins/cookieMixin";
import PlaylistButton from "@/components/PlaylistButton";
import PlaylistItemButton from "@/components/PlaylistItemButton";
import axios from "axios";
import qs from "qs";
import draggable from "vuedraggable";
import CreatePlaylistModal from "@/components/CreatePlaylistModal";
import Pagination from "@/components/Pagination";

export default {
  name: "Playlist",
  components: {
    draggable,
    PlaylistButton,
    PlaylistItemButton,
    CreatePlaylistModal,
    Pagination,
  },
  mixins: [cookieMixin],
  data() {
    return {
      playlistList: [],
      selectedIndex: 0,
      selectedPlaylistItemList: {
        total: 0,
      },
      isLoading: false,
      selectedPlaylistItemIndex: 0,
    };
  },
  created() {},
  async mounted() {
    await this.initPlaylist();
    console.log(this.selectedPlaylistTotalPages.length);
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    accessToken() {
      return this.$store.state.accessToken;
    },
    selectedPlaylist() {
      return this.playlistList[this.selectedIndex];
    },
    selectedPlaylistTotalPages() {
      return Math.ceil(this.selectedPlaylistItemList.total / 10);
    },
  },
  watch: {
    async selectedIndex(newVal, oldVal) {
      if (newVal != oldVal) {
        this.isLoading = true;
        await this.getPlaylistItemList();
        this.isLoading = false;
      }
    },
  },
  methods: {
    isPlaylistItemSelected(val) {
      return this.selectedPlaylistItemIndex == val;
    },
    setSelectedPlaylist(playlist, index) {
      this.$store.commit("setPlaylist", playlist);
      this.setSelectedIndex(index);
    },
    setSelectedPlaylistItemIndex(val) {
      this.selectedPlaylistItemIndex = val;
    },
    setSelectedIndex(val) {
      this.selectedIndex = val;
    },
    isActive(val) {
      return {
        active: this.selectedIndex == val,
      };
    },
    async getPlaylist() {
      await this.checkAccessTokenExpired();

      let response = await axios.post(
        "/getSpotifyUserPlaylist",
        qs.stringify({
          userId: this.user.display_name,
          accessToken: this.accessToken,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      this.playlistList = response.data.items;
      return response.data.items;
    },
    async getPlaylistItemList(offset, limit) {
      await this.checkAccessTokenExpired();

      let response = await axios.post(
        "/getSpotifyPlaylistItemList",
        qs.stringify({
          playlistId: this.selectedPlaylist.id,
          offset: offset,
          limit: limit,
          // country: this.user.country,
          accessToken: this.accessToken,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      this.selectedPlaylistItemList = response.data;
      // return response.data;
    },
    displayTrackArtist(track) {
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
    },
    async initPlaylist() {
      this.isLoading = true;
      await this.getPlaylist();
      // this.playlistList = await this.getPlaylist();
      await this.getPlaylistItemList(0, 10);
      // this.selectedPlaylistItemList = await this.getPlaylistItemList(0, 10);
      this.isLoading = false;
      if (this.playlistList.length > 0) {
        this.$store.commit("setPlaylist", this.playlistList[0]);
        this.setSelectedIndex(0);
      }
    },
  },
};
</script>

<style scoped></style>
