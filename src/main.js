import "./style.css";
import { createApp } from "vue";
import router from "./routers";
import VueCookies from "vue-cookies";
import Antd from "ant-design-vue";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { notification, message } from "ant-design-vue";
import * as icons from "@ant-design/icons-vue";
import App from "./App.vue";
import Icon from "@ant-design/icons-vue";
import store from "./stores";
import i18n from "./i18n";
import "ant-design-vue/dist/reset.css";
import { registerGlobalComponents } from "./utils/import";

const app = createApp(App);
registerGlobalComponents(app);
app.use(VueCookies);
app.use(router);
app.use(store);
app.use(i18n);
app.use(Antd);
app.component("icon", Icon);
app.component('QuillEditor', QuillEditor)
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
