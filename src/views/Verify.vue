<template>
  {{ route.query.code }}
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import qs from "qs";
import cookies from "js-cookie";

export default {
  name: "Verify",
  setup() {
    const route = useRoute();

    onMounted(() => {
      axios
        .post(
          "/getAccessToken",
          qs.stringify({
            grantType: "authorization_code",
            code: route.query.code,
          })
        )
        .then(function (response) {
          cookies.set("accessToken", response.data.access_token, {
            expires: response.data.expires_in,
          });

          cookies.set("refreshToken", response.data.refresh_token);

          let scopeList = response.data.scope.split(" ");

          scopeList.forEach((scope) => {
            cookies.set(scope, 1);
          });

          window.close();
        });
    });

    return {
      route: route,
    };
  },
  // mounted() {
  //   axios
  //     .post(
  //       "/getAccessToken",
  //       qs.stringify({
  //         grantType: "authorization_code",
  //         code: this.$route.query.code,
  //       })
  //     )
  //     .then(
  //       function (response) {
  //         this.$cookies.set(
  //           "accessToken",
  //           response.data.access_token,
  //           response.data.expires_in
  //         );

  //         this.$cookies.set("refreshToken", response.data.refresh_token);

  //         window.close();
  //       }.bind(this)
  //     );
  // },
};
</script>
