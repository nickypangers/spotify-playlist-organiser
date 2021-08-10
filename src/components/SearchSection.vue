<template>
  <div>
    <input
      class="w-100 py-2 px-3"
      type="text"
      name="search"
      id="seach"
      v-model="query"
      placeholder="Search Here..."
    />
    <div class="mt-3">
      <div v-if="isLoading == true">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-if="isLoading == false">
        <draggable
          v-if="resultList.length > 0"
          class="list-group"
          :list="resultList"
          :group="{ name: groupName, pull: 'clone', put: false }"
          item-key="queryResult"
        >
          <template #item="{ element }">
            <PlaylistItemButton :item="element" />
          </template>
        </draggable>
        <div v-if="resultList.length == 0">Enter something to search</div>
      </div>
    </div>
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

    const isLoading = ref(false);

    const query = ref("");

    const accessToken = computed(() => store.state.accessToken);
    const resultList = computed(() => store.state.searchResultList);

    let debounceTimeout;
    watch(query, (newVal) => {
      if (newVal.length == 0) {
        setSearchResultList([]);
        isLoading.value = false;
        return;
      }

      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        updateSearchResultList(newVal);
      }, 500);
    });

    async function updateSearchResultList(query) {
      isLoading.value = true;

      let response = await API.searchQuery(
        query,
        "artist,track",
        accessToken.value
      );

      let trackList = await track.getTrackListFromSearch(
        response.data.tracks.items,
        accessToken.value
      );

      setSearchResultList(trackList);
      isLoading.value = false;
    }

    function setSearchResultList(val) {
      store.commit("setSearchResultList", val);
    }

    onMounted(() => {
      setSearchResultList([]);
    });

    return {
      query: query,
      resultList: resultList,
      isLoading: isLoading,
    };
  },
};
</script>
