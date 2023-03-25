import React, { ComponentType, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { loginState } from "../../@store/loginState";

export const withAuth = (Component: ComponentType) => (props: any) => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);
  useEffect(() => {
    if (!loginInfo) {
      alert("로그인 후 이용이 가능합니다.");
      router.push("/signin");
    }
  }, []);

  return <Component {...props} />;
};
