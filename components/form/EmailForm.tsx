import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import ValidationButton from "./ValidationButton";
import { checkEmail } from "utils/checkEmail";
import { checkValidation } from "utils/checkValidation";

function EmailForm({
  userInfo,
  setUserInfo,
  isValidEmail,
  setIsValidEmail,
  isUnExisted,
  setIsUnExisted,
  isChecked,
  setIsChecked,
}) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
  const email = typeof userInfo === "object" ? userInfo.email : userInfo;
  const [isExisted, setIsExited] = useState<boolean>(false);

  const inputEmail = (e: any) => {
    setIsChecked(false);
    const isValid = checkValidation(regex, e.target.value);
    if (isValid) setIsValidEmail(true);
    else {
      setIsValidEmail(false);
      setIsUnExisted(false);
      setIsExited(false);
    }

    if (typeof userInfo === "object") {
      setUserInfo({ ...userInfo, email: e.target.value });
    } else {
      setUserInfo(e.target.value);
    }
  };
  const checkEmailDuplication = async (e: any) => {
    e.preventDefault();
    setIsUnExisted(false);
    setIsExited(false);

    try {
      const before = JSON.parse(localStorage.getItem("recoil-persist"));
      if (before.loginState === email) {
        setIsUnExisted(true);
        setIsChecked(true);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    const isExistedEmail = await checkEmail(email);
    if (isExistedEmail) {
      setIsUnExisted(true);
      setIsChecked(true);
    } else setIsExited(true);
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
        <ValidationButton click={checkEmailDuplication} isActive={isValidEmail}>
          중복확인
        </ValidationButton>
      </FormItem>
      {!isValidEmail && (
        <ErrorMessage>이메일 형식에 맞게 입력해 주세요.</ErrorMessage>
      )}
      {isValidEmail && !isChecked && !isUnExisted && !isExisted && (
        <ErrorMessage>중복 확인을 해주세요.</ErrorMessage>
      )}
      {isValidEmail && isChecked && isUnExisted && (
        <Message>사용 가능한 이메일입니다.</Message>
      )}
      {isValidEmail && isExisted && (
        <ErrorMessage>이미 사용중인 이메일입니다.</ErrorMessage>
      )}
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

const ErrorMessage = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 1rem;
  padding-left: 184px;
  color: red;
  @media screen and (max-width: 480px) {
    padding-left: 60px;
    font-size: 0.8rem;
  }
`;
