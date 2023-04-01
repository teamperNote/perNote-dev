import axios from "axios";
import { Cookies } from "react-cookie";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/",
});

const cookies = new Cookies();
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
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
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token.data}`;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
