import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Search from "../views/Search.vue";
import Profile from "../views/Profile.vue";
import Verify from "../views/Verify.vue";

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
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
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
