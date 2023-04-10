/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import styled from "styled-components";
import { BsBell } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { loginState } from "@store/loginState";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const login = useRecoilValue(loginState);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (login) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [login]);
  return (
    <>
      <FirstMain>
        <MainText>
          <MainTitle>
            <Image src="/main_logo.png" alt="per per" width={260} height={60} />
          </MainTitle>
          <MainContent>향수 여정의 시작을 편하게</MainContent>
        </MainText>
      </FirstMain>
      <SecondMain>
        <PerNoteImage src="/main_intro.png" alt="second main image" />
        <PerNoteIntroContent>
          {`향기는 첫인상이죠. 무언의 감각이며 단어가 없는 언어입니다. 자신에게 어울리는, 자신이 원하는 향수를
                            찾고 싶지만 향수를 맡아보러 매장까지 가는 것도 쉽지 않은 일입니다.
               언제 어디서든 향수를 맡아보지 않더라도 쉽게 비교하고 선택도록 함께 하겠습니다.
          `}
        </PerNoteIntroContent>
      </SecondMain>
      <ThirdMain>
        <PersonalScentContent>
          <ScentTitle>Personal Scent </ScentTitle>
          <ScentContent>
            {`      향수를 모르더라도 걱정하지 마세요.
계절, 색깔, 자신의 성격 등의 간단한 설문조사로 
              당신의 향수를 찾아드려요.
              `}
          </ScentContent>
          <ScentButton>
            <Link href="/personal-survey/start">바로가기 &nbsp; &#62;</Link>
          </ScentButton>
        </PersonalScentContent>
      </ThirdMain>
      <FourthMain>
        <FourthFirst>
          <PerfumeList>
            <PerfumeItem>
              <PerfumeImage src="/main_story1.png" alt="image" />
              <PerfumeName>Lorem Ipsum</PerfumeName>
            </PerfumeItem>
            <PerfumeItem>
              <PerfumeImage src="/main_story2.png" alt="image" />
              <PerfumeName>Lorem Ipsum</PerfumeName>
            </PerfumeItem>
            <PerfumeItem>
              <PerfumeImage src="/main_story3.png" alt="image" />
              <PerfumeName>Lorem Ipsum</PerfumeName>
            </PerfumeItem>
          </PerfumeList>
          <div>
            <PerfumeStoryIntroTitle>Purfume story</PerfumeStoryIntroTitle>
            <PerfumeStoryIntroContent>
              향수에 대한 모든 이야기, 여러분들을 위한 향수 이야기 Per.note 에서
              들려드려요
            </PerfumeStoryIntroContent>
            {!isLogin && (
              <GuidText>*다음 기능은 로그인이 필요한 기능입니다.</GuidText>
            )}
          </div>
          <SubscribeButton>
            <BsBell  />
            <div>알림받기</div>
          </SubscribeButton>
        </FourthFirst>
        <FourthSecond>
          <CategoryIntro>
            <CategoryIntroTitle>Category</CategoryIntroTitle>
            <CategoryIntroContent>
              나의 성격에 따른 향수, 향수의 특징의 따른
              <br /> 분류 등의 새로운 향수 분류를 통해
              <br /> 자신에게 어울리는 향수를 찾아보세요.
            </CategoryIntroContent>
            <CategoryButton>
              <Link href="/category/note">바로가기 &nbsp; &#62;</Link>
            </CategoryButton>
          </CategoryIntro>
          <CategoryImageContainer>
            <CategoryImage src="/main_category1.png" alt="image1" />
            <CategoryImage src="/main_category2.png" alt="image2" />
          </CategoryImageContainer>
        </FourthSecond>
      </FourthMain>
    </>
  );
};

export default Home;

const FirstMain = styled.div`
  position: relative;
  color: white;
  height: 1080px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("/main_back.png");
  background-size: cover;
  @media screen and (max-width: 1440px) {
    height: 789px;
  }
`;

const MainText = styled.div`
  width: 921px;
  margin-left: 174px;
  position: absolute;
  bottom: 210px;
  left: 0;
  z-index: 1;
  @media screen and (max-width: 1440px) {
    bottom: 102px;
  }
`;
const MainTitle = styled.div`
  margin-bottom: 30px;
`;

