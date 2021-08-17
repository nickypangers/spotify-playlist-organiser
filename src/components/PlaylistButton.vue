<template>
  <div :class="{ selected: isSelected }" class="playlist-button py-2">
    <div class="playlist-inner-button py-2 m-0">
      <div class="d-flex align-items-center">
        <p class="m-0">{{ playlist.name }}</p>
        <PublicStatusLabel class="ms-2" :isPublic="playlist.public" />
        <CollaborativeLabel class="ms-2" v-if="playlist.collaborative" />
      </div>
      {{ displayTotalSongs }}
    </div>
    <hr v-if="isSelected" />
    <div class="w-100 d-flex justify-content-around" v-if="isSelected">
      <div class="btn-group">
        <button
          type="button"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <BIconList />
        </button>
        <ul class="dropdown-menu">
          <li
            class="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#editPlaylistDetailsModal"
          >
            Edit Playlist Details
          </li>
          <li class="dropdown-item">Another action</li>
          <li class="dropdown-item" @click="unfollowPlaylist">
            Unfollow Playlist
          </li>
        </ul>
      </div>
      <router-link to="/edit"
        ><button class="btn" @click="log('test')">
          <BIconPencilFill /></button
      ></router-link>
      <div class="btn-group">
        <button
          type="button"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <BIconLink45deg />
        </button>
        <ul class="dropdown-menu">
          <li
            class="dropdown-item"
            @click="goTo(playlist.external_urls.spotify)"
          >
            Open on browser
          </li>
          <li class="dropdown-item" @click="goTo(playlist.uri)">Open on app</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import checkAccessTokenExpired from "@/helpers/accessToken";
import CollaborativeLabel from "@/components/CollaborativeLabel";
import PublicStatusLabel from "@/components/PublicStatusLabel";
import API from "@/helpers/api";
export default {
  name: "PlaylistButton",
  props: { playlist: Object, isSelected: Boolean },
  emits: ["success"],
  components: {
    CollaborativeLabel,
    PublicStatusLabel,
  },
  setup(props, { emit }) {
    const store = useStore();

    const accessToken = computed(() => store.state.accessToken);

    const displayTotalSongs = computed(() => {
      let total = props.playlist.tracks.total;
      if (total > 1) {
        return `${total} songs`;
      }

      return `${total} song`;
    });

    function log(val) {
      console.log(val);
    }

    function goTo(val) {
      window.open(val);
    }

    async function unfollowPlaylist() {
      await checkAccessTokenExpired();

      let response = await API.unfollowPlaylist(props.playlist.id);

      if (response.data.success) {
        emit("success");
      } else {
        console.log(response.data);
      }
    }

    return {
      accessToken: accessToken,
      displayTotalSongs: displayTotalSongs,
      log: log,
      goTo: goTo,
      unfollowPlaylist: unfollowPlaylist,
    };
  },
};
</script>

<style lang="scss" scoped>
.playlist-button {
  border-radius: 0.25rem;
}

.playlist-inner-button {
  min-height: 2rem;
  word-wrap: break-word;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.selected {
  background: $blue;
  transition: all 0.3s ease-in-out;
  color: $white;
}

.dropdown-item {
  cursor: pointer;
}
</style>
