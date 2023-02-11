import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { IoMdCalendar } from "react-icons/io";
import { useRouter } from "next/router";
import AgreeItem from "components/form/AgreeItem";
import RadioItem from "components/form/RadioButton";
import Input from "../../components/form/Input";
import ValidationButton from "components/form/ValidationButton";
import axiosInstance from "../../lib/api/config";

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
function Signup() {
  const router = useRouter();
  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);

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

  const [isStoryAgree, setIsStoryAgree] = useState<string>("false");

  const [snsId, setSnsId] = useState<string>("");

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

  const inputBirthday = (e: any) => {
    setBirth(e.target.value);
  };

  //이메일 중복 확인
  const checkEmailDuplication = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(
        `/api/users/checkEmail?email=${email}`,
      );

      if (response.status === 200) {
        setIsInvalidEmail(false);
        setIsValidEmail(true);
      }
    } catch (e) {
      // console.log(e);
      // 400에러일 때만 이미 존재하는 아이디 문구 띄우기
      // api 에러 해결 후 처리
      console.log(e);
      setIsInvalidEmail(true);
      setIsValidEmail(false);
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
      isValidEmail &&
      isPasswordSame &&
      name &&
      email &&
      password &&
      phoneNumber &&
      birth &&
      gender &&
      isStoryAgree
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
      snsId,
    };
    // 모든 값 필수 조건 만족시 버튼 활성화
    if (checkRequired()) {
      const response = await axios.post("/api/users/signup", data);
      console.log(response);
      if (response.status === 200) {
        router.push("/");
      }
    }
  };
  // useEffect(() => {
  //   console.log(gender, isStoryAgree);
  //   console.log(isCheckMust);
  // }, [gender, isCheckMust, isStoryAgree]);
  return (
    <SignupWrapper>
      <Title>회원가입</Title>
      <SnsSection>
        <SnsTitle>SNS 회원가입</SnsTitle>
        <SnsList>
          <SnsItem>
            <SnsLink href="#">카카오로 시작하기</SnsLink>
          </SnsItem>
          <SnsItem>
            <SnsLink href="#">000으로 시작하기</SnsLink>
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
              {email && isValidEmail ? (
                <Message>사용 가능한 이메일입니다.</Message>
              ) : (
                <> </>
              )}
              {email && isInvalidEmail ? (
                <Message>이미 사용중인 이메일입니다.</Message>
              ) : (
                <> </>
              )}
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
              <FormItem>
                <Input
                  htmlFor="birth"
                  labelContent="생년월일"
                  type="text"
                  value={birth}
                  setStateValue={inputBirthday}
                />
                <IconContainer>
                  <IoMdCalendar className="icon" />
                </IconContainer>
              </FormItem>
              <div>
                <RadioItem radioData={radioList[0]} setStateValue={setGender} />
                <RadioItem
                  radioData={radioList[1]}
                  setStateValue={setIsStoryAgree}
                />
              </div>
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
  background: #fee500;
  padding: 1rem 2rem;
  /* margin-bottom 둘 중 하나만  */
  margin-bottom: 35px;
  border-radius: 10px;
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
  /* 마진 수정하기 */
  /* gap: 50px; */
  width: 100%;
  margin-top: 35px;
`;

const IconContainer = styled.div`
  font-size: 5rem;
  color: #939393;
  height: 70px;
  margin-left: 47px;
  .icon {
    width: 100%;
    height: 100%;
  }
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
