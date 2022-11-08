import NoteTag from "components/NoteTag";
import React from "react";
import styled from "styled-components";
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
            <SubImage></SubImage>
          </SubImageContainer>
        </ImageContainer>
        <InformationContainer>
          <ProductInfo>
            <BrandName>BrandName</BrandName>
            <Name>
              <KorName>제품명</KorName>
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
  margin: 0 97px;
  margin-top: 100px;
`;

const Path = styled.div`
  margin-bottom: 35px;
  font-weight: 400;
  font-size: 20px;
`;

const AboutProduct = styled.div`
  display: flex;
  border-bottom: 2px solid #b2b2b2;
  padding-bottom: 60px;
  margin-bottom: 110px;
`;

const ImageContainer = styled.div`
  margin-right: 100px;
`;

const MainImage = styled.img`
  width: 800px;
  height: 800px;
  background-color: #d9d9d9;
`;

const SubImageContainer = styled.div`
  margin-top: 30px;
`;
const SubImage = styled.img`
  margin-right: 30px;
  width: 230px;
  height: 230px;
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

const KorName = styled.div`
  font-weight: 700;
  font-size: 50px;
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
