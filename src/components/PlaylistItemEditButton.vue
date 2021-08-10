<template>
  <div class="d-flex align-items-stretch edit-button">
    <button
      class="col btn playlist-item-button mb-2"
      :class="{ 'playlist-selected': isSelected }"
    >
      <b> {{ item.name }} <span v-if="item.explicit">🅴</span> </b>
      <p class="m-0">
        {{ displayTrackArtist(item) }}
      </p>
    </button>
    <div class="ms-2 mb-2">
      <button class="btn delete" @click="removeItemFromPlaylist">
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
  emits: ["showToast", "remove"],
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

<style lang="scss" scoped>
.edit-button {
  &:hover {
    .delete {
      display: block;
    }
  }
}

.playlist-item-button {
  border: 1px solid black;
}

.playlist-item-button:hover {
  background-color: orange;
}

.playlist-selected {
  background-color: orange;
}

.delete {
  display: none;
  height: 100%;
  width: 4rem;
  background-color: red;

  &:hover {
    background-color: $green;
  }
}
</style>
