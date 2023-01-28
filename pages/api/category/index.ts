import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// request되는 카테고리(노트, 브랜드, 성격, 특징)에 따라 해당하는 데이터 서치.
// 다중 태그 선택
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = req.query;
  // let test

  const category = query.category as string;
  // const orderOpt = query.orderOpt as string
  let perfumes;

  if (category === "default") {
    perfumes = prisma.perfume.findMany();
    if (!perfumes) {
      return res.status(404).json({
        message: "Error: /category",
      });
    }
  }
  if (category === "brand") {
    const selected = query["selected"] as string;
    perfumes = await prisma.perfume.findMany({
      where: {
        brand: selected,
      },
    });
    if (!perfumes) {
      return res.status(404).json({
        message: "Error: /category",
      });
    }
  } else if (category === "note") {
    // == 다중 선택 가능 ==
    // const selected: Array<string> = query["selected[]"] as string[];
    // const findManyOrCondition = [];

    // for(const tag of selected){
    //     findManyOrCondition.push({
    //         [category]: {
    //             contains: tag
    //         }
    //     });
    // }

    // perfumes = await prisma.perfume.findMany({
    //     where: {
    //         OR: findManyOrCondition
    //     },
    //     // orderBy: {
    //     //     [orderOpt]: 'asc'
    //     // }
    // });
    // if(!perfumes) {
    //     return res.status(404).json({
    //         message: "Error: /category"
    //     })
    // }
        // == 단일 선택 ==
        const selected = query["selected"] as string

        const note = await prisma.note.findMany()
        if(!note) {
            return res.status(404).json({
                message: "Error: category - algorithm"
            })
        }
        const scents = note.filter((row) => row[selected] === -1)
        const findManyOrCondition = []
        for(const row of scents){
            findManyOrCondition.push(
                {first: row['scent']},
                {second: row['scent']},
                {third: row['scent']},
                {fourth: row['scent']},
                {fifth: row['scent']} 
            )
        }

        perfumes = await prisma.perfume.findMany({
            where: {
                note: selected,
            },
        })
        if(!perfumes) {
            return res.status(404).json({
                message: "Error: /category"
            })
        }
    } else if(category === "personality" || category === "feature"){
        // == 단일 선택 ==
        const selected = query["selected"] as string
        
        const algorithm = await prisma.algorithm.findMany()
        if(!algorithm) {
            return res.status(404).json({
                message: "Error: category - algorithm"
            })
        }
        const scents = algorithm.filter((row) => row[selected] === -1)
        const findManyOrCondition = []
        for(const row of scents){
            findManyOrCondition.push(
                {first: row['scent']},
                {second: row['scent']},
                {third: row['scent']},
                {fourth: row['scent']},
                {fifth: row['scent']} 
            )
        }

    const note = await prisma.note.findMany();
    if (!note) {
      return res.status(404).json({
        message: "Error: category - algorithm",
      });
    }
    const scents = note.filter((row) => row[selected] === -1);
    const findManyOrCondition = [];
    for (const row of scents) {
      findManyOrCondition.push(
        { first: row["scent"] },
        { second: row["scent"] },
        { third: row["scent"] },
        { fourth: row["scent"] },
        { fifth: row["scent"] },
      );
    }

    perfumes = await prisma.perfume.findMany({
      where: {
        note: selected,
      },
    });
    if (!perfumes) {
      return res.status(404).json({
        message: "Error: /category",
      });
    }
  } else if (category === "personality" || category === "feature") {
    // == 단일 선택 ==
    const selected = query["selected"] as string;

    const algorithm = await prisma.algorithm.findMany();
    if (!algorithm) {
      return res.status(404).json({
        message: "Error: category - algorithm",
      });
    }
    const scents = algorithm.filter((row) => row[selected] === -1);
    const findManyOrCondition = [];
    for (const row of scents) {
      findManyOrCondition.push(
        { first: row["scent"] },
        { second: row["scent"] },
        { third: row["scent"] },
        { fourth: row["scent"] },
        { fifth: row["scent"] },
      );
    }

    perfumes = await prisma.perfume.findMany({
      where: {
        NOT: findManyOrCondition,
      },
    });
    if (!perfumes) {
      return res.status(404).json({
        message: "Error: /category",
      });
    }
  } else {
    return res.status(404).json({
      message: "Error: wrong category",
    });
  }

  return res.status(200).json({
    perfumes: perfumes,
    query: query,
    //    test
  });
}
