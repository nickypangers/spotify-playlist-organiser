<template>
  <button
    class="btn playlist-item-button mb-2"
    :class="{ 'playlist-selected': isSelected }"
  >
    <b> {{ item.name }} <span v-if="item.explicit">🅴</span> </b>
    <p class="m-0">
      {{ displayTrackArtist(item) }}
    </p>
  </button>
</template>

<script>
import { computed } from "vue";
import displayTrackArtist from "@/helpers/track";

export default {
  name: "PlaylistItemButton",
  props: {
    item: Object,
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const spotifyTrackUrl = computed(() => props.item.external_urls.spotify);

    return {
      spotifyTrackUrl: spotifyTrackUrl,
      displayTrackArtist: displayTrackArtist,
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
</style>
