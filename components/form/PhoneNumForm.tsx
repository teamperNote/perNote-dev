import React, { useState } from "react";
import styled from "styled-components";
import { sendAuthNum } from "utils/sendAuthNum";
import { checkAuthNum } from "utils/checkAuthNum";
import Input from "./Input";
import ValidationButton from "./ValidationButton";
function PhoneNumForm({ userInfo, setUserInfo, successAuth, setSuccessAuth }) {
  const phoneNumber =
    typeof userInfo === "object" ? userInfo.phoneNumber : userInfo;
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [receivedAuthNum, setReceivedAuthNum] = useState<string>("");
  const [authNum, setInputAuthNumber] = useState<string>("");
  const [failAuth, setFailAuth] = useState<boolean>(false);

  const inputPhoneNumber = (e: any) => {
    if (typeof userInfo === "object") {
      setUserInfo({ ...userInfo, phoneNumber: e.target.value });
    } else {
      setUserInfo(e.target.value);
    }
  };

  const inputAuthNumber = (e: any) => {
    setInputAuthNumber(e.target.value);
  };

  const sendAuthMessage = async (e: any) => {
    e.preventDefault();
    setIsSendMessage(true);
    const phoneNumber =
      typeof userInfo === "object" ? userInfo.phoneNumber : userInfo;
    const authNumber = await sendAuthNum(phoneNumber);
    setReceivedAuthNum(authNumber);
  };

  const verifyPhoneNum = (e: any) => {
    e.preventDefault();
    const isSuccess = checkAuthNum(receivedAuthNum, authNum);
    if (isSuccess) {
      setFailAuth(false);
      setSuccessAuth(true);
    } else {
      setSuccessAuth(false);
      setFailAuth(true);
    }
  };
  return (
    <div>
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
    </div>
  );
}

export default PhoneNumForm;
const FormItem = styled.div`
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
