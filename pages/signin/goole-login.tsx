import axios from "axios";
import React from "react";

const client_id = process.env.GOOGLE_CLIENT_ID || "";
const redirect_uri = process.env.GOOGLE_REDIRECT_URI || "";
function GoogleLogin() {
  const request_url = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  return (
    <>
      <a href={request_url}>Google</a>
      {/* <button onClick={clickGoogle}>Google</button> */}
    </>
  );
}

export default GoogleLogin;
