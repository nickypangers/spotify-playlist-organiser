<template>
  <div class="w-100 d-flex justify-content-end">
    <label for="page">Page</label>
    <select name="page" id="page" v-model="currentPage" @change="update">
      <option v-for="(e, i) in totalPages" :key="'page-' + e" :value="i">
        {{ e }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalPages: Number,
  },
  emits: ["update"],
  data() {
    return {
      currentPage: 0,
    };
  },
  methods: {
    log(val) {
      console.log(val);
    },
    update() {
      this.$emit("update", this.currentPage * 10, 10);
    },
  },
};
</script>

<style scoped></style>
