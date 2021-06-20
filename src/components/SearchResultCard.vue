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
    @click="goToTrack"
  >]''
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
export default {
  name: "SearchResultCard",
  props: { track: Object },
  computed: {
    albumImageSmall() {
      return this.track.album.images[2];
    },
    albumImageLarge() {
      return this.track.album.images[1];
    },
  },
  methods: {
    displayTrackArtist(track) {
      var displayArtist = "";

      let length = track.artists.length;

      track.artists.forEach((artist, index) => {
        if (index == length - 1) {
          displayArtist += artist.name;
        } else {
          displayArtist += `${artist.name}, `;
        }
      });
      return displayArtist;
    },
    log() {
      console.log(this.track);
    },
    goToTrack() {
      window.open(this.track.external_urls.spotify);
    },
  },
};
</script>

<style scoped>
.search-result-card {
  cursor: pointer;
}
</style>
