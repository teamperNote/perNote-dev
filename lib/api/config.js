import axios from "axios";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { loginState } from "pages/@store/loginState";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/",
});

// access는 header에 저장
//refresh는 쿠키에

const cookies = new Cookies();
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // HTTP Authorization 요청 헤더에 jwt-token을 넣음
//     // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
//     const token = cookies.get("access_token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const [loginInfo, setLoginInfo] = useRecoilState(loginState);
    const { response: errorResponse } = error;
    const refresh_token = cookies.get("refreshToken");
    // 인증 에러 발생시
    if (errorResponse.status === 401) {
      // return await resetTokenAndReattemptRequest(error);

      const access_token = await axios.post("/api/users/reissueAccessToken", {
        email: loginInfo,
        refreshToken: refresh_token,
      });
      console.log("refresh로 access 재발급");
      console.log(access_token.data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token.data}`;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
