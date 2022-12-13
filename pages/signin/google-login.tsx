import React from "react";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "";
function GoogleLogin() {
  const request_url = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  return (
    <>
      <a href={request_url}>Google</a>
    </>
  );
}

export default GoogleLogin;
