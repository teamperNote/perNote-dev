import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query;

  const token_api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=${code}&state=${state}`;

  const result = await axios.get(token_api_url);
  const { access_token, refresh_token } = result.data;

  res.status(200).json({
    access_token,
    refresh_token,
  });
}
