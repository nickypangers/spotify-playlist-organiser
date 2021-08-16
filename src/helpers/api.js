import axios from "axios";
import qs from "qs";
import store from "../store";

export default {
  async updateSelectedPlaylistDetail() {
    let formData = {
      playlistId: store.state.playlist.id,
      accessToken: store.state.accessToken,
    };

    let response = await axios.post(
      "/getSpotifyPlaylistDetail",
      qs.stringify(formData)
    );

    store.commit("setPlaylist", response.data);
  },

  async getSpotifyUserPlaylist(userId) {
    let formData = {
      userId: userId,
      accessToken: store.state.accessToken,
    };

    let response = await axios.post(
      "/getSpotifyUserPlaylist",
      qs.stringify(formData)
    );

    return response;
  },

  async getPlaylistItemList(playlistId, offset, limit) {
    let formData = {
      playlistId: playlistId,
      offset: offset,
      limit: limit,
      accessToken: store.state.accessToken,
    };

    let response = await axios.post(
      "/getSpotifyPlaylistItemList",
      qs.stringify(formData)
    );

    return response;
  },

  async reorderPlaylistItem(
    playlistID,
    rangeStart,
    insertBefore,
    rangeLength,
    snapshotId
  ) {
    let formData = {
      playlistID: playlistID,
      rangeStart: rangeStart,
      insertBefore: insertBefore,
      rangeLength: rangeLength,
      snapshotId: snapshotId,
      accessToken: store.state.accessToken,
    };

    let response = await axios.post(
      "/reorderPlaylistItem",
      qs.stringify(formData)
    );

    return response;
  },

  async searchQuery(q, t) {
    let formData = {
      q: q,
      t: t,
      accessToken: store.state.accessToken,
    };

    let response = await axios.post("/searchItem", qs.stringify(formData));

    return response;
  },

  async getTrack(id) {
    let formData = {
      id: id,
      accessToken: store.state.accessToken,
    };

    let response = await axios.post("/getTrack", qs.stringify(formData));

    return response;
  },

  async addItemsToPlaylist(playlistId, position, uris) {
    let formData = {
      playlistId: playlistId,
      position: position,
      uris: uris,
      accessToken: store.state.accessToken,
    };

    let response = await axios.post(
      "/addItemsToPlaylist",
      qs.stringify(formData)
    );

    return response;
  },

  async removeItemFromPlaylist(playlistId, uri) {
    let formData = {
      playlistId: playlistId,
      uri: uri,
      accessToken: store.state.accessToken,
    };

    let response = await axios.post(
      "/removeItemsFromPlaylist",
      qs.stringify(formData)
    );

    return response;
  },

  async getRefreshedAccessToken(refreshToken) {
    let response = await axios.post(
      "/getRefreshedAccessToken",
      qs.stringify({
        refreshToken: refreshToken,
      })
    );

    return response;
  },

  async getUserDetail() {
    let response = await axios.post(
      "/getSpotifyUser",
      qs.stringify({ accessToken: store.state.accessToken })
    );

    return response;
  },

  async unfollowPlaylist(playlistId) {
    let response = await axios.post(
      "/unfollowPlaylist",
      qs.stringify({
        playlistID: playlistId,
        accessToken: store.state.accessToken,
      })
    );

    return response;
  },

  async getSpotifyPlaylistDetail(playlistId) {
    let response = await axios.post(
      "getSpotifyPlaylistDetail",
      qs.stringify({
        playlistId: playlistId,
        accessToken: store.state.accessToken,
      })
    );

    return response;
  },
};
