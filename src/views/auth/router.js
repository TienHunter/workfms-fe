import VueCookies from "vue-cookies";
import LoginPage from "./LoginPage.vue";
import RegisterPage from "./RegisterPage.vue";

import localStore from "../../utils/localStore";
import Enums from "../../enums";
const routerAuth = [
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "auth",
      title: "Login - WorkFMS",
    },
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      // kiểm tra token có hay không
      const token = localStore.getItem(Enums.localStorage.Token);
      if (token) {
        next({ name: "Dashboard" });
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "auth",
      title: "Register - WorkFMS",
    },
    component: RegisterPage,
  },
];
export default routerAuth;
