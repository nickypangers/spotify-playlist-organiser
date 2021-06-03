<template>
  {{ this.$route.query.code }}
</template>

<script>
export default {
  name: "Verify",
  created() {
    this.$cookies.set("code", this.$route.query.code);
    window.close();
  },
};
</script>
