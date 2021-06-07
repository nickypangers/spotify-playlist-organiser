<template>
  <button class="btn playlist-button">
    {{ playlist.name }} - Collaborative: {{ playlist.collaborative }}
  </button>
</template>

<script>
export default {
  name: "PlaylistButton",
  props: { playlist: Object },
};
</script>

<style scoped>
.playlist-button {
  min-height: 2rem;
  word-wrap: break-word;
  margin: 0.5rem 0;
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>
