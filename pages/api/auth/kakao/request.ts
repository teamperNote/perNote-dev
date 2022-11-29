import type { NextApiRequest, NextApiResponse } from "next";

const REST_API_KEY = process.env.KAKAO_REST_API_KEY || "";
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return res.redirect(api_url);
}
