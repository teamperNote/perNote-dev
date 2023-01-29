import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NoteTag from "components/NoteTag";
import { AiTwotoneHeart } from "react-icons/ai";
import axios from "axios";

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = router.query;

  const [purfumeData, setPurfumeData] = useState<Perfume>({
    isLoading: false,
    perfume: {
      imgUrl: "",
      brand: "",
      // name_kor: "",
      name_eng: "",
      // price: 0,
      notes: [],
    },
    similars: [],
  });

  const getPurfumeInfo = async () => {
    await axios
      .get("/api/detail", {
        params: {
          id: productId,
        },
      })
      .then(({ data }) => {
        setPurfumeData({
          ...purfumeData,
          isLoading: true,
          perfume: {
            ...purfumeData.perfume,
            imgUrl: data.perfume.imgUrl,
            brand: data.perfume.brand,
            // name_kor: data.perfume.name_kor,
            name_eng: data.perfume.name,
            // price: number,
            notes: data.perfume.note.split(" "),
          },
          similars: data.similars.perfumes,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (productId) {
      getPurfumeInfo();
    }
    return () => {
      setPurfumeData({ ...purfumeData, isLoading: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <>
      {purfumeData.isLoading && (
        <ProductDetailContainer>
          <AboutProduct>
            <ImageContainer>
              <MainImage src={purfumeData.perfume.imgUrl} />
              <SubImageContainer>
                <SubImage />
                <SubImage />
              </SubImageContainer>
            </ImageContainer>
            <InformationContainer>
              <ProductInfo>
                <BrandName>{purfumeData.perfume.brand}</BrandName>
                <NameBox>
                  <NameIconContainer>
                    <KorName>
                      제품명
                      {/* {purfumeData.name_kor} */}
                    </KorName>
                    <AiTwotoneHeart size="50px" fill={"#6E7C65"} />
                  </NameIconContainer>
                  <EngName>
                    {purfumeData.perfume.name_eng}
                    {/* {purfumeData.name_eng} */}
                  </EngName>
                </NameBox>
                <PriceBox>
                  <PriceText>공식 홈페이지 가격</PriceText>
                  <Price>215,000 원{/* {purfumeData.price} */}</Price>
                </PriceBox>
              </ProductInfo>
              <PerfumeInfo>
                <PerfumeInfoBox>
                  <CategoryTitle>노트</CategoryTitle>
                  <TagBox>
                    {purfumeData.perfume.notes.map((note, idx) => (
                      <NoteTag key={idx} text={note.toUpperCase()} />
                    ))}
                  </TagBox>
                </PerfumeInfoBox>
                {/* <PerfumeInfoBox>
                  <CategoryTitle>성격</CategoryTitle>
                  <TagBox>
                    <NoteTag text={"AQUATIC"} />
                    <NoteTag text={"WOODY"} />
                  </TagBox>
                </PerfumeInfoBox>
                <PerfumeInfoBox>
                  <CategoryTitle>특징</CategoryTitle>
                  <TagBox>
                    <NoteTag text={"AQUATIC"} />
                    <NoteTag text={"WOODY"} />
                    <NoteTag text={"AQUATIC"} />
                    <NoteTag text={"WOODY"} />
                  </TagBox>
                </PerfumeInfoBox> */}
              </PerfumeInfo>
              <PriceInfo>
                <div>최저가비교</div>
                <PriceTable></PriceTable>
              </PriceInfo>
            </InformationContainer>
          </AboutProduct>
          <DescriptionContainer>
            <DescriptionBox>
              <DescriptionTitle>상세설명</DescriptionTitle>
              <DescriptionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui,
                crastempus, facilisi diam vel in duis dictum nec.
              </DescriptionContent>
            </DescriptionBox>
            <DescriptionBox>
              <DescriptionTitle>탑노트</DescriptionTitle>
              <DescriptionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui,
                crastempus, facilisi diam vel in duis dictum nec.
              </DescriptionContent>
            </DescriptionBox>
            <DescriptionBox>
              <DescriptionTitle>미들노트</DescriptionTitle>
              <DescriptionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui,
                crastempus, facilisi diam vel in duis dictum nec.
              </DescriptionContent>
            </DescriptionBox>
            <DescriptionBox>
              <DescriptionTitle>베이스노트</DescriptionTitle>
              <DescriptionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui,
                crastempus, facilisi diam vel in duis dictum nec.
              </DescriptionContent>
            </DescriptionBox>
          </DescriptionContainer>
          <SimilarsContainer>
            <SimilarsTitle>비슷한 향수를 추천합니다</SimilarsTitle>
            <SimilarsCardBox>
              {purfumeData.similars.map((similar) => (
                <Link href={similar.id} key={similar.id}>
                  <SimilarsCard>
                    <SimilarImg src={similar.imgUrl} />
                    <Span>{similar.name}</Span>
                  </SimilarsCard>
                </Link>
              ))}
            </SimilarsCardBox>
            {/* TODO 서지수 스크롤 기능 구현 해야 함 */}
            <RowScroll>
              <ScrollDot className={"focus"} />
              <ScrollDot />
              <ScrollDot />
              <ScrollDot />
            </RowScroll>
          </SimilarsContainer>
        </ProductDetailContainer>
      )}
    </>
  );
}

interface Perfume {
  isLoading: boolean;
  perfume: {
    imgUrl: string;
    brand: string;
    // name_kor: string;
    name_eng: string;
    // price: number;
    notes: string[];
  };
  similars: {
    id: string;
    imgUrl: string;
    name: string;
  }[];
}

const ProductDetailContainer = styled.div`
  padding-top: 199px;
  width: 1420px;
  margin: 0 auto;
`;

const AboutProduct = styled.div`
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
  margin-bottom: 60px;
`;

const Span = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
  text-align: left;
  color: #000000;
`;

const BrandName = styled(Span)`
  margin-bottom: 18px;
`;

const NameBox = styled.div`
  margin-bottom: 17px;
`;

const NameIconContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const KorName = styled(Span)`
  font-weight: 700;
  font-size: 50px;
  line-height: 72px;
  margin-right: 30px;
`;

const EngName = styled(Span)`
  font-weight: 400;
  font-size: 35px;
  line-height: 51px;
`;

const PriceBox = styled.div``;

const PriceText = styled(Span)`
  font-weight: 700;
  margin-right: 39px;
`;

const Price = styled(PriceText)`
  margin-right: 0;
`;

const PerfumeInfo = styled.div`
  margin-bottom: 76px;
`;

const PerfumeInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 45px;
`;

const CategoryTitle = styled(Span)`
  font-weight: 700;
  margin-right: 50px;
`;

const TagBox = styled.div`
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

const DescriptionContainer = styled.div`
  border-bottom: 2px solid #b2b2b2;
`;

const DescriptionBox = styled.div`
  width: 1056px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 120px;
`;

const DescriptionTitle = styled(Span)`
  font-weight: 700;
  font-size: 40px;
  line-height: 58px;
  text-align: center;
  margin-bottom: 50px;
`;

const DescriptionContent = styled(Span)`
  font-weight: 400;
  font-size: 35px;
`;

const SimilarsContainer = styled.div`
  margin: 110px 0 160px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SimilarsTitle = styled(Span)`
  font-weight: 700;
  font-size: 40px;
  line-height: 58px;
  text-align: center;
  margin-bottom: 113px;
`;

const SimilarsCardBox = styled.div`
  display: flex;
  align-items: center;
  width: 1420px;
  overflow: hidden;
  margin-bottom: 70px;
`;

const SimilarsCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 21px;
  cursor: pointer;
  :last-child {
    margin-right: 0;
  }
`;

const SimilarImg = styled.img`
  width: 339px;
  height: 339px;
  border-radius: 30px;
  margin-bottom: 25px;
`;

const RowScroll = styled.div`
  width: 155px;
  display: flex;
`;

const ScrollDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin-right: 25px;
  background-color: var(--light-gray-color);
  cursor: pointer;
  :last-child {
    margin-right: 0;
  }
  &.focus {
    background-color: var(--secondary-color);
  }
`;
