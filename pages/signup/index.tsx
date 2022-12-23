import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { IoMdCalendar, IoIosCheckboxOutline } from "react-icons/io";

function Signup() {
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
  const [authNumber, setAuthNumber] = useState<string>("");
  const [inputAuthNumber, setInputAuthNumber] = useState<string>("");
  const [successAuth, setSuccessAuth] = useState<boolean>(false);
  const [failAuth, setFailAuth] = useState<boolean>(false);

  const [birth, setBirth] = useState<string>("");

  const [gender, setGender] = useState<string>("");

  const [snsId, setSnsId] = useState<string>("");

  const onNameChange = (e: any) => {
    setName(e.target.value);
  };
  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onCheckPasswordChange = (e: any) => {
    setCheckPassword(e.target.value);
  };

  const onPhoneNumberChange = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const onBirthChange = (e: any) => {
    setBirth(e.target.value);
  };

  const onGenderChange = (e: any) => {
    setGender(e.target.value);
  };

  const onCheckEmailDuplicate = async (e: any) => {
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

  const onCheckSamePassword = async (e: any) => {
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
    setAuthNumber(authNumber);
  };

  const onAuthNumChange = (e: any) => {
    setInputAuthNumber(e.target.value);
  };
  const convertBirth = (prevBirth: string) => {
    const year = Number(prevBirth.slice(0, 4));
    const month = Number(prevBirth.slice(4, 6));
    const day = Number(prevBirth.slice(6, 8));
    const birthday = new Date(year, month - 1, day + 1);
    return birthday;
  };

  const onNumAuth = (e: any) => {
    e.preventDefault();
    console.log(typeof authNumber);
    console.log(typeof inputAuthNumber);
    if (authNumber.toString() === inputAuthNumber) {
      setFailAuth(false);
      setSuccessAuth(true);
    } else {
      setSuccessAuth(false);
      setFailAuth(true);
    }
  };
  const onClickLoginButton = async (e: any) => {
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
    const response = await axios.post("/api/users/signup", data);
    console.log(response.data);
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
            <legend className="a11y-hidden">일반 회원가입</legend>
            <LocalTitle>일반 회원가입</LocalTitle>
            <FormList>
              <FormItem>
                <FormLabel htmlFor="name">이름</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  value={name}
                  onChange={onNameChange}
                  required
                />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="email">이메일</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  value={email}
                  onChange={onEmailChange}
                  required
                />
                <FormButton onClick={onCheckEmailDuplicate}>
                  중복확인
                </FormButton>
              </FormItem>
              {isValidEmail ? (
                <Message>사용 가능한 이메일입니다.</Message>
              ) : (
                <> </>
              )}
              {isInvalidEmail ? (
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
                  onChange={onPasswordChange}
                  required
                />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="pwdCheck">비밀번호 확인</FormLabel>
                <FormInput
                  type="password"
                  id="pwdCheck"
                  value={checkPassword}
                  onChange={onCheckPasswordChange}
                  required
                />
                <FormButton onClick={onCheckSamePassword}>확인</FormButton>
              </FormItem>
              <Message>*최소 8자리 이상, 대소문자, 숫자 포함</Message>
              {isPasswordSame ? <Message>일치</Message> : <></>}
              {isPasswordDiff ? <Message>불일치</Message> : <></>}
              <FormItem>
                <FormLabel htmlFor="phone">전화번호</FormLabel>
                <FormInput
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={onPhoneNumberChange}
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
                    value={inputAuthNumber}
                    onChange={onAuthNumChange}
                  />
                  <FormButton onClick={onNumAuth}>확인</FormButton>
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
                  onChange={onBirthChange}
                  required
                />
                <IconContainer>
                  <IoMdCalendar className="icon" />
                </IconContainer>
              </FormItem>
              <RadioItem>
                <FormLabel>성별</FormLabel>
                <RadioButton>
                  <input type="radio" name="gender" value="male" />
                  남성
                </RadioButton>
                <RadioButton>
                  <input type="radio" name="gender" value="female" />
                  여성
                </RadioButton>
              </RadioItem>
              <RadioItem>
                <FormLabel>스토리 수신 여부</FormLabel>
                <RadioButton>
                  <input type="radio" name="story" value="yes" />
                  동의
                </RadioButton>
                <RadioButton>
                  <input type="radio" name="story" value="no" />
                  비동의
                </RadioButton>
              </RadioItem>
            </FormList>
            <CheckList>
              <CheckItem>
                <label htmlFor="agree_all"></label>
                <CheckIcon>
                  <IoIosCheckboxOutline className="check-icon" />
                </CheckIcon>
                <input
                  type="checkbox"
                  name="agree_all"
                  id="agree_all"
                  className="a11y-hidden"
                />
                <AllCheck>약관 전체 동의</AllCheck>
              </CheckItem>
              <CheckItem>
                <label htmlFor="agree"></label>
                <CheckIcon>
                  <IoIosCheckboxOutline className="check-icon" />
                </CheckIcon>
                <input
                  type="checkbox"
                  name="agree"
                  id="agree"
                  className="a11y-hidden"
                />
                <CheckText>[필수] 이용약관 동의</CheckText>
                <MoreText>보기</MoreText>
              </CheckItem>
              <CheckItem>
                <label htmlFor="agree"></label>
                <CheckIcon>
                  <IoIosCheckboxOutline className="check-icon" />
                </CheckIcon>
                <input
                  type="checkbox"
                  name="agree"
                  id="agree"
                  className="a11y-hidden"
                />
                <CheckText>[필수] 개인정보 수집 및 이용 동의</CheckText>
                <MoreText>보기</MoreText>
              </CheckItem>
              <CheckItem>
                <label htmlFor="agree"></label>
                <CheckIcon>
                  <IoIosCheckboxOutline className="check-icon" />
                </CheckIcon>
                <input
                  type="checkbox"
                  name="agree"
                  id="agree"
                  className="a11y-hidden"
                />
                <CheckText>[선택] 광고성 메세지 수신 동의</CheckText>
                <MoreText>보기</MoreText>
              </CheckItem>
              <CheckItem>
                <label htmlFor="agree"></label>
                <CheckIcon>
                  <IoIosCheckboxOutline className="check-icon" />
                </CheckIcon>
                <input
                  type="checkbox"
                  name="agree"
                  id="agree"
                  className="a11y-hidden"
                />
                <CheckText>[선택] 마케팅 정보 수집 동의</CheckText>
                <MoreText>보기</MoreText>
              </CheckItem>
            </CheckList>
          </Field>
          <SignupButton onClick={onClickLoginButton}>가입하기</SignupButton>
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
  }
  .a11y-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
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
  input {
    width: 30px;
    height: 30px;
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
  padding-left: 350px;
`;
const CheckList = styled.ul`
  margin-top: 100px;
  padding-top: 70px;
  border-top: 3px solid #d9d9d9;
`;

// 약관 동의 부분 위 마진 설정하기
const CheckItem = styled.li`
  width: 100%;
  margin: 17px 0;
  padding: 0 70px;
  display: flex;
  align-items: center;
`;

const CheckIcon = styled.div`
  width: 55px;
  height: 55px;
  margin-right: 70px;
  .check-icon {
    width: 100%;
    height: 100%;
  }
`;

const AllCheck = styled.span`
  font-weight: 700;
  font-size: 35px;
`;
const CheckText = styled.span`
  font-weight: 400;
  font-size: 30px;
  flex-grow: 1;
`;

const MoreText = styled.span`
  font-weight: 400;
  font-size: 30px;
  display: inline-block;
  text-align: right;
`;
const SignupButton = styled.button`
  width: 800px;
  height: 120px;
  background: #525d4d;
  border-radius: 20px;
  color: white;
  font-weight: 400;
  font-size: 40px;
  margin-top: 93px;
`;
