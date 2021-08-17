import cookies from "js-cookie";
import store from "../store";
import API from "@/helpers/api";

export default async function checkAccessTokenExpired() {
  if (
    cookies.get("accessToken") != undefined ||
    cookies.get("refreshToken") == undefined
  ) {
    return;
  }

  let response = await API.getRefreshedAccessToken(cookies.get("refreshToken"));

  console.debug("response data=", response.data);

  if (response.data.error == "invalid_grant") {
    let reconnectModal = store.state.reconnectModal;
    reconnectModal.show();
    return;
  }

  cookies.set("accessToken", response.data.access_token, {
    expires: response.data.expires_in,
  });

  store.commit("setAccessToken", response.data.access_token);
}
