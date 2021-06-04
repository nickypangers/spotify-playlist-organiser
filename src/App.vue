<template>
  <div class="nav px-3" v-if="this.$route.path != '/verify'">
    <div class="nav__logo">Spotify REplaylist</div>
    <div class="nav__content">
      <router-link to="/" class="nav__button button">Home</router-link>
      <router-link to="/about" class="nav__button button">Home</router-link>
      <router-link to="/search" class="nav__button button">Home</router-link>
      <router-link to="/" class="nav__button button">Home</router-link>
    </div>

    <div class="nav__action">
      <LoginButton v-show="!isLoggedIn && !isLoading" @onclick="login" />
      <LoadingButton v-show="isLoading" />
      <ProfileButton v-show="isLoggedIn && !isLoading" @onclick="print" />
    </div>
  </div>
  <router-view />
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";
import ProfileButton from "@/components/ProfileButton.vue";
import LoadingButton from "@/components/LoadingButton.vue";
import axios from "axios";
// import qs from 'qs';

export default {
  components: {
    LoginButton,
    ProfileButton,
    LoadingButton,
  },
  data() {
    return {
      isLoading: false,
      hasCode: false,
      code: "",
    };
  },
  mounted() {
    this.getUser();
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
      window.open(
        "https://accounts.spotify.com/authorize?client_id=9fc05552fff74f828d684944657872de&response_type=code&redirect_uri=http://localhost:8080/verify&scope=user-read-email+user-read-private",
        "popupWindow",
        "height=500,width=400,resizable=false"
      );
      this.isLoading = true;
    },
    print() {
      console.log(this.user);
    },
    getUser() {
      // let code = this.getCookieCode();

      // if (this.hasCode) {
        this.getSpotifyUserDetail("AQB5XPeNOrkpdU3QTnYclHOJfUnCqsqABdfVSmjUpF0MsBQT-1gx0juFRZyysIQBScBOlAOWc4jcrEQ808ugoKBLNybFxdgwlCpOfmY7R_7O9JAVAQXdwzeX--anDvtZVe-VPcpZVG7Lc7yTflY8AYRqbCUwF8AthdkfmLaAgrng2ZLiq3p9gyYKPYu_hzw59Xcw2um45SAC9ldzq1qMsQk2ge8")
      // }
    },
    getCookieCode() {
      let vue = this;

      var code = "";

      var timer = setInterval(function () {
        code = vue.$cookies.get("code");

        console.log("checking")

        if (code != null && code.length > 100) {
          vue.hasCode = true;
          clearInterval(timer);
          console.log(code)
          return code
        }
      }, 1000);


    },
    getSpotifyUserDetail(code) {

      axios({
        method: 'post',
        url: `http://localhost:3030/api/getSpotifyUser`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: JSON.stringify({code: code}),
        maxBodyLength: 100000000,
        maxContentLength: 100000000,
      }).then(function(response) {
        console.log(response)
      }).catch(function(e) {
        console.log(e)
      })
    }
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
