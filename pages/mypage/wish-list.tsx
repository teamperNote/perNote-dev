import React from "react";
import styled from "styled-components";
import PerfumeInfo from "../../components/mypage/PerfumeInfo";

function WishList() {
  return (
    <WishListContainer>
      <WishListTitle>찜한 향수</WishListTitle>
      {/* 드롭다운 메뉴 추가 */}
      <ResultList>
        <PerfumeInfo />
        <PerfumeInfo />
        <PerfumeInfo />
        <PerfumeInfo />
        <PerfumeInfo />
        <PerfumeInfo />
        <PerfumeInfo />
      </ResultList>
    </WishListContainer>
  );
}

export default WishList;

const WishListContainer = styled.div`
  padding-top: 290px;
  max-width: 1420px;
  margin: 0 auto;
`;

const WishListTitle = styled.h2`
  margin: 0;
  margin-bottom: 110px;
  font-weight: 700;
  font-size: 50px;
`;

const ResultList = styled.ul`
  padding: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
