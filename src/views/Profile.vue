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
export default {
  name: "Profile",
  components: {
  },
  data() {
    return {
      user: this.$store.state.user,
    };
  },
  computed: {
    profileImage () {
      return this.user.images.length == 0 ? "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" : this.user.images[0].url
    }
  },
  methods: {
    goToProfileWeb() {
      window.open(this.user.external_urls.spotify, "_blank")
    },
    goToProfileApp() {
      window.open(this.user.uri)
      // console.log(this.user.uri)
    }
  }
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
