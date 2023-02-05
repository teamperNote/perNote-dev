// - 향수 데이터 가져오기
//     1. 이름으로 서치.
//     2. 노트, 성격, 특징, 상세설명, 탑노트, 미들노트, 베이스노트 가져오기.

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import similar from "./similar"

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const id: string = req.query.id as string;

    const perfume = await prisma.perfume.findFirst({
        where: {
            id: id
        }
    })
    if(!perfume) {
        return res.status(404).json({
            message: "Error: detail - DB perfume"
        });
    }

    const perfume_detail = await prisma.perfumeDetail.findMany({
        where: {
            name: perfume.name
        }
    })
    if(!perfume_detail) {
        return res.status(404).json({
            message: "Error: detail - DB perfume_detail",
        })
    }

    const similars = await similar(perfume)

    return res.status(200).json({
        perfume: perfume,
        perfume_detail: perfume_detail,
        similars: similars,
        query: id,
    });
}

