import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { IoMdCalendar } from "react-icons/io";
import { useRouter } from "next/router";
import AgreeItem from "components/AgreeItem";

interface LoginProps {
  isActive: string;
}

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

  const [isAgree, setIsAgree] = useState<boolean>(false);

  const [snsId, setSnsId] = useState<string>("");

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

  const selectGender = (e: any) => {
    setGender(e.target.value);
  };

  const changeAgree = (e: any) => {
    if (e.target.value === "yes") {
      setIsAgree(true);
    }
    if (e.target.value === "no") {
      setIsAgree(false);
    }
  };
  const checkEmailDuplication = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/users/checkEmail?email=${email}`);
      console.log(response);
      if (response.status === 200) {
        setIsInvalidEmail(false);
        setIsValidEmail(true);
      }
    } catch (e) {
      // console.log(e);
      // 400에러일 때만 이미 존재하는 아이디 문구 띄우기
      // api 에러 해결 후 처리
      setIsValidEmail(false);
      setIsInvalidEmail(true);
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
      isAgree
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
      if (response.data.status === 200) {
        router.push("/");
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
                <FormLabel htmlFor="name">이름</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  value={name}
                  onChange={inputName}
                  required
                />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="email">이메일</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  value={email}
                  onChange={inputEmail}
                  required
                />
                <FormButton onClick={checkEmailDuplication}>
                  중복확인
                </FormButton>
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
                <FormLabel htmlFor="password">비밀번호</FormLabel>
                <FormInput
                  type="password"
                  id="password"
                  value={password}
                  onChange={inputPassword}
                  required
                />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="pwdCheck">비밀번호 확인</FormLabel>
                <FormInput
                  type="password"
                  id="pwdCheck"
                  value={checkPassword}
                  onChange={inputCheckPassword}
                  required
                />
                <FormButton onClick={checkSamePassword}>확인</FormButton>
              </FormItem>
              <Message>*최소 8자리 이상, 대소문자, 숫자 포함</Message>
              {password && checkPassword && isPasswordSame ? (
                <Message>일치</Message>
              ) : (
                <></>
              )}
              {isPasswordDiff ? <Message>불일치</Message> : <></>}
              <FormItem>
                <FormLabel htmlFor="phone">전화번호</FormLabel>
                <FormInput
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={inputPhoneNumber}
                  required
                />
                <FormButton onClick={sendAuthMessage}>
                  {isSendMessage ? "재발송" : "인증하기"}
                </FormButton>
              </FormItem>
              {isSendMessage ? (
                <FormItem>
                  <FormLabel htmlFor="checkPhone">인증번호</FormLabel>
                  <FormInput
                    id="checkPhone"
                    type="text"
                    value={authNum}
                    onChange={inputAuthNumber}
                  />
                  <FormButton onClick={verifyPhoneNum}>확인</FormButton>
                </FormItem>
              ) : (
                <></>
              )}
              {successAuth ? <Message>전화번호 인증 성공</Message> : <></>}
              {failAuth ? <Message>전화번호 인증 실패</Message> : <></>}
              <FormItem>
                <FormLabel htmlFor="birth">생년월일</FormLabel>
                <FormInput
                  type="text"
                  id="birth"
                  value={birth}
                  onChange={inputBirthday}
                  required
                />
                <IconContainer>
                  <IoMdCalendar className="icon" />
                </IconContainer>
              </FormItem>
              <RadioItem>
                <FormLabel>성별</FormLabel>
                <RadioButton onChange={selectGender}>
                  <input id="male" type="radio" name="gender" value="male" />
                  <label htmlFor="male">남성</label>
                </RadioButton>
                <RadioButton onChange={selectGender}>
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                  />
                  <label htmlFor="female">여성</label>
                </RadioButton>
              </RadioItem>
              <RadioItem>
                <FormLabel>스토리 수신 여부</FormLabel>
                <RadioButton onChange={changeAgree}>
                  <input id="agree" type="radio" name="story" value="yes" />
                  <label htmlFor="agree">동의</label>
                </RadioButton>
                <RadioButton onChange={changeAgree}>
                  <input id="disagree" type="radio" name="story" value="no" />
                  <label htmlFor="disagree">비동의</label>
                </RadioButton>
              </RadioItem>
            </FormList>
            <CheckList>
              <AgreeItem />
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
  margin-top: 180px;
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
  background: #d9d9d9;
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
  background: #fff;
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

const FormLabel = styled.label`
  display: inline-block;
  width: 300px;
  text-align: right;
  font-weight: 400;
  font-size: 35px;
  margin-right: 63px;
`;

// 에러 메세지 출력까지 구현하고 border-top 잘리는 거 수정하기
const FormInput = styled.input`
  border: 2px solid #d9d9d9;
  width: 460px;
  height: 70px;
  /* 텍스트 및 패딩 마진 디자인 추가하기 */
  padding: 8px 0 8px 4px;
  font-size: 30px;
`;

const FormButton = styled.button`
  width: 150px;
  height: 70px;
  background: transparent;
  border: 2px solid #d9d9d9;
  font-weight: 400;
  font-size: 30px;
  margin-left: 47px;
`;

const RadioItem = styled.li`
  /* background: pink; */
  display: flex;
  margin-top: 35px;
`;

const RadioButton = styled.div`
  font-weight: 400;
  font-size: 30px;
  margin-right: 35px;
  display: flex;
  align-items: center;
  input {
    width: 30px;
    height: 30px;
    margin-right: 26px;
  }

  label {
    padding-top: 4px;
  }
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

const SignupButton = styled.button<LoginProps>`
  width: 800px;
  height: 120px;
  border: none;
  background: #525d4d;
  background: ${(props) =>
    props.isActive === "isActive" ? "#525d4d" : "#d9d9d9"};
  border-radius: 20px;
  color: ${(props) => (props.isActive === "isActive" ? "white" : "#616161")};
  font-weight: 400;
  font-size: 40px;
  margin-top: 93px;
`;
