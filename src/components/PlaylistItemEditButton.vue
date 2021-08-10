<template>
  <div class="d-flex align-items-stretch edit-button">
    <PlaylistItemButton class="col" :item="item" />
    <div class="mb-2">
      <button class="ms-2 btn delete" @click="removeItemFromPlaylist">
        <BIconTrash />
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import PlaylistItemButton from "@/components/PlaylistItemButton";

import API from "@/helpers/api";

export default {
  name: "PlaylistItemEditButton",
  components: {
    PlaylistItemButton,
  },
  props: {
    item: Object,
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["showToast", "remove"],
  setup(props, { emit }) {
    const store = useStore();

    const hover = ref(false);

    const selectedPlaylist = computed(() => store.state.playlist);
    const accessToken = computed(() => store.state.accessToken);

    async function removeItemFromPlaylist() {
      let response = await API.removeItemFromPlaylist(
        selectedPlaylist.value.id,
        props.item.uri,
        accessToken.value
      );

      console.log(response.data);

      if (response.data.error.status != 0) {
        emit("showToast", "Unable to delete", false);
        return;
      }
      emit("showToast", `Successfully deleted ${props.item.name}`, true);

      emit("remove");
    }

    return {
      hover: hover,
      removeItemFromPlaylist: removeItemFromPlaylist,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit-button {
  &:hover {
    .delete {
      display: block;
    }
  }
}

.delete {
  display: none;
  height: 100%;
  width: 4rem;
  background-color: red;

  &:hover {
    background-color: $white;
    color: red;
    border: 1px solid red;
  }
}
</style>
