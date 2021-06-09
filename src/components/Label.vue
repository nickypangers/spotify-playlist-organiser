<template>
  <div class="label">
    {{ name }}
  </div>
</template>

<script>
export default {
    name: "Label",
    props: {name: String},
}
</script>

<style scoped>
.label {
  background: white;
  border: 1px solid orange;
  padding: 2px 5px;
}
</style>
