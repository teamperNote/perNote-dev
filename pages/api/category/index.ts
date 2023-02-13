import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// request되는 카테고리(노트, 브랜드, 성격, 특징)에 따라 해당하는 데이터 서치.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = req.query;

  const category = query.category as string;

  // SORT OPTION
  const sortOpt = query.orderOpt as string
  let sortColumn, sortDirection = "asc"
  if(sortOpt === "latest") sortColumn = "createdAt"
  else if(sortOpt === "lowPrice") sortColumn = "price"
  else if(sortOpt === "view") sortColumn = "viewCnt"
  else if(sortOpt === "highPrice") {
    sortColumn = "price"
    sortDirection = "desc"
  }
  else {
    return res.status(404).json({
      message: "Error: wrong sortOpt"
    })
  }
   
  let perfumes;

  // Category 첫 페이지 (모든 향수 출력)
  if (category === "default") {
    perfumes = prisma.perfume.findMany();
    if (!perfumes) {
      return res.status(404).json({
        message: "Error: /category",
      });
    }
  }

  // Category brand 선택
  if (category === "brand") {
    const selected = query["selected"] as string;
    perfumes = await prisma.perfume.findMany({
      where: {
        brand_eng: selected,
      },
      orderBy: {
        [sortColumn]: sortDirection
      }
    });
    if (!perfumes) {
      return res.status(404).json({
        message: "Error: /category",
      });
    }
    
    // Category note 선택
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

        // 선택된 note column 값이 -1인 향수를 제외하고 불러오기.
        const areMinus = note.filter((row) => row[selected] === -1)
        const findManyOrCondition = []
        for(const row of areMinus){
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
            NOT: findManyOrCondition,
          },
          // orderBy: {
          //   [sortColumn]: sortDirection
          // },
        })
        if(!perfumes) {
            return res.status(404).json({
                message: "Error: /category"
            })
        }

        // 선택된 note column 값에 따라 향수를 scoring.
        const areNotMinus = note.filter((row) => row[selected] !== -1)
        const notMinusDict = {} // note dictionary
        areNotMinus.map(row => {
          if(!notMinusDict[row.scent]){
            notMinusDict[row.scent] = row[selected]
          } else {
            return res.status(400).json({
              message: "Error: Note DB has duplicate scent value."
            })
          }
        })
        for(let i=0; i<perfumes.length; i++){
          if(notMinusDict[perfumes[i].first]){
            perfumes[i].score += notMinusDict[perfumes[i].first]
          }
          if(notMinusDict[perfumes[i].second]){
            perfumes[i].score += notMinusDict[perfumes[i].second]
          }
          if(notMinusDict[perfumes[i].third]){
            perfumes[i].score += notMinusDict[perfumes[i].third]
          }
          if(notMinusDict[perfumes[i].fourth]){
            perfumes[i].score += notMinusDict[perfumes[i].fourth]
          }
          if(notMinusDict[perfumes[i].fifth]){
            perfumes[i].score += notMinusDict[perfumes[i].fifth]
          }
        }

        perfumes = perfumes.filter(perfume => perfume.score !== 0).sort((a, b) => b.score - a.score)

        //Category 나의 성격 or 특징 선택
  } else if (category === "personality" || category === "feature") {
    // == 단일 선택 ==
    const selected = query["selected"] as string;

    const algorithm = await prisma.algorithm.findMany();
    if (!algorithm) {
      return res.status(404).json({
        message: "Error: category - algorithm",
      });
    }
    const areMinus = algorithm.filter((row) => row[selected] === -1);
    const findManyOrCondition = [];
    for (const row of areMinus) {
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
      orderBy: {
        [sortColumn]: sortDirection
      }
    });
    if (!perfumes) {
      return res.status(404).json({
        message: "Error: /category",
      });
    }

    // 선택된 personality/feature column 값에 따라 향수를 scoring.
    const areNotMinus = algorithm.filter((row) => row[selected] !== -1)
    const notMinusDict = {} // note dictionary
    areNotMinus.map(row => {
      if(!notMinusDict[row.scent]){
        notMinusDict[row.scent] = row[selected]
      } else {
        return res.status(400).json({
          message: "Error: Note DB has duplicate scent value."
        })
      }
    })
    for(let i=0; i<perfumes.length; i++){
      if(notMinusDict[perfumes[i].first]){
        perfumes[i].score += notMinusDict[perfumes[i].first]
      }
      if(notMinusDict[perfumes[i].second]){
        perfumes[i].score += notMinusDict[perfumes[i].second]
      }
      if(notMinusDict[perfumes[i].third]){
        perfumes[i].score += notMinusDict[perfumes[i].third]
      }
      if(notMinusDict[perfumes[i].fourth]){
        perfumes[i].score += notMinusDict[perfumes[i].fourth]
      }
      if(notMinusDict[perfumes[i].fifth]){
        perfumes[i].score += notMinusDict[perfumes[i].fifth]
      }
    }

    perfumes = perfumes.filter(perfume => perfume.score !== 0).sort((a, b) => b.score - a.score)

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
