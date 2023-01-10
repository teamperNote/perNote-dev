import axios from "axios";
import CategoryCard from "components/CategoryCard";
import CategoryText from "components/CategoryText";
import SortDropDown from "components/SortDropDown";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Category() {
  const router = useRouter();
  const { page } = router.query;

  const [isFocus, setIsFocus] = useState(noteContent[0].value);

  const onPageClick = (value: string) => {
    router.push(value);
  };

  const [purfume, setPurfume] = useState([]);
  const getCategoryPerfume = () => {
    axios
      .get("/api/category", {
        params: { category: "note", selected: ["amber"] },
      })
      .then((res) => {
        setPurfume(res.data.perfumes.slice(0, 15));
      });
  };
  useEffect(() => {
    getCategoryPerfume();
  }, []);
  return (
    <CategoryContainer>
      <CategoryBox>
        {categoryTitle.map((data) => (
          <CategoryTitle
            key={data.id}
            onClick={() => {
              onPageClick(data.value);
            }}
            className={page === data.value ? "focus" : ""}
          >
            {data.text}
          </CategoryTitle>
        ))}
      </CategoryBox>
      <NoteBox>
        {noteContent.map((data) => (
          <CategoryText
            key={data.id}
            data={data}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
          />
        ))}
      </NoteBox>
      <SortBox>
        <SortDropDown />
      </SortBox>
      <CardBox>
        {purfume.map((data) => (
          <CategoryCard key={data.id} data={data} />
        ))}
      </CardBox>
    </CategoryContainer>
  );
}

export const CategoryContainer = styled.div`
  width: 1920px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CategoryBox = styled.div`
  margin-top: 90px;
  margin-bottom: 80px;
  display: flex;
`;

export const CategoryTitle = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 43px;
  color: #b2b2b2;
  margin-right: 80px;
  &.focus {
    color: #000000;
  }
  :last-child {
    margin-right: 0;
  }
`;

export const NoteBox = styled.div`
  width: 897px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 81px;
`;

export const SortBox = styled.div`
  width: 1420px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

interface ICategory {
  id: number;
  value: string;
  text: string;
}

const categoryTitle: ICategory[] = [
  {
    id: 0,
    value: "note",
    text: "노트",
  },
  {
    id: 1,
    value: "brand",
    text: "브랜드",
  },
  {
    id: 2,
    value: "personality",
    text: "성격",
  },
  {
    id: 3,
    value: "characteristics",
    text: "특징",
  },
];

const noteContent: ICategory[] = [
  {
    id: 0,
    value: "amber",
    text: "AMBER",
  },
  {
    id: 1,
    value: "aquatic",
    text: "AQUATIC",
  },
  {
    id: 2,
    value: "woody",
    text: "WOODY",
  },
  {
    id: 3,
    value: "aromatic",
    text: "AROMATIC",
  },
  {
    id: 4,
    value: "chypre",
    text: "CHYPRE",
  },
  {
    id: 5,
    value: "citrus",
    text: "CITRUS",
  },
  {
    id: 6,
    value: "floral",
    text: "FLORAL",
  },
  {
    id: 7,
    value: "frutiy",
    text: "FRUTIY",
  },
  {
    id: 8,
    value: "green",
    text: "GREEN",
  },
  {
    id: 9,
    value: "animalic",
    text: "ANIMALIC",
  },
  {
    id: 10,
    value: "spicy",
    text: "SPICY",
  },
  {
    id: 11,
    value: "cotton",
    text: "COTTON",
  },
  {
    id: 12,
    value: "flourere",
    text: "FOURERE",
  },
  {
    id: 13,
    value: "etc",
    text: "E.T.C",
  },
];
