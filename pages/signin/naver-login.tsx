import React from "react";

const client_id = process.env.NAVER_CLIENT_ID || "";
const redirect_uri = process.env.NAVER_CALLBACK_URI || "";
function NaverLogin() {
  const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=STATE_STRING&redirect_uri=${redirect_uri}`;
  console.log(api_url);
  return (
    <>
      <a href={api_url}>Naver</a>
    </>
  );
}

export default NaverLogin;
