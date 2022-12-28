import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// request되는 카테고리(노트, 성격, 특징)에 따라 해당하는 데이터 서치.
// 다중 태그 선택
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const query = req.query;

    const category = query.category as string;
    const selected: Array<string> = query["selected[]"] as string[];

    const findManyOrCondition = [];

    for(const tag of selected){
        findManyOrCondition.push({
            [category]: {
                contains: tag
            }
        });
    }

    const perfumes = await prisma.perfume.findMany({
        where: {
            OR: findManyOrCondition
        }
    });
    if(!perfumes) {
        return res.status(200).json({
            message: "Error: category"
        })
    }

    return res.status(200).json({
       perfumes: perfumes,
       query: query
    });


}