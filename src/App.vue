<template>
  <div class="nav px-3" v-if="route.path != '/verify'">
    <div class="nav__logo">Spotify REplaylist</div>
    <div class="nav__content">
      <router-link to="/" class="nav-button button">Home</router-link>
      <router-link to="/search" class="nav-button button">Search</router-link>
      <router-link to="/playlist" class="nav-button button"
        >Playlist</router-link
      >
      <router-link to="/profile" class="nav-button button">Profile</router-link>
    </div>

    <div class="d-flex">
      <div class="nav__action">
        <LoginButton v-if="!isLoggedIn && !isLoading" @onclick="login" />
        <LoadingButton v-if="isLoading" />
        <ProfileButton v-if="isLoggedIn && !isLoading" />
      </div>
      <MenuButton />
    </div>
  </div>
  <router-view />
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import checkAccessTokenExpired from "@/helpers/accessToken";
import LoginButton from "@/components/LoginButton.vue";
import ProfileButton from "@/components/ProfileButton.vue";
import LoadingButton from "@/components/LoadingButton.vue";
import MenuButton from "@/components/MenuButton.vue";
import cookies from "js-cookie";
import axios from "axios";
import qs from "qs";

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
        "https://accounts.spotify.com/authorize?client_id=9fc05552fff74f828d684944657872de&response_type=code&redirect_uri=http://localhost:8080/verify&scope=user-read-email+user-read-private+playlist-modify-public+playlist-modify-private+playlist-read-private+playlist-read-collaborative",
        "popupWindow",
        "height=500,width=400,resizable=false"
      );

      isLoading.value = true;
    }

    function getUser() {
      const timer = setInterval(function () {
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
      axios
        .post(
          "/getSpotifyUser",
          qs.stringify({ accessToken: accessToken.value }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(function (response) {
          store.commit("setUser", response.data);
          isLoading.value = false;
          isLoggedIn.value = true;
        })
        .catch((e) => console.log(e));
    }

    onMounted(() => {
      console.log("hi");
      cookies.remove("accessToken");
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f7e6e6;
  font: 16px;
  width: 100%;
  min-height: 100vh;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.nav {
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav__content {
  display: flex;
  background-color: rgb(247, 248, 250);
  border-radius: 15px;
}

.nav-button {
  padding: 10px;
  min-width: 5rem;
  height: 3rem;
  margin: 0px 5px;
}

.button,
.button:hover,
.button:focus {
  border: none;
  outline: none;
}

.action_button {
  border-radius: 15px;
  height: 3rem;
  margin: 0px 5px;
  background-color: rgb(247, 248, 250);
  min-width: 10rem;
  max-width: 15rem;
}

.action_button_text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
