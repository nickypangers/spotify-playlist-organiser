<template>
  <div class="container">
    <div>
      {{ isLoggedIn }}
    </div>
    <div>
      {{ cookies.get("refreshToken") }}
    </div>
    <div v-if="isLoggedIn">
      <button @click="updateUserPlaylistList">updateUserPlaylistList</button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import cookies from "js-cookie";
import API from "@/helpers/api";

export default {
  name: "Home",
  components: {},
  setup() {
    const store = useStore();

    const isLoggedIn = computed(() => store.state.isLoggedIn);

    async function updateUserPlaylistList() {
      await API.updateUserPlaylistList();
    }

    return {
      isLoggedIn: isLoggedIn,
      cookies: cookies,
      updateUserPlaylistList: updateUserPlaylistList,
    };
  },
};
</script>
<style lang="scss"></style>
