/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="container">
      <div className="text">
        We could leave the christmas Lights up till january
        <br />
        This is our place we make the rules
        <br />
        And there&#8217;s a dazzling haze And mysterious way about you dear
        <br />
        Have I known you twenty seconds Or twenty years?
        <br />
        Can I go where you go? Can we always be this close Forever and ever?
        <br />
        And oh take me out and take me home You&#8217;re my my my my Lover
      </div>
      <img className="home-img" src="/homeimg1.png" />
      <div className="perfume-of-month">
        <div className="perfume-of-month-title">이달의 향수</div>
        <div className="perfume-of-month-list">
          <div className="perfume-of-month-item">
            <img className="perfume-of-month-img" src="/perfumeOfMonth.png" />
            <div className="go-perfume-item">바로가기</div>
          </div>
          <div className="perfume-of-month-item">
            <img className="perfume-of-month-img" src="/perfumeOfMonth.png" />
            <div className="go-perfume-item">바로가기</div>
          </div>
          <div className="perfume-of-month-item">
            <img className="perfume-of-month-img" src="/perfumeOfMonth.png" />
            <div className="go-perfume-item">바로가기</div>
          </div>
        </div>
      </div>
      <div className="perfume-scent">
        <img className="home-img2" src="/homeimg1.png"></img>
        <div className="perfume-scent-text">
          <div className="text-title">PERFUME SCENT</div>
          <div className="text-content">
            We could leave the christmas Lights up till january
            <br />
            This is our place we make the rules
            <br />
            And there&#8217;s a dazzling haze And mysterious way about you dear
            <br />
            Have I known you twenty seconds Or twenty years?
            <br />
            Can I go where you go? Can we always be this close Forever and ever?
            <br />
            And oh take me out and take me home You&#8217;re my my my my Lover
          </div>
          <button className="start-button">시작하기</button>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 6px;
          margin-bottom: 10rem;
          padding: 4rem 0;
          background-color: #fafafa;
        }
        .text {
          font-size: 1.2rem;
          padding-bottom: 6rem;
        }
        .home-img {
          width: 68rem;
          padding-bottom: 8rem;
        }
        .perfume-of-month {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 12rem;
        }
        .perfume-of-month-title {
          font-size: 2.4rem;
          padding-bottom: 4rem;
        }

        .perfume-of-month-list {
          display: flex;
          justify-content: space-between;
        }
        .perfume-of-month-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 7rem;
        }
        .go-perfume-item {
          margin: 1rem 0;
          padding: 8px 2rem;
          border-top: 2px solid black;
          font-size: 1.1rem;
        }
        .perfume-of-month-img {
          width: 18rem;
          height: 22rem;
        }

        .perfume-scent {
          display: flex;
          justify-content: space-between;
        }
        .home-img2 {
          width: 50%;
        }
        .perfume-scent-text {
          width: 40%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .text-title {
          border-bottom: 1px solid black;
          font-size: 2.4rem;
          padding: 0 1rem 10px;
          margin-bottom: 1.4rem;
        }
        .text-content {
          font-size: 1.1rem;
          padding-bottom: 1.4rem;
        }
        button {
          width: 8rem;
          height: 2.4rem;
          border: 1px solid black;
          border-radius: 6px;
          font-size: 1.2rem;
          background-color: white;
        }
      `}</style>
    </div>
    // <div className={styles.container}>

    // </div>
  );
};

export default Home;
