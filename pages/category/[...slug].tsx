import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import CategoryCard from "components/category/CategoryCard";
import CategorySelect from "components/category/CategorySelect";
import SortDropDown from "components/category/SortDropDown";
import Pagination from "@mui/material/Pagination";
import {
  alphabetArray,
  categoryArray,
  featureArray,
  noteArray,
  personalityArray,
  sortArray,
} from "lib/arrays";

export default function Category() {
  const router = useRouter();
  const { slug } = router.query;

  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState("");
  const [brandName, setBrandName] = useState("");
  useEffect(() => {
    if (slug) {
      setCategory(slug[0]);
      setSelected(slug[1]);
      setBrandName(slug[2]);
    }
  }, [slug]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [purfume, setPurfume] = useState([]);
  const [sort, setSort] = useState(sortArray[0].value);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(10);
  const getCategoryPerfume = (category: string, selected: string) => {
    axios
      .get("/api/category", {
        params: {
          userId: "64023ce1c704c82c11f5df20",
          category: category,
          selected: selected,
          orderOpt: sort,
          pageNum: page,
        },
      })
      .then(({ data }) => {
        setPageCount(data.pageAmount);
        setPurfume(data.perfumes);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [brandList, setBrandList] = useState([]);
  const getBrand = () => {
    axios
      .get("/api/category/brandList")
      .then(({ data }) => {
        if (alphabetArray.find((x) => x.value === selected)) {
          setIsLoading(true);
          setBrandList([[selected, [data.dict[selected]][0]]]);
        } else {
          setIsLoading(true);
          setBrandList(Object.entries(data.dict));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(false);
    setBrandList([]);
    setPurfume([]);
    setPage(1);
    setPageCount(10);
    if (category === "brand") {
      if (brandName === undefined) {
        getBrand();
      } else {
        if (brandName) {
          getCategoryPerfume(category, brandName);
        }
      }
    } else {
      if (selected) {
        getCategoryPerfume(category, selected);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, selected, brandName, sort]);

  useEffect(() => {
    setIsLoading(false);
    setBrandList([]);
    setPurfume([]);
    if (category === "brand") {
      if (brandName === undefined) {
        getBrand();
      } else {
        if (brandName) {
          getCategoryPerfume(category, brandName);
        }
      }
    } else {
      if (selected) {
        getCategoryPerfume(category, selected);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <CategoryContainer>
      <CategoryBox>
        {categoryArray.map((data) => (
          <Link key={data.id} href={data.url}>
            <CategoryTitle
              className={`bold f30 ${category === data.value ? "focus" : ""}`}
            >
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
          : featureArray
        ).map((data) => (
          <CategorySelect
            key={data.id}
            data={data}
            category={category}
            selected={selected}
          />
        ))}
      </SelectBox>
      {(category !== "brand" || brandName !== undefined) && (
        <SortBox>
          <SortDropDown sort={sort} setSort={setSort} />
        </SortBox>
      )}
      {isLoading && (
        <>
          {category !== "brand" ? (
            <CardBox>
              {purfume.map((data) => (
                <CategoryCard key={data.id} data={data} from={"Category"} />
              ))}
            </CardBox>
          ) : brandName === undefined ? (
            <CategoryBrandBox>
              {brandList.map((alphabet) => (
                <BrandBox key={alphabet[0]}>
                  <BrandSpan className={"bold f50"}>{alphabet[0]}</BrandSpan>
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
              <BrandSpan className={"bold f50"}>{brandName}</BrandSpan>
              <CardBox>
                {purfume.map((data) => (
                  <CategoryCard key={data.id} data={data} from={"Category"} />
                ))}
              </CardBox>
            </>
          )}
        </>
      )}
      {(category !== "brand" || brandName !== undefined) && (
        <Pagination
          page={page}
          count={pageCount}
          size="large"
          onChange={(_, value) => {
            setPage(value);
          }}
        />
      )}
    </CategoryContainer>
  );
}

export const CategoryContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-top: 110px;
  padding-bottom: 12.5rem;
  @media screen and (max-width: 1440px) {
    width: 80vw;
  }
  @media screen and (max-width: 480px) {
    padding-top: 80px;
    padding-bottom: 4.375rem;
  }
`;

export const CategoryBox = styled.ul`
  margin-top: 5.625rem;
  margin-bottom: 5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (max-width: 630px) {
    margin-top: 3.75rem;
    margin-bottom: 3.125rem;
  }
`;

export const CategoryTitle = styled.li`
  color: #b2b2b2;
  margin: 0rem 2.5rem;
  cursor: pointer;
  &.focus {
    color: #000000;
  }
  @media screen and (max-width: 630px) {
    margin: 0rem 1.25rem;
  }
`;

export const SelectBox = styled.ul<{ category: string }>`
  width: ${({ category }) =>
    category === "note"
      ? "720px"
      : category === "brand"
      ? "1450px"
      : category === "personality"
      ? "750px"
      : "880px"};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ category }) =>
    category === "brand" ? "9.625rem" : "5.0625rem"};
  @media screen and (max-width: 1440px) {
    width: ${({ category }) => category === "brand" && "100%"};
  }
  @media screen and (max-width: 900px) {
    width: 100%;
  }
  @media screen and (max-width: 630px) {
    margin-bottom: ${({ category }) =>
      category === "brand" ? "6.25rem" : "3.125rem"};
  }
`;

export const SortBox = styled.div`
  width: 1420px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.875rem;
  @media screen and (max-width: 1440px) {
    width: 100%;
  }
  @media screen and (max-width: 630px) {
    margin-bottom: 0.625rem;
  }
`;

export const CardBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 3.75rem;
  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 630px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CategoryBrandBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandBox = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 8.75rem;
`;

const BrandSpan = styled.h2`
  width: 1420px;
  color: #000000;
  margin-bottom: 5rem;
  @media screen and (max-width: 1440px) {
    width: 100%;
  }
`;
