<template>
  <NavBar />
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import cookies from "js-cookie";

import NavBar from "@/components/NavBar";

import API from "@/helpers/api";

export default {
  components: {
    NavBar,
  },
  setup() {
    onMounted(async () => {
      cookies.remove("accessToken");
      if (cookies.get("refreshToken") != undefined) {
        let response = await API.getRefreshedAccessToken(
          cookies.get("refreshToken")
        );
        console.log(response);
      }
    });
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
