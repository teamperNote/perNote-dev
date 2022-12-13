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
    axios.post("/api/auth/naverLogin", data).then((res) => console.log(res));
  }, []);
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
