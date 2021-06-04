<template>
  <button class="action_button button" @click="this.$emit('onclick')">
    <p class="m-0 action_button_text">
      {{ displayName }}
    </p>
  </button>
</template>

<script>
export default {
  name: "ProfileButton",
  computed: {
    user() {
      return this.$store.state.user;
    },
    displayName() {
      if (this.user == null) {
        return "Connect to Spotify";
      }

      return this.user.display_name;
    },
  },
};
</script>
