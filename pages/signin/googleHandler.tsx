import axios from "axios";
import React, { useEffect } from "react";

function GoogleHandler() {
  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const access_token = parsedHash.get("access_token");

    const response = axios.post("/api/auth/googleLogin", {
      access_token: access_token,
    });
  }, []);
  return <div></div>;
}
export default GoogleHandler;
