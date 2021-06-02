<template>
  <button class="action_button button" @click="this.$emit('onclick')">
    <p class="m-0 action_button_text">{{ user.name }}</p>
  </button>
</template>

<script>
export default {
  name: "ProfileButton",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
