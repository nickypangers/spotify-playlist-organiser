<template>
  {{ this.$route.query.code }}
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Verify",
  mounted() {
    axios
      .post(
        "http://localhost:3030/api/getAuthToken",
        qs.stringify({
          grantType: "authorization_code",
          code: this.$route.query.code,
        })
      )
      .then(
        function (response) {
          this.$cookies.set(
            "accessToken",
            response.data.access_token,
            response.data.expires_in
          );

          this.$cookies.set("refreshToken", response.data.refresh_token);

          window.close();
        }.bind(this)
      );
  },
};
</script>
