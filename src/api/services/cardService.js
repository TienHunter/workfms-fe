import instance from "../instance";
import BaseService from "./baseService";

class CardService extends BaseService {
   endpoint = 'Cards'
   constructor() {
      super()
   }

   async editTitle(card) {
      return await instance.put(`${this.getEndpoint()}/edit-title`, card)
   }
}

export default new CardService();