import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

export default function category() {
  const router = useRouter();
  const { page } = router.query;

  const onPageClick = (value: string) => {
    router.push(value);
  };
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
      <div>{page}</div>
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
