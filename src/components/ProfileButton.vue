<template>
  <button
    class="action-button button"
    @click="goToProfile"
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
import { useRouter } from "vue-router";
export default {
  name: "ProfileButton",
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = computed(() => {
      return store.state.user;
    });

    const displayName = computed(() => {
      return user.value.display_name;
    });

    function goToProfile() {
      router.push({
        name: "Profile",
      });
      return;
    }

    return {
      displayName: displayName,
      goToProfile: goToProfile,
    };
  },
};
</script>

<style lang="scss" scoped></style>
