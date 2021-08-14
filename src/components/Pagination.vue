<template>
  <nav aria-label="Page">
    <ul class="pagination pagination-lg">
      <li
        class="page-item"
        :class="{ disabled: page - 1 == currentPage }"
        v-for="page in totalPages"
        :key="'page-' + page"
      >
        <button class="page-link" @click="currentPage = page - 1">
          {{ page }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed, onMounted } from "vue";
export default {
  name: "Pagination",
  props: {
    totalPages: Number,
    modelValue: Number,
  },
  setup(props, { emit }) {
    const currentPage = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("update:modelValue", val);
      },
    });

    onMounted(() => {
      // console.debug("totalPages=", props.totalPages);
      // console.debug("currentPage=", currentPage.value);
    });

    return {
      currentPage: currentPage,
    };
  },
};
</script>

<style lang="scss" scoped></style>
