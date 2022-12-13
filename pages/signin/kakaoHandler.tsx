import axios from "axios";
import React, { useEffect } from "react";

function KakaoHandler(props: any) {
  useEffect(() => {
    const data = {
      code: props.code,
    };
    axios.post("/api/auth/kakaoLogin", data).then((res) => console.log(res));
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
