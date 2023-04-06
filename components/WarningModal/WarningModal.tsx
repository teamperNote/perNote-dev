import React from "react";
import styled from "styled-components";

function WarningModal({ title, content, onClick }) {
  return (
    <Wrapper>
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>{content}</ModalContent>
        <ModalButton type="button" onClick={onClick}>
          확인
        </ModalButton>
      </ModalContainer>
    </Wrapper>
  );
}

export default WarningModal;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
`;
const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white-color);
  width: 940px;
  height: 552px;
  border-radius: 30px;
  @media screen and (max-width: 1440px) {
    width: 700px;
    height: 460px;
  }
`;

const ModalTitle = styled.h2`
  margin: 0;
  margin-top: 80px;
  font-weight: 700;
  font-size: 3.125rem;
`;
const ModalContent = styled.pre`
  margin-top: 50px;
  font-weight: 400;
  font-size: 1.875rem;
  line-height: 43px;
`;

const ModalButton = styled.button`
  cursor: pointer;
  margin-top: 50px;
  width: 387px;
  height: 90px;
  background-color: var(--primary-color);
  color: var(--white-color);
  font-weight: 400;
  font-size: 2.5rem;
  border-radius: 100px;
  @media screen and (max-width: 1440px) {
    width: 300px;
    height: 60px;
  }
`;
