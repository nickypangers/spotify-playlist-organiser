<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div
      ref="toast"
      class="toast align-items-center text-white border-0"
      :class="{
        'bg-toast-error': !isSuccess,
        'bg-toast-success': isSuccess,
      }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">{{ message }}</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

import * as bootstrap from "bootstrap";

export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: "",
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();

    const toast = ref(null);

    onMounted(() => {
      let toastEl = new bootstrap.Toast(toast.value, {
        autohide: true,
        delay: 1500,
      });

      store.commit("setToastEl", toastEl);
    });

    return {
      toast,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-toast-success {
  background-color: $green;
}

.bg-toast-error {
  background-color: red;
}
</style>
