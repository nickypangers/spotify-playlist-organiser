<template>
  <div class="w-100 d-flex justify-content-end">
    <label for="page">Page</label>
    <select name="page" id="page" v-model="page" @change="update">
      <option v-for="(e, i) in totalPages" :key="'page-' + e" :value="i">
        {{ e }}
      </option>
    </select>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "Pagination",
  props: {
    totalPages: Number,
    currentPage: Number,
  },
  emits: ["update"],
  setup(props, { emit }) {
    console.log(props);

    const page = ref(0);

    onMounted(() => {
      page.value = props.currentPage;
    });

    function log(val) {
      console.log(val);
    }

    function update() {
      emit("update", page.value * 10, 10);
    }

    return {
      page,
      log,
      update,
    };
  },
  // data() {
  //   return {};
  // },
  // computed: {
  //   page: {
  //     get: function () {
  //       return this.currentPage;
  //     },
  //     set: function (val) {
  //       this.currentPage = val;
  //     },
  //   },
  // },
  // methods: {
  //   log(val) {
  //     console.log(val);
  //   },
  //   update() {
  //     this.$emit("update", this.currentPage * 10, 10);
  //   },
  // },
};
</script>

<style scoped></style>
