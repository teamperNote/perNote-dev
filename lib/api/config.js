import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const token =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers.Authorization === "Bearer null") {
      return;
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken",
    )}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response: errorResponse } = error;
    const refresh_token = cookies.get("refreshToken");

    try {
      if (errorResponse.status === 500) {
        const originalRequest = config;
        const access_token = await axios.post("/api/users/reissueAccessToken", {
          email: JSON.parse(localStorage.getItem("recoil-persist")).loginState,
          refreshToken: refresh_token,
        });
        console.log("refresh로 access 재발급");
        localStorage.setItem(
          "accessToken",
          JSON.stringify(access_token.data.accessToken).slice(1, -1),
        );
        originalRequest.headers.authorization = `Bearer ${access_token.data.accessToken}`;
        return axios(originalRequest);
      }
    } catch (e) {
      console.log("refresh 에러 및 로그아웃 처리", e);
      window.location.replace("/");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("recoil-persist");
      cookies.remove("refreshToken");
      delete error.config.headers.Authorization;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
