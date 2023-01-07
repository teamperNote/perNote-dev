import NoteTag from "components/NoteTag";
import React from "react";
import styled from "styled-components";
import { AiTwotoneHeart } from "react-icons/ai";
const ProductDetailPage = () => {
  return (
    <ProductDetailContainer>
      {/* 임시 작성 */}
      <Path>{"Home > Category > 노트 > 제품명"}</Path>
      <AboutProduct>
        <ImageContainer>
          <MainImage></MainImage>
          <SubImageContainer>
            <SubImage></SubImage>
            <SubImage></SubImage>
          </SubImageContainer>
        </ImageContainer>
        <InformationContainer>
          <ProductInfo>
            <BrandName>BrandName</BrandName>
            <Name>
              <NameIconContainer>
                <KorName>제품명</KorName>
                <AiTwotoneHeart size="50px" />
              </NameIconContainer>
              <EngName>Product name</EngName>
            </Name>
            <Price>
              <PriceText>공식 홈페이지 가격</PriceText>
              <PriceNumber>215,000 원</PriceNumber>
            </Price>
          </ProductInfo>
          <PerfumeInfo>
            <Note>
              <PerfumeTitle>노트</PerfumeTitle>
              <NoteContainer>
                <NoteTag>AQUATIC</NoteTag>
                <NoteTag>WOODY</NoteTag>
                <NoteTag>AQUATIC</NoteTag>
              </NoteContainer>
            </Note>
            <Character>
              <PerfumeTitle>성격</PerfumeTitle>
              <NoteContainer>
                <NoteTag>AQUATIC</NoteTag>
                <NoteTag>WOODY</NoteTag>
              </NoteContainer>
            </Character>
            <Characteristic>
              <PerfumeTitle>특징</PerfumeTitle>
              <NoteContainer>
                <NoteTag>AQUATIC</NoteTag>
                <NoteTag>WOODY</NoteTag>
                <NoteTag>AQUATIC</NoteTag>
                <NoteTag>WOODY</NoteTag>
              </NoteContainer>
            </Characteristic>
          </PerfumeInfo>
          <PriceInfo>
            <div>최저가비교</div>
            <PriceTable></PriceTable>
          </PriceInfo>
        </InformationContainer>
      </AboutProduct>
      <DescriptionContainer>
        <Description>
          <DescriptionTitle>상세설명</DescriptionTitle>
          <DescriptionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui, cras
            <br />
            tempus, facilisi diam vel in duis dictum nec.
          </DescriptionContent>
        </Description>

        <Description>
          <DescriptionTitle>탑노트</DescriptionTitle>
          <DescriptionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui, cras
            <br />
            tempus, facilisi diam vel in duis dictum nec.
          </DescriptionContent>
        </Description>

        <Description>
          <DescriptionTitle>미들노트</DescriptionTitle>
          <DescriptionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui, cras
            <br />
            tempus, facilisi diam vel in duis dictum nec.
          </DescriptionContent>
        </Description>

        <Description>
          <DescriptionTitle>베이스노트</DescriptionTitle>
          <DescriptionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui, cras
            <br />
            tempus, facilisi diam vel in duis dictum nec.
          </DescriptionContent>
        </Description>
      </DescriptionContainer>
    </ProductDetailContainer>
  );
};

export default ProductDetailPage;

const ProductDetailContainer = styled.div`
  margin-top: 100px;
`;

const Path = styled.div`
  padding-left: 250px;
  margin-bottom: 35px;
  font-weight: 400;
  font-size: 20px;
`;

const AboutProduct = styled.div`
  padding-left: 250px;
  display: flex;
  border-bottom: 2px solid #b2b2b2;
  padding-bottom: 60px;
  margin-bottom: 110px;
`;

const ImageContainer = styled.div`
  margin-right: 140px;
`;

const MainImage = styled.img`
  width: 580px;
  height: 580px;
  background-color: #d9d9d9;
`;

const SubImageContainer = styled.div`
  margin-top: 20px;
`;
const SubImage = styled.img`
  margin-right: 30px;
  width: 220px;
  height: 220px;
  background-color: #d9d9d9;
`;

const InformationContainer = styled.div``;

const ProductInfo = styled.div`
  margin-bottom: 61.5px;
`;

const BrandName = styled.div`
  font-weight: 400;
  font-size: 30px;
  color: #808080;
  margin-bottom: 10px;
`;

const Name = styled.div``;

const NameIconContainer = styled.div`
  overflow: hidden;
`;
const KorName = styled.div`
  font-weight: 700;
  font-size: 50px;
  float: left;
  margin-right: 30px;
`;
const EngName = styled.div`
  font-weight: 400;
  font-size: 35px;
  color: #808080;
  margin-bottom: 17px;
`;

const Price = styled.div``;

const PriceText = styled.span`
  font-weight: 700;
  font-size: 30px;
  color: #808080;
  margin-right: 39px;
`;
const PriceNumber = styled.span`
  font-weight: 700;
  font-size: 30px;
`;

const PerfumeInfo = styled.div`
  margin-bottom: 76.5px;
`;

const PerfumeTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 30px;
  color: #808080;
  margin-right: 50px;
`;
const Note = styled.div`
  display: flex;
  margin-bottom: 48px;
`;
const Character = styled.div`
  display: flex;
  margin-bottom: 48px;
`;
const Characteristic = styled.div`
  display: flex;
  margin-bottom: 48px;
`;

const NoteContainer = styled.div`
  display: flex;
`;

const PriceInfo = styled.div`
  div {
    font-weight: 700;
    font-size: 30px;
    color: #808080;
  }
`;

const PriceTable = styled.div`
  margin-top: 20px;
  width: 700px;
  height: 397px;
  border: 1px solid black;
`;
const DescriptionContainer = styled.div``;
const Description = styled.div`
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescriptionTitle = styled.div`
  margin-bottom: 50px;
  font-weight: 700;
  font-size: 40px;
`;
const DescriptionContent = styled.div`
  font-weight: 400;
  font-size: 35px;
`;
