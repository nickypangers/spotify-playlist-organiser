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
import SearchResultCard from "@/components/SearchResultCard";
import axios from "axios";
import qs from "qs";
export default {
  name: "Search",
  components: {
    SearchResultCard,
  },
  data() {
    return {
      query: "",
      type: "artist,track",
      result: {
        artists: {
          items: [],
        },
        tracks: {
          items: [],
        },
      },
    };
  },
  computed: {
    accessToken() {
      return this.$store.state.accessToken;
    },
  },
  methods: {
    async submitSearch() {
      if (this.query) {
        await this.searchQuery();
      } else {
        this.result = {
          artists: {
            items: [],
          },
          tracks: {
            items: [],
          },
        };
      }
    },
    async searchQuery() {
      let response = await axios.post(
        "http://localhost:3030/api/searchItem",
        qs.stringify({
          q: this.query,
          t: this.type,
          accessToken: this.accessToken,
        })
      );
      this.result = response.data;
    },
  },
};
</script>
