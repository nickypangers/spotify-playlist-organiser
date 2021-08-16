import API from "@/helpers/api";

export default {
  async getTrackListFromSearch(list) {
    let trackList = [];

    for (const element of list) {
      let response = await API.getTrack(element.id);
      trackList.push(response.data);
    }

    return trackList;
  },

  async getTrackListFromPlaylist(list) {
    let trackList = [];

    for (const element of list) {
      let response = await API.getTrack(element.track.id);

      trackList.push(response.data);
    }

    return trackList;
  },
};
