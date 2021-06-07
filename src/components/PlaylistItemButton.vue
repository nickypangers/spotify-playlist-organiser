<template>
  <button class="btn playlistItem-button" @click.prevent="goToTrack">
    <p class="m-0">
      {{ item.track.name }} by {{ displayTrackArtist(item.track) }}
    </p>
  </button>
</template>

<script>
export default {
  name: "PlaylistItemButton",
  props: { item: Object },
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
      //   console.log(this.spotifyTrackUrl);
      window.open(this.spotifyTrackUrl, "_blank");
    },
  },
};
</script>
