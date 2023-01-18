import axios from "axios";
import CategoryBrand from "components/CategoryBrand";
import CategoryCard from "components/CategoryCard";
import CategorySelect from "components/CategorySelect";
import CategorySelectAlphabet from "components/CategorySelectAlphabet";
import SortDropDown from "components/SortDropDown";
import {
  alphabetArray,
  categoryArray,
  charArray,
  noteArray,
  personalityArray,
  sortArray,
} from "lib/modules";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Category() {
  const router = useRouter();
  const { page } = router.query;

  const [selected, setSelected] = useState("");
  useEffect(() => {
    if (page === "note") {
      setSelected(noteArray[0].value);
    } else if (page === "personality") {
      setSelected(personalityArray[0].value);
    } else if (page === "characteristics") {
      setSelected(charArray[0].value);
    }
  }, [page]);

  const [purfume, setPurfume] = useState([]);
  const [sort, setSort] = useState(sortArray[0].value);
  const getCategoryPerfume = () => {
    axios
      .get("/api/category", {
        params: { category: page, selected: [selected], orderOpt: sort },
      })
      .then((res) => {
        setPurfume(res.data.perfumes.slice(0, 30));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [brandList, setBrandList] = useState({ isLoading: false, data: [] });
  const getBrand = () => {
    axios
      .get("/api/category/brandList")
      .then((res) => {
        setBrandList({
          ...brandList,
          isLoading: true,
          data: Object.entries(res.data.dict),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (selected !== "" && page !== "brand") {
      getCategoryPerfume();
    } else if (page === "brand") {
      setBrandList({ ...brandList, isLoading: false, data: [] });
      getBrand();
    }
  }, [page, selected, sort]);
  return (
    <CategoryContainer>
      <CategoryBox>
        {categoryArray.map((data) => (
          <CategoryTitle
            key={data.id}
            className={page === data.value ? "focus" : ""}
          >
            <Link href={data.value}>{data.text}</Link>
          </CategoryTitle>
        ))}
      </CategoryBox>
      <SelectBox page={page}>
        {page === "brand" ? (
          <>
            {alphabetArray.map((data) => (
              <CategorySelectAlphabet
                key={data.id}
                data={data}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </>
        ) : (
          <>
            {(page === "note"
              ? noteArray
              : page === "personality"
              ? personalityArray
              : charArray
            ).map((data) => (
              <CategorySelect
                key={data.id}
                data={data}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </>
        )}
      </SelectBox>
      {page !== "brand" && (
        <SortBox>
          <SortDropDown sort={sort} setSort={setSort} />
        </SortBox>
      )}
      {page == "brand" && brandList.isLoading ? (
        <BrandBox>
          {brandList.data.map((data) => (
            <CategoryBrand key={data[0]} brandList={data} />
          ))}
        </BrandBox>
      ) : (
        <CardBox>
          {purfume.map((data) => (
            <CategoryCard key={data.id} data={data} from={Category} />
          ))}
        </CardBox>
      )}
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

export const SelectBox = styled.div<{ page?: string | string[] }>`
  width: ${({ page }) =>
    page === "note"
      ? "897px"
      : page === "brand"
      ? "1450px"
      : page === "personality"
      ? "1415px"
      : "880px"};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ page }) => (page === "brand" ? "154px" : "81px")};
`;

export const SortBox = styled.div`
  width: 1420px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export const BrandBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
