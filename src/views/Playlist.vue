<template>
  <div class="playlist">
    <h1>This is an playlist page.</h1>
    <p v-for="(playlist, index) in playlistList" :key="'playlist-' + index">
      {{ playlist.name }}
    </p>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      playlistList: null,
    };
  },
  mounted() {
    this.getPlaylist();
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    },
    accessToken() {
      return this.$store.state.accessToken;
    },
  },
  methods: {
    getPlaylist() {
      axios
        .post(
          "http://localhost:3030/api/getSpotifyUserPlaylist",
          qs.stringify({
            userId: this.getUser.display_name,
            accessToken: this.accessToken,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(
          function (response) {
            console.log(response.data);
            this.playlistList = response.data.items;
          }.bind(this)
        )
        .catch((e) => console.log(e));
    },
  },
};
</script>
