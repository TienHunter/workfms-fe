import VueCookies from "vue-cookies";
const routerAuth = [
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "login",
      title: "Login - WorkFMS",
    },
    component: () => import("@/views/auth/Login.vue"),
    beforeEnter: (to, from, next) => {
      // kiểm tra token có hay không
      const token = VueCookies.get("token");
      if (token) {
        next({ name: "Dashboard" });
      } else {
        next();
      }
    },
  },
];
export default routerAuth;
