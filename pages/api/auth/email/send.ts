// 이메일 인증요청 API
// 백엔드에서 인증번호 6자리 프론트로 넘겨서 -> 유저가 입력한 인증번호 == 프론트가 받은 인증번호 매칭

import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const NODEMAILER_ID = process.env.NODEMAILER_ID || "";
const NODEMAILER_PW = process.env.NODEMAILER_PW || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body; // 인증메일을 받을 이메일

  const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;

  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    auth: {
      user: NODEMAILER_ID,
      pass: NODEMAILER_PW,
    },
  });
  const mailOptions = {
    from: NODEMAILER_ID,
    to: email,
    subject: "테스트",
    text: `인증번호 [${verifyCode}]을 입력해주세요.`,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      res.status(400).json({
        message: "이메일 요청 실패",
      });
    } else {
      res.status(200).json({
        message: "이메일 요청 성공",
        인증번호: verifyCode,
      });
    }
  });
}
