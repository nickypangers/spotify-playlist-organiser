<template>
  <button
    class="action_button button"
    @click="this.$emit('onclick')"
    id="profileMenuButton"
  >
    <p class="m-0 action_button_text">
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

    const user = computed(() => store.state.user);

    const displayName = computed(() => user.value.display_name);

    return {
      displayName: displayName,
    };
  },
  // computed: {
  //   user() {
  //     return this.$store.state.user;
  //   },
  //   displayName() {
  //     return this.user.display_name;
  //   },
  // },
};
</script>
