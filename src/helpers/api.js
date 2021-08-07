import axios from "axios";
import qs from "qs";

export default {
  async getSpotifyUserPlaylist(userId, accessToken) {
    let formData = {
      userId: userId,
      accessToken: accessToken,
    };

    let response = await axios.post(
      "/getSpotifyUserPlaylist",
      qs.stringify(formData)
    );

    return response;
  },

  async getPlaylistItemList(playlistId, offset, limit, accessToken) {
    let formData = {
      playlistId: playlistId,
      offset: offset,
      limit: limit,
      accessToken: accessToken,
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
    snapshotId,
    accessToken
  ) {
    let formData = {
      playlistID: playlistID,
      rangeStart: rangeStart,
      insertBefore: insertBefore,
      rangeLength: rangeLength,
      snapshotId: snapshotId,
      accessToken: accessToken,
    };

    let response = await axios.post(
      "/reorderPlaylistItem",
      qs.stringify(formData)
    );

    return response;
  },

  async searchQuery(q, t, accessToken) {
    let formData = {
      q: q,
      t: t,
      accessToken: accessToken,
    };

    let response = await axios.post("/searchItem", qs.stringify(formData));

    return response;
  },

  async getTrack(id, accessToken) {
    let formData = {
      id: id,
      accessToken: accessToken,
    };

    let response = await axios.post("/getTrack", qs.stringify(formData));

    return response;
  },

  async addItemsToPlaylist(playlistId, position, uris, accessToken) {
    let formData = {
      playlistId: playlistId,
      position: position,
      uris: uris,
      accessToken: accessToken,
    };

    let response = await axios.post(
      "/addItemsToPlaylist",
      qs.stringify(formData)
    );

    return response;
  },

  async removeItemFromPlaylist(playlistId, uri, accessToken) {
    let formData = {
      playlistId: playlistId,
      uri: uri,
      accessToken: accessToken,
    };

    let response = await axios.post(
      "/removeItemFromPlaylist",
      qs.stringify(formData)
    );

    return response;
  },
};
