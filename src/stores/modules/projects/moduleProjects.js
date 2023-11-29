import { projectService } from "@/api/services";
import helper from "@/utils/helper";
const moduleProjects = {
   namespaced: true,
   state: () => ({
      projectsOwner: [],
      projects: [],
      project: {},
   }),
   mutations: {
      SET_PROJECTS(state, payload) {
         state.projects = payload;
      },
      SET_PROJECT(state, payload) {
         state.project = payload;
      },
      ADD_TO_PROJECTS(state, payload) {
         state.projects.unshift(payload);
      },
      SET_PROJECTS_OWNER(state, payload) {
         state.projectsOwner = payload;
      },
      ADD_PROJECTS_OWNER(state, payload) {
         state.projectsOwner.unshift(payload);
      },
      EDIT_PROJECT_NAME_IN_PROJECT_OWNER(state, payload) {
         let index = state.projectsOwner.findIndex(p => p.Id === payload.Id);
         if (index !== -1) {
            state.projectsOwner[index] = payload;
         }
      }
   },
   actions: {
      getProjectListOwnerAsync: async ({ satte, commit, rootState, dispatch }, payload) => {

         try {
            let res = await projectService.getListProjects({
               WorkspaceId: payload,
               Owner: true,
            });
            if (res?.Data?.Data) {
               dispatch("getProjectListOwner", res?.Data?.Data)
            }
         } catch (error) {
            console.log(error);
            message.error("get list project owner failure");
         } finally { }
      },
      getProjectListOwner: ({ commit }, payload) => {
         commit('SET_PROJECTS_OWNER', helper.deepClone(payload));
      },
      addProjectsOwner({ state, commit, rootState }, payload) {
         commit('ADD_PROJECTS_OWNER', helper.deepClone(payload));
      },
      editProjectNameInProjectOnwer({ commit }, payload) {
         commit('EDIT_PROJECT_NAME_IN_PROJECT_OWNER', helper.deepClone(payload));

      }
   }
}
export default moduleProjects