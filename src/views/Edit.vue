<template>
  {{ selectedPlaylist }}
  <br />
  {{ playlistItemList }}
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import API from "@/helpers/api";

export default {
  name: "Edit",
  setup() {
    const store = useStore();

    const playlistItemList = ref([]);

    const selectedPlaylist = computed(() => store.state.playlist);
    const accessToken = computed(() => store.state.accessToken);

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

    onMounted(async () => {
      //   console.log(selectedPlaylist.value);
      await getPlaylistItemList();
      console.log(playlistItemList.value);
    });

    return {
      selectedPlaylist: selectedPlaylist,
      playlistItemList: playlistItemList,
    };
  },
};
</script>
