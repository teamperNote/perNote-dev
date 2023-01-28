import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import CategoryCard from "components/category/CategoryCard";
import CategorySelect from "components/category/CategorySelect";
import SortDropDown from "components/SortDropDown";
import {
  alphabetArray,
  categoryArray,
  charArray,
  noteArray,
  personalityArray,
  sortArray,
} from "lib/modules";

export default function Category() {
  const router = useRouter();
  const { slug } = router.query;

  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    if (slug) {
      setCategory(slug[0]);
      setSelected(slug[1]);
      setName(slug[2]);
    }
  }, [slug]);

  const [purfume, setPurfume] = useState({ isLoading: false, data: [] });
  const [sort, setSort] = useState(sortArray[0].value);
  const getCategoryPerfume = (category: string, selected: string) => {
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
    setBrandList({ ...brandList, isLoading: false, data: [] });
    setPurfume({ ...purfume, isLoading: false, data: [] });
    if (category === "brand") {
      if (name === undefined) {
        getBrand();
      } else {
        if (name) {
          getCategoryPerfume(category, name);
        }
      }
    } else {
      if (selected) {
        getCategoryPerfume(category, selected);
      }
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
      {(category !== "brand" || name !== undefined) && (
        <SortBox>
          <SortDropDown sort={sort} setSort={setSort} />
        </SortBox>
      )}
      {category !== "brand" ? (
        <CardBox>
          {purfume.data.map((data) => (
            <CategoryCard key={data.id} data={data} from={"Category"} />
          ))}
        </CardBox>
      ) : name === undefined ? (
        <CategoryBrandBox>
          {brandList.data.map((alphabet) => (
            <BrandBox key={alphabet[0]}>
              <BrandSpan>{alphabet[0]}</BrandSpan>
              <CardBox>
                {alphabet[1].map((brand) => (
                  <CategoryCard
                    key={brand.id}
                    alphabet={alphabet[0]}
                    data={brand}
                    from={"CategoryBrand"}
                  />
                ))}
              </CardBox>
            </BrandBox>
          ))}
        </CategoryBrandBox>
      ) : (
        <>
          <BrandSpan>{name}</BrandSpan>
          <CardBox>
            {purfume.data.map((data) => (
              <CategoryCard key={data.id} data={data} from={"Category"} />
            ))}
          </CardBox>
        </>
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

export const SelectBox = styled.div<{ category: string }>`
  width: ${({ category }) =>
    category === "note"
      ? "650px"
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

export const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const CategoryBrandBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 140px;
`;

const BrandSpan = styled.span`
  width: 1420px;
  font-family: "Noto Sans KR";
  font-style: normal;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  line-height: 72px;
  color: #000000;
  margin-bottom: 80px;
`;
