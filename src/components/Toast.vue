<template>
  <div
    ref="toast"
    class="toast align-items-center text-white bg-primary border-0"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">Hello, world! This is a toast message.</div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import * as bootstrap from "bootstrap";

export default {
  name: "Toast",
  setup() {
    const toast = ref(null);

    onMounted(() => {
      var toastEl = new bootstrap.Toast(toast.value, {
        autohide: true,
        delay: 1500,
      });
      toastEl.show();
    });

    return { toast };
  },
};
</script>
