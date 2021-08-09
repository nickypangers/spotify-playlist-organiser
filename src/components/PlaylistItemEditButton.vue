<template>
  <div
    class="d-flex align-items-center"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <button
      class="col btn playlist-item-button mb-2"
      :class="{ 'playlist-selected': isSelected }"
    >
      <b> {{ item.name }} <span v-if="item.explicit">🅴</span> </b>
      <p class="m-0">
        {{ displayTrackArtist(item) }}
      </p>
    </button>
    <div class="ms-2" :class="{ 'd-block': hover, 'd-none': !hover }">
      <button
        class="btn playlist-item-button delete mb-2"
        @click="removeItemFromPlaylist"
      >
        <BIconTrash />
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import displayTrackArtist from "@/helpers/track";
import API from "@/helpers/api";

export default {
  name: "PlaylistItemEditButton",
  props: {
    item: Object,
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["remove", "remove"],
  setup(props, { emit }) {
    const store = useStore();

    const hover = ref(false);

    const selectedPlaylist = computed(() => store.state.playlist);
    const accessToken = computed(() => store.state.accessToken);
    const spotifyTrackUrl = computed(() => props.item.external_urls.spotify);

    async function removeItemFromPlaylist() {
      let response = await API.removeItemFromPlaylist(
        selectedPlaylist.value.id,
        props.item.uri,
        accessToken.value
      );

      console.log(response.data);

      if (response.data.error.status != 0) {
        emit("showToast", "Unable to delete", false);
        return;
      }
      emit("showToast", `Successfully deleted ${props.item.name}`, true);

      emit("remove");
    }

    return {
      hover: hover,
      spotifyTrackUrl: spotifyTrackUrl,
      displayTrackArtist: displayTrackArtist,
      removeItemFromPlaylist: removeItemFromPlaylist,
    };
  },
};
</script>

<style scoped>
.playlist-item-button {
  border: 1px solid black;
}

.playlist-item-button:hover {
  background-color: orange;
}

.playlist-selected {
  background-color: orange;
}

.delete:hover {
  background-color: #ff6b6b;
}
</style>
