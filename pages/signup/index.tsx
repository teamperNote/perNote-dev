import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onPhoneNumberChange = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const onClickLoginButton = async (e: any) => {
    e.preventDefault();
    const data = {
      email,
      name,
      password,
      phoneNumber,
    };

    const response = await axios.post("/api/users/signup", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(response.data);
  };
  return (
    <SignInContainer>
      <Pernote>임시 회원가입</Pernote>
      <LoginForm>
        <div>
          <InputContainer>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              type="text"
              placeholder="example@pernote.com"
              value={email}
              onChange={onEmailChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              type="text"
              placeholder="SOMIN"
              value={name}
              onChange={onNameChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              autoComplete="on"
              onChange={onPasswordChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="phone">P.H</InputLabel>
            <Input
              type="text"
              placeholder="010-0000-0000"
              value={phoneNumber}
              onChange={onPhoneNumberChange}
            />
          </InputContainer>
          <OptionContainer>
            <div>Sign in</div>
          </OptionContainer>
          <LoginButton onClick={onClickLoginButton}>Log in</LoginButton>
        </div>
      </LoginForm>
      <SocialLogin>
        <div>소셜로그인</div>
        <SocialLoginList>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </SocialLoginList>
      </SocialLogin>
    </SignInContainer>
  );
}

export default SignupPage;

const SignInContainer = styled.div`
  height: 100%;
  background-color: #eaeaea;
  padding-top: 86.34px;
  padding-bottom: 143.56px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pernote = styled.div`
  font-weight: 700;
  font-size: 50px;
`;

const LoginForm = styled.form`
  margin-top: 83.06px;
  margin-bottom: 47.04px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-weight: 400;
  font-size: 20px;
  color: #707070;
  margin-bottom: 33.61px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #707070;
  background-color: transparent;
  font-weight: 400;
  font-size: 20px;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #707070;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 42.3px;
`;

const LoginButton = styled.button`
  width: 600px;
  height: 90px;
  background: #b3b3b3;
  border: none;
  border-radius: 100px;
  font-weight: 400;
  font-size: 30px;
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #707070;
  font-weight: 400;
  font-size: 20px;
`;

const SocialLoginList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 28.66px;

  div {
    width: 90px;
    height: 90px;
    background-color: #d9d9d9;
    border-radius: 70px;
  }

  div:not(:last-child) {
    margin-right: 27px;
  }
`;
