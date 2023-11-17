import instance from "../instance";
const endpoint = "Workspaces";
const workspaceService = {
  /**
   * create new workspace
   * @param {*} workspace
   * @returns
   */
  async create(workspace) {
    return await instance.post(`${endpoint}/create`, workspace);
  },

  /**
   * update workspace
   * @param {*} id
   * @param {*} workspace
   * @returns
   */
  async update(id, workspace) {
    return await instance.put(`${endpoint}/update/${id}`, workspace);
  },

  /**
   * get all workspace
   * @returns
   */
  async getAll() {
    return await instance.get(`${endpoint}`);
  },

  async getById(id) {
    return await instance.get(`${endpoint}/${id}`);
  },
};
export default workspaceService;
