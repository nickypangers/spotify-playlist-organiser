<template>
  <div class="profile">
    <div class="container">
      <div class="d-flex flex-column align-items-center">
        <h1>Profile</h1>
        <div class="image mb-2">
          <img :src="profileImage" alt="profile picture" />
        </div>
        <p class="displayName mb-2">{{ user.display_name }}</p>
        <div @click="goToProfile"></div>
        <div class="btn-group dropend">
          <button
            type="button"
            class="btn dropdown-toggle user-link"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>Profile</span>
          </button>
          <ul class="dropdown-menu">
            <li class="dropdown-item" @click="goToProfileWeb">Open in Web</li>
            <li class="dropdown-item" @click="goToProfileApp">Open in App</li>
          </ul>
        </div>
        <p class="my-2">{{ user }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Profile",
  components: {},
  setup() {
    const store = useStore();

    const user = ref(store.state.user);

    const profileImage = computed(() => {
      return user.value.images.length == 0
        ? "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
        : user.value.images[0].url;
    });

    function goToProfileWeb() {
      window.open(user.value.external_urls.spotify, "_blank");
    }

    function goToProfileApp() {
      window.open(user.value.uri);
    }

    return {
      user: user,
      profileImage: profileImage,
      goToProfileWeb: goToProfileWeb,
      goToProfileApp: goToProfileApp,
    };
  },
};
</script>

<style scoped>
.user-link {
  display: flex;
  align-items: center;
  padding: 3px 15px;
  text-decoration: none;
  color: white;
  background-color: lightgray;
  border-radius: 1em;
  cursor: pointer;
}

.image {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
}

.image img {
  position: absolute;
  width: auto;
  height: 100%;
  left: -50px;
  transform: translateX(25%);
}

.displayName {
  font-size: 2rem;
  font-weight: bold;
}
</style>
