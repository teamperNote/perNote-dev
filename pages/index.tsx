/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";

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
      <div></div>
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
  background-color: #eaeaea;
  display: flex;

  img {
    width: 680px;
    height: 720px;
    margin-right: 106px;
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
