<template>
  <div
    class="modal fade"
    id="createPlaylistModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="createPlaylistLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Create New Playlist
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="d-flex align-items-center">
              <label for="name"> Playlist Name: </label>
              &nbsp;
              <input type="text" name="name" id="name" v-model="playlistName" />
            </div>
            <div class="d-flex mt-3">
              <div class="d-flex align-items-center">
                <input
                  type="radio"
                  id="public"
                  :value="true"
                  v-model="isPublic"
                />
                <label for="public" class="mr-3">Public</label>
              </div>
              <div class="d-flex align-items-center">
                <input
                  type="radio"
                  id="private"
                  :value="false"
                  v-model="isPublic"
                />
                <label for="private">Private</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            :disabled="isLoading"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="createPlaylist">
            {{ isLoading ? "Loading..." : "Create Playlist" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "CreatePlaylistModal",
  components: {},
  data() {
    return {
      isLoading: false,
      playlistName: "",
      isPublic: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    accessToken() {
      return this.$store.state.accessToken;
    },
  },
  methods: {
    log(val) {
      console.log(val);
    },
    createPlaylist() {
      this.isLoading = true;

      axios
        .post(
          "http://localhost:3030/api/createNewPlaylist",
          qs.stringify({
            userID: this.user.display_name,
            playlistName: this.playlistName,
            isPublic: this.isPublic,
            accessToken: this.accessToken,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((response) => {
          console.log(response);
        });

      // console.log(response);
    },
  },
};
</script>

<style scoped>
input[type="radio"] {
  margin: 0 10px 0 10px;
}
</style>
