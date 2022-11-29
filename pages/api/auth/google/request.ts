// 구글 로그인은 무조건 프론트에서 해당 요청을하고 callback 처리해야함

import type { NextApiRequest, NextApiResponse } from "next";

const client_id = process.env.GOOGLE_CLIENT_ID || "";
const redirect_uri = process.env.GOOGLE_REDIRECT_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const request_url = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  return res.redirect(request_url);
}
