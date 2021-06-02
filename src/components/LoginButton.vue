<template>
  <button class="action_button button" @click="this.$emit('onclick')">
    <p class="m-0 action_button_text">Connect to Spotify</p>
  </button>
</template>

<script>
export default {
  name: "LoginButton",
};
</script>
