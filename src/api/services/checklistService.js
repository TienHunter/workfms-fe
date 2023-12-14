import instance from "../instance";
import BaseService from "./baseService";

class CheclistService extends BaseService {
   endpoint = 'Checklists'
   constructor() {
      super()
   }

}

export default new CheclistService();