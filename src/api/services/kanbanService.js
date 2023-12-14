import instance from "../instance";
import BaseService from "./baseService";

class KanbanService extends BaseService {
   endpoint = 'Kanbans'
   constructor() {
      super()
   }

   async getListByProjectId(projectId) {
      return await instance.get(`${this.endpoint}/project/${projectId}`);
   }
   async move(value) {
      return await instance.put(`${this.getEndpoint()}/move`, value);
   }
}

export default new KanbanService();