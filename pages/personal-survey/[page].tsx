import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
// import { IoChevronBackSharp } from "react-icons/io5";

export default function PersonalSurvey() {
  const router = useRouter();
  const { page } = router.query;

  const [scentData, setScentData] = useState({
    gender: "",
    concentration: "",
    season: "",
    color: "",
    personality: "",
    feature: "",
  });

  useEffect(() => {
    if (scentData.feature !== "") {
      router.push({
        pathname: "/personal-scent",
        query: scentData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scentData.feature]);

  return (
    <PersonalScentContainer>
      <PersonalScentBox>
        {page == "start" && (
          <>
            <PersonalScentTitle>Personal Scent</PersonalScentTitle>
            <PersonalScentText>
              자신만의 향을 찾기 어려우셨나요?
              <br />
              간단한 질문으로 여러분의 향을 찾아드립니다.
            </PersonalScentText>
            <StartBtn onClick={() => router.push("gender")}>
              <StartSpan>START</StartSpan>
            </StartBtn>
          </>
        )}
        {page == "gender" && (
          <>
            <SubTitle>어느 성별의 향을 원하시나요?</SubTitle>
            <CardContainer>
              {gender.map((data) => (
                // <DotBox key={data.id}>
                //   <GenderDot></GenderDot>
                //   <DotText>{data.content}</DotText>
                // </DotBox>
                <Card
                  key={data.id}
                  margin_R={"30px"}
                  onClick={() => {
                    setScentData({ ...scentData, gender: data.value });
                    router.push("concentration");
                  }}
                >
                  <CardContent>{data.text}</CardContent>
                </Card>
              ))}
            </CardContainer>
          </>
        )}
        {page == "concentration" && (
          <>
            <SubTitle>어느 때에 향수를 뿌리고 싶으신가요?</SubTitle>
            <CardContainer>
              {concentration.map((data) => (
                <Card
                  key={data.id}
                  onClick={() => {
                    setScentData({ ...scentData, concentration: data.value });
                    router.push("season");
                  }}
                >
                  <CardContent>{data.text}</CardContent>
                </Card>
              ))}
            </CardContainer>
          </>
        )}
        {page == "season" && (
          <>
            <SubTitle>당신이 좋아하는 계절은 무엇인가요?</SubTitle>
            <CardContainer>
              {season.map((data) => (
                <Card
                  key={data.id}
                  onClick={() => {
                    setScentData({ ...scentData, season: data.value });
                    router.push("color");
                  }}
                >
                  <CardContent>{data.text}</CardContent>
                </Card>
              ))}
            </CardContainer>
          </>
        )}
        {page == "color" && (
          <>
            <SubTitle margin_T={"90px"} margin_B={"67px"}>
              당신이 좋아하는 색은 무엇인가요?
            </SubTitle>
            <ColorCardContainer>
              {color.map((data) => (
                <ColorCard
                  key={data.id}
                  onClick={() => {
                    setScentData({ ...scentData, color: data.value });
                    router.push("personality");
                  }}
                >
                  <Color background={data.color} />
                  <ColorCardContent>{data.text}</ColorCardContent>
                </ColorCard>
              ))}
            </ColorCardContainer>
          </>
        )}
        {page == "personality" && (
          <>
            <SubTitle margin_T={"90px"} margin_B={"92px"}>
              당신을 가장 잘 표현한 단어는 무엇인가요?
            </SubTitle>
            <TextCardContainer>
              {personality.map((data) => (
                <TextCard
                  key={data.id}
                  onClick={() => {
                    setScentData({ ...scentData, personality: data.value });
                    router.push("feature");
                  }}
                >
                  <TextCardContent>{data.text}</TextCardContent>
                </TextCard>
              ))}
            </TextCardContainer>
          </>
        )}
        {page == "feature" && (
          <>
            <SubTitle margin_B="100px">
              당신이 원하는 향수는 어떤 느낌인가요?
            </SubTitle>
            <TextCardContainer>
              {feature.map((data) => (
                <TextCard
                  key={data.id}
                  onClick={() => {
                    setScentData({ ...scentData, feature: data.value });
                  }}
                >
                  <TextCardContent>{data.text}</TextCardContent>
                </TextCard>
              ))}
            </TextCardContainer>
          </>
        )}
      </PersonalScentBox>
    </PersonalScentContainer>
  );
}

export const PersonalScentContainer = styled.div`
  width: 1920px;
  height: 970px;
  background: #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 79px;
`;

export const PersonalScentBox = styled.div`
  width: 1420px;
  height: 738px;
  background: #d9d9d9;
  border-radius: 20px;
  display: flex;
  /* position: relative; */
  align-items: center;
  flex-direction: column;
`;

// export const BackIcon = styled(IoChevronBackSharp)`
//   position: absolute;
//   top: 90px;
//   left: 100px;
//   font-size: 39px;
// `;

export const PersonalScentTitle = styled.span`
  font-family: "Noto Sans KR";
  font-weight: 700;
  font-size: 80px;
  line-height: 116px;
  margin-top: 148.05px;
  margin-bottom: 30.57px;
`;

export const PersonalScentText = styled.span`
  font-family: "Noto Sans KR";
  font-weight: 400;
  font-size: 35px;
  line-height: 51px;
  text-align: center;
  margin-bottom: 127.88px;
`;

export const StartBtn = styled.div`
  width: 265px;
  height: 80px;
  background: #ffffff;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const StartSpan = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 58px;
`;

export const SubTitle = styled.span<{ margin_T?: string; margin_B?: string }>`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 51px;
  margin-top: ${({ margin_T }) => margin_T || "130px"};
  margin-bottom: ${({ margin_B }) => margin_B || "75px"};
`;

// export const GenderContainer = styled.div`
//   display: flex;
// `;

// export const DotBox = styled.div``;

// export const GenderDot = styled.div`
//   width: 50px;
//   height: 50px;
//   background: #d9d9d9;
//   border-radius: 20px;
// `;

// export const DotText = styled.div`
//   font-family: "Noto Sans KR";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 25px;
//   line-height: 36px;
//   text-align: center;
//   color: #000000;
// `;

export const CardContainer = styled.div`
  display: flex;
`;

export const Card = styled.div<{ margin_R?: string }>`
  width: 230px;
  height: 310px;
  background: #ffffff;
  border-radius: 10px;
  margin-right: ${({ margin_R }) => margin_R || "63px"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :last-child {
    margin-right: 0;
  }
`;

export const CardContent = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 36px;
  text-align: center;
  color: #000000;
`;

export const ColorCardContainer = styled(CardContainer)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
`;

export const ColorCard = styled(Card)`
  width: 200px;
  height: 200px;
  :last-child {
    margin-right: 0;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 0;
`;

export const Color = styled.div<{ background: string }>`
  width: 66px;
  height: 66px;
  border-radius: 100%;
  background: ${({ background }) => background};
`;

export const ColorCardContent = styled(CardContent)`
  margin-top: 28px;
`;

export const TextCardContainer = styled(CardContainer)`
  width: 1320px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const TextCard = styled(Card)`
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
  margin-bottom: 45px;
  :last-child {
    margin-right: 15px;
  }
`;

export const TextCardContent = styled(CardContent)`
  margin-top: 0;
`;
