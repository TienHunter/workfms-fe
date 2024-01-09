import { createRouter, createWebHistory } from "vue-router";
import VueCookies from "vue-cookies";
import localStore from "@/utils/localStore.js";
import Enums from "@/enums"
import routerAuth from "../views/auth/router";
import routerDashboard from "../views/dashboard/router";
import routerWorkspace from "../views/workspace/router";
import NotfoundPage from "../views/notfound/NotfoundPage.vue";
import routerTest from "../views/tests/router";
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  ...routerDashboard,
  ...routerAuth,
  ...routerWorkspace,
  ...routerTest,
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      title: "Không tìm thấy",
      layout: "auth",
    },
    component: NotfoundPage,
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const token = localStore.getItem(Enums.localStorage.Token);
    if (token) {
      // Người dùng đã đăng nhập, cho phép truy cập
      next();
    } else {
      // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      next({ name: "Login" });
    }
  } else {
    // Tuyến công khai, cho phép truy cập
    next();
  }
});
export default router;
