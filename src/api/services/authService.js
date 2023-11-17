import instance from "../instance";
const endpoint = "Auth";
const authService = {
  async login(userLogin) {
    return await instance.post(`${endpoint}/login`, userLogin);
  },

  async register(userRegister) {
    return await instance.post(`${endpoint}/register`, userRegister);
  },
};
export default authService;
