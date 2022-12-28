import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

function NaverHandler(props: any) {
  const router = useRouter();
  const data = {
    code: props.code,
    state: props.state,
  };

  useEffect(() => {
    axios.post("/api/auth/naver/login", data).then((res) => {
      console.log(res);
      if (res.data.message === "해당 유저가 존재하지 않습니다") {
        router.push("/signup");
      }
    });
  }, [data]);
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
