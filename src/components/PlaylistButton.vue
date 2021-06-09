<template>
  <button class="btn playlist-button">
    <div class="d-flex align-items-center">
      <p class="m-0">{{ playlist.name }}</p>
      <Label class="ms-2" name="Collaborative" v-if="playlist.collaborative" />
    </div>
    {{ playlist.tracks.total }} song(s)
  </button>
</template>

<script>
import Label from "@/components/Label"
export default {
  name: "PlaylistButton",
  props: { playlist: Object },
  components: {
    Label
  }
};
</script>

<style scoped>
.playlist-button {
  min-height: 2rem;
  word-wrap: break-word;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
