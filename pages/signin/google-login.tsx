import React from "react";
import Link from "next/link";
import styled from "styled-components";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "";
function GoogleLogin() {
  const request_url = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  return (
    <>
      <Link href={request_url}>
        <a>
          <GoogleIcon
            src="/login_goggle.png"
            alt="구글 로그인"
            width={90}
            height={90}
          />
        </a>
      </Link>
    </>
  );
}

export default GoogleLogin;
const GoogleIcon = styled.img`
  width: 90px;
  height: 90px;
  @media screen and (max-width: 1440px) {
    width: 70px;
    height: 70px;
  }
  @media screen and (max-width: 480px) {
      width: 50px;
      height: 50px;
  }
`;
