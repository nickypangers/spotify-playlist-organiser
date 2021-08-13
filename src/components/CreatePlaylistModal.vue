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
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import checkAccessTokenExpired from "@/helpers/accessToken";
import axios from "axios";
import qs from "qs";

export default {
  name: "CreatePlaylistModal",
  components: {},
  emits: ["success"],
  setup(props, { emit }) {
    const store = useStore();

    const isLoading = ref(false);
    const playlistName = ref("");
    const isPublic = ref(false);
    const isCollaborative = ref(false);
    const description = ref("");
    const errorMessage = ref("");
    const close = ref(null);

    const user = computed(() => store.state.user);
    const accessToken = computed(() => store.state.accessToken);

    watch(isPublic, (newVal) => {
      if (newVal) {
        isCollaborative.value = false;
      }
    });

    watch(isCollaborative, (newVal) => {
      if (newVal) {
        isPublic.value = false;
      }
    });

    function log(val) {
      console.log(val);
    }

    async function createPlaylist() {
      let formData = {
        userID: user.value.id,
        playlistName: playlistName.value,
        isPublic: isPublic.value,
        isCollaborative: isCollaborative.value,
        description: description.value,
        accessToken: accessToken.value,
        close: close,
      };

      return axios.post("/createNewPlaylist", qs.stringify(formData), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    }

    async function createPlaylistButtonPressed() {
      await checkAccessTokenExpired();
      isLoading.value = true;
      let response = await createPlaylist();
      isLoading.value = false;
      if (response.data.error.status != 0) {
        errorMessage.value = response.data.error.message;
        return;
      }
      console.log(`Added new playlist: ${playlistName.value}`);
      closeModal();
      emit("success");
    }

    function closeModal() {
      close.value.click();
    }

    return {
      isLoading: isLoading,
      playlistName: playlistName,
      isPublic: isPublic,
      isCollaborative: isCollaborative,
      description: description,
      errorMessage: errorMessage,
      user: user,
      accessToken: accessToken,
      log: log,
      createPlaylistButtonPressed: createPlaylistButtonPressed,
      close: close,
      closeModal: closeModal,
    };
  },
};
</script>

<style scoped>
input[type="radio"] {
  margin: 0 10px 0 10px;
}
</style>
