import axios from "axios";
import React, { useEffect } from "react";

function GoogleHandler() {
  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const token = parsedHash.get("access_token");
    const data = {
      access_token: token,
    };
    axios.post("/api/auth/googleLogin", data).then((res) => console.log(res));
  }, []);
  return <div></div>;
}
export default GoogleHandler;
