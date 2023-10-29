import { createApp } from "vue";
import router from "./routers/router.js";
import VueCookies from "vue-cookies";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(VueCookies);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount("#app");
