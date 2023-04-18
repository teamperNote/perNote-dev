import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import AgreeItem from "components/form/AgreeItem";
import RadioItem from "components/form/RadioButton";
import Input from "../../components/form/Input";
import ModalWrapper from "components/WarningModal/Portal";
import WarningModal from "components/WarningModal/WarningModal";
import { SignupType } from "lib/types";
import { agreeList, radioButtonArray } from "lib/arrays";
import PhoneNumForm from "components/form/PhoneNumForm";
import PasswordForm from "components/form/PasswordForm";
import EmailForm from "components/form/EmailForm";

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

  const [password, setPassword] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [successAuth, setSuccessAuth] = useState<boolean>(false);

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

  const convertBirth = (year: string, month: string, day: string) => {
    const convertYear = Number(year);
    const convertMonth = Number(month);
    const convertDay = Number(day);
    const birthday = new Date(convertYear, convertMonth - 1, convertDay + 1);
    return birthday;
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
              <EmailForm
                userInfo={email}
                setUserInfo={setEmail}
                isValidEmail={isValidEmail}
                setIsValidEmail={setIsValidEmail}
              />
              <PasswordForm
                password={password}
                setPassword={setPassword}
                isSame={isPasswordSame}
                setIsSame={setIsPasswordSame}
              />
              <PhoneNumForm
                userInfo={phoneNumber}
                setUserInfo={setPhoneNumber}
                successAuth={successAuth}
                setSuccessAuth={setSuccessAuth}
              />
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
    width: 130px;
    text-align: left;
    font-weight: 400;
    font-size: 1.25rem;
    margin-right: 63px;
    @media screen and (max-width: 1440px) {
      width: 120px;
    }
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
