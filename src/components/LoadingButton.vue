<template>
  <button class="action-button button">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </button>
</template>

<script>
export default {
  name: "LoadingButton",
};
</script>

<style lang="scss" scoped>
.spinner-border {
  color: $white;
}
</style>
