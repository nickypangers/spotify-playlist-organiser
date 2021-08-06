<template>
  <div>
    <input type="text" name="search" id="seach" v-model="query" />
    <draggable
      class="list-group"
      :list="resultList"
      :group="{ name: groupName, pull: 'clone', put: false }"
      item-key="queryResult"
    >
      <template #item="{ element }">
        <PlaylistItemButton :item="element" />
      </template>
    </draggable>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";

import draggable from "vuedraggable";
import PlaylistItemButton from "@/components/PlaylistItemButton";

import API from "@/helpers/api";
import track from "@/helpers/getTrackList";

export default {
  name: "SearchSection",
  components: {
    draggable,
    PlaylistItemButton,
  },
  props: {
    groupName: String,
  },
  setup() {
    const store = useStore();

    const query = ref("");
    const resultList = ref([]);

    const accessToken = computed(() => store.state.accessToken);

    let debounceTimeout;
    watch(query, (newVal) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        updateSearchResultList(newVal);
      }, 500);
    });

    async function updateSearchResultList(query) {
      if (!query) {
        resultList.value = [];
        return;
      }

      let response = await API.searchQuery(
        query,
        "artist,track",
        accessToken.value
      );

      let trackList = await track.getTrackListFromSearch(
        response.data.tracks.items,
        accessToken.value
      );

      resultList.value = trackList;
    }

    onMounted(() => {
      // console.log("search section");
    });

    return {
      query: query,
      resultList: resultList,
    };
  },
};
</script>
