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
}

export default new KanbanService();