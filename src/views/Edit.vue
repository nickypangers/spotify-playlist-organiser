<template>
  <div class="container">
    <div v-if="isLoading">Loading</div>
    <div v-if="!isLoading">
      <div class="mt-3">
        <div class="row">
          <div
            class="
              col-12
              d-flex
              justify-content-between
              align-items-center
              mb-4
            "
          >
            <div>
              <button @click="goToPlaylist()">Back to Playlist</button>
            </div>
            <div>
              <button @click="initPlaylistItemList">Reload</button>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <SearchSection :groupName="groupName" />
          </div>
          <div class="col-lg-6 col-12">
            <draggable
              class="list-group"
              :list="playlistItemList"
              :group="groupName"
              item-key="playlistItemList"
              @end="reorderItem"
            >
              <template #item="{ element }">
                <PlaylistItemButton :item="element" />
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div
        ref="toast"
        class="toast align-items-center text-white border-0"
        :class="{
          'bg-danger': !isReorderSuccess,
          'bg-success': isReorderSuccess,
        }"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">{{ toastMessage }}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
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
import * as bootstrap from "bootstrap";
import SearchSection from "../components/SearchSection.vue";

export default {
  name: "Edit",
  components: {
    draggable,
    PlaylistItemButton,
    SearchSection,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const toast = ref(null);
    var toastEl = null;
    const toastMessage = ref("");
    const isReorderSuccess = ref(false);

    const isLoading = ref(false);

    const groupName = "playlist";

    const playlistItemList = ref([]);

    const selectedPlaylist = computed(() => store.state.playlist);
    const accessToken = computed(() => store.state.accessToken);

    const playlistItemLength = computed(
      () => selectedPlaylist.value.tracks.total
    );

    async function initPlaylistItemList() {
      playlistItemList.value = [];
      await getPlaylistItemList();
    }

    async function getPlaylistItemList() {
      let loopCount = Math.ceil(playlistItemLength.value / 100);

      for (let i = 0; i < loopCount; i++) {
        let response = await API.getPlaylistItemList({
          playlistId: selectedPlaylist.value.id,
          offset: i * 100,
          limit: 100,
          accessToken: accessToken.value,
        });

        playlistItemList.value.push.apply(
          playlistItemList.value,
          response.data.items
        );
      }
    }

    function goToPlaylist() {
      router.push({
        name: "Playlist",
      });
    }

    function showToast(msg) {
      toastMessage.value = msg;
      toastEl.show();
    }

    async function reorderItem(event) {
      if (event.newIndex == event.oldIndex) {
        return;
      }

      let insertBefore =
        event.oldIndex > event.newIndex ? event.newIndex : event.newIndex + 1;

      let formData = {
        playlistID: selectedPlaylist.value.id,
        rangeStart: event.oldIndex,
        insertBefore: insertBefore,
        rangeLength: 1,
        snapshotId: selectedPlaylist.value.snapshot_id,
        accessToken: accessToken.value,
      };

      let response = await API.reorderPlaylistItem(formData);

      if (response.data.error.status != 0) {
        showToast("Unable to reorder.");
        isReorderSuccess.value = false;

        return;
      }

      showToast("Successfully reordered.");
      isReorderSuccess.value = true;
    }

    onMounted(async () => {
      toastEl = new bootstrap.Toast(toast.value, {
        autohide: true,
        delay: 1500,
      });
      isLoading.value = true;
      await getPlaylistItemList();
      isLoading.value = false;
    });

    return {
      toast: toast,
      toastMessage: toastMessage,
      isReorderSuccess: isReorderSuccess,
      isLoading: isLoading,
      groupName: groupName,
      selectedPlaylist: selectedPlaylist,
      playlistItemList: playlistItemList,
      playlistItemLength: playlistItemLength,
      goToPlaylist: goToPlaylist,
      reorderItem: reorderItem,
      initPlaylistItemList: initPlaylistItemList,
    };
  },
};
</script>
