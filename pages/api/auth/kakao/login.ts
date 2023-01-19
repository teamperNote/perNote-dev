import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const rest_api_key = process.env.KAKAO_REST_API_KEY || "";
const redirect_uri = process.env.KAKAO_REDIRECT_URI || "";

const secretKey = process.env.JWT_SECRET_KEY || "";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { code } = req.body;

    const token_api_url = `https://kauth.kakao.com/oauth/token?client_id=${rest_api_key}&grant_type=authorization_code&redirect_uri=${redirect_uri}&code=${code}`;

    let result = await axios.post(token_api_url, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
    const { access_token } = result.data;
    console.log(access_token);
    result = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    const userInfo = result.data;

    const user = await prisma.user.findUnique({
      where: { snsId: userInfo.id.toString() },
    });
    if (!user) {
      return res.status(200).json({
        message: "가입되지 않은 사용자입니다",
        userId: userInfo.id.toString(),
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
