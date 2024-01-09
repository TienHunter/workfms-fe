import instance from "../instance";
import BaseService from "./baseService";

class JobService extends BaseService {
   endpoint = 'Jobs'
   constructor() {
      super()
   }

   async updateStatusJob(id, status) {
      return await instance.put(`${this.getEndpoint()}/update-finished/${id}/${status}`)
   }
   async move(valueUpdate) {
      return await instance.put(`${this.getEndpoint()}/move`, valueUpdate);
   }


}

export default new JobService();