import API from "@/helpers/api";

export default {
  async getTrackListFromSearch(list, accessToken) {
    let trackList = [];

    for (const element of list) {
      let response = await API.getTrack(element.id, accessToken);
      trackList.push(response.data);
    }

    return trackList;
  },

  async getTrackListFromPlaylist(list, accessToken) {
    let trackList = [];

    for (const element of list) {
      let response = await API.getTrack(element.track.id, accessToken);

      trackList.push(response.data);
    }

    return trackList;
  },
};