const MainContent = styled.div`
  font-weight: normal;
  font-size: 2.5rem;
`;
const SecondMain = styled.div`
  margin-top: 196px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PerNoteImage = styled.img`
  width: 1668px;
  height: 392px;
  margin-bottom: 90px;
  border-radius: 30px;
  @media screen and (max-width: 1440px) {
    width: 1188px;
    height: 280px;
  }
`;

const PerNoteIntroContent = styled.pre`
  font-weight: 400;
  font-size: 1.875rem;
  white-space: pre;
  word-break: break-all;
  overflow: auto;
  line-height: 1.6;
  margin: 0;
  /* 메인 두번째 자간 설정 */
  letter-spacing: -1px;
`;

// 세번째
const ThirdMain = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("/main_personal.png");
  background-size: cover;
  width: 100%;
  height: 1080px;
  margin-bottom: 200px;
  position: relative;
  @media screen and (max-width: 1440px) {
    height: 789px;
  }
`;

const PersonalScentContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ScentTitle = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: 3.125rem;
  text-align: center;
  color: white;
  margin-bottom: 25px;
`;

const ScentContent = styled.pre`
  font-weight: 400;
  font-size: 1.875rem;
  color: white;
  margin-bottom: 65px;
  white-space: pre;
  word-break: break-all;
  overflow: auto;
  line-height: 43px;
`;

const ScentButton = styled.button`
  cursor: pointer;
  display: block;
  margin: 0 auto;
  background: white;
  border: none;
  border-radius: 100px;
  width: 166px;
  height: 53px;
  font-weight: 400;
  font-size: 1.25rem;
  padding: 12px 25px;
`;
// 네번째
const FourthMain = styled.div`
  padding-left: 131px;
`;

const FourthFirst = styled.div`
  margin-bottom: 230px;
`;
const PerfumeList = styled.div`
  margin-bottom: 60px;
  display: flex;
`;
const PerfumeItem = styled.div`
  margin-right: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PerfumeImage = styled.img`
  width: 530px;
  height: 530px;
  border-radius: 30px;
  margin-bottom: 30px;
  @media screen and (max-width: 1440px) {
    width: 370px;
    height: 370px;
  }
`;

const PerfumeName = styled.div`
  font-weight: normal;
  font-size: 1.875rem;
`;

const PerfumeStoryIntroTitle = styled.div`
  margin-bottom: 25px;
  font-weight: bold;
  font-size: 3.125rem;
`;
const PerfumeStoryIntroContent = styled.div`
  margin-bottom: 35px;
  font-weight: normal;
  font-size: 1.875rem;
  margin-bottom: 45px;
`;

const GuidText = styled.div`
  font-weight: 400;
  font-size: 1.875rem;
  color: #656565;
  margin-bottom: 39px;
`;
const SubscribeButton = styled.button`
  cursor: pointer;
  width: 166px;
  height: 53px;
  background: #9fac9a;
  border: none;
  border-radius: 100px;
  font-weight: 400;
  font-size: 1.4rem;
  color: white;
  display: flex; 
  align-items: center;
  justify-content: space-around;
`;

const FourthSecond = styled.div`
  display: flex;
  margin-bottom: 338px;
`;

const CategoryIntro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 145px;
`;

const CategoryIntroTitle = styled.div`
  font-weight: bold;
  font-size: 3.125rem;
  margin-bottom: 30px;
`;
const CategoryIntroContent = styled.div`
  font-weight: normal;
  font-size: 1.875rem;
  margin-bottom: 35px;
  line-height: 43px;
`;

const CategoryButton = styled.button`
  cursor: pointer;
  width: 166px;
  height: 53px;
  padding: 12px 25px;
  border: none;
  border-radius: 100px;
  background: #9fac9a;
  font-weight: 400;
  font-size: 1.25rem;
  color: white;
`;

const CategoryImageContainer=styled.div`
display: flex;
`

const CategoryImage = styled.img`
  width: 444px;
  height: 642px;
  margin-right: 74px;
  border-radius: 30px;
  @media screen and (max-width: 1440px) {
    width: 270px;
    height: 390px;
  }
`;
