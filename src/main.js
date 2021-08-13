import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import cookies from "vue3-cookies";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3030/api";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
  
createApp(App)
  .use(store)
  .use(router)
  .use(cookies)
  .use(BootstrapIconsPlugin)
  .mount("#app");
