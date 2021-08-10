<template>
  <button
    class="action-button button"
    @click="this.$emit('onclick')"
    id="profileMenuButton"
  >
    <p class="m-0 action-button-text">
      {{ displayName }}
    </p>
  </button>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "ProfileButton",
  setup() {
    const store = useStore();

    const user = computed(() => {
      return store.state.user;
    });

    const displayName = computed(() => {
      return user.value.display_name;
    });

    return {
      displayName: displayName,
    };
  },
};
</script>

<style lang="scss" scoped></style>
