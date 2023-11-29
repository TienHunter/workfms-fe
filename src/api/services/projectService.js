import instance from "../instance";
import baseService from "./baseService";
const endpoint = "project";

class ProjectService extends baseService {
   endpoint = "Projects";
   constructor() {
      super(); // Gọi constructor của lớp cha
      // Các định nghĩa riêng của lớp con...
   }

   async getListProjects(queryParam) {
      return await instance.get(`${this.getEndpoint()}`, {
         params: queryParam
      });
   }
   async getProjectById(projectId) {
      return await instance.get(`${this.getEndpoint()}/${projectId}`);
   }
   async editProjectName(projectEdit) {
      return await instance.put(`${this.getEndpoint()}/edit-projectname`, projectEdit)
   }
}
export default new ProjectService();