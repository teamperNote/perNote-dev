import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// request되는 카테고리(노트, 브랜드, 성격, 특징)에 따라 해당하는 데이터 서치.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const personality = [
    "vivid",
    "delicate",
    "sensual",
    "comfortable",
    "calm",
    "adventurous",
    "masculine",
    "pure",
    "mature",
    "purehearted",
    "feminine",
  ];
  const feature = [
    "intense",
    "fresh",
    "deep",
    "rich",
    "light",
    "clean",
    "luxurious",
  ];
  const note = [
    "wild",
    "aquatic",
    "woody",
    "aromatic",
    "citrus",
    "floral",
    "fruity",
    "spicy",
    "musk",
    "cotton_soap",
  ];

  const keywords = {
    personality: personality,
    feature: feature,
    note: note,
  };

  const perfumes = await prisma.perfume.findMany({
    select: {
      name_eng: true,
    },
  });

  const dict = {};
  for (let i = 0; i < perfumes.length; i++) {
    dict[perfumes[i].name_eng] = {
      personality: [],
      feature: [],
      note: [],
    };
  }

  for (const category in keywords) {
    for (let i = 0; i < keywords[category].length; i++) {
      let filtered_perfumes;

      // == 단일 선택 ==
      const selected = keywords[category][i];

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

      filtered_perfumes = await prisma.perfume.findMany({
        where: {
          NOT: findManyOrCondition,
        },
      });
      if (!filtered_perfumes) {
        return res.status(404).json({
          message: "Error: /category",
        });
      }

      // 선택된 personality/feature column 값에 따라 향수를 scoring.
      const areNotMinus = algorithm.filter((row) => row[selected] !== -1);
      const notMinusDict = {}; // note dictionary
      areNotMinus.map((row) => {
        if (!notMinusDict[row.scent]) {
          notMinusDict[row.scent] = row[selected];
        } else {
          return res.status(400).json({
            message: "Error: Note DB has duplicate scent value.",
          });
        }
      });
      for (let i = 0; i < filtered_perfumes.length; i++) {
        if (notMinusDict[filtered_perfumes[i].first]) {
          filtered_perfumes[i].score +=
            notMinusDict[filtered_perfumes[i].first];
        }
        if (notMinusDict[filtered_perfumes[i].second]) {
          filtered_perfumes[i].score +=
            notMinusDict[filtered_perfumes[i].second];
        }
        if (notMinusDict[filtered_perfumes[i].third]) {
          filtered_perfumes[i].score +=
            notMinusDict[filtered_perfumes[i].third];
        }
        if (notMinusDict[filtered_perfumes[i].fourth]) {
          filtered_perfumes[i].score +=
            notMinusDict[filtered_perfumes[i].fourth];
        }
        if (notMinusDict[filtered_perfumes[i].fifth]) {
          filtered_perfumes[i].score +=
            notMinusDict[filtered_perfumes[i].fifth];
        }
      }

      filtered_perfumes = filtered_perfumes
        .filter((perfume) => perfume.score !== 0)
        .sort((a, b) => b.score - a.score);

      filtered_perfumes.map((filtered_perfume) => {
        dict[filtered_perfume.name_eng][category].push(selected);
      });
    }
  }

  for (const [key, val] of Object.entries(dict)) {
    const perfume_name = key;
    const personalities = val["personality"];
    const features = val["feature"];
    const notes = val["note"];

    const update = await prisma.perfume_CategoryInfo.updateMany({
      where: {
        name_eng: perfume_name,
      },
      data: {
        personality: personalities,
        feature: features,
        note: notes,
      },
    });
  }

  return res.status(200).json({
    dict: dict,
    //    test
  });
}
