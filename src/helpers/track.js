export default function displayTrackArtist(track) {
  var displayArtist = "";

  let length = track.artists.length;

  track.artists.forEach((artist, index) => {
    if (index == length - 1) {
      displayArtist += artist.name;
    } else {
      displayArtist += `${artist.name}, `;
    }
  });

  return displayArtist;
}
