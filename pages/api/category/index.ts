import type { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";
import prisma from "../../../prisma/client";
import like from "./like";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

// request되는 카테고리(노트, 브랜드, 성격, 특징)에 따라 해당하는 데이터 서치.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // OPTIONS - RETURN
  let resStatus = 200,
    resData,
    userId;

  // OPTIONS FROM QUERY
  const accessToken = req.headers.authorization.split("Bearer ")[1];

  if (accessToken === "null") {
    userId = null;
  } else {
    const { payload } = await jwtVerify(accessToken, secretKey);
    userId = payload.iss;
  }
  const query = req.query;
  const selected = query["selected"] as string;
  const orderOpt = query.orderOpt as string;
  const sortOpt = orderOpt === "name_eng" ? "asc" : "desc";
  const pageNum = parseInt(query.pageNum as string);
  const category =
    query.category === "brand" ? "brand_eng" : (query.category as string);

  if (category === "brand_eng") {
    const perfumeCnt = await prisma.perfume.count({
      where: {
        [category]: selected,
      },
    });

    const perfumes = await prisma.perfume.findMany({
      where: {
        [category]: selected,
      },
      select: {
        id: true,
        name_eng: true,
        brand_eng: true,
        imgUrl: true,
        likeCount: true,
      },
      orderBy: {
        [orderOpt]: sortOpt,
      },
      skip: (pageNum - 1) * 20,
      take: 20,
    });
    if (!perfumes) {
      resStatus = 404;
      resData = {
        message: "Error: No perfumes",
      };
    } else {
      resData = {};
      resData["perfumes"] = await like(perfumes, userId);
      resData["pageAmount"] = Math.ceil(perfumeCnt / 20);
    }
  } else {
    // PERFUME OPTION
    const names = [];

    const categoryInfo = await prisma.perfume_CategoryInfo.findMany({
      where: {
        [category]: {
          has: selected,
        },
      },
    });
    if (!categoryInfo) {
      resStatus = 404;
      resData = {
        message: "Error: No categoryInfo",
      };
    } else {
      categoryInfo.map((data) => {
        names.push(data.name_eng);
      });

      const perfumeCnt = await prisma.perfume.count({
        where: {
          name_eng: {
            in: names,
          },
        },
      });
      if (!categoryInfo) {
        resStatus = 404;
        resData = {
          message: "Error: No perfumeNum",
        };
      } else {
        const perfumes = await prisma.perfume.findMany({
          where: {
            name_eng: {
              in: names,
            },
          },
          select: {
            id: true,
            name_eng: true,
            brand_eng: true,
            imgUrl: true,
            likeCount: true,
          },
          orderBy: {
            [orderOpt]: sortOpt,
          },
          skip: (pageNum - 1) * 20,
          take: 20,
        });
        if (!perfumes) {
          resStatus = 404;
          resData = {
            message: "Error: No perfumes",
          };
        } else {
          resData = {};
          resData["perfumes"] = await like(perfumes, userId);
          resData["pageAmount"] = Math.ceil(perfumeCnt / 20);
        }
      }
    }
  }

  return res.status(resStatus).json(resData);
}
