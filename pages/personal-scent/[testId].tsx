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
          <Title>당신에게 이 향수를 추천합니다.</Title>
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
                concentrationArray.find((x) => x.value === chosen.concentration)
                  .text
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
              text={`#${colorArray.find((x) => x.value === chosen.color).text}`}
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
          <Image
            src={top5[0].imgUrl ? top5[0].imgUrl : "/noImage.png"}
            alt={`${top5[0].name_eng} 이미지`}
            width={730}
            height={730}
            objectFit={"contain"}
            style={{ borderRadius: "30px" }}
          />
          <SubTitle margin_T={"60px"} margin_B={"60px"}>
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
          <ShowDetail>
            <Link href={`/product-detail/${top5[0].id}`}>Show detail &gt;</Link>
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
              <ShareText>링크 복사</ShareText>
            </ShareBox>
            <ShareBox>
              {/* TODO 서지수 카카오톡 공유 기능 구현 */}
              <ShareCircle>
                <Image
                  src={"/login_kakao.svg"}
                  alt={`카카오톡 공유`}
                  width={150}
                  height={150}
                />
              </ShareCircle>
              <ShareText>카카오톡</ShareText>
            </ShareBox>
          </ShareContainer>
          <SubTitle margin_B={"90px"}>비슷한 향수를 추천합니다</SubTitle>
          <SubRecommendationBox>
            {top5.slice(1, 5).map((data) => (
              <Link href={`/product-detail/${data.id}`} key={data.id}>
                <SubRecommendationCard>
                  <Image
                    src={data.imgUrl ? data.imgUrl : "/noImage.png"}
                    alt={`${data.name_eng}`}
                    width={339}
                    height={339}
                    objectFit={"contain"}
                    style={{
                      borderRadius: "30px",
                    }}
                  />
                  <SubPerfumeName>{data.name_eng}</SubPerfumeName>
                </SubRecommendationCard>
              </Link>
            ))}
          </SubRecommendationBox>
        </>
      )}
    </RecommendationContainer>
  );
}

export const RecommendationContainer = styled.div`
  width: 1920px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110px;
`;

export const Span = styled.span`
  font-family: "Noto Sans KR";
  font-weight: 700;
  font-size: 50px;
  line-height: 72px;
  text-align: center;
`;

export const Title = styled(Span)`
  margin-top: 130px;
  margin-bottom: 55px;
`;

export const TagBox = styled.ul`
  display: flex;
  margin-bottom: 120px;
`;

export const RecommendationTag = styled.div`
  padding: 10px 30px;
  background: var(--secondary-color);
  border-radius: 100px;
  margin-right: 30px;
  :last-child {
    margin-right: 0;
  }
`;

export const TagText = styled(Span)`
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
  color: var(--white-color);
  ::before {
    content: "#";
  }
`;

export const SubTitle = styled(Span)<{ margin_B: string; margin_T?: string }>`
  font-size: 40px;
  line-height: 58px;
  margin-top: ${({ margin_T }) => margin_T};
  margin-bottom: ${({ margin_B }) => margin_B};
`;

export const PerfumeDesc = styled(Span)<{ margin_B: string }>`
  max-width: 789px;
  font-weight: 400;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: ${({ margin_B }) => margin_B};

  &.hidden {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
  }
`;

export const ShowDetail = styled(Span)`
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
  text-decoration-line: underline;
  cursor: pointer;
  margin-bottom: 190px;
`;

export const ShareContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 45px;
  margin-bottom: 220px;
`;

export const ShareBox = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ShareCircle = styled.div`
  width: 150px;
  height: 150px;
  background: var(--third-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 100%;
`;

export const ShareText = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
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

export const TipText = styled(TagText)`
  ::before {
    content: "";
  }
  margin-bottom: 70px;
`;

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

export const SubRecommendationBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 21px;
  margin-bottom: 250px;
`;

export const SubRecommendationCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const SubPerfumeName = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
  text-align: center;
  color: #000000;
  width: 339px;
  margin-top: 25px;
`;
