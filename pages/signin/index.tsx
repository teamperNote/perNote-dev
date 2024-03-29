import Link from "next/link";
import React from "react";
import styled from "styled-components";
import KaKaoLogin from "./kakao-login";
import GoogleLogin from "./google-login";
import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import WarningModal from "components/WarningModal/WarningModal";
import { useRecoilState } from "recoil";
import { loginState } from "@store/loginState";
import ModalWrapper from "components/WarningModal/Portal";

const cookies = new Cookies();
function Login() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userError, setUserError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const inputEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const clickOuterModal = (e: any) => {
    if (e.target.type) {
      setShowErrorModal(false);
    }
  };
  const submitLogin = async (e: any) => {
    setUserError("");
    setPasswordError("");
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };
    axios
      .post("/api/users/login", userInfo)
      .then((response) => {
        if (response.data.message) {
          setUserError("존재하지 않는 사용자입니다.");
          setShowErrorModal(true);
          return;
        }
        const { user, accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        cookies.set("refreshToken", refreshToken, {
          path: "/",
          secure: true,
          sameSite: "none",
        });
        setLoginInfo(user.email);
        router.push("/");
      })
      .catch((e) => {
        setPasswordError(e.response.data.message);
        setShowErrorModal(true);
      });
  };

  return (
    <Container>
      <LoginBox>
        <h2 className="read-only">Login</h2>
        <LoginForm>
          <InputList>
            <InputItem>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="text"
                value={email}
                placeholder="example@pernote.com"
                onChange={inputEmail}
              />
            </InputItem>
            <InputItem>
              <InputLabel htmlFor="password">password</InputLabel>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={inputPassword}
              />
            </InputItem>
            {/* 비밀번호 에러처리 */}
            {userError ? <div>{userError}</div> : ""}
            {passwordError ? <div>{passwordError}</div> : ""}
          </InputList>
          <GoSignup>
            <span></span>
            <SignupLink>
              <Link href="/signup">회원가입</Link>
            </SignupLink>
          </GoSignup>
          <LoginButton onClick={submitLogin}>로그인</LoginButton>
        </LoginForm>
        <SocialLogin>
          <KaKaoLogin />
        </SocialLogin>
      </LoginBox>
      {showErrorModal && (
        <ModalWrapper>
          <WarningModal
            title={"로그인 실패"}
            content={userError ? userError : passwordError ? passwordError : ""}
            onClick={clickOuterModal}
          />
        </ModalWrapper>
      )}
    </Container>
  );
}

export default Login;

const Container = styled.div`
  padding-top: 140px;
  height: 1040px;
  background: url("/perNoteBackImg.png") no-repeat left top/100% 100%;
`;

const LoginBox = styled.div`
  padding: 63px 0;
  width: 744px;
  background: white;
  position: relative;
  left: 50%;
  transform: translate(-50%, 60px);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media screen and (max-width: 1440px) {
    width: 500px;
  }
  @media screen and (max-width: 480px) {
    width: 320px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 0 auto;
  @media screen and (max-width: 1440px) {
    width: 456px;
  }
  @media screen and (max-width: 480px) {
    width: 300px;
  }
`;
const InputList = styled.ul`
  width: 600px;
  list-style-type: none;
  padding: 0;
  @media screen and (max-width: 1440px) {
    width: 456px;
  }
  @media screen and (max-width: 480px) {
    width: 300px;
  }
`;

const InputItem = styled.li`
  margin-bottom: 30px;
`;

const InputLabel = styled.label`
  display: block;
  font-weight: 400;
  font-size: 1.25rem;
  margin-bottom: 21px;
  color: #707070;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 0 10px 4px;
  border: none;
  border-bottom: 1px solid #707070;
  font-weight: 400;
  font-size: 1.25rem;
  &::placeholder {
    font-weight: 400;
    font-size: 1.25rem;
    color: #b9b9b9;
  }
`;

const GoSignup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  color: #707070;
  font-weight: 400;
  font-size: 1.25rem;
`;

const SignupLink = styled.span`
  cursor: pointer;
`;
const LoginButton = styled.button`
  cursor: pointer;
  /* width: 100%;
  height: 90px; */
  width: 300px;
  height: 45px;
  margin-bottom: 50px;
  border: none;
  border-radius: 100px;
  background: #525d4d;
  font-weight: 400;
  font-size: 1.875rem;
  color: white;
  @media screen and (max-width: 1440px) {
    height: 70px;
  }
  @media screen and (max-width: 480px) {
    height: 40px;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
`;
