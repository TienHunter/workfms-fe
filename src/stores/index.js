import { createStore } from "vuex";
import moduleWorkspaces from "./modules/workspaces/moduleWorkspaces";
import moduleProjects from "./modules/projects/moduleProjects";
const store = createStore({
   modules: {
      moduleWorkspaces,
      moduleProjects
   }
});
export default store;
