import React from "react";
import Link from "next/link";
import styled from "styled-components";

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || "";
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || "";

function KaKaoLogin() {
  const api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=talk_message`;
  return (
    <>
      <Link href={api_url}>
        <a>
          <KakaoIcon
            src="/kakao_login.png"
            alt="카카오로 로그인"
            width={300}
            height={45}
          />
        </a>
      </Link>
    </>
  );
}

export default KaKaoLogin;

const KakaoIcon = styled.img``;
