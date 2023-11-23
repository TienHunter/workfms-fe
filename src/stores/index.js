import { createStore } from "vuex";
import moduleWorkspaces from "./modules/workspaces/moduleWorkspaces";
const store = createStore({
   modules: {
      moduleWorkspaces,
   }
});
export default store;
