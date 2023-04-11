import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  genderArray,
  concentrationArray,
  seasonArray,
  colorArray,
  personalityArray,
  featureArray,
} from "lib/arrays";
import axiosInstance from "lib/api/config";
import { useRecoilValue } from "recoil";
import { loginState } from "@store/loginState";

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

  const postSurvey = async () => {
    await axiosInstance
      .get("/api/personalScent", {
        params: {
          gender: scentData.gender,
          concentration: scentData.concentration,
          season: scentData.season,
          color: scentData.color,
          personality: scentData.personality,
          feature: scentData.feature,
        },
      })
      .then(({ data }) => {
        router.replace(`/personal-scent/${data.testId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (scentData.feature !== "") {
      postSurvey();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scentData.feature]);

  const loginInfo = useRecoilValue<string>(loginState);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    setIsLogin(Boolean(loginInfo));
  }, [loginInfo]);

  return (
    <PersonalScentContainer>
      {!isLogin && (
        <NotLoginContainer>
          <NotLoginBox>
            <NotLoginTitle className={"bold f50"}>Personal Scent</NotLoginTitle>
            <NotLoginSpan className={"regular f30"}>
              Personal scent는 나만의 향수를 찾는 여정입니다.
              <br />
              해당 기능은 로그인이 필요한 서비스입니다.
            </NotLoginSpan>
            <Link href={"/signin"}>
              <LoginButton className={"regular f40"}>로그인</LoginButton>
            </Link>
          </NotLoginBox>
        </NotLoginContainer>
      )}
      <Background>
        <PersonalScentBox>
          {page == "start" && (
            <>
              <PersonalScentTitle className={"bold f80"}>
                Personal Scent
              </PersonalScentTitle>
              <PersonalScentText className={"regular f35"}>
                자신만의 향을 찾기 어려우셨나요?
                <br />
                간단한 질문으로 여러분의 향을 찾아드립니다.
              </PersonalScentText>
              <StartBtn
                className={"bold f40"}
                onClick={() => isLogin && router.push("gender")}
              >
                START
              </StartBtn>
            </>
          )}
          {page == "gender" && (
            <>
              <SubTitle className={"bold f35"}>
                어느 성별의 향을 원하시나요?
              </SubTitle>
              <CardContainer>
                {genderArray.map((data) => (
                  <Card
                    key={data.id}
                    margin_R={"30px"}
                    onClick={() => {
                      setScentData({ ...scentData, gender: data.value });
                      router.replace("concentration");
                    }}
                  >
                    <CardContent className={"regular f25"}>
                      {data.text}
                    </CardContent>
                  </Card>
                ))}
              </CardContainer>
            </>
          )}
          {page == "concentration" && (
            <>
              <SubTitle className={"bold f35"}>
                어느 때에 향수를 뿌리고 싶으신가요?
              </SubTitle>
              <CardContainer>
                {concentrationArray.map((data) => (
                  <Card
                    key={data.id}
                    onClick={() => {
                      setScentData({ ...scentData, concentration: data.value });
                      router.replace("season");
                    }}
                  >
                    <CardContent className={"regular f25"}>
                      {data.text}
                    </CardContent>
                  </Card>
                ))}
              </CardContainer>
            </>
          )}
          {page == "season" && (
            <>
              <SubTitle className={"bold f35"}>
                당신이 좋아하는 계절은 무엇인가요?
              </SubTitle>
              <CardContainer>
                {seasonArray.map((data) => (
                  <Card
                    key={data.id}
                    onClick={() => {
                      setScentData({ ...scentData, season: data.value });
                      router.replace("color");
                    }}
                  >
                    <CardContent className={"regular f25"}>
                      {data.text}
                    </CardContent>
                  </Card>
                ))}
              </CardContainer>
            </>
          )}
          {page == "color" && (
            <>
              <SubTitle
                className={"bold f35"}
                margin_T={"90px"}
                margin_B={"67px"}
              >
                당신이 좋아하는 색은 무엇인가요?
              </SubTitle>
              <ColorCardContainer>
                {colorArray.map((data) => (
                  <ColorCard
                    key={data.id}
                    onClick={() => {
                      setScentData({ ...scentData, color: data.value });
                      router.replace("personality");
                    }}
                  >
                    <Color background={data.color} />
                    <ColorCardContent className={"regular f20"}>
                      {data.text}
                    </ColorCardContent>
                  </ColorCard>
                ))}
              </ColorCardContainer>
            </>
          )}
          {page == "personality" && (
            <>
              <SubTitle
                className={"bold f35"}
                margin_T={"90px"}
                margin_B={"92px"}
              >
                당신을 가장 잘 표현한 단어는 무엇인가요? (단일 선택)
              </SubTitle>
              <TextCardContainer>
                {personalityArray.map((data) => (
                  <TextCard
                    key={data.id}
                    onClick={() => {
                      setScentData({ ...scentData, personality: data.value });
                      router.replace("feature");
                    }}
                  >
                    <TextCardContent className={"regular f25"}>
                      {data.text}
                    </TextCardContent>
                  </TextCard>
                ))}
              </TextCardContainer>
            </>
          )}
          {page == "feature" && (
            <>
              <SubTitle className={"bold f35"} margin_B="100px">
                당신이 원하는 향수는 어떤 느낌인가요? (단일 선택)
              </SubTitle>
              <TextCardContainer>
                {featureArray.map((data) => (
                  <TextCard
                    key={data.id}
                    onClick={() => {
                      setScentData({ ...scentData, feature: data.value });
                    }}
                  >
                    <TextCardContent className={"regular f25"}>
                      {data.text}
                    </TextCardContent>
                  </TextCard>
                ))}
              </TextCardContainer>
            </>
          )}
        </PersonalScentBox>
      </Background>
    </PersonalScentContainer>
  );
}

export const PersonalScentContainer = styled.div`
  padding-top: 110px;
  position: relative;
  @media screen and (max-width: 1440px) {
    padding-top: 80px;
  }
`;

export const Background = styled.div`
  width: 100%;
  height: 970px;
  background-image: url("/green.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4.9375rem;
  @media screen and (max-width: 1440px) {
    height: calc(100vh - 80px);
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 0;
  }
`;

export const PersonalScentBox = styled.div`
  width: 1420px;
  height: 738px;
  background: var(--white-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 1440px) {
    width: 74%;
    height: 76%;
    overflow: auto;
  }
  @media screen and (max-width: 480px) {
    border-radius: 0;
    padding: 20px;
    width: 100vw;
    height: 100%;
  }
`;

export const PersonalScentTitle = styled.span`
  margin-top: 148.05px;
  margin-bottom: 30.57px;
  text-align: center;
  @media screen and (max-width: 1440px) {
    margin-top: calc(100vh * 0.1);
    margin-bottom: calc(100vh * 0.03);
  }
`;

export const PersonalScentText = styled.span`
  text-align: center;
  margin-bottom: 128px;
  @media screen and (max-width: 1440px) {
    margin-bottom: calc(100vh * 0.11);
  }
`;

export const StartBtn = styled.button`
  width: 265px;
  height: 80px;
  background: var(--primary-color);
  border-radius: 100px;
  border: none;
  cursor: pointer;
  color: var(--white-color);
  @media screen and (max-width: 480px) {
    width: 90%;
    height: 50px;
  }
`;

export const SubTitle = styled.span<{ margin_T?: string; margin_B?: string }>`
  margin-top: ${({ margin_T }) => margin_T || "130px"};
  margin-bottom: ${({ margin_B }) => margin_B || "75px"};
  text-align: center;
  @media screen and (max-width: 1440px) {
    margin-top: ${({ margin_T }) => margin_T || "90px"};
    margin-bottom: ${({ margin_B }) => margin_B || "55px"};
  }
`;

export const CardContainer = styled.div`
  display: flex;
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Card = styled.button<{ margin_R?: string }>`
  width: 230px;
  height: 310px;
  background: var(--white-color);
  border-radius: 10px;
  margin-right: ${({ margin_R }) => margin_R || "3.9375rem"};
  border: 2px solid var(--primary-color);
  cursor: pointer;
  :last-child {
    margin-right: 0;
  }
  @media screen and (max-width: 1440px) {
    width: 11vw;
    height: 250px;
  }
  @media screen and (max-width: 480px) {
    width: 80vw;
    height: 50px;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export const CardContent = styled.div`
  text-align: center;
  color: #000000;
`;

export const ColorCardContainer = styled(CardContainer)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.875rem;
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
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
  @media screen and (max-width: 1440px) {
    width: 10vw;
    height: 10vw;
  }
  @media screen and (max-width: 480px) {
    width: 30vw;
    height: 30vw;
  }
`;

export const Color = styled.div<{ background: string }>`
  width: 66px;
  height: 66px;
  border-radius: 100%;
  background: ${({ background }) => background};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 1440px) {
    width: 50px;
    height: 50px;
  }
`;

export const ColorCardContent = styled(CardContent)`
  margin-top: 28px;
  @media screen and (max-width: 1440px) {
    margin-top: 20px;
  }
`;

export const TextCardContainer = styled(CardContainer)`
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (max-width: 480px) {
    align-items: center;
  }
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
  @media screen and (max-width: 1440px) {
    width: 200px;
    height: 80px;
    margin: 0 10px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 480px) {
    width: 80vw;
    height: 50px;
    margin: 0;
    margin-bottom: 10px;
    :last-child {
      margin-right: 0;
    }
  }
`;

export const TextCardContent = styled(CardContent)`
  margin-top: 0;
`;

export const NotLoginContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NotLoginBox = styled.div`
  width: 940px;
  height: 552px;
  background: var(--white-color);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px;
  margin-top: 80px;
  @media screen and (max-width: 1440px) {
    width: 60vw;
  }
  @media screen and (max-width: 480px) {
    padding: 20px;
    width: 80vw;
    height: 400px;
  }
`;

export const NotLoginTitle = styled.span`
  margin-bottom: 3.125rem;
  text-align: center;
  @media screen and (max-width: 480px) {
    margin-bottom: 1.875rem;
  }
`;

export const NotLoginSpan = styled.span`
  margin-bottom: 4.5rem;
  text-align: center;
  @media screen and (max-width: 480px) {
    margin-bottom: 3.75rem;
  }
`;

export const LoginButton = styled.button`
  width: 387px;
  height: 90px;
  background: var(--primary-color);
  border-radius: 100px;
  color: var(--white-color);
  cursor: pointer;
  border: none;
  @media screen and (max-width: 480px) {
    width: 80%;
    height: 50px;
  }
`;
