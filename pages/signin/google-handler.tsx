import { useRouter } from "next/router";
import React, { useEffect } from "react";

function GoogleHandler() {
  const router = useRouter();
  useEffect(() => {
    const access_token = router.asPath.split("access_token=")[1].split("&")[0];
  }, []);
  return <div></div>;
}

export default GoogleHandler;
