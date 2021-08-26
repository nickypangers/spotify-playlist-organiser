<template>
  <div
    class="modal fade"
    :id="id"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="editPlaylistDetailsLabel"
    aria-hidden="true"
    @keyup.enter="editPlaylist"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="id + 'Label'">Edit Playlist Details</h5>
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
              {errorMessage}
            </div>
            <div class="d-flex align-items center">
              <label :for="id + 'EditEnableCollaborative'"
                >Playlist Name:
              </label>
              &nbsp;
              <input
                type="text"
                name="editName"
                :id="id + 'EditName'"
                v-model="tempPlaylist.name"
              />
            </div>
            <div class="d-flex mt-3">
              <div class="d-flex align-items-center">
                <input
                  type="radio"
                  :id="id + 'EditPublic'"
                  v-model="isPublic"
                  :value="true"
                  :disabled="isCollaborative"
                />
                <label :for="id + 'EditEnableCollaborative'" class="me-3"
                  >Public</label
                >
              </div>
              <div class="d-flex align-items-center">
                <input
                  type="radio"
                  :id="id + 'EditPrivate'"
                  v-model="isPublic"
                  :value="false"
                />
                <label :for="id + 'EditEnableCollaborative'">Private</label>
              </div>
            </div>
            <div class="d-flex mt-3">
              <div class="d-flex align-items-center">
                <input
                  type="radio"
                  :id="id + 'EditEnableCollaborative'"
                  v-model="isCollaborative"
                  :value="true"
                  :disabled="isPublic"
                />
                <label :for="id + 'EditEnableCollaborative'" class="me-3"
                  >Enable Collaborative</label
                >
              </div>
              <div class="d-flex align-items-center">
                <input
                  type="radio"
                  :id="id + 'EditDisableCollaborative'"
                  v-model="isCollaborative"
                  :value="false"
                />
                <label :for="id + 'EditDisableCollaborative'"
                  >Disable Collaborative</label
                >
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
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="editPlaylist">
            {{ isLoading ? "Loading..." : "Edit Playlist" }}
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
import { ref, computed, onMounted } from "vue";

import API from "@/helpers/api";

export default {
  name: "EditPlaylistDetailsModal",
  props: { id: String, playlist: Object },
  emits: ["reloadPlaylist"],
  setup(props, { emit }) {
    const close = ref(null);
    const isLoading = ref(false);
    const isPublic = computed({
      get() {
        return tempPlaylist.value.public;
      },
      set(val) {
        tempPlaylist.value.public = val;
      },
    });
    const isCollaborative = computed({
      get() {
        return tempPlaylist.value.collaborative;
      },
      set(val) {
        tempPlaylist.value.collaborative = val;
      },
    });
    const errorMessage = ref("");

    const tempPlaylist = ref({});

    const reloadPlaylist = () => {
      emit("reloadPlaylist");
    };

    const editPlaylist = async () => {
      let playlistDetail = {
        name: tempPlaylist.value.name,
        public: isPublic.value,
        collaborative: isCollaborative.value,
      };

      console.debug("playlistDetail=", playlistDetail);

      let response = await API.changePlaylistDetail(
        props.playlist.id,
        playlistDetail
      );
      console.debug("editPlaylist=", response.data);

      let error = response.data.error;

      if (error.status != 0) {
        console.debug("error=", error);
        return;
      }

      await API.updateUserPlaylistList();

      closeModal();
    };

    const closeModal = () => {
      close.value.click();
    };

    onMounted(() => {
      tempPlaylist.value = props.playlist;
    });

    return {
      close: close,
      isLoading: isLoading,
      isPublic: isPublic,
      isCollaborative: isCollaborative,
      errorMessage: errorMessage,
      tempPlaylist: tempPlaylist,
      editPlaylist: editPlaylist,
      reloadPlaylist: reloadPlaylist,
    };
  },
};
</script>

<style lang="scss" scoped></style>
