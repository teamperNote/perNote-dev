/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import styled from "styled-components";
import { BsBell } from "react-icons/bs";

const Home: NextPage = () => {
  return (
    <>
      <FirstMain>
        <MainImage
          src="/perNoteBackImg.png"
          alt="main first background image"
        />
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
        <PerNoteIntro>
          <PerNoteIntroTitle>per.note 개요</PerNoteIntroTitle>
          <PerNoteIntroContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
            <br />
            gravida sit facilisis cras. In blandit mi id est luctus. Non turpis
            non
            <br /> risus purus. Eget vel commodo ac purus, laoreet sollicitudin.
          </PerNoteIntroContent>
        </PerNoteIntro>
      </SecondMain>
      <ThirdMain>
        <PersonalScentImage src="/perNoteBackImg.png" alt="second main image" />
        <PersonalScentText>
          <PersonalScentTitle>Personal Scent </PersonalScentTitle>
          <PersonalScentTContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
            <br />
            gravida sit facilisis cras. In blandit mi id est luctus. Non turpis
            non
            <br /> risus purus. Eget vel commodo ac purus, laoreet sollicitudin.
          </PersonalScentTContent>
          <PersonalScentReacMore>바로가기 {`>`}</PersonalScentReacMore>
        </PersonalScentText>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
              gravida sit facilisis cras. In blandit mi id est luctus. Non
              <br />
              turpis non risus purus. Eget vel commodo ac purus, laoreet
              sollicitudin. <br />
              <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Massa gravida sit facilisis cras.
              <br /> In blandit mi id est luctus. Non turpis non risus purus.
              Eget vel commodo ac purus, laoreet sollicitudin.
            </PerfumeStoryIntroContent>
          </div>
          <SubscribeButton>
            <span className="subscribe-icon">
              <BsBell />
            </span>
            <span>알림받기</span>
          </SubscribeButton>
        </FourthFirst>
        <FourthSecond>
          <CategoryIntro>
            <CategoryIntroTitle>노트,성격,특징,브랜드 통합</CategoryIntroTitle>
            <CategoryIntroContent>
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit. Massa gravida sit facilisis
              <br /> cras. In blandit mi id est luctus. Non <br />
              turpis non risus purus. Eget vel commodo <br />
              ac purus, laoreet sollicitudin.
            </CategoryIntroContent>
            <CategoryReadMore>Read More {`>`}</CategoryReadMore>
          </CategoryIntro>
          <div>
            <CategoryImage src="/perNoteBackImg.png" alt="image1" />
            <CategoryImage src="/perNoteBackImg.png" alt="image2" />
          </div>
        </FourthSecond>
        <FourthThird>
          <img src="/perNoteBackImg.png" alt="second main image" />
          <div className="description">
            <div className="description-title">설명글~~~</div>
            <div className="description-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              Consectetur sed in urna risus aliquet massa consectetur
              <br /> mattis. Arcu et diam tortor quis pulvinar vel dolor
              <br /> condimentum. Donec id eu porttitor turpis enim dui.
              <br /> Faucibus eu blandit hac morbi mi. Tincidunt sagittis amet{" "}
              <br />
              placerat lacus, varius feugiat. Tempor sed orci adipiscing
              <br /> molestie ipsum eu sed semper. Viverra rutrum ornare ut sit{" "}
              <br />
              euismod molestie turpis. Massa risus, quisque non viverra <br />
              nam consequat cursus consectetur.
            </div>
            <button>Read More {`>`}</button>
          </div>
        </FourthThird>
      </FourthMain>
    </>
  );
};

export default Home;

const FirstMain = styled.div`
  position: relative;
`;
const MainImage = styled.img`
  width: 100%;
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
  margin-bottom: 56px;
  border-radius: 30px;
`;

const PerNoteIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PerNoteIntroTitle = styled.div`
  margin-bottom: 1.875rem;
  font-weight: bold;
  font-size: 50px;
`;
const PerNoteIntroContent = styled.div`
  font-weight: normal;
  font-size: 30px;
`;

const ThirdMain = styled.div`
  padding: 180px 0;
  padding-left: 174px;
  margin-bottom: 209px;
  background-color: #eaeaea;
  display: flex;
`;

const PersonalScentImage = styled.img`
  width: 680px;
  height: 720px;
  margin-right: 106px;
  border-radius: 30px;
`;

const PersonalScentText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const PersonalScentTitle = styled.div`
  margin-bottom: 1.563rem;
  font-weight: bold;
  font-size: 50px;
`;
const PersonalScentTContent = styled.div`
  margin-bottom: 35px;
  font-weight: normal;
  font-size: 30px;
`;

const PersonalScentReacMore = styled.button`
  width: 166px;
  padding: 12px 23.5px;
  border: none;
  border-radius: 100px;
  background-color: #ffffff;
  font-weight: normal;
  font-size: 20px;
`;

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
`;

const SubscribeButton = styled.button`
  width: 269.03px;
  height: 69.18px;

  padding: 0 49px;
  background-color: #d9d9d9;

  border: none;
  border-radius: 100px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 400;
    font-size: 30px;
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
`;

const CategoryReadMore = styled.button`
  width: 166px;
  padding: 12px 23.5px;
  border: none;
  border-radius: 100px;
  background-color: #eaeaea;
  font-weight: normal;
  font-size: 20px;
`;

const CategoryImage = styled.img`
  width: 444px;
  height: 642px;
  margin-right: 74px;
  border-radius: 30px;
`;

const FourthThird = styled.div`
  display: flex;
  margin-bottom: 30rem;

  img {
    width: 680px;
    height: 720px;
    margin-right: 106px;
    border-radius: 30px;
  }
  .description {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .description-title {
      margin-bottom: 1.563rem;
      font-weight: bold;
      font-size: 50px;
    }

    .description-content {
      margin-bottom: 35px;
      font-weight: normal;
      font-size: 30px;
    }

    button {
      width: 166px;
      padding: 12px 23.5px;
      border: none;
      border-radius: 100px;
      background-color: #eaeaea;
      font-weight: normal;
      font-size: 20px;
    }
  }
`;
