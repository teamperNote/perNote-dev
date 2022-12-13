import axios from "axios";
import React, { useEffect } from "react";

function GoogleHandler() {
  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const access_Token = parsedHash.get("access_token");
    console.log(access_Token);
    const response = axios.post("/api/auth/googleLogin", {
      accessToken: access_Token,
    });
    // const { user, accessToken, refreshToken } = response;
  }, []);
  return <div></div>;
}
export default GoogleHandler;
