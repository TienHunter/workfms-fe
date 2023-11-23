import instance from "../instance";

class BaseService {
   constructor() { };
   endpoint = "";

   getEndpoint() {
      return this.endpoint;
   }

   /**
 * create new record
 * @param {*} record
 * @returns
 */
   async create(record) {
      return await instance.post(`${this.getEndpoint()}/create`, record);
   };

   /**
    * update record
    * @param {*} id
    * @param {*} record
    * @returns
    */
   async update(id, record) {
      return await instance.put(`${this.getEndpoint()}/update/${id}`, record);
   }

   /**
    * get all record
    * @returns
    */
   async getAll() {
      return await instance.get(`${this.getEndpoint()}`);
   }

   async getById(id) {
      return await instance.get(`${this.getEndpoint()}/${id}`);
   }
}
export default BaseService;