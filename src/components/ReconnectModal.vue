<template>
  <div
    ref="reconnectModal"
    class="modal fade"
    id="reconnectModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="reconnectModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <div>Testing</div>
          <button type="button" aria-label="Close" @click="dismissModal">
            Re-connect
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

import * as bootstrap from "bootstrap";

export default {
  name: "ReconnectModal",
  setup() {
    let modal = null;

    const store = useStore();

    const reconnectModal = ref(null);

    const dismissModal = () => {
      modal.hide();
    };

    onMounted(() => {
      modal = new bootstrap.Modal(reconnectModal.value, {
        backdrop: "static",
      });
      // console.log(modal);
      store.commit("setReconnectModal", modal);
    });

    return {
      reconnectModal: reconnectModal,
      dismissModal: dismissModal,
    };
  },
};
</script>

<style lang="scss" scoped></style>
