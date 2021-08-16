<template>
  <div>
    <div class="nav px-3 mb-3" v-if="route.path != '/verify'">
      <div class="nav-logo">Spotify REplaylist</div>
      <div class="nav-content">
        <router-link to="/" class="nav-button button">Home</router-link>
        <router-link to="/search" class="nav-button button">Search</router-link>
        <router-link to="/playlist" class="nav-button button"
          >Playlist</router-link
        >
        <router-link to="/profile" class="nav-button button"
          >Profile</router-link
        >
      </div>

      <div class="d-flex">
        <div class="nav-action">
          <LoginButton v-if="!isLoggedIn && !isLoading" @onclick="login" />
          <LoadingButton v-if="isLoading" />
          <ProfileButton v-if="isLoggedIn && !isLoading" />
        </div>
        <MenuButton />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import checkAccessTokenExpired from "@/helpers/accessToken";
import LoginButton from "@/components/LoginButton";
import ProfileButton from "@/components/ProfileButton";
import LoadingButton from "@/components/LoadingButton";
import MenuButton from "@/components/MenuButton";

import cookies from "js-cookie";
import { loginUrl } from "@/helpers/login";
import API from "@/helpers/api";

export default {
  components: {
    LoginButton,
    ProfileButton,
    LoadingButton,
    MenuButton,
  },
  setup() {
    const store = useStore();

    const route = useRoute();

    const isLoading = ref(false);
    const accessToken = computed(() => store.state.accessToken);
    const hasAccessToken = computed(() => accessToken.value == null);
    const isLoggedIn = computed({
      get() {
        return store.state.isLoggedIn;
      },
      set(val) {
        store.commit("toggleIsLoggedIn", val);
      },
    });

    function login() {
      window.open(
        loginUrl(),
        "popupWindow",
        "height=500,width=400,resizable=false"
      );

      isLoading.value = true;
    }

    let timer;

    function getUser() {
      clearInterval(timer);
      timer = setInterval(function () {
        let at = cookies.get("accessToken");

        if (at != null) {
          clearInterval(timer);
          store.commit("setAccessToken", at);
          getSpotifyUserDetail();
          return;
        }
      }, 1000);
    }

    async function getSpotifyUserDetail() {
      await checkAccessTokenExpired();
      let response = await API.getUserDetail();
      if (response.data.error.status != 0) {
        console.log("error getting user detail");
        console.debug("response=", response.data);
        return;
      }
      store.commit("setUser", response.data);
      isLoading.value = false;
      isLoggedIn.value = true;
    }

    onMounted(() => {
      getUser();
    });

    return {
      route: route,
      isLoading: isLoading,
      accessToken: accessToken,
      hasAccessToken: hasAccessToken,
      isLoggedIn: isLoggedIn,
      login: login,
      getUser: getUser,
      getSpotifyUserDetail: getSpotifyUserDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 2rem;
  font-weight: bold;
}

.nav {
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $black;
  color: $white;
}

.nav-logo {
  font-weight: bold;
}

.nav-content {
  display: flex;
  // background-color: $bg-nav-button;
  border-radius: 15px;
}

.nav-button {
  padding: 10px;
  min-width: 5rem;
  height: 3rem;
  margin: 0px 15px;
  font-weight: bold;
  color: $white;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: $green;
  }
}

.button,
.button:hover,
.button:focus {
  border: none;
  outline: none;
}
</style>
