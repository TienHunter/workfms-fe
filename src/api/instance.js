// src/api/axios.js
import axios from "axios";
import Enums from "../enums";
import localStore from "../utils/localStore";
import router from "@/routers";
const BASE_URL = "https://localhost:44328/api/";
const instance = axios.create({
  baseURL: BASE_URL, // Thay thế bằng URL của API thực tế
  // Các cấu hình khác của Axios
  headers: {
    "Access-Control-Allow-Origin": "*", // Hoặc chỉ định nguồn gốc cụ thể của bạn
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStore.getItem(Enums.localStorage.Token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    // Xử lý lỗi phát sinh trong quá trình gửi yêu cầu hoặc nhận phản hồi
    const { status, data } = error?.response ?? {};
    if (status === 401) {
      // Xử lý đăng xuất ở đây
      // xóa token đi
      console.log(router);
      localStore.removeItem(Enums.localStorage.Token);
      // message.error("Phiên đăng nhập dã hết hạn");
      router.push({ name: "Login", params: {} });
    } else {
      return Promise.reject(error.response.data);
    }
  }
);

export default instance;
