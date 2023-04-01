import React from "react";
import Link from "next/link";
import Image from "next/image";

const REST_API_KEY = process.env.KAKAO_REST_API_KEY || "";
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || "";

function KaKaoLogin() {
  const api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=talk_message`;
  return (
    <>
      <Link href={api_url}>
        <a>
          <Image
            src="/login_kakao.svg"
            alt="카카오로 로그인"
            width={90}
            height={90}
          />
        </a>
      </Link>
    </>
  );
}

export default KaKaoLogin;
