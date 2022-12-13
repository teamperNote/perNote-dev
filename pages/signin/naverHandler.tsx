import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;
function NaverHandler() {
  const router = useRouter();

  useEffect(() => {
    const { code, state } = router.query;
    const token_api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&state=${state}`;

    axios
      .post(
        token_api_url,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        },
        { withCredentials: true },
      )
      .then((res) => console.log(res));
  }, [router.query.code]);
  return <div></div>;
}

export default NaverHandler;
