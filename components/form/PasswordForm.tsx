import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { checkValidation } from "utils/checkValidation";

function PasswordForm({
  password,
  setPassword,
  isValidPwd,
  setIsValidPwd,
  isSame,
  setIsSame,
}) {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [isPasswordDiff, setIsPasswordDiff] = useState<boolean>(false);

  const inputPassword = (e: any) => {
    const isValid = checkValidation(regex, e.target.value);
    if (isValid) setIsValidPwd(true);
    else setIsValidPwd(false);

    setPassword(e.target.value);
  };

  const inputCheckPassword = (e: any) => {
    setCheckPassword(e.target.value);
    if (password === e.target.value) {
      setIsSame(true);
      setIsPasswordDiff(false);
    }
    if (password !== e.target.value) {
      setIsSame(false);
      setIsPasswordDiff(true);
    }
  };

  return (
    <>
      <FormItem>
        <Input
          htmlFor="password"
          labelContent="비밀번호"
          type="password"
          value={password}
          setStateValue={inputPassword}
        />
      </FormItem>
      {!isValidPwd && (
        <Message>영어, 숫자, 특수문자를 포함한 8자리 이상</Message>
      )}
      <FormItem>
        <Input
          htmlFor="pwdCheck"
          labelContent="비밀번호 확인"
          type="password"
          value={checkPassword}
          setStateValue={inputCheckPassword}
        />
      </FormItem>
      {isValidPwd && checkPassword && isSame ? <Message>일치</Message> : <></>}
      {isPasswordDiff ? <Message>불일치</Message> : <></>}
    </>
  );
}

export default PasswordForm;

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
