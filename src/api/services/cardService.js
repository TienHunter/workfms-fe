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

   async move(valueCard) {
      return await instance.put(`${this.getEndpoint()}/move`, valueCard)
   }
   async updateDesc(id, desc) {
      return await instance.put(`${this.getEndpoint()}/${id}/description`, {
         Description: desc,
      })
   }
}

export default new CardService();