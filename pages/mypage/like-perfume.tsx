import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PerfumeInfo from "../../components/mypage/PerfumeInfo";
import SortDropDown from "components/category/SortDropDown";
import { sortArray } from "lib/arrays";
import axios from "axios";
import { ILiked } from "lib/types";

export default function LikePerfume() {
  const [sort, setSort] = useState(sortArray[0].value);
  const [likedPerfumes, setLikedPerfumes] = useState<ILiked[]>([]);

  useEffect(() => {
    const getLikedPerfumes = () => {
      axios
        .get("/api/perfumeLike/userLiked", {
          params: {
            userId: "6427c8c4aa6de7f827ba0fac",
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
      <WishListTitle>찜한 향수</WishListTitle>
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
`;

const WishListTitle = styled.h2`
  margin: 0;
  margin-bottom: 51px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 72px;
  text-align: left;
  color: var(--black-color);
`;

const SortBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const ResultList = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px 20px;
  margin-bottom: 230px;
`;
