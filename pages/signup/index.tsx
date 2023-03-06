import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import AgreeItem from "components/form/AgreeItem";
import RadioItem from "components/form/RadioButton";
import Input from "../../components/form/Input";
import ValidationButton from "components/form/ValidationButton";

const REST_API_KEY = process.env.KAKAO_REST_API_KEY || "";
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || "";
const client_id = process.env.NAVER_CLIENT_ID || "";
const redirect_uri = process.env.NAVER_CALLBACK_URI || "";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "";

interface SignupProps {
  isActive: string;
}

const agreeList = [
  { isCheckAll: true, text: "약관 전체 동의" },
  {
    isCheckAll: false,
    text: "[필수] 이용약관 동의",
  },
  {
    isCheckAll: false,
    text: "[필수] 개인정보 수집 및 이용 동의",
  },
  {
    isCheckAll: false,
    text: "[선택] 광고성 메세지 수신 동의",
  },
  {
    isCheckAll: false,
    text: "[선택] 마케팅 정보 수집 동의",
  },
];
const radioList = [
  {
    label: "성별",
    id: ["m", "f"],
    name: "gender",
    text: ["남성", "여성"],
  },
  {
    label: "스토리 수신 여부",
    id: ["agree", "disagee"],
    name: "story",
    text: ["동의", "비동의"],
  },
];
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
    console.log(birthday);
    // 모든 값 필수 조건 만족시 버튼 활성화
    if (checkRequired()) {
      try {
        const response = await axios.post("/api/users/signup", data);
        console.log(response);
        if (response.status === 200) {
          router.push("/");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SignupWrapper>
      <Title>회원가입</Title>
      <SnsSection>
        <SnsTitle>SNS 회원가입</SnsTitle>
        <SnsList>
          <SnsItem>
            <SnsLink className="kakao-link" href={kakao_api_url}>
              카카오로 시작하기
            </SnsLink>
          </SnsItem>
          <SnsItem>
            <SnsLink className="naver-link" href={naver_api_url}>
              네이버로 시작하기
            </SnsLink>
          </SnsItem>
          <SnsItem>
            <SnsLink className="google-link" href={google_request_url}>
              구글로 시작하기
            </SnsLink>
          </SnsItem>
        </SnsList>
      </SnsSection>
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
                  <input
                    type="text"
                    placeholder="년(4자)"
                    value={year}
                    onChange={inputYear}
                  />
                  <select
                    name="month"
                    id="month"
                    value={month}
                    onChange={inputMonth}
                  >
                    <option value="" selected>
                      월
                    </option>
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
                  <input
                    type="text"
                    placeholder="일"
                    value={day}
                    onChange={inputDay}
                  />
                </div>
              </BirthDayFormItem>
              <RadioItem radioData={radioList[0]} setStateValue={setGender} />
            </FormList>
            <CheckList>
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
            </CheckList>
          </Field>
          <SignupButton
            isActive={checkRequired() ? "isActive" : ""}
            onClick={clickLogin}
          >
            가입하기
          </SignupButton>
        </SignupForm>
      </LocalSection>
    </SignupWrapper>
  );
}

export default Signup;

const SignupWrapper = styled.div`
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

const Title = styled.h2`
  font-weight: 700;
  font-size: 50px;
`;

const SnsSection = styled.section`
  margin-top: 110px;
`;

const SnsTitle = styled.h3`
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-size: 40px;
`;

const SnsList = styled.ul`
  margin: 0;
  padding: 0;
  margin-top: 70px;
`;

const SnsItem = styled.li`
  width: 940px;
  height: 120px;
  padding: 1rem 2rem;
  margin-bottom: 35px;
`;

const SnsLink = styled.a`
  display: inline-block;
  width: 100%;
  height: 100%;
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  vertical-align: middle;
  padding: 26.5px 0;
  border-radius: 10px;
  &.kakao-link {
    background-color: #fee500;
  }
  &.naver-link {
    background-color: #03c75a;
    color: white;
  }
  &.google-link {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
`;

const LocalSection = styled.section`
  margin-top: 130px;
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
const CheckList = styled.ul`
  margin-top: 100px;
  padding-top: 70px;
  border-top: 3px solid #d9d9d9;
`;

const SignupButton = styled.button<SignupProps>`
  cursor: ${(props) =>
    props.isActive === "isActive" ? "pointer" : "not-allowed"};
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

const BirthDayFormItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 35px;

  label {
    display: inline-block;
    /* 248px 이상이면 레이아웃 깨짐  */
    width: 300px;
    text-align: right;
    font-weight: 400;
    font-size: 35px;
    margin-right: 63px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 460px;
  }
  input {
    width: 140px;
    height: 70px;
    padding: 10px 14px;
    font-size: 1rem;
    border: 2px solid #d9d9d9;
  }

  input::placeholder {
    color: black;
    font-size: 1rem;
  }

  select {
    width: 140px;
    height: 70px;
    padding: 10px 14px;
    font-size: 1rem;
    border: 2px solid #d9d9d9;
    appearance: none;
  }
`;
