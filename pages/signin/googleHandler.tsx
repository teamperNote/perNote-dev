import axios from "axios";
import React, { useEffect } from "react";

function GoogleHandler() {
  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const access_Token = parsedHash.get("access_token");
    console.log(access_Token);
    const response = axios.post("/api/auth/googleLogin.ts", {
      accessToken: access_Token,
    });
  }, []);
}
export default GoogleHandler;
