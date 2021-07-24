<template>
  <div class="container">
    <div>
      {{ this.$store.state.isLoggedIn }}
    </div>
    <div>
      {{ this.$cookies.get("refreshToken") }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
