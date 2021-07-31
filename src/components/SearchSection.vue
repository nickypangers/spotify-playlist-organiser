<template>
  <input type="text" name="search" id="seach" v-model="query" />
  <div>
    <!-- <SearchResultCard
      :track="track"
      v-for="(track, index) in queryResult"
      :key="'track-' + index"
    /> -->
    <draggable
      class="list-group"
      :list="queryResult"
      :group="{ name: groupName, pull: 'clone', put: false }"
      item-key="queryResult"
    >
      <template #item="{ element }">
        <SearchResultCard :track="element" />
      </template>
    </draggable>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";

import SearchResultCard from "@/components/SearchResultCard";
import draggable from "vuedraggable";

import API from "@/helpers/api";

export default {
  name: "SearchSection",
  components: {
    SearchResultCard,
    draggable,
  },
  props: {
    groupName: String,
  },
  setup() {
    const store = useStore();

    const query = ref("");

    const accessToken = computed(() => store.state.accessToken);
    const queryResult = computed(() => store.state.searchResultList);

    watch(query, async (newVal) => {
      let formData = {
        q: newVal,
        t: "artist,track",
        accessToken: accessToken.value,
      };

      let response = await API.searchQuery(formData);

      store.commit("setSearchResultList", response.data.tracks.items);
    });

    onMounted(() => {
      store.commit("setSearchResultList", []);
    });

    return {
      query: query,
      queryResult: queryResult,
    };
  },
};
</script>
