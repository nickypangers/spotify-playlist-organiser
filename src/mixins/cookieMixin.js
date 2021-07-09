import axios from "axios";
import qs from "qs";

export default {
  methods: {
    async checkAccessTokenExpired() {
      if (
        !this.$cookies.isKey("accessToken") &&
        this.$cookies.isKey("refreshToken")
      ) {
        let response = await axios.post(
          "/getRefreshedAccessToken",
          qs.stringify({
            refreshToken: this.$cookies.get("refreshToken"),
          })
        );

        this.$cookies.set(
          "accessToken",
          response.data.access_token,
          response.data.expires_in
        );

        this.$store.commit("setAccessToken", response.data.access_token);
      }
    },
  },
};
