<template>
  <div class="playlist">
    <div class="container">
      <div class="row">
        <div class="col-6 row flex-column">
          <PlaylistButton
            :class="isActive(index)"
            :playlist="playlist"
            v-for="(playlist, index) in playlistList"
            :is-selected="index == selectedIndex"
            :key="'playlist-' + index"
            @click="setSelectedIndex(index)"
          />
        </div>
        <div class="col-6">
          <div v-show="isLoading" class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <draggable
            v-show="!isLoading"
            class="list-group"
            :list="selectedPlaylistItemList.items"
            item-key="selectedPlaylistItemList"
          >
            <template #item="{ element }">
              <PlaylistItemButton :item="element" />
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistButton from "@/components/PlaylistButton";
import PlaylistItemButton from "@/components/PlaylistItemButton";
import axios from "axios";
import qs from "qs";
import draggable from "vuedraggable";

export default {
  name: "Playlist",
  components: {
    draggable,
    PlaylistButton,
    PlaylistItemButton,
  },
  data() {
    return {
      playlistList: [],
      selectedIndex: 0,
      selectedPlaylistItemList: [],
      isLoading: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    await this.getPlaylist();
    await this.getPlaylistItemList();
    this.isLoading = false;
    // this.playlistList.forEach((playlist) => console.log(playlist));
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    },
    accessToken() {
      return this.$store.state.accessToken;
    },
    selectedPlaylist() {
      return this.playlistList[this.selectedIndex];
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
    setSelectedIndex(val) {
      this.selectedIndex = val;
    },
    isActive(val) {
      return {
        active: this.selectedIndex == val,
      };
    },
    async getPlaylist() {
      let response = await axios.post(
        "http://localhost:3030/api/getSpotifyUserPlaylist",
        qs.stringify({
          userId: this.getUser.display_name,
          accessToken: this.accessToken,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      this.playlistList = response.data.items;
    },
    async getPlaylistItemList() {
      let response = await axios.post(
        "http://localhost:3030/api/getSpotifyPlaylistItemList",
        qs.stringify({
          playlistId: this.selectedPlaylist.id,
          country: this.getUser.country,
          accessToken: this.accessToken,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      this.selectedPlaylistItemList = response.data;
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
  },
};
</script>

<style scoped>
.active {
  background: turquoise;
}
</style>
