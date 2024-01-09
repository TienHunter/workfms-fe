import instance from "../instance";
import BaseService from "./baseService";

class CheclistService extends BaseService {
   endpoint = 'Checklists'
   constructor() {
      super()
   }

   async move(valueUpdate) {
      return await instance.put(`${this.getEndpoint()}/move`, valueUpdate);
   }

}

export default new CheclistService();