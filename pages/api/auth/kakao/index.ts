import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const secretKey = process.env.JWT_SECRET_KEY || "";
const APP_ADMIN_KEY = process.env.KAKAO_ADMIN_KEY || "";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { access_token } = req.body;

  const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  const userInfo = result.data;

  // SNS계정으로 회원가입 한 경우, 추후에 로컬 회원가입 가능성도 고려?
  const { profile, email } = userInfo.kakao_account;

  let user = await prisma.user.findUnique({
    where: { snsId: userInfo.id.toString() },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "",
        name: profile.nickname,
        password: "",
        phoneNumber: "",
        snsType: "kakao",
        snsId: userInfo.id.toString(),
      },
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
