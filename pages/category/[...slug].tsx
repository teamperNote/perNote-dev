import axios from "axios";
import CategoryBrand from "components/category/CategoryBrand";
import CategoryCard from "components/category/CategoryCard";
import CategorySelect from "components/category/CategorySelect";
import CategorySelectAlphabet from "components/category/CategorySelectAlphabet";
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
  const { slug } = router.query;

  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    if (slug) {
      console.log(slug);
      setCategory(slug[0]);
      setSelected(slug[1]);
      setName(slug[2]);
    }
  }, [slug]);

  const [purfume, setPurfume] = useState({ isLoading: false, data: [] });
  const [sort, setSort] = useState(sortArray[0].value);
  const getCategoryPerfume = () => {
    axios
      .get("/api/category", {
        params: { category: category, selected: selected, orderOpt: sort },
      })
      .then((res) => {
        setPurfume({
          ...purfume,
          isLoading: true,
          data: res.data.perfumes,
        });
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
    if (category !== "brand" && selected !== "") {
      setPurfume({ ...purfume, isLoading: false, data: [] });
      getCategoryPerfume();
    } else if (category === "brand") {
      setBrandList({ ...brandList, isLoading: false, data: [] });
      getBrand();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, selected, sort]);

  return (
    <CategoryContainer>
      <CategoryBox>
        {categoryArray.map((data) => (
          <Link key={data.id} href={data.url}>
            <CategoryTitle className={category === data.value ? "focus" : ""}>
              {data.text}
            </CategoryTitle>
          </Link>
        ))}
      </CategoryBox>
      <SelectBox category={category}>
        {(category === "note"
          ? noteArray
          : category === "brand"
          ? alphabetArray
          : category === "personality"
          ? personalityArray
          : charArray
        ).map((data) => (
          <CategorySelect
            key={data.id}
            data={data}
            category={category}
            selected={selected}
          />
        ))}
      </SelectBox>
      {category !== "brand" && (
        <SortBox>
          <SortDropDown sort={sort} setSort={setSort} />
        </SortBox>
      )}
      {category == "brand" && brandList.isLoading ? (
        <BrandBox>
          {brandList.data.map((data) => (
            <CategoryBrand key={data[0]} brandList={data} />
          ))}
        </BrandBox>
      ) : (
        <CardBox>
          {purfume.data.map((data) => (
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

export const SelectBox = styled.div<{ category: string | string[] }>`
  width: ${({ category }) =>
    category === "note"
      ? "897px"
      : category === "brand"
      ? "1450px"
      : category === "personality"
      ? "1415px"
      : "880px"};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ category }) => (category === "brand" ? "154px" : "81px")};
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
