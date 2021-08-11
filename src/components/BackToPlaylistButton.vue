<template>
  <button type="button" class="btn back-button">Back To Playlist</button>
</template>

<script>
export default {
  name: "BackToPlaylistButton",
  setup() {},
};
</script>

<style lang="scss" scoped>
.back-button {
  background-color: $blue;
  color: $white;

  &:hover {
    color: $white;
    background-color: $dark-blue;
  }
}
</style>
