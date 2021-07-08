<template>
  <div :class="{ selected: isSelected }" class="py-2">
    <div class="playlist-button py-2 m-0">
      <div class="d-flex align-items-center">
        <p class="m-0">{{ playlist.name }}</p>
        <PublicStatusLabel class="ms-2" :isPublic="playlist.public" />
        <CollaborativeLabel class="ms-2" v-if="playlist.collaborative" />
      </div>
      {{ playlist.tracks.total }} song(s)
    </div>
    <hr v-if="isSelected" />
    <div class="w-100 d-flex justify-content-around" v-if="isSelected">
      <div class="btn-group">
        <button
          type="button"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <BIconList />
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item">Edit Playlist Details</li>
          <li class="dropdown-item">Another action</li>
          <li class="dropdown-item" @click="unfollowPlaylist">
            Unfollow Playlist
          </li>
        </ul>
      </div>
      <button class="btn" @click="log('test')">
        <BIconPencilFill />
      </button>
      <button class="btn" @click="goTo(playlist.uri)">
        <BIconBoxArrowRight />
      </button>
    </div>
  </div>
</template>

<script>
import CollaborativeLabel from "@/components/CollaborativeLabel";
import PublicStatusLabel from "@/components/PublicStatusLabel";
import qs from "qs";
import axios from "axios";
export default {
  name: "PlaylistButton",
  props: { playlist: Object, isSelected: Boolean },
  emits: ["success"],
  components: {
    CollaborativeLabel,
    PublicStatusLabel,
  },
  computed: {
    accessToken() {
      return this.$store.state.accessToken;
    },
  },
  methods: {
    log(val) {
      console.log(val);
    },
    goTo(val) {
      window.open(val);
    },
    async unfollowPlaylist() {
      let response = await axios.post(
        "http://localhost:3030/api/unfollowPlaylist",
        qs.stringify({
          playlistID: this.playlist.id,
          accessToken: this.accessToken,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      if (response.data.success) {
        this.$emit("success");
      } else {
        console.log(response.data);
      }
    },
  },
};
</script>

<style scoped>
.playlist-button {
  min-height: 2rem;
  word-wrap: break-word;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.selected {
  background: turquoise;
}

.dropdown-item {
  cursor: pointer;
}
</style>
