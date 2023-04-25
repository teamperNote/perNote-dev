import axios from "axios";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "@store/loginState";

function KakaoHandler(props: any) {
  const cookies = new Cookies();
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);

  useEffect(() => {
    const data = {
      code: props.code,
    };
    axios
      .post("/api/auth/kakao/login", data)
      .then((res) => {
        if (res.data.message === "가입되지 않은 사용자입니다") {
          router.push(
            "/sns-signup/kakao",
            `/sns-signup/kakao/${res.data.userId}`,
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
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.code, router, setLoginInfo]);
  return <div></div>;
}

export default KakaoHandler;

export async function getServerSideProps(context: any) {
  const { query } = context;
  const { code } = query;
  return {
    props: {
      code,
    },
  };
}
