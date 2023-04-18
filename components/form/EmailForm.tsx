import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import ValidationButton from "./ValidationButton";
import { checkEmail } from "utils/checkEmail";

function EmailForm({ userInfo, setUserInfo, isValidEmail, setIsValidEmail }) {
  const email = typeof userInfo === "object" ? userInfo.email : userInfo;
  const [isInValidEmail, setIsInValidEmail] = useState<boolean>(false);

  const inputEmail = (e: any) => {
    if (typeof userInfo === "object") {
      setUserInfo({ ...userInfo, email: e.target.value });
    } else {
      setUserInfo(e.target.value);
    }
  };
  const checkEmailDuplication = async (e: any) => {
    e.preventDefault();
    setIsValidEmail(false);
    setIsInValidEmail(false);

    const isValidEmail = await checkEmail(email);
    if (isValidEmail) setIsValidEmail(true);
    else setIsInValidEmail(true);
  };
  return (
    <>
      <FormItem>
        <Input
          htmlFor="email"
          labelContent="이메일"
          type="email"
          value={email}
          setStateValue={inputEmail}
        />
        <ValidationButton click={checkEmailDuplication}>
          중복확인
        </ValidationButton>
      </FormItem>
      {isValidEmail && <Message>사용 가능한 이메일입니다.</Message>}
      {isInValidEmail && <Message>이미 사용중인 이메일입니다.</Message>}
    </>
  );
}

export default EmailForm;

const FormItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Message = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 1rem;
  padding-left: 184px;
  @media screen and (max-width: 480px) {
    padding-left: 60px;
    font-size: 0.8rem;
  }
`;
