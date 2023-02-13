import React from "react";
import styled from "styled-components";

function LoginModal() {
  return (
    <ModalContainer>
      <ModalTitle>로그인 실패</ModalTitle>
      <ModalContent>
        {`      존재하지 않는 회원 정보입니다. 
  아이디와 비밀번호를 확인 후 다시 시도해주세요.`}
      </ModalContent>
      <ModalButton>확인</ModalButton>
    </ModalContainer>
  );
}

export default LoginModal;

const ModalContainer = styled.div`
  font-family: "Noto Sans KR";
  position: relative;
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
`;

const ModalTitle = styled.h2`
  margin: 0;
  margin-top: 80px;
  font-weight: 700;
  font-size: 50px;
`;
const ModalContent = styled.pre`
  margin-top: 50px;
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
`;

const ModalButton = styled.button`
  margin-top: 72px;
  width: 387px;
  height: 90px;
  background-color: var(--primary-color);
  color: var(--white-color);
  font-weight: 400;
  font-size: 40px;
  border-radius: 100px;
`;
