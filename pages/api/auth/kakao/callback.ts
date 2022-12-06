import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const REST_API_KEY = process.env.KAKAO_REST_API_KEY || "";
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  const token_api_url = `https://kauth.kakao.com/oauth/token?client_id=${REST_API_KEY}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${code}`;

  const result = await axios.post(token_api_url, {
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  });
  const { access_token, refresh_token } = result.data;

  return res.status(200).json({
    access_token,
    refresh_token,
  });
}
