import React from "react";
import styled from "styled-components";

function PerfumeInfo() {
  return (
    <PerfumeInfoContainer>
      <PerfumeImageContainer>
        <img src="/perNoteBackImg.png" alt="" />
      </PerfumeImageContainer>
      <TextContainer>
        <Date>2022.11.01</Date>
        <PerfumeName>Lorem Ipsum</PerfumeName>
        <PerfumeBrand>CHANEL</PerfumeBrand>
        <DetailInfo>
          <DetailInfoItem>
            <InfoTitle>노트</InfoTitle>
            <InfoContent>Lorem Ipsum</InfoContent>
          </DetailInfoItem>
          <DetailInfoItem>
            <InfoTitle>탑</InfoTitle>
            <InfoContent>Lorem Ipsum</InfoContent>
          </DetailInfoItem>
          <DetailInfoItem>
            <InfoTitle>미들</InfoTitle>
            <InfoContent>Lorem Ipsum</InfoContent>
          </DetailInfoItem>
          <DetailInfoItem>
            <InfoTitle>베이스</InfoTitle>
            <InfoContent>Lorem Ipsum</InfoContent>
          </DetailInfoItem>
        </DetailInfo>
        <PriceInfo>
          <PriceText>최저가</PriceText>
          <span>90,000</span>
        </PriceInfo>
      </TextContainer>
    </PerfumeInfoContainer>
  );
}

export default PerfumeInfo;

const PerfumeInfoContainer = styled.div`
  width: 460px;
  height: 747px;
`;

const PerfumeImageContainer = styled.div`
  margin-bottom: 30px;
  img {
    width: 100%;
    height: 300px;
  }
`;
const TextContainer = styled.div`
  padding-left: 34px;
`;

const Date = styled.time`
  color: var(--dark-gray-color);
  font-weight: 400;
  font-size: 20px;
`;

const PerfumeName = styled.h3`
  margin: 0;
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 30px;
`;

const PerfumeBrand = styled.h4`
  margin: 0;
  margin-bottom: 25px;
  font-weight: 400;
  font-size: 20px;
`;
const DetailInfo = styled.ul`
  padding: 0;
  list-style-type: none;
`;
const DetailInfoItem = styled.li`
  margin-bottom: 29px;
`;

const InfoTitle = styled.b`
  display: inline-block;
  width: 56px;
  margin-right: 30px;
  font-weight: 700;
  font-size: 20px;
`;

const InfoContent = styled.span`
  font-weight: 400;
  font-size: 20px;
`;

const PriceInfo = styled.div`
  font-weight: 700;
  font-size: 40px;
`;

const PriceText = styled.b`
  display: inline-block;
  margin-right: 40px;
`;
