import type { NextApiRequest, NextApiResponse } from "next";

const client_id = process.env.NAVER_CLIENT_ID || "";
const redirect_uri = process.env.NAVER_CALLBACK_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=STATE_STRING&redirect_uri=${redirect_uri}`;

  return res.redirect(api_url);
}
