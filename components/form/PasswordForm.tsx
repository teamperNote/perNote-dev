import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import ValidationButton from "./ValidationButton";

function PasswordForm({ password, setPassword, isSame, setIsSame }) {
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [isPasswordDiff, setIsPasswordDiff] = useState<boolean>(false);

  const inputPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const inputCheckPassword = (e: any) => {
    setCheckPassword(e.target.value);
  };

  const checkSamePassword = async (e: any) => {
    e.preventDefault();
    if (password === checkPassword) {
      setIsSame(true);
      setIsPasswordDiff(false);
    }
    if (password !== checkPassword) {
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
          type="passowrd"
          value={password}
          setStateValue={inputPassword}
        />
      </FormItem>
      <FormItem>
        <Input
          htmlFor="pwdCheck"
          labelContent="비밀번호 확인"
          type="passowrd"
          value={checkPassword}
          setStateValue={inputCheckPassword}
        />
        <ValidationButton click={checkSamePassword}>확인</ValidationButton>
      </FormItem>
      <Message>*최소 8자리 이상, 대소문자, 숫자 포함</Message>
      {password && checkPassword && isSame ? <Message>일치</Message> : <></>}
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
