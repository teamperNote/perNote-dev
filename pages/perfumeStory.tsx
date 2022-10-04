/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import LetterItem from "../components/LetterItem";

const PerfumeStory: NextPage = () => {
  return (
    <div className="container">
      <div className="first-container">
        <div className="form-container">
          <div className="title-container">
            <h1>
              <span>PER.NOTE</span>만의 특별한 이야기
            </h1>
            <div className="form-description">
              뉴스레터 구독으로 편하게 보세요!
            </div>
          </div>
          <form>
            <input
              type="email"
              className="info-input"
              placeholder="이메일 주소"
            />
            <input type="text" className="info-input" placeholder="닉네임" />
            <div className="agree-box-container">
              <div className="agree-box">
                <input type="checkbox" />
                <div>개인 정보 수집 및 이용에 동의합니다.</div>
              </div>
              <div className="agree-box">
                <input type="checkbox" />
                <div>광고성 정보 수신에 동의합니다.</div>
              </div>
            </div>
            <button>뉴스레터 무료 구독하기</button>
          </form>
        </div>
        <img src="/perStoryImg1.png" />
      </div>
      <div className="second-container">
        <div className="letter-container">
          <div>LETTER</div>
          <select>
            <option>최신순</option>
            <option>인기순</option>
            <option>가나다순</option>
          </select>
        </div>
        <div className="letter-list">
          <LetterItem />
          <LetterItem />
          <LetterItem />
          <LetterItem />
          <LetterItem />
          <LetterItem />
          <LetterItem />
          <LetterItem />
          <LetterItem />
          <LetterItem />
          <LetterItem />
          <LetterItem />
        </div>
        <div className="more-letter-container">
          <span className="more-letter">LETTER 더보기</span>
        </div>
      </div>
      <style jsx>{`
        .container {
          margin-top: 6px;
          margin-bottom: 8rem;
          border-bottom: 1px solid black;
        }
        .first-container {
          display: flex;
          justify-content: space-between;
        }
        .title-container {
          margin-bottom: 3rem;
        }
        .form-container {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8rem;
          background-color: #fcf8ed;
        }
        h1 {
          font-weight: 500;
          margin-bottom: 0;
        }
        span {
          font-weight: 200;
        }
        .form-description {
          padding: 0 4rem;
          font-size: 1.2rem;
        }
        .info-input {
          width: 22rem;
          height: 2rem;
          margin-bottom: 2rem;
          border: none;
          border-bottom: 1px solid black;
          background-color: transparent;
          font-size: 1rem;
        }
        img {
          width: 50%;
          height: 44rem;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .agree-box-container {
          margin-bottom: 2rem;
        }
        .agree-box {
          width: 22rem;
          display: flex;
          font-size: 1.1rem;
          align-items: center;
          margin-bottom: 1rem;
        }

        .agree-box > input {
          appearance: none;
          margin-right: 1rem;
          width: 1.4rem;
          height: 1.4rem;
          border: 2.4px solid black;
        }

        button {
          width: 22rem;
          height: 3rem;
          border: none;
          background-color: black;
          color: white;
          font-size: 1.1rem;
        }
        button:hover {
          background-color: white;
          color: black;
          border: 1.2px solid black;
        }
        .second-container {
          margin-top: 4rem;
        }
        .letter-container {
          display: flex;
          justify-content: space-between;
          align-items: end;
        }
        .letter-container > div {
          font-size: 4rem;
        }

        select {
          border: none;
          border-bottom: 2.4px solid black;
          width: 18rem;
          height: 2rem;
          font-size: 1.1rem;
        }
        .letter-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(30%, auto));
          column-gap: 1rem;
        }
        .more-letter-container {
          display: flex;
          justify-content: center;
        }
        .more-letter {
          display: inline-block;
          margin: 2rem 0 1.2rem;
          font-size: 1.2rem;
          font-weight: 400;
        }
        .more-letter:hover {
          transform: scale(1.1);
          transition-duration: 0.2s;
          border-bottom: 1px solid black;
        }
      `}</style>
    </div>
  );
};

export default PerfumeStory;
