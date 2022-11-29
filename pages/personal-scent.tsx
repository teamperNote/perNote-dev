import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Recommendation = () => {
  const contentRef = useRef<any>(null);
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    if (contentRef.current?.clientHeight > 461) {
      setIsHidden(true);
    }
  }, []);
  return (
    <RecommendationContainer>
      <Title>당신에게 이 향수를 추천합니다</Title>
      <TagBox>
        {tag.map((data) => (
          <RecommendationTag key={data.text}>
            <TagText>
              {data.text}
            </TagText>
          </RecommendationTag>
          ))}
      </TagBox>
      <PerfumeImage />
      <SubTitle margin_B={'60px'}>Lorem Ipsum</SubTitle>
      <PerfumeDesc ref={contentRef} className={isHidden ? 'hidden' : ''} margin_B={'35px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis morbi nunc vel turpis sit congue. Vitae, vulputate nascetur sed placerat id orci velit sed. Consectetur faucibus magna at id etiam aliquam ultrices. Enim elementum, molestie blandit sagittis. Orci, tincidunt vel ac quis donec placerat viverra donec. In varius neque, ut turpis volutpat quis odio proin egestas. Ultrices dolor elementum bibendum maecenas amet aliquam gravida. Bibendum quis sit enim tempor. Tincidunt quis elit diam vitae lectus nullam proin nibh egestas. Vulputate non morbi tempor arcu. Sit id euismod pretium ante in nulla egestas dui in. Orci ut at metus ultricies. Amet, eget aliquam amet feugiat mi euismod. Egestas ac tortor consectetur maecenas amet proin nec, metus. Mauris, massa tellus lorem ultrices enim. Diam nullam massa odio eleifend viverra eget proin at magna. Ut turpis sed donec pharetra. Risus non posuere a elit. Dui gravida sagittis, vitae enim. </PerfumeDesc>
      <ShowMore onClick={() => setIsHidden(!isHidden)}>Show more &gt;</ShowMore>
      <Tip>TIP</Tip>
      <SubTitle margin_B={'5px'}>이런 상황에서 사용해보세요</SubTitle>
      <TipText>당신을 더욱 향기로운 사람으로 만들어줄 거예요!</TipText>
      <ConditionsBox>
        {conditions.map((data) => (
          <ConditionsTag key={data.id}>
            <ConditionsText>{data.text}</ConditionsText>
           </ConditionsTag>
        ))}
      </ConditionsBox>
      <SubTitle margin_B={'90px'}>비슷한 향수를 추천합니다</SubTitle>
      <SubRecommendationBox>
        {subRecommendation.map((data) => (
            <SubRecommendationCard key={data.id}>
              <SubRecommendationImg />
              <SubPerfumeName>{data.text}</SubPerfumeName>
            </SubRecommendationCard>
        ))}
      </SubRecommendationBox>

    </RecommendationContainer>
  )
}

export const RecommendationContainer = styled.div`
    width: 1920px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Span = styled.span`
    font-family: 'Noto Sans KR';
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
    background: #E2E2E2;
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
    ::before{
        content: '#';
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
    margin-bottom: ${({margin_B}) => margin_B};
`;

export const PerfumeDesc = styled(Span)<{ margin_B: string }>`
    max-width: 789px;
    font-weight: 400;
    font-size: 30px;
    line-height: 45px;
    margin-bottom: ${({margin_B}) => margin_B};

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
    line-height: 150%;
    text-decoration-line: underline;
    cursor: pointer;
    margin-bottom: 173px;
`;

export const Tip = styled(RecommendationTag)`
    padding: 10px 50px;
    background: #D9D9D9;
    margin-right: 0;
    font-weight: 400;
    font-size: 30px;
    line-height: 45px;
    margin-bottom: 35px;
`;

export const TipText = styled(TagText)`
    ::before{
        content: '';
    }
    margin-bottom: 70px;
`;

export const ConditionsBox = styled.div`
    width: 1736px;
    height: 213px;
    background: #D9D9D9;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 210px;
`;

export const ConditionsTag = styled(RecommendationTag)`
    background: #FFFFFF;
`;

export const ConditionsText = styled(TipText)`
    margin-bottom: 0;
`;

export const SubRecommendationBox = styled.div`
    display: flex;
`;

export const SubRecommendationCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 46px;
    :last-child {
        margin-right: 0;
    }
`;

export const SubRecommendationImg = styled.div` //img로 수정
    width: 400px;
    height: 400px;
    background: #D9D9D9;
    border-radius: 30px;
    margin-bottom: 30px;
`;

export const SubPerfumeName = styled(TipText)`
    margin-bottom: 190px;
`;

const tag = [
  {
    id: 0,
    text: '여성스러운'
  },
  {
    id: 1,
    text: '산뜻한'
  },
  {
    id: 2,
    text: '데일리'
  },
  {
    id: 3,
    text: '달콤한'
  }
];

const conditions = [
  {
    id: 0,
    text: '눈이 내리는 겨울'
  },
  {
    id: 1,
    text: '데이트 할 때'
  },
  {
    id: 2,
    text: '파티에 갈 때'
  },
  {
    id: 3,
    text: '꾸안꾸 데일리로'
  },
];

const subRecommendation = [
  {
    id: 0,
    text: 'Lorem Ipsum'
  },
  {
    id: 1,
    text: 'Lorem Ipsum'
  },
  {
    id: 2,
    text: 'Lorem Ipsum'
  },
  {
    id: 3,
    text: 'Lorem Ipsum'
  },
];

export default Recommendation