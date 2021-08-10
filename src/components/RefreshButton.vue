<template>
  <button type="button" class="btn">
    <BIconArrowRepeat />
  </button>
</template>

<script>
export default {
  name: "RefreshButton",
  setup() {},
};
</script>

<style lang="scss" scoped>
button {
  background-color: $black-secondary;
  color: $white;
  border: 1px solid $black-secondary;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: $white;
  }
}
</style>
