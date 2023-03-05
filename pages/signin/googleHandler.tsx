import axios from "axios";
import { useRouter } from "next/router";

import React, { useEffect } from "react";

function GoogleHandler() {
  const router = useRouter();

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const token = parsedHash.get("access_token");
    const data = {
      access_token: token,
    };
    axios.post("/api/auth/google/login", data).then((res) => {
      console.log(res);
      if (res.data.message === "가입되지 않은 사용자입니다") {
        router.push(
          "/sns-signup/google",
          `/sns-signup/google/${res.data.userId}`,
        );
      }
    });
  }, [router]);
  return <div></div>;
}
export default GoogleHandler;
