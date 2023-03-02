/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import styled from "styled-components";
import { BsBell } from "react-icons/bs";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <FirstMain>
        <MainText>
          <MainTitle>메인화면</MainTitle>
          <MainContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
            <br />
            gravida sit facilisis cras. In blandit mi id est luctus. Non turpis
            non
            <br /> risus purus. Eget vel commodo ac purus, laoreet sollicitudin.
          </MainContent>
        </MainText>
      </FirstMain>
      <SecondMain>
        <PerNoteImage src="/perNoteBackImg.png" alt="second main image" />
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
              <PerfumeImage src="/perNoteBackImg.png" alt="image" />
              <PerfumeName>Lorem Ipsum</PerfumeName>
            </PerfumeItem>
            <PerfumeItem>
              <PerfumeImage src="/perNoteBackImg.png" alt="image" />
              <PerfumeName>Lorem Ipsum</PerfumeName>
            </PerfumeItem>
            <PerfumeItem>
              <PerfumeImage src="/perNoteBackImg.png" alt="image" />
              <PerfumeName>Lorem Ipsum</PerfumeName>
            </PerfumeItem>
          </PerfumeList>
          <div>
            <PerfumeStoryIntroTitle>Purfume story</PerfumeStoryIntroTitle>
            <PerfumeStoryIntroContent>
              향수에 대한 모든 이야기, 여러분들을 위한 향수 이야기 Per.note 에서
              들려드려요
            </PerfumeStoryIntroContent>
            <GuidText>*다음 기능은 로그인이 필요한 기능입니다.</GuidText>
          </div>
          <SubscribeButton>
            <BsBell className="subscribe-icon" />
            <div className="subscribe-text">알림받기</div>
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
          <div>
            <CategoryImage src="/perNoteBackImg.png" alt="image1" />
            <CategoryImage src="/perNoteBackImg.png" alt="image2" />
          </div>
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
  background-image: url("/perNoteBackImg.png");
  background-size: cover;
`;

const MainText = styled.div`
  width: 921px;
  margin-left: 174px;
  position: absolute;
  bottom: 102px;
  left: 0;
  z-index: 1;
`;
const MainTitle = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 50px;
`;

const MainContent = styled.div`
  font-weight: normal;
  font-size: 30px;
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
`;

const PerNoteIntroContent = styled.pre`
  font-weight: 400;
  font-size: 30px;
  white-space: pre;
  word-break: break-all;
  overflow: auto;
  line-height: 1.6;
  margin: 0;
  /* 메인 두번째 자간 설정 */
  letter-spacing: -2px;
`;

// 세번째
const ThirdMain = styled.div`
  background: url("/perNoteBackImg.png");
  width: 100%;
  height: 1080px;
  margin-bottom: 200px;
  position: relative;
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
  font-size: 50px;
  text-align: center;
  color: white;
  margin-bottom: 25px;
`;

const ScentContent = styled.pre`
  font-weight: 400;
  font-size: 30px;
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
  font-size: 20px;
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
`;

const PerfumeName = styled.div`
  font-weight: normal;
  font-size: 30px;
`;

const PerfumeStoryIntroTitle = styled.div`
  margin-bottom: 25px;
  font-weight: bold;
  font-size: 50px;
`;
const PerfumeStoryIntroContent = styled.div`
  margin-bottom: 35px;
  font-weight: normal;
  font-size: 30px;
  margin-bottom: 45px;
`;

const GuidText = styled.div`
  font-weight: 400;
  font-size: 30px;
  color: #656565;
  margin-bottom: 39px;
`;
const SubscribeButton = styled.button`
  cursor: pointer;
  width: 269px;
  height: 69px;
  background: #9fac9a;
  border: none;
  border-radius: 100px;
  font-weight: 400;
  font-size: 30px;
  color: white;
  padding-left: 49px;
  padding-top: 4px;
  .subscribe-icon {
    float: left;
    margin-right: 22px;
  }
  .subscribe-text {
    float: left;
  }
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
  font-size: 50px;
  margin-bottom: 30px;
`;
const CategoryIntroContent = styled.div`
  font-weight: normal;
  font-size: 30px;
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
  font-size: 20px;
  color: white;
`;

const CategoryImage = styled.img`
  width: 444px;
  height: 642px;
  margin-right: 74px;
  border-radius: 30px;
`;
