import axios from "axios";
import { Cookies } from "react-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/",
});

const cookies = new Cookies();
axiosInstance.interceptors.request.use(
  (config) => {
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
    const token = cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response.data.data;
  },
  (error) => {
    const { response: errorResponse } = error;

    // 인증 에러 발생시
    if (errorResponse.status === 401) {
      // return await resetTokenAndReattemptRequest(error);
      // 리프레시 토큰 사용해서 재요청 하는 함수 호출
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
