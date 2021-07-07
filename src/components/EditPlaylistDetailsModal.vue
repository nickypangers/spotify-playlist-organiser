<template>
  <div
    class="modal fade"
    id="editPlaylistDetailsModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="editPlaylistDetailsLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editPlaylistDetailsLabel">
            Edit Playlist Details
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPlaylistDetailsModal",
  props: { playlist: Object },
};
</script>

<style scoped></style>
