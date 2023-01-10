import axios from "axios";
import CategoryCard from "components/CategoryCard";
import CategorySelect from "components/CategorySelect";
import SortDropDown from "components/SortDropDown";
import { categoryArray, noteArray, sortArray } from "lib/modules";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Category() {
  const router = useRouter();
  const { page } = router.query;

  const [isFocus, setIsFocus] = useState(noteArray[0].value);

  const onPageClick = (value: string) => {
    router.push(value);
  };

  const [purfume, setPurfume] = useState([]);
  const [sort, setSort] = useState(sortArray[0].id);
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
        {categoryArray.map((data) => (
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
      <SelectBox>
        {noteArray.map((data) => (
          <CategorySelect
            key={data.id}
            data={data}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
          />
        ))}
      </SelectBox>
      <SortBox>
        <SortDropDown sort={sort} setSort={setSort} />
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
  padding-top: 110px;
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
  cursor: pointer;
  &.focus {
    color: #000000;
  }
  :last-child {
    margin-right: 0;
  }
`;

export const SelectBox = styled.div`
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
