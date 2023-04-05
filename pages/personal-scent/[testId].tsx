import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { BsLink45Deg } from "react-icons/bs";
import {
  genderArray,
  concentrationArray,
  seasonArray,
  colorArray,
  personalityArray,
  featureArray,
} from "lib/arrays";
import { IChosen } from "lib/types";
import NoteTag from "components/NoteTag";

export default function PersonalScent() {
  const router = useRouter();
  const { testId } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [chosen, setChosen] = useState<IChosen>(null);
  const [top5, setTop5] = useState([]);
  const getTop5 = async () => {
    await axios
      .get("/api/personalScent/result", {
        params: { testId: testId },
      })
      .then(({ data: { testResult } }) => {
        setChosen(testResult.chosen);
        setTop5(testResult.perfumes);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (testId) {
      getTop5();
    }
    return () => {
      setChosen(null);
      setTop5([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  // 향수 설명 길면 줄이기
  // const contentRef = useRef(null);
  // const [isHidden, setIsHidden] = useState(false);
  // useEffect(() => {
  //   if (contentRef.current?.clientHeight > 461) {
  //     setIsHidden(true);
  //   }
  // }, []);

  // url 복사 기능
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 클립보드에 복사되었습니다.");
    } catch (e) {
      alert("링크 복사를 실패하였습니다. 다시 시도해주세요");
    }
  };

  return (
    <RecommendationContainer>
      {isLoading && (
        <>
          <Title className={"bold f50"}>당신에게 이 향수를 추천합니다.</Title>
          <Section>
            <TagBox className={"regular f30"}>
              <NoteTag
                from={"PersonalScent"}
                text={`#${
                  genderArray.find((x) => x.value === chosen.gender).text
                }`}
              />
              <NoteTag
                from={"PersonalScent"}
                text={`#${
                  concentrationArray.find(
                    (x) => x.value === chosen.concentration,
                  ).text
                }`}
              />
              <NoteTag
                from={"PersonalScent"}
                text={`#${
                  seasonArray.find((x) => x.value === chosen.season).text
                }`}
              />
              <NoteTag
                from={"PersonalScent"}
                text={`#${
                  colorArray.find((x) => x.value === chosen.color).text
                }`}
              />
              <NoteTag
                from={"PersonalScent"}
                text={`#${
                  personalityArray.find((x) => x.value === chosen.personality)
                    .text
                }`}
              />
              <NoteTag
                from={"PersonalScent"}
                text={`#${
                  featureArray.find((x) => x.value === chosen.feature).text
                }`}
              />
            </TagBox>
            <ImageBox>
              <Image
                src={top5[0].imgUrl ? top5[0].imgUrl : "/noImage.png"}
                alt={`${top5[0].name_eng} 이미지`}
                layout="fill"
                objectFit="contain"
                style={{ borderRadius: "30px" }}
              />
            </ImageBox>
            <SubTitle className={"bold f40"} margin_T={60} margin_B={60}>
              {top5[0].name_eng}
            </SubTitle>
            {/* TODO 서지수 향수 설명 없음 */}
            {/* <PerfumeDesc
            ref={contentRef}
            className={isHidden ? "hidden" : ""}
            margin_B={"35px"}
          >
            {top5[0].description}
          </PerfumeDesc> */}
            <ShowDetail className="medium f30">
              <Link href={`/product-detail/${top5[0].id}`}>
                향수 자세히 보기 &gt;
              </Link>
            </ShowDetail>
            {/* TODO 나중에 주석 제거 */}
            {/* <Tip>TIP</Tip>
          <SubTitle margin_B={"5px"}>이런 상황에서 사용해보세요</SubTitle>
          <TipText>당신을 더욱 향기로운 사람으로 만들어줄 거예요!</TipText>
          <ConditionsBox>
            {conditions.map((data) => (
              <ConditionsTag key={data.id}>
                <ConditionsText>{data.text}</ConditionsText>
              </ConditionsTag>
            ))}
          </ConditionsBox> */}
            <ShareContainer>
              <ShareBox onClick={copyLink}>
                <ShareCircle>
                  <BsLink45Deg size={"120px"} />
                </ShareCircle>
                <ShareText className="regular f30">링크 복사</ShareText>
              </ShareBox>
              <ShareBox>
                {/* TODO 서지수 카카오톡 공유 기능 구현 */}
                <ShareCircle>
                  <Image
                    src={"/login_kakao.svg"}
                    alt={`카카오톡 공유`}
                    layout="fill"
                  />
                </ShareCircle>
                <ShareText className="regular f30">카카오톡</ShareText>
              </ShareBox>
            </ShareContainer>
          </Section>
          <Section>
            <SubTitle className="bold f40" margin_B={90}>
              비슷한 향수를 추천합니다
            </SubTitle>
            <SubRecommendationBox>
              {top5.slice(1, 5).map((data) => (
                <Link href={`/product-detail/${data.id}`} key={data.id}>
                  <SubRecommendationCard>
                    <CardImage>
                      <Image
                        src={data.imgUrl ? data.imgUrl : "/noImage.png"}
                        alt={`${data.name_eng}`}
                        layout="fill"
                        objectFit={"contain"}
                        style={{
                          borderRadius: "30px",
                        }}
                      />
                    </CardImage>
                    <SubPerfumeName className="regular f30">
                      {data.name_eng}
                    </SubPerfumeName>
                  </SubRecommendationCard>
                </Link>
              ))}
            </SubRecommendationBox>
          </Section>
        </>
      )}
    </RecommendationContainer>
  );
}

export const RecommendationContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110px;
  @media screen and (max-width: 1440px) {
    padding-top: 80px;
  }
  @media screen and (max-width: 480px) {
    width: 80vw;
    margin: 0 auto;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  margin-top: 8.125rem;
  margin-bottom: 3.4375rem;
  text-align: center;
`;

export const TagBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 6.5625rem;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 45.625rem;
  height: 45.625rem;
  @media screen and (max-width: 1440px) {
    width: 36.25rem;
    height: 36.25rem;
  }
  @media screen and (max-width: 480px) {
    width: 80vw;
    height: 80vw;
  }
`;

export const SubTitle = styled.h2<{ margin_B: number; margin_T?: number }>`
  margin-top: ${({ margin_T }) => `${margin_T}px`};
  margin-bottom: ${({ margin_B }) => `${margin_B}px`};
  text-align: center;
  @media screen and (max-width: 1440px) {
    margin-bottom: ${({ margin_B }) => `${margin_B - 30}px`};
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    margin-bottom: ${({ margin_B }) => `${margin_B - 50}px`};
  }
`;

// export const PerfumeDesc = styled(Span)<{ margin_B: string }>`
//   max-width: 789px;
//   font-weight: 400;
//   font-size: 30px;
//   line-height: 45px;
//   margin-bottom: ${({ margin_B }) => margin_B};

//   &.hidden {
//     overflow: hidden;
//     text-overflow: ellipsis;
//     display: -webkit-box;
//     -webkit-line-clamp: 10;
//     -webkit-box-orient: vertical;
//     white-space: pre-wrap;
//   }
// `;

export const ShowDetail = styled.h3`
  text-decoration-line: underline;
  cursor: pointer;
  margin-bottom: 190px;
  @media screen and (max-width: 1440px) {
    margin-bottom: 150px;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 100px;
  }
`;

export const ShareContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2.8125rem;
  margin-bottom: 220px;
  @media screen and (max-width: 1440px) {
    margin-bottom: 170px;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 130px;
  }
`;

export const ShareBox = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ShareCircle = styled.div`
  position: relative;
  width: 9.375rem;
  height: 9.375rem;
  background: var(--third-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 100%;
  @media screen and (max-width: 1440px) {
    width: 8.125rem;
    height: 8.125rem;
  }
  @media screen and (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

export const ShareText = styled.span`
  text-align: center;
  color: #000000;
`;

// export const Tip = styled(RecommendationTag)`
//   padding: 10px 50px;
//   background: #d9d9d9;
//   margin-right: 0;
//   font-weight: 400;
//   font-size: 30px;
//   line-height: 45px;
//   margin-bottom: 35px;
// `;

// export const TipText = styled(TagText)`
//   ::before {
//     content: "";
//   }
//   margin-bottom: 70px;
// `;

// export const ConditionsBox = styled.div`
//   width: 1736px;
//   height: 213px;
//   background: #d9d9d9;
//   border-radius: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 210px;
// `;

// export const ConditionsTag = styled(RecommendationTag)`
//   background: var(--white-color);
// `;

// export const ConditionsText = styled(TipText)`
//   margin-bottom: 0;
// `;

export const SubRecommendationBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1.3125rem;
  margin-bottom: 15.625rem;
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, 1fr);
    row-gap: 1.3125rem;
  }
`;

export const SubRecommendationCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const CardImage = styled.div`
  position: relative;
  width: 339px;
  height: 339px;
  @media screen and (max-width: 1440px) {
    width: 12.5rem;
    height: 12.5rem;
  }
  @media screen and (max-width: 480px) {
    width: 60vw;
    height: 60vw;
  }
`;

export const SubPerfumeName = styled.h3`
  text-align: center;
  width: 18.75rem;
  margin-top: 1.5625rem;
  @media screen and (max-width: 1440px) {
    margin-top: 1.25rem;
  }
  @media screen and (max-width: 480px) {
    margin-top: 0.9375rem;
  }
`;
