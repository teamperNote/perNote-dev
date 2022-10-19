/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import styled from "styled-components";
import { BsFillTriangleFill } from "react-icons/bs";

const Home: NextPage = () => {
  return (
    <HomeContainer>
      <FirstMain>
        <img src="/perNoteBackImg.png" alt="main first background image" />
        <div className="description">
          <div className="description-title">메인화면</div>
          <div className="description-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
            <br />
            gravida sit facilisis cras. In blandit mi id est luctus. Non turpis
            non
            <br /> risus purus. Eget vel commodo ac purus, laoreet sollicitudin.
          </div>
        </div>
      </FirstMain>
      <SecondMain>
        <img src="/perNoteBackImg.png" alt="second main image" />
        <div className="description">
          <div className="description-title">per.note 개요</div>
          <div className="description-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
            <br />
            gravida sit facilisis cras. In blandit mi id est luctus. Non turpis
            non
            <br /> risus purus. Eget vel commodo ac purus, laoreet sollicitudin.
          </div>
        </div>
      </SecondMain>
      <ThirdMain>
        <img src="/perNoteBackImg.png" alt="second main image" />
        <div className="description">
          <div className="description-title">Personal Scent </div>
          <div className="description-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
            <br />
            gravida sit facilisis cras. In blandit mi id est luctus. Non turpis
            non
            <br /> risus purus. Eget vel commodo ac purus, laoreet sollicitudin.
          </div>
          <button>Read More {`>`}</button>
        </div>
      </ThirdMain>
      <FourthMain>
        <FourthFirst>
          <div className="perfume-list">
            <div className="perfume-item">
              <img src="/perNoteBackImg.png" alt="image" />
              <div>Lorem Ipsum</div>
            </div>
            <div className="perfume-item">
              <img src="/perNoteBackImg.png" alt="image" />
              <div>Lorem Ipsum</div>
            </div>
            <div className="perfume-item">
              <img src="/perNoteBackImg.png" alt="image" />
              <div>Lorem Ipsum</div>
            </div>
          </div>
          <div className="perfume-story-text">
            <div className="perfume-story-text-title">Purfume story</div>
            <div className="perfume-story-text-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
              gravida sit facilisis cras. In blandit mi id est luctus. Non
              <br />
              turpis non risus purus. Eget vel commodo ac purus, laoreet
              sollicitudin. <br />
              <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Massa gravida sit facilisis cras.
              <br /> In blandit mi id est luctus. Non turpis non risus purus.
              Eget vel commodo ac purus, laoreet sollicitudin.
            </div>
          </div>
          <button>
            <span>Subscribe</span>
            <span className="subscribe-icon">
              <BsFillTriangleFill
                style={{ transform: "rotate(90deg)", color: "#A79D9D" }}
              />
            </span>
          </button>
        </FourthFirst>
        <FourthSecond>
          <div className="description">
            <div className="description-title">노트,성격,특징,브랜드 통합</div>
            <div className="description-content">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit. Massa gravida sit facilisis
              <br /> cras. In blandit mi id est luctus. Non <br />
              turpis non risus purus. Eget vel commodo <br />
              ac purus, laoreet sollicitudin.
            </div>
            <button>Read More {`>`}</button>
          </div>
          <div className="image-container">
            <img src="/perNoteBackImg.png" alt="image1" />
            <img src="/perNoteBackImg.png" alt="image2" />
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
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 1920px;
`;
const FirstMain = styled.div`
  img {
    width: 100%;
    position: relative;
  }

  .description {
    width: 921px;
    margin-left: 10.875rem;
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;

    .description-title {
      margin-bottom: 1.875rem;
      font-weight: bold;
      font-size: 50px;
    }

    .description-content {
      font-weight: normal;
      font-size: 30px;
    }
  }
`;

const SecondMain = styled.div`
  margin-top: 12.25rem;
  margin-bottom: 7.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 1668px;
    height: 392px;
    margin-bottom: 56px;
    border-radius: 30px;
  }

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;

    .description-title {
      margin-bottom: 1.875rem;
      font-weight: bold;
      font-size: 50px;
    }

    .description-content {
      font-weight: normal;
      font-size: 30px;
    }
  }
`;

const ThirdMain = styled.div`
  padding: 180px 0;
  padding-left: 174px;
  margin-bottom: 209px;
  background-color: #eaeaea;
  display: flex;

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
      background-color: #ffffff;
      font-weight: normal;
      font-size: 20px;
    }
  }
`;

const FourthMain = styled.div`
  padding-left: 131px;
`;

const FourthFirst = styled.div`
  margin-bottom: 230px;
  .perfume-list {
    margin-bottom: 60px;
    display: flex;

    .perfume-item {
      margin-right: 34px;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 530px;
        height: 530px;
        border-radius: 30px;
        margin-bottom: 30px;
      }

      div {
        font-weight: normal;
        font-size: 30px;
      }
    }
  }

  .perfume-story-text {
    .perfume-story-text-title {
      margin-bottom: 25px;
      font-weight: bold;
      font-size: 50px;
    }

    .perfume-story-text-content {
      margin-bottom: 35px;
      font-weight: normal;
      font-size: 30px;
    }
  }

  button {
    width: 582px;
    height: 119px;

    padding: 0 37px;
    background-color: #d9d9d9;

    border: none;
    border-radius: 100px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-weight: normal;
      font-size: 40px;
    }
  }
`;

const FourthSecond = styled.div`
  display: flex;
  margin-bottom: 338px;
  .description {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-right: 145px;

    .description-title {
      font-weight: bold;
      font-size: 50px;
      margin-bottom: 30px;
    }

    .description-content {
      font-weight: normal;
      font-size: 30px;
      margin-bottom: 35px;
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

  .image-container {
    img {
      width: 444px;
      height: 642px;
      margin-right: 74px;
      border-radius: 30px;
    }
  }
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
