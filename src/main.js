import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import cookies from "vue3-cookies";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
  .use(store)
  .use(router)
  .use(cookies)
  .use(BootstrapIconsPlugin)
  .mount("#app");
