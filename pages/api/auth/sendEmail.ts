import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const NODEMAILER_ID = process.env.NODEMAILER_ID || "";
const NODEMAILER_PW = process.env.NODEMAILER_PW || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email } = req.body;

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

    transporter.sendMail(mailOptions, (error: any) => {
      if (error) {
        return res.status(400).json({
          message: "이메일 요청 실패",
        });
      } else {
        return res.status(200).json({
          message: "이메일 요청 성공",
          인증번호: verifyCode,
        });
      }
    });
  }
}
