<template>
  <button
    class="action_button button"
    @click="this.$emit('onclick')"
    id="profileMenuButton"
  >
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
      return this.user.display_name;
    },
  },
};
</script>
