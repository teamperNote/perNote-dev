import Image from "next/image";
import React from "react";
import Link from "next/link";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "";
function GoogleLogin() {
  const request_url = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  return (
    <>
      <Link href={request_url}>
        <a>
          <Image
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
