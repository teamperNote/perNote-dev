import React from "react";

const REST_API_KEY = process.env.KAKAO_REST_API_KEY || "";
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || "";

function KaKaoLogin() {
  const api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=talk_message`;
  return (
    <>
      <a href={api_url}>
        <img src="/login_kakao.svg" alt="카카오로 로그인" />
      </a>
    </>
  );
}

export default KaKaoLogin;
