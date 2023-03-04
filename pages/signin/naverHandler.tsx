import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function NaverHandler(props: any) {
  const router = useRouter();

  useEffect(() => {
    const data = {
      code: props.code,
      state: props.state,
    };

    axios.post("/api/auth/naver/login", data).then((res) => {
      console.log(res);
      if (res.data.message === "가입되지 않은 사용자입니다") {
        router.push(
          "/sns-signup/naver",
          `/sns-signup/kakao/${res.data.userId}`,
        );
      }
    });
  }, [props.code, props.state, router]);
  return <div></div>;
}

export default NaverHandler;

export async function getServerSideProps(context: any) {
  const { query } = context;
  const { code, state } = query;
  return {
    props: {
      code,
      state,
    },
  };
}
