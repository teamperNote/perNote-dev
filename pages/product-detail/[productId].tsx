import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import NoteTag from "components/NoteTag";
import axiosInstance from "lib/api/config";
import { IPerfume } from "lib/types";
import { numberComma } from "lib/numberFomat";
import LikeButton from "components/LikeButton";

export default function ProductDetailPage() {
  const {
    query: { productId },
  } = useRouter();

  const [purfumeData, setPurfumeData] = useState<IPerfume>({
    isLoading: false,
    data: null,
  });
  const getPurfumeInfo = async () => {
    await axiosInstance
      .get("/api/detail", {
        params: {
          perfumeId: productId,
        },
      })
      .then(({ data: { perfume } }) => {
        setPurfumeData({ ...purfumeData, isLoading: true, data: perfume });
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
      setPurfumeData({
        isLoading: false,
        data: null,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <>
      {purfumeData.isLoading && (
        <ProductDetailContainer>
          <AboutProduct>
            <ImageBox>
              <Image
                src={
                  purfumeData.data.imgUrl == ""
                    ? "/noImage.png"
                    : purfumeData.data.imgUrl
                }
                alt={`${purfumeData.data.name_eng} 이미지`}
                layout="fill"
                objectFit={"contain"}
                priority
                unoptimized
              />
            </ImageBox>
            <InfoSection>
              <NameBox>
                <BrandName className="regular f30">
                  {purfumeData.data.brand_eng}
                </BrandName>
                <EngName className="bold f50">
                  {purfumeData.data.name_eng}
                </EngName>
                <NameIconBox>
                  <LikeButton
                    id={purfumeData.data.id}
                    direction={"row"}
                    liked={purfumeData.data.liked}
                    likeCount={purfumeData.data.likeCount}
                    color={"#6E7C65"}
                    countSize={35}
                    countMargin={"0rem 1.25rem 0rem 0.375rem"}
                  />
                  <Image
                    src={"/second_viewIcon.svg"}
                    alt={"조회수 아이콘"}
                    width={40}
                    height={36.7}
                    unoptimized
                  />
                  <CountSapn className="regular f35">
                    {purfumeData.data.viewCount}
                  </CountSapn>
                </NameIconBox>
              </NameBox>
              {/* <PriceBox>
                  <PriceText>공식 홈페이지 가격</PriceText>
                  <Price>
                    {purfumeData.data.price === ""
                      ? "가격 미표기"
                      : `${purfumeData.data.price}원`}
                  </Price>
                </PriceBox> */}
              <PerfumeInfo>
                <PerfumeInfoBox>
                  <CategoryTitle className="bold f30">노트</CategoryTitle>
                  <TagBox className={"regular f20"}>
                    {purfumeData.data.note.map((note, idx) => (
                      <NoteTag
                        key={idx}
                        from={"ProductDetailPage"}
                        text={note.toUpperCase()}
                      />
                    ))}
                  </TagBox>
                </PerfumeInfoBox>
                <PerfumeInfoBox>
                  <CategoryTitle className="bold f30">성격</CategoryTitle>
                  <TagBox className={"regular f20"}>
                    {purfumeData.data.personality.map((personality, idx) => (
                      <NoteTag
                        key={idx}
                        from={"ProductDetailPage"}
                        text={personality.toUpperCase()}
                      />
                    ))}
                  </TagBox>
                </PerfumeInfoBox>
                <PerfumeInfoBox>
                  <CategoryTitle className="bold f30">특징</CategoryTitle>
                  <TagBox className={"regular f20"}>
                    {purfumeData.data.feature.map((feature, idx) => (
                      <NoteTag
                        key={idx}
                        from={"ProductDetailPage"}
                        text={feature.toUpperCase()}
                      />
                    ))}
                  </TagBox>
                </PerfumeInfoBox>
              </PerfumeInfo>
              <PriceInfo>
                <PriceInfoTitle className="bold f30">
                  최저가 비교
                </PriceInfoTitle>
                <PriceTable className="bold f20">
                  <PriceTableTitle>
                    <PriceTableTitleDomain>판매처</PriceTableTitleDomain>
                    <PriceTableTitleSpan>판매가</PriceTableTitleSpan>
                    <PriceTableTitleSpan>URL</PriceTableTitleSpan>
                  </PriceTableTitle>
                  <PriceUl className="regular">
                    {purfumeData.data.lowest.map((price, idx) => (
                      <PriceLi key={idx}>
                        <PriceDomain className="medium">
                          {price.domain === "11st" ||
                          price.domain === "naver" ? (
                            <DomainImage>
                              <Image
                                src={
                                  price.domain === "11st"
                                    ? "https://shopping-phinf.pstatic.net/20220906_14/a11d3777-7190-44e6-8bd8-8ceb36bf76b8.jpg"
                                    : price.domain === "naver" &&
                                      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Naver_Logotype.svg/1280px-Naver_Logotype.svg.png"
                                }
                                alt={`${price.domain} 이미지`}
                                layout="fill"
                                objectFit={"contain"}
                                objectPosition={"left"}
                                unoptimized
                              />
                            </DomainImage>
                          ) : (
                            price.domain
                          )}
                        </PriceDomain>
                        <PricePrice>{numberComma(price.price)}원</PricePrice>
                        <PriceLink
                          href={price.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          사러가기
                        </PriceLink>
                      </PriceLi>
                    ))}
                  </PriceUl>
                </PriceTable>
              </PriceInfo>
            </InfoSection>
          </AboutProduct>
          <DescriptionContainer>
            {/* TODO 서지수 향수 설명 추가되면 수정 */}
            {/* <DescriptionBox>
              <DescriptionTitle className="bold f40">상세설명</DescriptionTitle>
              <DescriptionContent className="regular f35">
                향수 설명
              </DescriptionContent>
            </DescriptionBox> */}
            <DescriptionBox>
              <DescriptionTitle className="bold f40">탑노트</DescriptionTitle>
              <DescriptionContent className="regular f35">
                {purfumeData.data.top == "xxxx" ? "-" : purfumeData.data.top}
              </DescriptionContent>
            </DescriptionBox>
            <DescriptionBox>
              <DescriptionTitle className="bold f40">미들노트</DescriptionTitle>
              <DescriptionContent className="regular f35">
                {purfumeData.data.middle == "xxxx"
                  ? "-"
                  : purfumeData.data.middle}
              </DescriptionContent>
            </DescriptionBox>
            <DescriptionBox>
              <DescriptionTitle className="bold f40">
                베이스노트
              </DescriptionTitle>
              <DescriptionContent className="regular f35">
                {purfumeData.data.bottom == "xxxx"
                  ? "-"
                  : purfumeData.data.bottom}
              </DescriptionContent>
            </DescriptionBox>
          </DescriptionContainer>
          <SimilarsContainer>
            <SimilarsTitle className="bold f40">
              비슷한 향수를 추천합니다
            </SimilarsTitle>
            <SimilarsCardBox>
              {purfumeData.data.similars.map((similar) => (
                <Link href={similar.id} key={similar.id}>
                  <SimilarsCard>
                    <SimilarImage>
                      <Image
                        src={
                          similar.imgUrl === ""
                            ? "/noImage.png"
                            : similar.imgUrl
                        }
                        alt={`${similar.name_eng} 이미지`}
                        layout="fill"
                        objectFit={"contain"}
                        style={{ borderRadius: "30px", marginBottom: "25px" }}
                        unoptimized
                      />
                    </SimilarImage>
                    <SimilarName className="regular f30">
                      {similar.name_eng}
                    </SimilarName>
                  </SimilarsCard>
                </Link>
              ))}
            </SimilarsCardBox>
          </SimilarsContainer>
        </ProductDetailContainer>
      )}
    </>
  );
}

const ProductDetailContainer = styled.main`
  padding-top: 110px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  @media screen and (max-width: 1440px) {
    padding-top: 90px;
  }
  @media screen and (max-width: 1000px) {
    width: 80vw;
  }
  @media screen and (max-width: 950px) {
    padding-top: 140px;
  }
`;

const AboutProduct = styled.div`
  display: flex;
  align-items: start;
  border-bottom: 2px solid #b2b2b2;
  margin-top: 6.125rem;
  padding-bottom: 3.75rem;
  margin-bottom: 6.875rem;
  @media screen and (max-width: 1000px) {
    width: 100%;
    flex-direction: column;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 36.25rem;
  height: 36.25rem;
  margin-right: 8.75rem;
  @media screen and (max-width: 1440px) {
    width: 25rem;
    height: 25rem;
    margin-right: 5.625rem;
  }
  @media screen and (max-width: 1000px) {
    width: 40vw;
    height: 40vw;
    margin-right: 0;
    margin: 0 auto;
    margin-bottom: 3.125rem;
  }
  @media screen and (max-width: 480px) {
    width: 80vw;
    height: 80vw;
    margin-right: 0;
    margin-bottom: 3.125rem;
  }
`;

const BrandName = styled.h2`
  margin-bottom: 1.125rem;
`;

const InfoSection = styled.section`
  width: 700px;
  @media screen and (max-width: 1440px) {
    width: 37.5rem;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const NameBox = styled.section`
  margin-bottom: 3.75rem;
`;

const NameIconBox = styled.div`
  display: flex;
  align-items: center;
`;

const EngName = styled.h1`
  margin-bottom: 0.625rem;
  width: 100%;
  white-space: wrap;
`;

const CountSapn = styled.h3`
  color: var(--secondary-color);
  margin-left: 0.625rem;
`;

// const PriceBox = styled.div``;

// const PriceText = styled(Span)`
//   font-weight: 700;
//   margin-right: 39px;
// `;

// const Price = styled(PriceText)`
//   margin-right: 0;
// `;

const PerfumeInfo = styled.section`
  margin-bottom: 4.75rem;
`;

const PerfumeInfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.8125rem;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const CategoryTitle = styled.h3`
  margin-right: 2.1875rem;
  @media screen and (max-width: 1000px) {
    margin-right: 0;
    margin-bottom: 0.625rem;
  }
`;

const TagBox = styled.ul`
  display: flex;
  width: 37.125rem;
  flex-wrap: wrap;
  @media screen and (max-width: 1440px) {
    width: 31.25rem;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const PriceInfo = styled.section``;

const PriceInfoTitle = styled.h2`
  margin-bottom: 1.25rem;
`;

const PriceTable = styled.div`
  display: grid;
  grid-template-rows: 3.4375rem 6.25rem;
  width: 700px;
  border: 2px solid var(--medium-gray-color);
  @media screen and (max-width: 1440px) {
    width: 37.5rem;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const PriceTableTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 2px solid var(--medium-gray-color);
`;

const PriceTableTitleDomain = styled.div`
  text-align: left;
  padding: 0.8125rem 0;
  padding-left: 1.875rem;
`;

const PriceTableTitleSpan = styled.div`
  padding: 0.8125rem 0;
  text-align: center;
`;

const PriceUl = styled.ul`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
`;

const PriceLi = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid var(--medium-gray-color);
  :last-child {
    border-bottom: 0;
  }
`;

const PriceDomain = styled.div`
  text-align: left;
  padding: 0.625rem 0;
  padding-left: 1.875rem;
  display: flex;
  align-items: center;
`;

const DomainImage = styled.div`
  position: relative;
  width: 6.25rem;
  height: 0.9375rem;
`;

const PricePrice = styled.div`
  padding: 0.625rem 0;
  text-align: right;
`;

const PriceLink = styled.a`
  padding: 0.625rem 0;
  text-align: center;
  :hover {
    text-decoration: underline;
  }
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
  margin-bottom: 7.5rem;
  @media screen and (max-width: 1000px) {
    width: 100%;
    margin-bottom: 3.125rem;
  }
`;

const DescriptionTitle = styled.h3`
  text-align: center;
  margin-bottom: 3.125rem;
  @media screen and (max-width: 1000px) {
    margin-bottom: 1.25rem;
  }
`;

const DescriptionContent = styled.h4`
  text-align: center;
`;

const SimilarsContainer = styled.div`
  margin: 6.875rem 0 10rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1000px) {
    margin-bottom: 4.375rem;
  }
`;

const SimilarsTitle = styled.h2`
  text-align: center;
  margin-bottom: 7.0625rem;
  @media screen and (max-width: 1000px) {
    margin-bottom: 4.375rem;
  }
`;

const SimilarsCardBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 1420px;
  margin-bottom: 70px;
  @media screen and (max-width: 1440px) {
    width: 100%;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const SimilarsCard = styled.button`
  width: 21.1875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.3125rem;
  cursor: pointer;
  :last-child {
    margin-right: 0;
  }
  @media screen and (max-width: 1440px) {
    width: 15.625rem;
  }
  @media screen and (max-width: 1000px) {
    margin-right: 0;
    margin-bottom: 1.25rem;
  }
`;

const SimilarImage = styled.div`
  position: relative;
  width: 21.1875rem;
  height: 21.1875rem;
  @media screen and (max-width: 1440px) {
    width: 12.5rem;
    height: 12.5rem;
  }
  @media screen and (max-width: 1000px) {
    width: 30vw;
    height: 30vw;
  }
  @media screen and (max-width: 480px) {
    width: 70vw;
    height: 70vw;
  }
`;

const SimilarName = styled.h3`
  margin-top: 1.5625rem;
  text-align: center;
`;
