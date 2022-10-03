/* eslint-disable react/no-unknown-property */
import { PropsWithChildren } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

interface ModalTypes {
  onClickToggleModal: () => void;
}
const LetterItemModal = ({
  onClickToggleModal,
}: PropsWithChildren<ModalTypes>) => {
  return (
    <div className="modal-container">
      <IoIosArrowBack size="3rem" />
      <div className="modal-content">
        <img src="/letterItemImg.png" />
        <div className="letter-title">킹받드라슈의 일기</div>
        <div className="letter-date">2022.07.12</div>
      </div>
      <div className="right-icon-container">
        <div className="close-icon">
          <AiOutlineClose size="2.4rem" />
        </div>
        <div className="arrow-icon">
          <IoIosArrowForward size="3rem" />
        </div>
      </div>
      <style jsx>{`
        .modal-container {
          width: 100%;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 10;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: white;
        }
        div {
          margin-bottom: 1rem;
        }
        img {
          width: 60rem;
          height: 40rem;
          margin-bottom: 1rem;
        }
        .letter-title {
          font-weight: 200;
          font-size: 1.1rem;
        }
        .letter-date {
          font-weight: 100;
          font-size: 14px;
        }
        .modal-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .right-icon-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
        }

        .close-icon {
          position: absolute;
          top: 8%;
        }
        .arrow-icon {
          position: absolute;
          top: 48%;
        }
      `}</style>
    </div>
  );
};

export default LetterItemModal;
