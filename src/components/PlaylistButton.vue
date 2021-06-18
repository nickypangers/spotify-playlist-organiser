<template>
  <div>
    <div class="playlist-button py-2">
      <div class="d-flex align-items-center">
        <p class="m-0">{{ playlist.name }}</p>
        <Label
          class="ms-2"
          name="Collaborative"
          v-if="playlist.collaborative"
        />
      </div>
      {{ playlist.tracks.total }} song(s)
    </div>
    <div class="w-100 d-flex justify-content-around" v-if="isSelected">
      <button class="btn" @click="log('hi')">
        <BIconList />
      </button>
      <button class="btn" @click="log('test')">
        <BIconList />
      </button>
      <button class="btn" @click="goTo(playlist.uri)">
        <BIconBoxArrowRight />
      </button>
    </div>
  </div>
</template>

<script>
import Label from "@/components/Label";
export default {
  name: "PlaylistButton",
  props: { playlist: Object, isSelected: Boolean },
  components: {
    Label,
  },
  methods: {
    log(val) {
      console.log(val);
    },
    goTo(val) {
      window.open(val);
    },
  },
};
</script>

<style scoped>
.playlist-button {
  min-height: 2rem;
  word-wrap: break-word;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
