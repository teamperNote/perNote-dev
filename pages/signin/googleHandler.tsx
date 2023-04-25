import axios from "axios";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "@store/loginState";
function GoogleHandler() {
  const cookies = new Cookies();
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const token = parsedHash.get("access_token");

    const data = {
      access_token: token,
    };
    axios.post("/api/auth/google/login", data).then((res) => {
      if (res.data.message === "가입되지 않은 사용자입니다") {
        router.push(
          "/sns-signup/google",
          `/sns-signup/google/${res.data.userId}`,
        );
      }
      const { user, accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      cookies.set("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      setLoginInfo(user.email);
      router.push("/");
    });
  }, [router, setLoginInfo]);
  return <div></div>;
}
export default GoogleHandler;
