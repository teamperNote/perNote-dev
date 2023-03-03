import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import prisma from "../../../../prisma/client";

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

const secretKey = process.env.JWT_SECRET_KEY || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { code, state } = req.body;

    const token_api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&state=${state}`;

    let result = await axios.get(token_api_url);

    const { access_token } = result.data;

    result = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: { Authorization: "Bearer " + access_token },
    });
    const userInfo = result.data.response;

    const user = await prisma.user.findUnique({
      where: { snsId: userInfo.id },
    });
    if (!user) {
      res.status(200).json({
        message: "가입되지 않은 사용자입니다",
        userId: userInfo.id,
      });
    }

    const accessToken = jwt.sign({ userId: user.snsId }, secretKey, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user.snsId }, secretKey, {
      expiresIn: "14d",
    });

    return res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  }
}
