import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";
import Home from "@/views/Home.vue";
import Playlist from "@/views/Playlist.vue";
import Edit from "@/views/Edit.vue";
import Search from "@/views/Search.vue";
import Profile from "@/views/Profile.vue";
import Verify from "@/views/Verify.vue";

function isAuthenticated() {
  return store.state.user != null;
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/playlist",
    name: "Playlist",
    component: Playlist,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
