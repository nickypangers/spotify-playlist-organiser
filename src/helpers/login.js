import cookies from "js-cookie";
import store from "../store";

const client_id = "9fc05552fff74f828d684944657872de";

const redirect_uri = "http://localhost:8080/verify";

const scope = [
  "user-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
];

export function loginUrl() {
  return `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope.join(
    "%20"
  )}`;
}

export function login(timer) {
  clearInterval(timer);
  timer = setInterval(() => {
    let at = cookies.get("accessToken");

    if (at != null) {
      clearInterval(timer);
      store.commit("setAccessToken", at);
      return;
    }
  }, 1000);
}
