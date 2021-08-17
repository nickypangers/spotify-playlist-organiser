<template>
  <div class="container">
    <div>
      {{ this.$store.state.isLoggedIn }}
    </div>
    <div>
      {{ this.$cookies.get("refreshToken") }}
    </div>
    <button type="button" class="btn btn-primary" @click="showReconnectModal">
      Relogin Modal
    </button>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {},
  setup() {
    const store = useStore();

    const reconnectModal = computed(() => store.state.reconnectModal);

    const showReconnectModal = () => {
      reconnectModal.value.show();
    };

    onMounted(() => {});
    return {
      showReconnectModal,
    };
  },
};
</script>
<style lang="scss"></style>
