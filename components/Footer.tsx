/* eslint-disable react/no-unknown-property */
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
export default function Footer() {
  return (
    <div className="container">
      <img className="image" src="/homeimg1.png" />
      <div className="info">
        <div className="info-item">
          <h1>CONTACT</h1>
          <dl>
            <dt>EMAIL</dt>
            <dd>alp1009@naver.com</dd>

            <dt>NUMBER</dt>
            <dd>010-1234-5678</dd>

            <dt>ADDRESS</dt>
            <dd>허리도 가늘군 만지면 부러지리</dd>
          </dl>
        </div>
        <div className="info-item">
          <h1>INFO</h1>
          <dl>
            <dt>COMPANY</dt>
            <dd>ALP</dd>

            <dt>CEO</dt>
            <dd>장진우</dd>

            <dt className="owner-info">사업자 정보 확인</dt>

            <dt className="question">문의사항</dt>
            <dd>alp1009@naver.com</dd>
          </dl>
        </div>
        <div className="info-item">
          <h1>SNS</h1>
          <span className="icon">
            <BsInstagram />
          </span>
          <span className="icon">
            <FaFacebookF />
          </span>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          margin-bottom: 30rem;
        }
        h1 {
          font-size: 2.4rem;
          font-weight: 300;
          margin-bottom: 2rem;
        }
        .image {
          width: 8%;
          /* height: 8rem; */
          height: 9rem;
        }
        .info {
          flex: 1;
          /* width: 90%; */
          border: 1px solid black;
          display: flex;
          margin-left: 2rem;
          padding: 2rem 6rem;
        }
        .info-item {
          margin-right: 10rem;
        }
        dt {
          font-size: 1.3rem;
        }
        dd {
          margin-bottom: 1.8rem;
          font-size: 1.1rem;
        }
        .owner-info {
          font-weight: 500;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        .question {
          font-weight: 500;
          font-size: 1.5rem;
        }
        .icon {
          font-size: 2rem;
          margin-right: 1rem;
        }
      `}</style>
    </div>
  );
}
