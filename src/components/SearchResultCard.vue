<template>
  <div
    class="
      d-flex
      flex-lg-row flex-column
      justify-content-start
      align-items-center
      my-4
      search-result-card
    "
    @click="goTo(track.external_urls.spotify)"
  >
    <img
      class="d-lg-block d-none"
      :src="albumImageSmall.url"
      alt="album image"
      :width="albumImageSmall.width"
      :height="albumImageSmall.height"
    />
    <img
      class="d-lg-none d-block"
      :src="albumImageLarge.url"
      alt="album image"
      :width="albumImageLarge.width"
      :height="albumImageLarge.height"
    />
    <div class="ms-3">
      <h4 class="m-0 text-start">{{ track.name }}</h4>
      <p class="m-0 text-start" v-if="track.explicit">Explicit</p>
      <p class="m-0 text-start">{{ displayTrackArtist(track) }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import displayTrackArtist from "@/helpers/track";

export default {
  name: "SearchResultCard",
  props: { track: Object },
  setup(props) {
    const albumImageSmall = computed(() => props.track.album.images[2]);
    const albumImageLarge = computed(() => props.track.album.images[1]);

    function goTo(url) {
      window.open(url);
    }

    return {
      albumImageSmall: albumImageSmall,
      albumImageLarge: albumImageLarge,
      displayTrackArtist: displayTrackArtist,
      goTo: goTo,
    };
  },
};
</script>

<style scoped>
.search-result-card {
  cursor: pointer;
}
</style>
