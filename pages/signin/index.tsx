import styled from "styled-components";
import Link from "next/link";
import KaKaoLogin from "./kakao-login";
import GoogleLogin from "./goole-login";
import NaverLogin from "./naver-login";

// const REST_API_KEY = process.env.KAKAO_REST_API_KEY || "";
// const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || "";
function Signin() {
  return (
    <SignInContainer>
      <Pernote>per.note</Pernote>
      <LoginForm>
        <div>
          <InputContainer>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input type="text" placeholder="example@pernote.com" />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input type="password" placeholder="Enter your password" />
          </InputContainer>
          <OptionContainer>
            <div>Sign up</div>
            <div>Forget?</div>
          </OptionContainer>
          <LoginButton>Log in</LoginButton>
        </div>
      </LoginForm>
      <SocialLogin>
        <div>소셜로그인</div>
        <SocialLoginList>
          <KaKaoLogin />
          <GoogleLogin />
          <NaverLogin />
        </SocialLoginList>
      </SocialLogin>
    </SignInContainer>
  );
}

export default Signin;

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
