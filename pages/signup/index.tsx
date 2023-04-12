import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import AgreeItem from "components/form/AgreeItem";
import RadioItem from "components/form/RadioButton";
import Input from "../../components/form/Input";
import ValidationButton from "components/form/ValidationButton";
import ModalWrapper from "components/WarningModal/Portal";
import WarningModal from "components/WarningModal/WarningModal";
import { SignupType } from "lib/types";
import { agreeList, radioButtonArray } from "lib/arrays";

const REST_API_KEY = process.env.KAKAO_REST_API_KEY || "";
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || "";
const client_id = process.env.NAVER_CLIENT_ID || "";
const redirect_uri = process.env.NAVER_CALLBACK_URI || "";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "";

const kakao_api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=talk_message`;
const naver_api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=STATE_STRING&redirect_uri=${redirect_uri}`;
const google_request_url = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
function Signup() {
  const router = useRouter();
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

  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");

  const [gender, setGender] = useState<string>("");

  const [isCheckMust, setIsCheckMust] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [isExistUser, setIsExistUser] = useState("");
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

  const inputYear = (e: any) => {
    setYear(e.target.value);
  };
  const inputMonth = (e: any) => {
    setMonth(e.target.value);
  };
  const inputDay = (e: any) => {
    setDay(e.target.value);
  };

  const closeErrorModal = (e: any) => {
    if (e.target.type) {
      setIsExistUser("");
    }
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
    const authNumber = response.data.인증번호;
    setReceivedAuthNum(authNumber);
  };

  const inputAuthNumber = (e: any) => {
    setInputAuthNumber(e.target.value);
  };
  const convertBirth = (year: string, month: string, day: string) => {
    const convertYear = Number(year);
    const convertMonth = Number(month);
    const convertDay = Number(day);
    const birthday = new Date(convertYear, convertMonth - 1, convertDay + 1);
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
    if (
      isPasswordSame &&
      name &&
      email &&
      isValidEmail &&
      password &&
      phoneNumber &&
      successAuth &&
      gender
    ) {
      return true;
    }
    return false;
  };
  const clickLogin = async (e: any) => {
    e.preventDefault();
    const birthday = convertBirth(year, month, day);
    const data = {
      email,
      name,
      password,
      phoneNumber,
      birth: birthday,
      gender,
    };
    // 모든 값 필수 조건 만족시 버튼 활성화
    if (checkRequired()) {
      try {
        const response = await axios.post("/api/users/signup", data);
        if (response.status === 200) {
          router.push("/");
        }
      } catch (e: any) {
        console.log(e.response.data.message);
        if (e.response.data.message === "이미 가입된 사용자입니다") {
          setIsExistUser(e.response.data.message);
        }
      }
    }
  };

  return (
    <SignupWrapper>
      <h2 className="read-only">회원가입</h2>
      <section>
        <SnsTitle>SNS 회원가입</SnsTitle>
        <SnsList>
          <li>
            <SnsLink href={kakao_api_url}>
              <SnsIcon
                src="/login_kakao.svg"
                alt="카카오로 로그인"
                width={90}
                height={90}
              />
            </SnsLink>
          </li>
          <li>
            <SnsLink href={naver_api_url}>
              <SnsIcon
                src="/login_naver.svg"
                alt="네이버로 로그인"
                width={90}
                height={90}
              />
            </SnsLink>
          </li>
          <li>
            <SnsLink className="google-link" href={google_request_url}>
              <SnsIcon
                src="/login_goggle.png"
                alt="구글 로그인"
                width={90}
                height={90}
              />
            </SnsLink>
          </li>
        </SnsList>
      </section>
      <LocalSection>
        <SignupForm>
          <Field>
            <legend className="read-only">일반 회원가입</legend>
            <LocalTitle>일반 회원가입</LocalTitle>
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
                  <ValidationButton click={verifyPhoneNum}>
                    확인
                  </ValidationButton>
                </FormItem>
              ) : (
                <></>
              )}
              {successAuth ? <Message>전화번호 인증 성공</Message> : <></>}
              {failAuth ? <Message>전화번호 인증 실패</Message> : <></>}
              <BirthDayFormItem>
                <label htmlFor="birth">생년월일</label>
                <div>
                  <select
                    name="year"
                    id="year"
                    value={year}
                    onChange={inputYear}
                  >
                    <option value="">년도</option>
                    {Array(84)
                      .fill(null)
                      .map((item, index) => {
                        return (
                          <option key={index} value={index + 1940}>
                            {index + 1940}
                          </option>
                        );
                      })}
                  </select>
                  <select
                    name="month"
                    id="month"
                    value={month}
                    onChange={inputMonth}
                  >
                    <option value="">월</option>
                    {Array(12)
                      .fill(null)
                      .map((item, index) => {
                        return (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        );
                      })}
                  </select>
                  <select name="day" id="day" value={day} onChange={inputDay}>
                    <option value="">일</option>
                    {Array(31)
                      .fill(null)
                      .map((item, index) => {
                        return (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </BirthDayFormItem>
              <RadioItem
                radioData={radioButtonArray[0]}
                setStateValue={setGender}
              />
            </FormList>
            {/* <CheckList>
              {agreeList.map((item: any, index: any) => (
                <AgreeItem
                  key={index}
                  index={index}
                  ischecked={isCheckMust}
                  isCheckAll={item.isCheckAll}
                  text={item.text}
                  setStateValue={setIsCheckMust}
                />
              ))}
            </CheckList> */}
          </Field>
          <SignupButton
            isActive={checkRequired() ? "isActive" : ""}
            onClick={clickLogin}
          >
            가입하기
          </SignupButton>
        </SignupForm>
      </LocalSection>
      {isExistUser && (
        <ModalWrapper>
          <WarningModal
            title={"회원가입 실패"}
            content={isExistUser}
            onClick={closeErrorModal}
          />
        </ModalWrapper>
      )}
    </SignupWrapper>
  );
}

export default Signup;

const SignupWrapper = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    padding-top: 50px;
  }

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 180px;
  padding-bottom: 200px;
`;

const SnsTitle = styled.h3`
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-size: 1.75rem;
`;

const SnsList = styled.ul`
  display: flex;
  gap: 50px;
  margin: 0;
  padding: 0;
`;

const SnsLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: 400;
  font-size: 1.25rem;
  border-radius: 14px;
  &.google-link {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
  }
`;

const SnsIcon = styled.img`
  width: 90px;
  height: 90px;
  @media screen and (max-width: 1440px) {
    width: 70px;
    height: 70px;
  }
  @media screen and (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;
const LocalSection = styled.section`
  margin-top: 90px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
`;

const Field = styled.fieldset`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  padding: 0 50px;
`;

const LocalTitle = styled.h3`
  font-weight: 700;
  font-size: 1.75rem;
`;

const FormList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  @media screen and (max-width: 1440px) {
    width: 683px;
  }
  @media screen and (max-width: 480px) {
    width: 290px;
  }
`;

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
const CheckList = styled.ul`
  margin-top: 100px;
  padding-top: 70px;
  border-top: 3px solid #d9d9d9;
`;

const SignupButton = styled.button<SignupType>`
  cursor: ${(props) =>
    props.isActive === "isActive" ? "pointer" : "not-allowed"};
  width: 333px;
  height: 60px;
  border: none;
  background: ${(props) =>
    props.isActive === "isActive" ? "#525d4d" : "#d9d9d9"};
  border-radius: 10px;
  color: ${(props) => (props.isActive === "isActive" ? "white" : "#616161")};
  font-weight: 400;
  font-size: 1.5rem;
  margin-top: 93px;
`;

const BirthDayFormItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 35px;

  label {
    display: inline-block;
    /* 248px 이상이면 레이아웃 깨짐  */
    width: 120px;
    text-align: left;
    font-weight: 400;
    font-size: 1.25rem;
    margin-right: 63px;
    @media screen and (max-width: 480px) {
      width: 50px;
      margin-right: 13px;
      font-size: 1rem;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 330px;
    @media screen and (max-width: 480px) {
      width: 220px;
    }
  }
  input {
    width: 90px;
    height: 46px;
    padding: 10px 14px;
    font-size: 1rem;
    border: 2px solid #d9d9d9;
  }

  input::placeholder {
    color: black;
    font-size: 1rem;
  }

  select {
    width: 90px;
    height: 46px;
    padding: 10px 14px;
    font-size: 1rem;
    border: 2px solid #d9d9d9;
    appearance: none;
    background: url("/down_arrow.svg") no-repeat;
    background-position: 60px 16px;
    background-size: 14px 10px;
    @media screen and (max-width: 480px) {
      background-position: 48px 16px;
    }
  }
`;
