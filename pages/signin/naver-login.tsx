import React from "react";

const client_id = process.env.NAVER_CLIENT_ID || "";
const redirect_uri = process.env.NAVER_CALLBACK_URI || "";
function NaverLogin() {
  const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=STATE_STRING&redirect_uri=${redirect_uri}`;
  return (
    <>
      <a href={api_url}>
        <img src="/login_naver.svg" alt="네이버로 로그인" />
      </a>
    </>
  );
}

export default NaverLogin;
