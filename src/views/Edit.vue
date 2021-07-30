<template>
  <div>
    <button @click="goToPlaylist()">Back to Playlist</button>
  </div>
  <div>
    {{ selectedPlaylist }}
    <br />
    {{ playlistItemList }}
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import API from "@/helpers/api";

export default {
  name: "Edit",
  setup() {
    const store = useStore();
    const router = useRouter();

    const playlistItemList = ref([]);

    const selectedPlaylist = computed(() => store.state.playlist);
    const accessToken = computed(() => store.state.accessToken);

    const playlistItemLength = computed(
      () => selectedPlaylist.value.tracks.total
    );

    async function getPlaylistItemList() {
      let response = await API.getPlaylistItemList({
        playlistId: selectedPlaylist.value.id,
        offset: 0,
        limit:
          selectedPlaylist.value.tracks.total > 100
            ? 100
            : selectedPlaylist.value.tracks.total,
        accessToken: accessToken.value,
      });

      playlistItemList.value = response.data;
    }

    function goToPlaylist() {
      router.push({
        name: 'Playlist',
      });
    }

    onMounted(async () => {
      //   console.log(selectedPlaylist.value);
      console.log(playlistItemLength.value);
      await getPlaylistItemList();
      console.log(playlistItemList.value);
    });

    return {
      selectedPlaylist: selectedPlaylist,
      playlistItemList: playlistItemList,
      goToPlaylist: goToPlaylist,
    };
  },
};
</script>
