import "bootswatch/dist/lumen/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import router from "./router/index.js";
import { createPinia } from "pinia";
import "notyf/notyf.min.css";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
