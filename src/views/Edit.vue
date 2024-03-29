<template>
  <div class="container">
    <div class="mt-3">
      <div class="row">
        <div
          class="col-12 d-flex justify-content-between align-items-center mb-4"
        >
          <div>
            <!-- <button type="button" class="btn" @click="goToPlaylist()">
              <BIconArrowLeftCircleFill />
            </button> -->
            <BackToPlaylistButton @click="goToPlaylist()" />
          </div>
          <div>
            <RefreshButton @click="initPlaylistItemList" />
          </div>
        </div>
        <div class="col-12 mb-2 d-flex justify-content-end" v-if="!isLoading">
          <select
            name="page"
            id="page"
            v-model="currentPage"
            @change="getPlaylistItemList(currentPage)"
          >
            <option
              :value="index"
              v-for="(page, index) in playlistTotalPage"
              :key="'page-' + page"
            >
              Page {{ page }}
            </option>
          </select>
        </div>
        <div class="col-lg-6 col-12">
          <SearchSection :groupName="groupName" />
        </div>
        <div class="col-lg-6 col-12">
          <div v-if="isLoading" class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div v-if="!isLoading">
            <div v-if="playlistItemList.length == 0">
              No songs yet. Drag here to start adding.
            </div>
            <div>
              <draggable
                class="list-group"
                :list="playlistItemList"
                :group="groupName"
                item-key="playlistItemList"
                @add="insertItem"
                @end="reorderItem"
              >
                <template #item="{ element, index }">
                  <PlaylistItemEditButton
                    :item="element"
                    @showToast="showToast"
                    @remove="removeItemFromPlaylist(index)"
                  />
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div
      ref="toast"
      class="toast align-items-center text-white border-0"
      :class="{
        'bg-toast-error': !isReorderSuccess,
        'bg-toast-success': isReorderSuccess,
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
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import PlaylistItemEditButton from "@/components/PlaylistItemEditButton";
import draggable from "vuedraggable";
import SearchSection from "../components/SearchSection";
import RefreshButton from "@/components/RefreshButton";
import BackToPlaylistButton from "@/components/BackToPlaylistButton";

import API from "@/helpers/api";
import * as bootstrap from "bootstrap";
import track from "@/helpers/getTrackList";

export default {
  name: "Edit",
  components: {
    draggable,
    PlaylistItemEditButton,
    SearchSection,
    RefreshButton,
    BackToPlaylistButton,
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
    const currentPage = ref(0);

    const selectedPlaylist = computed(() => store.state.playlist);
    const accessToken = computed(() => store.state.accessToken);
    const playlistItemLength = computed(
      () => selectedPlaylist.value.tracks.total
    );
    const searchResultList = computed(() => store.state.searchResultList);
    const playlistTotalPage = computed(() =>
      Math.ceil(playlistItemLength.value / 10)
    );

    async function initPlaylistItemList() {
      await getPlaylistItemList(0);
    }

    async function getPlaylistItemList(index) {
      console.debug("index=", index);

      isLoading.value = true;

      let response = await API.getPlaylistItemList(
        selectedPlaylist.value.id,
        index * 10,
        10,
        accessToken.value
      );

      console.debug("itemList=", response);

      let trackList = await track.getTrackListFromPlaylist(
        // itemList,
        response.data.items,
        accessToken.value
      );

      // console.log(trackList);

      playlistItemList.value = trackList;

      isLoading.value = false;
    }

    function goToPlaylist() {
      router.push({
        name: "Playlist",
      });
    }

    function showToast(msg, state) {
      console.log(msg);
      toastMessage.value = msg;
      isReorderSuccess.value = state;
      toastEl.show();
    }

    async function insertItem(event) {
      if (event.type != "add") {
        showToast("Something went wrong. Please refresh and try again.", false);
        return;
      }

      let track = searchResultList.value[event.oldIndex];

      let response = await API.addItemsToPlaylist(
        selectedPlaylist.value.id,
        event.newIndex,
        track.uri,
        accessToken.value
      );

      if (response.data.error.status != 0) {
        showToast(response.data.error.message, false);
        return;
      }

      await API.updateSelectedPlaylistDetail(store);

      showToast(`Added ${track.name} to ${selectedPlaylist.value.name}.`, true);
    }

    async function reorderItem(event) {
      if (event.type != "end") {
        showToast("Something went wrong. Please refresh and try again.");
        return;
      }

      if (event.newIndex == event.oldIndex) {
        return;
      }

      let insertBefore =
        event.oldIndex > event.newIndex ? event.newIndex : event.newIndex + 1;

      let response = await API.reorderPlaylistItem(
        selectedPlaylist.value.id,
        event.oldIndex,
        insertBefore,
        1,
        selectedPlaylist.value.snapshot_id,
        accessToken.value
      );

      if (response.data.error.status != 0) {
        showToast("Unable to reorder.", false);

        return;
      }

      showToast("Successfully reordered.", true);
    }

    function removeItemFromPlaylist(index) {
      playlistItemList.value.splice(index, 1);
    }

    onMounted(async () => {
      toastEl = new bootstrap.Toast(toast.value, {
        autohide: true,
        delay: 1500,
      });
      await API.updateSelectedPlaylistDetail(store);
      // isLoading.value = true;
      await initPlaylistItemList();
      console.debug("totalPage=", playlistTotalPage.value);
      // isLoading.value = false;
    });

    return {
      toast: toast,
      toastMessage: toastMessage,
      isReorderSuccess: isReorderSuccess,
      isLoading: isLoading,
      groupName: groupName,
      currentPage: currentPage,
      selectedPlaylist: selectedPlaylist,
      playlistItemList: playlistItemList,
      playlistItemLength: playlistItemLength,
      playlistTotalPage: playlistTotalPage,
      goToPlaylist: goToPlaylist,
      reorderItem: reorderItem,
      initPlaylistItemList: initPlaylistItemList,
      insertItem: insertItem,
      showToast: showToast,
      removeItemFromPlaylist: removeItemFromPlaylist,
      getPlaylistItemList: getPlaylistItemList,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-toast-success {
  background-color: $green;
}

.bg-toast-error {
  background-color: red;
}
</style>
