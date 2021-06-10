<template>
  <div class="w-50 d-flex justify-content-center mb-4" @click="log">
    <img
      :src="albumImage.url"
      alt="album image"
      :width="albumImage.width"
      :height="albumImage.height"
    />
    <div class="ms-3">
      <h4>{{ track.name }}</h4>
      <p class="m-0">{{ displayTrackArtist(track) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResultCard",
  props: { track: Object },
  computed: {
    albumImage() {
      return this.track.album.images[2]
    }
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
      console.log(this.track)
    }
  },
};
</script>
