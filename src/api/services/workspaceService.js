import instance from "../instance";
import BaseService from "./baseService";
// const endpoint = "Workspaces";

class WorkspaceService extends BaseService {
  endpoint = "Workspaces";
  constructor() {
    super(); // Gọi constructor của lớp cha
    // Các định nghĩa riêng của lớp con...
  }
}

export default new WorkspaceService();
