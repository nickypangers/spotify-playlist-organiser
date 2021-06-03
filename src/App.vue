<template>
  <div class="nav px-3">
    <div class="nav__logo">Spotify REplaylist</div>
    <div class="nav__content">
      <router-link to="/" class="nav__button button">Home</router-link>
      <router-link to="/about" class="nav__button button">Home</router-link>
      <router-link to="/search" class="nav__button button">Home</router-link>
      <router-link to="/" class="nav__button button">Home</router-link>
    </div>

    <div class="nav__action">
      <LoginButton v-show="!isLoggedIn" @onclick="login" />
      <ProfileButton v-show="isLoggedIn" @onclick="print" />
    </div>
  </div>
  <router-view />
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";
import ProfileButton from "@/components/ProfileButton.vue";

export default {
  components: {
    LoginButton,
    ProfileButton,
  },
  created () {
    document.cookie = "testing=tested";
    console.log(document.cookie);
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    login() {
      // this.$store.commit("toggleIsLoggedIn", true);
      window.open("https://accounts.spotify.com/authorize?client_id=9fc05552fff74f828d684944657872de&response_type=code&redirect_uri=http://localhost:8080/verify&scope=user-read-email+user-read-private", "popupWindow", "height=500,width=400,resizable=false")
    },
    print() {
      console.log(this.user);
    },
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
  height: 100vh;
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

.nav__button {
  padding: 10px;
  min-width: 5rem;
  height: 3rem;
  margin: 0px 5px;
}

/* .nav__action {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2rem;
} */

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
