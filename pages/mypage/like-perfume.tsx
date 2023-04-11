import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PerfumeInfo from "../../components/mypage/PerfumeInfo";
import SortDropDown from "components/category/SortDropDown";
import { sortArray } from "lib/arrays";
import axiosInstance from "lib/api/config";
import { ILiked } from "lib/types";

export default function LikePerfume() {
  const [sort, setSort] = useState(sortArray[0].value);
  const [likedPerfumes, setLikedPerfumes] = useState<ILiked[]>([]);

  useEffect(() => {
    const getLikedPerfumes = () => {
      axiosInstance
        .get("/api/mypage/perfume", {
          params: {
            orderOpt: sort,
          },
        })
        .then(({ data }) => {
          setLikedPerfumes(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getLikedPerfumes();
  }, [sort]);

  return (
    <WishListContainer>
      <WishListTitle className="bold f50">찜한 향수</WishListTitle>
      <SortBox>
        <SortDropDown sort={sort} setSort={setSort} />
      </SortBox>
      <ResultList>
        {likedPerfumes.map((perfume) => (
          <PerfumeInfo key={perfume.id} data={perfume} />
        ))}
      </ResultList>
    </WishListContainer>
  );
}

const WishListContainer = styled.main`
  padding-top: 290px;
  max-width: 1420px;
  margin: 0 auto;
  @media screen and (max-width: 1440px) {
    padding: 0rem 1.875rem;
    padding-top: 180px;
    width: 100%;
  }
  @media screen and (max-width: 480px) {
    padding-top: 130px;
  }
`;

const WishListTitle = styled.h1`
  margin-bottom: 3.1875rem;
  @media screen and (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const SortBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.875rem;
  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const ResultList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3.125rem 1.25rem;
  margin-bottom: 14.375rem;
  place-items: center;
  @media screen and (max-width: 1120px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 740px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 100px;
  }
`;
