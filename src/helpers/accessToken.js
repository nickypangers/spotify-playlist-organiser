import { useStore } from "vuex";
import axios from "axios";
import qs from "qs";
import cookies from "js-cookie";

async function checkAccessTokenExpired() {
  const store = useStore();

  if (
    cookies.get("accessToken") != undefined ||
    cookies.get("refreshToken") == undefined
  ) {
    return;
  }
  let response = await axios.post(
    "/getRefreshsedAccessToken",
    qs.stringify({
      refreshToken: cookies.get("refreshToken"),
    })
  );

  cookies.set("accessToken", response.data.accessToken, {
    expires: response.data.expires_in,
  });

  store.commit("setAccessToken", response.data.access_token);
}

export default checkAccessTokenExpired;
