import instance from "../instance";
import BaseService from "./baseService";

class FileService extends BaseService {
   endpoint = 'Files'
   constructor() {
      super()
   }

   async uploadFile(file, id) {
      return await instance.post(`${this.getEndpoint()}/upload-attachment/${id}`, file)
   }
   async getFile(id) {
      return await instance.get(`${this.getEndpoint()}/${id}`, {
         responseType: "blob",
      })
   }
   async removeFile(id) {
      return await instance.delete(`${this.getEndpoint()}/${id}`)
   }

}

export default new FileService();