// src/api/axios.js
import axios from "axios";
import Enums from "../enums";
import localStore from "../utils/localStore";
import { useRouter } from "vue-router";

const router = useRouter();
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
    console.log(response);
    // Kiểm tra statusCode tại đây
    if (response.status === 200) {
      // Phản hồi thành công, bạn có thể xử lý dữ liệu ở đây nếu cần
      return response.data;
    } else {
      // Xử lý trường hợp statusCode không phải 200
      // Ví dụ: Nếu statusCode là 401, có thể đăng xuất người dùng
      if (response.status === 401) {
        // Xử lý đăng xuất ở đây
        // xóa token đi
        localStore.removeItem(Enums.localStorage.Token);
        message.error("Phiên đăng nhập dã hết hạn");
        router.push({ name: "Login", params: {} });
      }
      if (response.status === 500) {
        console.log("Đã xảy ra lỗi vui lòng thử lại sau");
      }
      // Trả về phản hồi hoặc promise.reject() tùy thuộc vào trường hợp
      return Promise.reject(response.data);
    }
  },
  (error) => {
    // Xử lý lỗi phát sinh trong quá trình gửi yêu cầu hoặc nhận phản hồi
    return Promise.reject(error.response.data);
  }
);

export default instance;
