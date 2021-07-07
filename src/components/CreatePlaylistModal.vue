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
          <h5 class="modal-title" id="createPlaylistLabel">
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
            <div
              class="alert alert-danger"
              role="alert"
              v-show="errorMessage.length > 0"
            >
              {{ errorMessage }}
            </div>
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
                  :disabled="isCollaborative"
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
            <div class="d-flex mt-3">
              <div class="d-flex align-items-center">
                <input
                  type="radio"
                  id="collaborative"
                  :value="true"
                  v-model="isCollaborative"
                  :disabled="isPublic"
                />
                <label for="collaborative" class="mr-3"
                  >Enable collaborative</label
                >
              </div>
              <div class="d-flex align-items-center">
                <input
                  type="radio"
                  id="private"
                  :value="false"
                  v-model="isCollaborative"
                />
                <label for="collaborative">Disable collaborative</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            aria-label="Close"
            :disabled="isLoading"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="createPlaylistButtonPressed"
          >
            {{ isLoading ? "Loading..." : "Create Playlist" }}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="close"
            ref="close"
            hidden
          >
            Close
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
  emits: ["success"],
  data() {
    return {
      isLoading: false,
      playlistName: "",
      isPublic: false,
      isCollaborative: false,
      desciption: "",
      errorMessage: "",
    };
  },
  mounted() {},
  computed: {
    user() {
      return this.$store.state.user;
    },
    accessToken() {
      return this.$store.state.accessToken;
    },
  },
  watch: {
    isPublic(newVal) {
      if (newVal) {
        this.isCollaborative = false;
      }
    },
    isCollaborative(newVal) {
      if (newVal) {
        this.isPublic = false;
      }
    },
  },
  methods: {
    log(val) {
      console.log(val);
    },
    async createPlaylist() {
      let formData = {
        userID: this.user.id,
        playlistName: this.playlistName,
        isPublic: this.isPublic,
        isCollaborative: this.isCollaborative,
        description: this.desciption,
        accessToken: this.accessToken,
      };

      return axios.post(
        "http://localhost:3030/api/createNewPlaylist",
        qs.stringify(formData),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
    },
    async createPlaylistButtonPressed() {
      this.isLoading = true;
      let response = await this.createPlaylist();
      this.isLoading = false;
      if (response.data.error.status != 0) {
        this.errorMessage = response.data.error.message;
        return;
      }
      console.log(`Added new playlist: ${this.playlistName}`);
      this.closeModal();
      this.$emit("success");
    },
    closeModal() {
      this.$refs.close.click();
    },
  },
};
</script>

<style scoped>
input[type="radio"] {
  margin: 0 10px 0 10px;
}
</style>
