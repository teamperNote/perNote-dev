import React, { useState, useEffect } from "react";
import ValidationButton from "components/form/ValidationButton";
import Input from "../../components/form/Input";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import RadioItem from "components/form/RadioButton";
import { SignupType } from "lib/types";
import { radioButtonArray } from "lib/arrays";

function SnsSignUp(props) {
  const router = useRouter();

  const [snsName, setSnsName] = useState<string>("");
  const [snsUserId, setUserId] = useState<string>("");
  const { snsType } = router.query;

  useEffect(() => {
    if (snsType) {
      setSnsName(snsType[0]);
      setUserId(snsType[1]);
      console.log(snsName);
    }
  }, [snsName, snsType, snsUserId]);

  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isInValidEmail, setIsInValidEmail] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);
  const [isPasswordDiff, setIsPasswordDiff] = useState<boolean>(false);

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [receivedAuthNum, setReceivedAuthNum] = useState<string>("");
  const [authNum, setInputAuthNumber] = useState<string>("");
  const [successAuth, setSuccessAuth] = useState<boolean>(false);
  const [failAuth, setFailAuth] = useState<boolean>(false);

  const [birth, setBirth] = useState<string>("");

  const [gender, setGender] = useState<string>("");

  const inputName = (e: any) => {
    setName(e.target.value);
  };
  const inputEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const inputCheckPassword = (e: any) => {
    setCheckPassword(e.target.value);
  };

  const inputPhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const inputBirthday = (e: any) => {
    setBirth(e.target.value);
  };

  //이메일 중복 확인
  const checkEmailDuplication = async (e: any) => {
    e.preventDefault();
    setIsValidEmail(false);
    setIsInValidEmail(false);

    try {
      const response = await axios.get(`/api/users/checkEmail?email=${email}`);

      if (response.status === 200) {
        setIsValidEmail(true);
      }
    } catch (error) {
      setIsInValidEmail(true);
    }
  };

  const checkSamePassword = async (e: any) => {
    e.preventDefault();
    if (password === checkPassword) {
      setIsPasswordSame(true);
      setIsPasswordDiff(false);
    }
    if (password !== checkPassword) {
      setIsPasswordSame(false);
      setIsPasswordDiff(true);
    }
  };

  const sendAuthMessage = async (e: any) => {
    e.preventDefault();
    setIsSendMessage(true);
    const data = {
      phoneNumber,
    };
    const response = await axios.post("/api/auth/sendSMS", data);
    console.log(response);
    const authNumber = response.data.인증번호;
    setReceivedAuthNum(authNumber);
  };

  const inputAuthNumber = (e: any) => {
    setInputAuthNumber(e.target.value);
  };
  const convertBirth = (prevBirth: string) => {
    const year = Number(prevBirth.slice(0, 4));
    const month = Number(prevBirth.slice(4, 6));
    const day = Number(prevBirth.slice(6, 8));
    const birthday = new Date(year, month - 1, day + 1);
    return birthday;
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
  const checkRequired = () => {
    // successAuth &&
    if (
      isPasswordSame &&
      name &&
      email &&
      isValidEmail &&
      password &&
      phoneNumber &&
      birth &&
      gender
    ) {
      return true;
    }
    return false;
  };
  const clickLogin = async (e: any) => {
    e.preventDefault();
    const birthday = convertBirth(birth);
    const data = {
      email,
      name,
      password,
      phoneNumber,
      birth: birthday,
      gender,
      userId: snsUserId,
    };
    // 모든 값 필수 조건 만족시 버튼 활성화
    if (checkRequired()) {
      if (snsName === "kakao") {
        try {
          const response = await axios.post("/api/auth/kakao/signup", data);
          console.log(response);
          if (response.status === 200) {
            console.log("카카오 회원가입 성공");
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  return (
    <SnsSignupWrapper>
      <SignupForm>
        <Field>
          <legend className="read-only">{`${snsName} 회원가입`}</legend>
          <LocalTitle>{`${snsName} 회원가입`}</LocalTitle>
          <FormList>
            <FormItem>
              <Input
                htmlFor="name"
                labelContent="이름"
                type="text"
                value={name}
                setStateValue={inputName}
              />
            </FormItem>
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
              <ValidationButton click={checkSamePassword}>
                확인
              </ValidationButton>
            </FormItem>
            <Message>*최소 8자리 이상, 대소문자, 숫자 포함</Message>
            {password && checkPassword && isPasswordSame ? (
              <Message>일치</Message>
            ) : (
              <></>
            )}
            {isPasswordDiff ? <Message>불일치</Message> : <></>}
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
            <FormItem>
              <Input
                htmlFor="birth"
                labelContent="생년월일"
                type="text"
                value={birth}
                setStateValue={inputBirthday}
              />
            </FormItem>
            <RadioItem
              radioData={radioButtonArray[0]}
              setStateValue={setGender}
            />
          </FormList>
        </Field>
        <SignupButton
          isActive={checkRequired() ? "isActive" : ""}
          onClick={clickLogin}
        >
          가입하기
        </SignupButton>
      </SignupForm>
    </SnsSignupWrapper>
  );
}

export default SnsSignUp;
const SnsSignupWrapper = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    padding-top: 70px;
  }

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 290px;
  padding-bottom: 200px;
`;
const SignupForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
  width: 1180px;
`;

const Field = styled.fieldset`
  border: none;
  border-top: 3px solid #d9d9d9;
`;

const LocalTitle = styled.h3`
  position: absolute;
  margin: 0;
  padding: 0 15px;
  top: 0;
  left: 50%;
  transform: translate(-129.205px, -22.5px);
  background: var(--white-color);
  font-weight: 700;
  font-size: 40px;
`;

const FormList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
`;

const FormItem = styled.li`
  display: flex;
  align-items: center;
  /* 마진 수정하기 */
  /* gap: 50px; */
  width: 100%;
  margin-top: 35px;
`;

const Message = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 20px;
  /* label 너비 300px + label margin-right 더한 값으로 위치 잡기 */
  padding-left: 360px;
`;
const SignupButton = styled.button<SignupType>`
  width: 800px;
  height: 120px;
  border: none;
  background: ${(props) =>
    props.isActive === "isActive" ? "#525d4d" : "#d9d9d9"};
  border-radius: 20px;
  color: ${(props) => (props.isActive === "isActive" ? "white" : "#616161")};
  font-weight: 400;
  font-size: 40px;
  margin-top: 93px;
`;
