<template>
  <NavBar />
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";

import NavBar from "@/components/NavBar";

import cookies from "js-cookie";
import API from "@/helpers/api";
import checkAccessTokenExpired from "@/helpers/accessToken";

export default {
  components: {
    NavBar,
  },
  setup() {
    const store = useStore();

    let timer;

    async function getUser() {
      clearInterval(timer);
      timer = setInterval(async () => {
        console.log("waiting");

        let at = cookies.get("accessToken");

        if (at != null) {
          clearInterval(timer);
          store.commit("setAccessToken", at);
          await getSpotifyUserDetail();
          return;
        }
      }, 1000);
    }

    async function getSpotifyUserDetail() {
      await checkAccessTokenExpired();
      let response = await API.getUserDetail();
      store.commit("setUser", response.data);
      store.commit("toggleIsLoggedIn", true);
      store.commit("toggleIsLoading", false);
    }

    onMounted(async () => {
      getUser();
    });

    return {};
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font-color;
  background: $bg-color;
  font: 16px;
  width: 100%;
  min-height: 100vh;
}
</style>
