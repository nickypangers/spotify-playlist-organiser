<template>
  <nav aria-label="Page">
    <ul class="pagination pagination-lg">
      <li
        class="page-item"
        :class="{ disabled: currentPage + 1 == page }"
        v-for="page in totalPages"
        :key="'page-' + page"
      >
        <!-- <button class="page-link" @click="updateCurrentPage(page - 1)"> -->
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

    const updateCurrentPage = (val) => {
      emit("update:modelValue", val);

      console.debug("modelvalue=", currentPage.value);
      console.debug("totalpages=", props.totalPages);
      // currentPage.value = val;
    };

    onMounted(() => {
      console.debug("modelvalue=", currentPage.value);
      console.debug("totalpages=", props.totalPages);
    });

    return {
      currentPage: currentPage,
      updateCurrentPage: updateCurrentPage,
    };
  },
};
</script>

<style lang="scss" scoped></style>
