import axios from "axios";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "@store/loginState";
function NaverHandler(props: any) {
  const cookies = new Cookies();
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);

  useEffect(() => {
    const data = {
      code: props.code,
      state: props.state,
    };

    axios.post("/api/auth/naver/login", data).then((res) => {
      if (res.data.message === "가입되지 않은 사용자입니다") {
        router.push(
          "/sns-signup/naver",
          `/sns-signup/naver/${res.data.userId}`,
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
  }, [props.code, props.state, router, setLoginInfo]);
  return <div></div>;
}

export default NaverHandler;

export async function getServerSideProps(context: any) {
  const { query } = context;
  const { code, state } = query;
  return {
    props: {
      code,
      state,
    },
  };
}
