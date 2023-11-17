import DashboardPage from "./DashboardPage.vue";
import BoardOverview from "./BoardOverview.vue";
import BoardOfWorkspace from "./BoardOfWorkspace.vue";
const routerDashboard = [
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      layout: "default",
    },
    component: DashboardPage,
    children: [
      {
        path: "/dashboard/board-overview",
        name: "BoardOverview",
        component: BoardOverview,
      },
      {
        path: "/dashboard/ws/:id/hone",
        name: "BoardOfWorkspace",
        component: BoardOfWorkspace,
      },
    ],
  },
];
export default routerDashboard;
