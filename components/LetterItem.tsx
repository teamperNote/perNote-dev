/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import { PropsWithChildren, useState, useCallback } from "react";
import LetterItemModal from "./LetterItemModal";

const LetterItem: NextPage = () => {
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isModalOpen);
    console.log(isModalOpen);
  }, [isModalOpen]);
  return (
    <div className="item-container" onClick={onClickToggleModal}>
      <img src="/letterItemImg.png" />
      <div className="item-title">킹받드라슈의 일기</div>
      {isModalOpen && (
        <LetterItemModal onClickToggleModal={onClickToggleModal} />
      )}
      <style jsx>{`
        .item-container {
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        img:hover {
          filter: brightness(110%);
        }
        img {
          width: 100%;
        }

        .item-title {
          text-align: center;
          line-height: 3.2rem;
          width: 100%;
          height: 3.2rem;
          background-color: #e8e6e6;
          color: #757575;
        }
      `}</style>
    </div>
  );
};

export default LetterItem;
