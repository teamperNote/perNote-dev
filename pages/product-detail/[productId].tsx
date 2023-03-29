import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import NoteTag from "components/NoteTag";
import axios from "axios";
import { IPerfume } from "lib/types";
import { numberComma } from "lib/numberFomat";

export default function ProductDetailPage() {
  const {
    query: { productId },
  } = useRouter();

  const [purfumeData, setPurfumeData] = useState<IPerfume>({
    isLoading: false,
    data: null,
  });
  const getPurfumeInfo = async () => {
    await axios
      .get("/api/detail", {
        params: {
          userId: "64023ce1c704c82c11f5df20",
          perfumeId: productId,
        },
      })
      .then(({ data: { perfume } }) => {
        console.log(perfume);
        setPurfumeData({ ...purfumeData, isLoading: true, data: perfume });
        setIsLike(perfume.liked);
        setLikeCounts(perfume.likeCount);
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

  // 좋아요 기능
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCounts, setLikeCounts] = useState<number>(0);
  const onLikeClick = async () => {
    if (isLike) {
      setIsLike(false);
      setLikeCounts(likeCounts - 1);
    } else {
      setIsLike(true);
      setLikeCounts(likeCounts + 1);
    }
    await axios
      .post("/api/perfumeLike", {
        perfumeId: purfumeData.data.id,
        userId: "64023ce1c704c82c11f5df20",
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {purfumeData.isLoading && (
        <ProductDetailContainer>
          <AboutProduct>
            <ImageContainer>
              <MainImage
                src={
                  purfumeData.data.imgUrl == ""
                    ? "/noImage.png"
                    : purfumeData.data.imgUrl
                }
              />
              {/* <SubImageContainer>
                <SubImage />
                <SubImage />
              </SubImageContainer> */}
            </ImageContainer>
            <InformationContainer>
              <ProductInfo>
                <BrandName>{purfumeData.data.brand_eng}</BrandName>
                <NameBox>
                  <NameIconContainer>
                    <KorName>제품명</KorName>
                    {/* TODO 서지수 liked 추가되면 수정하기 */}
                    <Image
                      src={
                        isLike
                          ? "/second_heartFillIcon.svg"
                          : "/second_heartIcon.svg"
                      }
                      alt={`${isLike ? "like" : "unlike"} icon`}
                      width={40}
                      height={36.7}
                      onClick={onLikeClick}
                    />
                    <CountSapn>{likeCounts}</CountSapn>
                    <Image
                      src={"/second_viewIcon.svg"}
                      alt={"조회수 아이콘"}
                      width={40}
                      height={36.7}
                    />
                    <CountSapn>{purfumeData.data.viewCount}</CountSapn>
                  </NameIconContainer>
                  <EngName>{purfumeData.data.name_eng}</EngName>
                </NameBox>
                {/* <PriceBox>
                  <PriceText>공식 홈페이지 가격</PriceText>
                  <Price>
                    {purfumeData.data.price === ""
                      ? "가격 미표기"
                      : `${purfumeData.data.price}원`}
                  </Price>
                </PriceBox> */}
              </ProductInfo>
              <PerfumeInfo>
                <PerfumeInfoBox>
                  <CategoryTitle>노트</CategoryTitle>
                  <TagBox>
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
                  <CategoryTitle>성격</CategoryTitle>
                  <TagBox>
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
                  <CategoryTitle>특징</CategoryTitle>
                  <TagBox>
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
                <PriceInfoTitle>최저가 비교</PriceInfoTitle>
                <PriceTable>
                  <PriceTableTitle>
                    <PriceTableTitleDomain>판매처</PriceTableTitleDomain>
                    <PriceTableTitlePrice>판매가</PriceTableTitlePrice>
                    <PriceTableTitleLink>URL</PriceTableTitleLink>
                  </PriceTableTitle>
                  <ul>
                    {purfumeData.data.lowest.map((price, idx) => (
                      <PriceLi key={idx}>
                        <PriceDomain>
                          {price.domain === "11st" ||
                          price.domain === "naver" ? (
                            <Image
                              src={
                                price.domain === "11st"
                                  ? "https://shopping-phinf.pstatic.net/20220906_14/a11d3777-7190-44e6-8bd8-8ceb36bf76b8.jpg"
                                  : price.domain === "naver" &&
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Naver_Logotype.svg/1280px-Naver_Logotype.svg.png"
                              }
                              alt={`${price.domain} 이미지`}
                              width={100}
                              height={15}
                              objectFit={"contain"}
                              objectPosition={"left"}
                            />
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
                  </ul>
                </PriceTable>
              </PriceInfo>
            </InformationContainer>
          </AboutProduct>
          <DescriptionContainer>
            {/* TODO 서지수 향수 설명 추가되면 수정 */}
            {/* <DescriptionBox>
              <DescriptionTitle>상세설명</DescriptionTitle>
              <DescriptionContent>
                향수 설명
              </DescriptionContent>
            </DescriptionBox> */}
            <DescriptionBox>
              <DescriptionTitle>탑노트</DescriptionTitle>
              <DescriptionContent>
                {purfumeData.data.top == "xxxx" ? "-" : purfumeData.data.top}
              </DescriptionContent>
            </DescriptionBox>
            <DescriptionBox>
              <DescriptionTitle>미들노트</DescriptionTitle>
              <DescriptionContent>
                {purfumeData.data.middle == "xxxx"
                  ? "-"
                  : purfumeData.data.middle}
              </DescriptionContent>
            </DescriptionBox>
            <DescriptionBox>
              <DescriptionTitle>베이스노트</DescriptionTitle>
              <DescriptionContent>
                {purfumeData.data.bottom == "xxxx"
                  ? "-"
                  : purfumeData.data.bottom}
              </DescriptionContent>
            </DescriptionBox>
          </DescriptionContainer>
          <SimilarsContainer>
            <SimilarsTitle>비슷한 향수를 추천합니다</SimilarsTitle>
            <SimilarsCardBox>
              {purfumeData.data.similars.map((similar) => (
                <Link href={similar.id} key={similar.id}>
                  <SimilarsCard>
                    <SimilarImg
                      src={
                        similar.imgUrl === "" ? "/noImage.png" : similar.imgUrl
                      }
                    />
                    <Span>{similar.name_eng}</Span>
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

// const SubImageContainer = styled.div`
//   margin-top: 20px;
// `;

// const SubImage = styled.img`
//   margin-right: 30px;
//   width: 220px;
//   height: 220px;
//   background-color: #d9d9d9;
// `;

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

const CountSapn = styled(Span)`
  font-size: 36px;
  line-height: 37px;
  margin-left: 10px;
  margin-right: 20px;
`;

// const PriceBox = styled.div``;

// const PriceText = styled(Span)`
//   font-weight: 700;
//   margin-right: 39px;
// `;

// const Price = styled(PriceText)`
//   margin-right: 0;
// `;

const PerfumeInfo = styled.div`
  margin-bottom: 76px;
`;

const PerfumeInfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 45px;
`;

const CategoryTitle = styled(Span)`
  font-weight: 700;
  margin-right: 35px;
`;

const TagBox = styled.div`
  display: flex;
  width: 594px;
  flex-wrap: wrap;
`;

const PriceInfo = styled.div``;

const PriceInfoTitle = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 43px;
`;

const PriceTable = styled.div`
  margin-top: 20px;
  width: 700px;
  border: 2px solid var(--medium-gray-color);

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
`;

const PriceTableTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  border-bottom: 2px solid var(--medium-gray-color);
`;

const PriceTableTitleDomain = styled.div`
  text-align: left;
  width: 400px;
  padding: 10px 20px;
`;

const PriceTableTitlePrice = styled(PriceTableTitleDomain)`
  text-align: center;
  width: 150px;
`;

const PriceTableTitleLink = styled(PriceTableTitlePrice)`
  width: 150px;
`;

const PriceLi = styled.div`
  display: flex;
  height: 45px;
  border-bottom: 1px solid var(--medium-gray-color);
  :last-child {
    border-bottom: 0;
  }
`;

const PriceDomain = styled.div`
  text-align: left;
  width: 400px;
  padding: 10px 20px;
  font-weight: 500;
`;

const PricePrice = styled(PriceDomain)`
  text-align: right;
  width: 150px;
`;

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  font-weight: 500;

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
