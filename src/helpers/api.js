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

  async getPlaylistItemList(data) {
    let response = await axios.post(
      "/getSpotifyPlaylistItemList",
      qs.stringify(data)
    );

    return response;
  },

  async reorderPlaylistItem(data) {
    let response = await axios.post("/reorderPlaylistItem", qs.stringify(data));

    return response;
  },

  async searchQuery(data) {
    let response = await axios.post("/searchItem", qs.stringify(data));

    return response;
  },
};
