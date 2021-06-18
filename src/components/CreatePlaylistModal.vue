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
    <div class="modal-dialog">
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
          <label for="playlistName"> Playlist Name:</label>
          <input
            type="text"
            name="playlistName"
            v-model="playlistName"
            required
          />
          <label for="public">
            Public:
            <select v-model="isPublic" @change="log(isPublic)">
              <option :value="true">True</option>
              <option :value="false">False</option>
            </select>
          </label>
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
          <LoadingButton class="btn btn-primary" v-show="isLoading" />
          <button
            type="button"
            class="btn btn-primary"
            v-show="!isLoading"
            @click="isLoading = true"
          >
            Create Playlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingButton from "@/components/LoadingButton";

export default {
  name: "CreatePlaylistModal",
  components: {
    LoadingButton,
  },
  data() {
    return {
      isLoading: false,
      playlistName: "",
      isPublic: true,
    };
  },
  methods: {
    log(val) {
      console.log(val);
    },
  },
};
</script>
