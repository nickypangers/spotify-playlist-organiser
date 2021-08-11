<template>
  <button
    class="btn playlist-item-button mb-2 text-truncate"
    :class="{ 'playlist-selected': isSelected }"
    @click="log"
  >
    <div class="d-flex">
      <div class="img-wrapper">
        <img :src="albumImage[2].url" alt="album" />
      </div>
      <div
        class="ms-4 d-flex flex-column align-items-start justify-content-center"
      >
        <p class="m-0 item-name">{{ item.name }}</p>
        <p class="m-0 item-caption">
          <span v-if="item.explicit" class="me-2">🅴</span
          >{{ displayTrackArtist(item) }}
        </p>
      </div>
    </div>
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

    const albumImage = computed(() => props.item.album.images);

    function log() {
      console.debug("item=", albumImage.value);
    }

    return {
      spotifyTrackUrl: spotifyTrackUrl,
      displayTrackArtist: displayTrackArtist,
      albumImage: albumImage,
      log: log,
    };
  },
};
</script>

<style lang="scss" scoped>
// .item-name {
//   display: block;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }

.playlist-item-button {
  border: 1px solid black;
}

.playlist-item-button:hover {
  background-color: lightgray;
}

.playlist-selected {
  background-color: lightgray;
}

.item-name {
  font-size: 1.25rem;
}

.item-caption {
  font-size: 0.9rem;
}
</style>
