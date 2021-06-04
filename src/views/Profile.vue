<template>
  <div class="profile">
    <div class="container">
      <h1>Profile</h1>
      <p>{{ user }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>
