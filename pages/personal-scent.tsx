import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  genderArray,
  concentrationArray,
  personalityArray,
  featureArray,
} from "lib/modules";
import styled from "styled-components";

export default function PersonalScent() {
  const contentRef = useRef<any>(null);
  const [isHidden, setIsHidden] = useState(false);
  const router = useRouter();
  const { gender, concentration, personality, feature } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [top5, setTop5] = useState([]);

  const getTop5 = (data) => {
    axios
      .get("/api/personalScent", {
        params: data,
      })
      .then((res) => {
        setTop5(res.data.top5);
        setIsLoading(true);
      });
  };
  useEffect(() => {
    if (gender !== undefined && gender !== null) {
      getTop5(router.query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender]);

  useEffect(() => {
    if (contentRef.current?.clientHeight > 461) {
      setIsHidden(true);
    }
  }, []);

  return (
    <RecommendationContainer>
      {isLoading && (
        <>
          <Title>당신에게 이 향수를 추천합니다</Title>
          <TagBox>
            <RecommendationTag>
              <TagText>
                {genderArray.find((x) => x.value === gender).text}
              </TagText>
            </RecommendationTag>
            <RecommendationTag>
              <TagText>
                {concentrationArray.find((x) => x.value === concentration).text}
              </TagText>
            </RecommendationTag>
            <RecommendationTag>
              <TagText>
                {personalityArray.find((x) => x.value === personality).text}
              </TagText>
            </RecommendationTag>
            <RecommendationTag>
              <TagText>
                {featureArray.find((x) => x.value === feature).text}
              </TagText>
            </RecommendationTag>
          </TagBox>
          <PerfumeImage src={top5[0].imgUrl} />
          <SubTitle margin_B={"60px"}>{top5[0].name}</SubTitle>
          <PerfumeDesc
            ref={contentRef}
            className={isHidden ? "hidden" : ""}
            margin_B={"35px"}
          >
            {top5[0].description}
          </PerfumeDesc>
          <ShowMore onClick={() => setIsHidden(!isHidden)}>
            Show more &gt;
          </ShowMore>
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
            <ShareBox>
              <ShareCircle />
              <ShareText>링크 복사</ShareText>
            </ShareBox>
            <ShareBox>
              <ShareCircle />
              <ShareText>카카오톡</ShareText>
            </ShareBox>
          </ShareContainer>
          <SubTitle margin_B={"90px"}>비슷한 향수를 추천합니다</SubTitle>
          <SubRecommendationBox>
            {top5.slice(1, 5).map((data) => (
              <SubRecommendationCard key={data.id}>
                <SubRecommendationImg src={data.imgUrl} />
                <SubPerfumeName>{data.name}</SubPerfumeName>
              </SubRecommendationCard>
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

export const TagBox = styled.div`
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
  color: #ffffff;
  ::before {
    content: "#";
  }
`;

export const PerfumeImage = styled.img`
  width: 730px;
  height: 730px;
  border-radius: 30px;
  margin-bottom: 60px;
`;

export const SubTitle = styled(Span)<{ margin_B: string }>`
  font-size: 40px;
  line-height: 58px;
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

export const ShowMore = styled(Span)`
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
  cursor: pointer;
`;

export const ShareBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShareCircle = styled.div`
  width: 150px;
  height: 150px;
  background: #d9d9d9;
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
//   background: #ffffff;
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

export const SubRecommendationImg = styled.img`
  width: 339px;
  height: 339px;
  background: #d9d9d9;
  border-radius: 30px;
  margin-bottom: 25px;
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
`;

// const conditions = [
//   {
//     id: 0,
//     text: "눈이 내리는 겨울",
//   },
//   {
//     id: 1,
//     text: "데이트 할 때",
//   },
//   {
//     id: 2,
//     text: "파티에 갈 때",
//   },
//   {
//     id: 3,
//     text: "꾸안꾸 데일리로",
//   },
// ];
