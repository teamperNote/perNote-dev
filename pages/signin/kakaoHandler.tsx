import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function KakaoHandler(props: any) {
  const router = useRouter();
  useEffect(() => {
    const data = {
      code: props.code,
    };
    axios.post("/api/auth/kakao/login", data).then((res) => {
      console.log(res);
      if (res.data.message === "가입되지 않은 사용자입니다") {
        router.push("/signup");
      }
    });
  }, []);
  return <div></div>;
}

export default KakaoHandler;

export async function getServerSideProps(context: any) {
  const { query } = context;
  const { code } = query;
  return {
    props: {
      code,
    },
  };
}
