import { createRouter, createWebHistory } from "vue-router";
import VueCookies from "vue-cookies";
import routerAuth from "../views/auth/router";
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/dashboard/Dashboard.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      title: "Không tìm thấy",
    },
    component: () => <div>NotFound</div>,
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
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((route) => route.meta.requiresAuth)) {
//     // Kiểm tra xem người dùng đã đăng nhập hay chưa
//     const token = VueCookies.get("token");
//     if (token) {
//       // Người dùng đã đăng nhập, cho phép truy cập
//       next();
//     } else {
//       // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
//       next({ name: "Login" });
//     }
//   } else {
//     // Tuyến công khai, cho phép truy cập
//     next();
//   }
// });
export default router;
