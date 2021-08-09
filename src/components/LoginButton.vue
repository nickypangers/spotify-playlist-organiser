<template>
  <button class="action-button button" @click="this.$emit('onclick')">
    <p class="m-0 action-button-text">Connect to Spotify</p>
  </button>
</template>

<script>
export default {
  name: "LoginButton",
};
</script>
