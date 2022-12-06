// - 향수 데이터 가져오기
//     1. 이름으로 서치.
//     2. 노트, 성격, 특징, 상세설명, 탑노트, 미들노트, 베이스노트 가져오기.

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const name: string = req.query.name as string;

    const detail = await prisma.perfume.findMany({
        where: {
            name: name
        }
    })
    if(!detail) {
        return res.status(200).json({
            message: "Error: detail"
        });
    }

    return res.status(200).json({
        perfume: detail,
        query: name
    });
}
