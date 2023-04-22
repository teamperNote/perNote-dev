import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { sendAuthNum } from "utils/sendAuthNum";
import { checkAuthNum } from "utils/checkAuthNum";
import Input from "./Input";
import ValidationButton from "./ValidationButton";
import { checkValidation } from "utils/checkValidation";
function PhoneNumForm({
  userInfo,
  setUserInfo,
  isValidNum,
  setIsValidNum,
  successAuth,
  setSuccessAuth,
}) {
  const regex = /^\d{11}$/;
  const phoneNumber =
    typeof userInfo === "object" ? userInfo.phoneNumber : userInfo;
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [receivedAuthNum, setReceivedAuthNum] = useState<string>("");
  const [authNum, setInputAuthNumber] = useState<string>("");
  const [failAuth, setFailAuth] = useState<boolean>(false);

  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt((time.current / 60).toString()));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [isSendMessage]);

  useEffect(() => {
    if (time.current <= -1) {
      clearInterval(timerId.current);
    }
  }, [sec]);

  const inputPhoneNumber = (e: any) => {
    const isValid = checkValidation(regex, e.target.value);
    if (isValid) setIsValidNum(true);
    else setIsValidNum(false);

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
    setIsSendMessage(false);
    setMin(3);
    setSec(0);
    time.current = 180;
    const prevTimer = timerId.current;
    clearInterval(prevTimer);
    timerId.current = null;

    e.preventDefault();
    const phoneNumber =
      typeof userInfo === "object" ? userInfo.phoneNumber : userInfo;
    const authNumber = await sendAuthNum(phoneNumber);
    setIsSendMessage(true);
    setReceivedAuthNum(authNumber);
  };

  const verifyPhoneNum = (e: any) => {
    e.preventDefault();
    const isSuccess = checkAuthNum(receivedAuthNum, authNum);
    if (isSuccess) {
      setFailAuth(false);
      setSuccessAuth(true);
      const prevTimer = timerId.current;
      clearInterval(prevTimer);
      timerId.current = null;
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
        <ValidationButton click={sendAuthMessage} isActive={isValidNum}>
          {isSendMessage ? "재발송" : "인증하기"}
        </ValidationButton>
      </FormItem>
      {!isValidNum && (
        <ErrorMessage>{`-를 제외한 숫자 11자리로 입력해 주세요.`}</ErrorMessage>
      )}
      {isSendMessage ? (
        <>
          <FormItem>
            <Input
              htmlFor="checkPhone"
              labelContent="인증번호"
              type="text"
              value={authNum}
              setStateValue={inputAuthNumber}
            />
            <ValidationButton
              click={verifyPhoneNum}
              isActive={authNum.length !== 0}
            >
              확인
            </ValidationButton>
          </FormItem>
          {timerId.current && (
            <Timer>
              {min} 분 {sec} 초
            </Timer>
          )}
        </>
      ) : (
        <></>
      )}
      {successAuth ? <Message>전화번호 인증 성공</Message> : <></>}
      {failAuth ? <ErrorMessage>전화번호 인증 실패</ErrorMessage> : <></>}
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

const Timer = styled.div`
  padding-left: 193px;
  @media screen and (max-width: 1440px) {
    padding-left: 183px;
  }
  @media screen and (max-width: 480px) {
    padding-left: 60px;
  }
`;
