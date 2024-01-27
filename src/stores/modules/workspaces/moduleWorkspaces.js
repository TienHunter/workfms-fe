
import { workspaceService } from "@/api/services";
import helper from "@/utils/helper";
import { message } from "ant-design-vue";
const moduleWorkspaces = {
   namespaced: true,
   state: () => ({
      workspaces: [],
      workspace: {},
   }),
   mutations: {
      SET_WORKSPACES(state, payload) {
         state.workspaces = payload;
      },
      SET_WORKSPACE(state, payload) {
         state.workspace = payload;
      },
      ADD_TO_WORKSPACES(state, payload) {
         state.workspaces.unshift(payload);
      }
   },
   actions: {
      getWorkspaces: async ({ satte, commit, rootState }) => {
         try {
            let res = await workspaceService.getAll();
            if (res?.Data?.Data) {
               commit("SET_WORKSPACES", helper.deepClone(res.Data.Data));
            }
         } catch (error) {
            console.log(error);
            message.error("Lấy dữ liệu thất bại");
         } finally {

         }
      },
      getWorkspaceById: async ({ satte, commit, rootState }, id) => {
         try {
            let res = await workspaceService.getById(id);
            if (res?.Data) {
               commit("SET_WORKSPACE", res.Data);
            }
         } catch (error) {
            console.log(error);
            message.error("Lấy dữ liệu thất bại");
         } finally {

         }
      },

      addToWorkspaces: ({ state, commit, rootState }, payload) => {
         const tmp = helper.deepClone(payload);
         commit('ADD_TO_WORKSPACES', tmp);
      }
   },
   getters: {}
}

export default moduleWorkspaces;