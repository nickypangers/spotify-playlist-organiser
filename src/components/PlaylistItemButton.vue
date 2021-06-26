<template>
  <button
    class="btn playlist-item-button mb-2"
    :class="{ 'playlist-selected': isSelected }"
    @click.prevent="goToTrack"
  >
    <b>
      {{ item.track.name }}
    </b>
    <p class="m-0">
      {{ displayTrackArtist(item.track) }}
    </p>
  </button>
</template>

<script>
export default {
  name: "PlaylistItemButton",
  props: {
    item: Object,
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    spotifyTrackUrl() {
      return this.item.track.external_urls.spotify;
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
    goToTrack() {
      console.log(this.item);
      // window.open(this.spotifyTrackUrl, "_blank");
    },
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
