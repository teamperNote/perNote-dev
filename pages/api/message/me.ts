import type { NextApiRequest, NextApiResponse } from "next";
import request from "request";
import qs from "qs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { accessToken } = req.body;

    const options = {
      method: "POST",
      url: "https://kapi.kakao.com/v2/api/talk/memo/default/send",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        template_object: {
          object_type: "text",
          text: "텍스트 영역입니다. 최대 200자 표시 가능합니다.",
          link: {
            web_url: "https://developers.kakao.com",
            mobile_web_url: "https://developers.kakao.com",
          },
          button_title: "바로 확인",
        },
      }),
    };

    request(options, async (err, res, body) => {
      console.log(body);
    });

    return res.status(200).json({
      message: "메시지 요청 수행",
    });
  }
}
