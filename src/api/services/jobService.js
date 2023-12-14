import instance from "../instance";
import BaseService from "./baseService";

class JobService extends BaseService {
   endpoint = 'Jobs'
   constructor() {
      super()
   }

}

export default new JobService();