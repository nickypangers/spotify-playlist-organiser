<template>
  <div class="container">
    <div v-if="isLoading">Loading</div>
    <div v-if="!isLoading">
      <div>
        <button @click="goToPlaylist()">Back to Playlist</button>
      </div>
      <div class="mt-3">
        <div class="row">
          <!-- <PlaylistItemButton
            v-for="(item, index) in playlistItemList"
            :key="'item-' + index"
            :item="item"
          /> -->
          <div class="col-6">Search</div>
          <div class="col-6">
            <draggable
              class="list-group"
              :list="playlistItemList"
              item-key="playlistItemList"
            >
              <template #item="{ element }">
                <PlaylistItemButton :item="element" />
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import PlaylistItemButton from "@/components/PlaylistItemButton";
import draggable from "vuedraggable";

import API from "@/helpers/api";

export default {
  name: "Edit",
  components: {
    draggable,
    PlaylistItemButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLoading = ref(false);

    const playlistItemList = ref([]);

    const selectedPlaylist = computed(() => store.state.playlist);
    const accessToken = computed(() => store.state.accessToken);

    const playlistItemLength = computed(
      () => selectedPlaylist.value.tracks.total
    );

    async function getPlaylistItemList() {
      let loopCount = Math.ceil(playlistItemLength.value / 100);

      for (let i = 0; i < loopCount; i++) {
        let response = await API.getPlaylistItemList({
          playlistId: selectedPlaylist.value.id,
          offset: i * 100,
          limit: 100,
          accessToken: accessToken.value,
        });

        console.log(response.data);
        playlistItemList.value.push.apply(
          playlistItemList.value,
          response.data.items
        );

        console.log(playlistItemList.value);
      }
    }

    function goToPlaylist() {
      router.push({
        name: "Playlist",
      });
    }

    onMounted(async () => {
      isLoading.value = true;
      console.log(playlistItemLength.value);
      await getPlaylistItemList();
      console.log(playlistItemList.value);
      isLoading.value = false;
    });

    return {
      isLoading: isLoading,
      selectedPlaylist: selectedPlaylist,
      playlistItemList: playlistItemList,
      playlistItemLength: playlistItemLength,
      goToPlaylist: goToPlaylist,
    };
  },
};
</script>
