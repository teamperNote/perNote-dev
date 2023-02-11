import Link from "next/link";
import React from "react";
import styled from "styled-components";
import KaKaoLogin from "./kakao-login";
import GoogleLogin from "./google-login";
import NaverLogin from "./naver-login";
import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import axiosInstance from "../../lib/api/config";

const cookies = new Cookies();
function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userError, setUserError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const inputEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const submitLogin = async (e: any) => {
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
          return;
        }
        const { user, accessToken, refreshToken } = response.data;
        console.log(accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        axiosInstance.defaults.headers.Authorization = "Bearer " + accessToken;
        // cookies.set("access_Token", accessToken, {
        //   path: "/",
        //   secure: true,
        //   sameSite: "none",
        // });
        cookies.set("refreshToken", refreshToken, {
          path: "/",
          secure: true,
          sameSite: "none",
        });
        router.push("/");
      })
      .catch((e) => {
        setPasswordError(e.response.data.message);
      });
  };

  return (
    <Container>
      <LoginBox>
        <h2 className="read-only">Login</h2>
        <LoginForm>
          <FormTitle>Per.Note</FormTitle>
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
            <span>회원가입</span>
            <SignupLink>
              <Link href="/signup">Forget?</Link>
            </SignupLink>
          </GoSignup>
          <LoginButton onClick={submitLogin}>로그인</LoginButton>
        </LoginForm>
        <SocialLogin>
          <div>소셜로그인</div>
          <SocialLoginList>
            <KaKaoLogin />
            <GoogleLogin />
            <NaverLogin />
          </SocialLoginList>
        </SocialLogin>
        {/* <div>
          <div>소셜로그인</div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div> */}
      </LoginBox>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  padding-top: 110px;
  height: 100vh;
  background: url("/perNoteBackImg.png") no-repeat left top/100% 100%;
`;

const LoginBox = styled.div`
  width: 744px;
  height: 832px;
  background: white;
  position: relative;
  left: 50%;
  transform: translate(-372px, 60px);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const FormTitle = styled.h2`
  margin: 0;
  margin-bottom: 63px;
  padding-top: 72px;
  text-align: center;
  font-weight: 700;
  font-size: 50px;
`;

const LoginForm = styled.form`
  width: 600px;
  margin: 0 auto;
`;
const InputList = styled.ul`
  width: 600px;
  list-style-type: none;
  padding: 0;
`;

const InputItem = styled.li`
  margin-bottom: 30px;
`;

const InputLabel = styled.label`
  display: block;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 21px;
  color: #707070;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 0 10px 4px;
  border: none;
  border-bottom: 1px solid #707070;
  &::placeholder {
    font-weight: 400;
    font-size: 20px;
    color: #b9b9b9;
  }
`;

const GoSignup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  color: #707070;
  font-weight: 400;
  font-size: 20px;
`;

const SignupLink = styled.span`
  cursor: pointer;
`;
const LoginButton = styled.button`
  width: 100%;
  height: 90px;
  margin-bottom: 50px;
  border: none;
  border-radius: 100px;
  background: #525d4d;
  font-weight: 400;
  font-size: 30px;
  color: white;
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #707070;
  font-weight: 400;
  font-size: 20px;
`;

const SocialLoginList = styled.ul`
  margin: 0;
  padding: 0;
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
