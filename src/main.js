import "./style.css";
import { createApp } from "vue";
import router from "./routers";
import VueCookies from "vue-cookies";
import Antd from "ant-design-vue";
import { notification, message } from "ant-design-vue";
import * as icons from "@ant-design/icons-vue";
import App from "./App.vue";
import store from "./stores";
import "ant-design-vue/dist/reset.css";
import { registerGlobalComponents } from "./utils/import";
const app = createApp(App);
registerGlobalComponents(app);
app.use(VueCookies);
app.use(router);
app.use(store);
app.use(Antd);

// Tạo thành phần Vue cho mỗi biểu tượng
for (const key in icons) {
  app.component(key, icons[key]);
}
message.config({
  top: "100px",
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: "toast-message",
});
app.mount("#app");
