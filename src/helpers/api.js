import axios from "axios";
import qs from "qs";

export default {
  async getSpotifyUserPlaylist(data) {
    let response = await axios.post(
      "/getSpotifyUserPlaylist",
      qs.stringify(data)
    );

    return response;
  },
};
