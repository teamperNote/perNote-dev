import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import handler from "../api/auth/kakao/request";

const REST_API_KEY = process.env.KAKAO_REST_API_KEY || "";
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || "";
function KaKaoLogin() {
  // const router = useRouter();
  const api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // useEffect(() => {
  //   const code = router.query.code;
  //   const token_api_url = `https://kauth.kakao.com/oauth/token?client_id=${REST_API_KEY}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${code}`;

  //   axios
  //     .post(token_api_url, {
  //       headers: {
  //         "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //       },
  //     })
  //     .then((res) => console.log(res));
  // }, [router.query.code]);
  return (
    <>
      <a href={api_url}>kakao</a>
    </>
  );
}

export default KaKaoLogin;
