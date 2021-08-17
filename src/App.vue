<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: {
    NavBar,
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
