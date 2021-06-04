<template>
  {{ this.$route.query.code }}
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Verify",
  mounted() {
    this.$cookies.set("accessToken", this.$route.query.code);

    let code = this.$route.query.code;

    axios
      .post(
        "http://localhost:3030/api/getAuthToken",
        qs.stringify({ code: code })
      )
      .then(
        function (response) {
          this.$cookies.set(
            "accessToken",
            response.data.access_token,
            response.data.expires_in
          );
          window.close();
        }.bind(this)
      );
  },
};
</script>
