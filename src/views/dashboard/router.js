import DashboardPage from "./DashboardPage.vue";
import BoardOverview from "./BoardOverview.vue";
import BoardOfWorkspace from "./BoardOfWorkspace.vue";
const routerDashboard = [
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      layout: "default",
      requiresAuth: true // Indicate that authentication is required for this route
    },
    component: DashboardPage,
    children: [
      {
        path: "board-overview",
        name: "BoardOverview",
        component: BoardOverview,
      },
      {
        path: "ws/:id/hone",
        name: "BoardOfWorkspace",
        component: BoardOfWorkspace,
      },
    ],
  },
];
export default routerDashboard;
