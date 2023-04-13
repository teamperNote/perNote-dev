import React, { useState } from "react";
import styled from "styled-components";
import Input from "components/form/Input";
import ValidationButton from "components/form/ValidationButton";
import axios from "axios";

function EditPassword() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [receivedAuthNum, setReceivedAuthNum] = useState<string>("");
  const [authNum, setInputAuthNumber] = useState<string>("");
  const [successAuth, setSuccessAuth] = useState<boolean>(false);
  const [failAuth, setFailAuth] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);
  const [isPasswordDiff, setIsPasswordDiff] = useState<boolean>(false);

  const inputPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const inputPasswordCheck = (e: any) => {
    setPasswordCheck(e.target.value);
  };

  const inputPhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const inputAuthNumber = (e: any) => {
    setInputAuthNumber(e.target.value);
  };

  const sendAuthMessage = async (e: any) => {
    e.preventDefault();
    setIsSendMessage(true);
    const data = {
      phoneNumber,
    };
    const response = await axios.post("/api/auth/sendSMS", data);
    const authNumber = response.data.인증번호;
    setReceivedAuthNum(authNumber);
  };

  const verifyPhoneNum = (e: any) => {
    e.preventDefault();
    if (receivedAuthNum.toString() === authNum) {
      setFailAuth(false);
      setSuccessAuth(true);
    } else {
      setSuccessAuth(false);
      setFailAuth(true);
    }
  };
  return (
    <FormList>
      <FormItem>
        <Input
          htmlFor="phone"
          labelContent="전화번호"
          type="tel"
          value={phoneNumber}
          setStateValue={inputPhoneNumber}
        />
        <ValidationButton click={sendAuthMessage}>
          {isSendMessage ? "재발송" : "인증하기"}
        </ValidationButton>
      </FormItem>
      {isSendMessage ? (
        <FormItem>
          <Input
            htmlFor="checkPhone"
            labelContent="인증번호"
            type="text"
            value={authNum}
            setStateValue={inputAuthNumber}
          />
          <ValidationButton click={verifyPhoneNum}>확인</ValidationButton>
        </FormItem>
      ) : (
        <></>
      )}
      {successAuth ? <Message>전화번호 인증 성공</Message> : <></>}
      {failAuth ? <Message>전화번호 인증 실패</Message> : <></>}
      {/* {successAuth && ( */}
      <>
        <FormItem>
          <Input
            htmlFor="password"
            labelContent="변경할 비밀번호"
            type="text"
            value={password}
            setStateValue={inputPassword}
          />
        </FormItem>

        <FormItem>
          <Input
            htmlFor="passwordCheck"
            labelContent="비밀번호 확인"
            type="text"
            value={passwordCheck}
            setStateValue={inputPasswordCheck}
          />
          <ValidationButton
            click={() => {
              console.log("비밀번호 일치 확인");
            }}
          >
            확인
          </ValidationButton>
        </FormItem>
      </>
      {/* )} */}
    </FormList>
  );
}

export default EditPassword;
const PersonalInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PersonalInfoForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
  width: 1008px;
`;
const FormList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
`;

const FormItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 35px;
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
