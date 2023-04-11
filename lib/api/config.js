import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const token =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const axiosInstance = axios.create({
  baseURL: "https://per-note-dev.vercel.app/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response: errorResponse } = error;
    const refresh_token = cookies.get("refreshToken");
    // 인증 에러 발생시
    if (errorResponse.status === 401) {
      const access_token = await axios.post("/api/users/reissueAccessToken", {
        email: JSON.parse(localStorage.getItem("recoil-persist")).loginState,
        refreshToken: refresh_token,
      });
      console.log("refresh로 access 재발급");
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${access_token.data}`;

      //로컬스토리지로 수정
      localStorage.setItem("accessToken", access_token.data);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
