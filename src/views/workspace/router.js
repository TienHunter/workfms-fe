import WorkspacePage from "./WorkspacePage.vue";
import WorkspaceMember from "./WorkspaceMember.vue";
import WorkspaceSetting from "./WorkspaceSetting.vue";
import WorkspaceBoard from "./WorkspaceBoard.vue";
import ProjectDetail from "./project/ProjectDetail.vue";
import CardDetail from "./project/CardDetail.vue";
const routerWorkspace = [
  {
    path: "/ws/:id/",
    name: "WorkspacePage",
    meta: {
      layout: "default",
      requiresAuth: true
    },
    redirect: (to) => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: "member" };
    },
    component: WorkspacePage,
    children: [
      {
        path: "member",
        name: "WorkspaceMember",
        component: WorkspaceMember,
      },
      {
        path: "setting",
        name: "WorkspaceSetting",
        component: WorkspaceSetting,
      },
      {
        path: "boards",
        name: "WorkspaceBoard",
        component: WorkspaceBoard,
      },
      {
        path: "projects/:projectId",
        name: "ProjectDetail",
        component: ProjectDetail,
        children: [
          {
            path: 'card/:cardId',
            name: 'CardDetail',
            component: CardDetail
          }
        ]
      }
    ],
  },
];
export default routerWorkspace;
