import React from "react";
import Link from "next/link";
import styled from "styled-components";

const client_id = process.env.NAVER_CLIENT_ID || "";
const redirect_uri = process.env.NAVER_CALLBACK_URI || "";
function NaverLogin() {
  const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=STATE_STRING&redirect_uri=${redirect_uri}`;
  return (
    <>
      <Link href={api_url}>
        <a>
          <NaverIcon
            src="/login_naver.svg"
            alt="네이버로 로그인"
            width={90}
            height={90}
          />
        </a>
      </Link>
    </>
  );
}

export default NaverLogin;

const NaverIcon = styled.img`
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
