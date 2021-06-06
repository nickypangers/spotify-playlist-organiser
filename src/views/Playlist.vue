<template>
  <div class="playlist">
    <h1>This is an playlist page.</h1>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <p
            v-for="(playlist, index) in playlistList"
            :key="'playlist-' + index"
            @click="setSelectedIndex(index)"
          >
            {{ playlist.name }}
          </p>
        </div>
        <div class="col-6">
          <div
            v-for="(item, index) in selectedPlaylistItemList.items"
            :key="'selectedPlaylistItemList-' + index"
          >
            <p>{{ item.track.name }} by {{ displayTrackArtist(item.track) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Playlist",
  data() {
    return {
      playlistList: [],
      selectedIndex: 0,
      selectedPlaylistItemList: [],
    };
  },
  async mounted() {
    await this.getPlaylist();
    await this.getPlaylistItemList();
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
    selectedIndex(newVal, oldVal) {
      if (newVal != oldVal) {
        // console.log(`changed val - ${oldVal} to ${newVal}`);
        this.getPlaylistItemList();
      }
    },
  },
  methods: {
    setSelectedIndex(val) {
      this.selectedIndex = val;
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

      // console.log(response.data);
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
      // console.log(this.selectedPlaylistItemList);
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
