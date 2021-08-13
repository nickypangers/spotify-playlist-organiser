\
<template>
  <div class="search">
    <div class="container">
      <div class="d-flex flex-column align-items-center">
        <h1>This is a search page</h1>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search artists or tracks"
          v-model="query"
          @keyup="submitSearch"
        />
        <SearchResultCard
          :track="track"
          v-for="(track, index) in result.tracks.items"
          :key="'track-' + index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import checkAccessTokenExpired from "@/helpers/accessToken";
import SearchResultCard from "@/components/SearchResultCard";
import axios from "axios";
import qs from "qs";
export default {
  name: "Search",
  components: {
    SearchResultCard,
  },
  setup() {
    const store = useStore();

    const query = ref("");
    const result = ref({
      artists: {
        items: [],
      },
      tracks: {
        items: [],
      },
    });

    const accessToken = computed(() => store.state.accessToken);

    async function submitSearch() {
      if (query.value) {
        await searchQuery();
      } else {
        result.value = {
          artists: {
            items: [],
          },
          tracks: {
            items: [],
          },
        };
      }
    }

    async function searchQuery() {
      await checkAccessTokenExpired();

      let response = await axios.post(
        "/searchItem",
        qs.stringify({
          q: query.value,
          t: "artist,track",
          accessToken: accessToken.value,
        })
      );
      result.value = response.data;
    }

    return {
      query: query,
      result: result,
      accessToken: accessToken,
      submitSearch: submitSearch,
    };
  },
};
</script>
