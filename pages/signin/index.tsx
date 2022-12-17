import styled from "styled-components";
import KaKaoLogin from "./kakao-login";
import GoogleLogin from "./google-login";
import NaverLogin from "./naver-login";
import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import Router, { useRouter } from "next/router";
import { useMutation } from "react-query";
import { mutate } from "swr";

const cookies = new Cookies();
function Signin() {
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

  const postLogin = async (userInfo) => {
    // const userInfo = {
    //   username: email,
    //   password,
    // };
    const response = await axios.post("/api/users/login", userInfo);
    return response;
  };

  const { mutate, isLoading, isSuccess, isError } = useMutation(postLogin, {
    onMutate: (variable) => {
      console.log("onMutate", variable);
      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onError: (error, variable, context) => {
      //   setPasswordError("비밀번호가 일치하지 않습니다.");
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
      if (data.data.message) {
        setUserError("존재하지 않는 회원입니다.");
        return;
      }
      const { user, accessToken, refreshToken } = data.data;
      cookies.set("loginToken", accessToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      // 성공시에만 홈으로 이동
      router.push("/");
    },
    onSettled: () => {
      console.log("end");
    },
  });

  const submitLogin = async (e: any) => {
    e.preventDefault();
    mutate({ username: email, password: password });
    // const data = {
    //   username: email,
    //   password,
    // };
    // try {
    //   const response = await axios.post("/api/users/login", data);
    //   if (response.data.message) {
    //     // 임시 문구
    //     setUserError("회원 정보가 존재하지 않습니다. 회원가입을 해주세요.");
    //     return;
    //   }
    //   const { user, accessToken, refreshToken } = response.data;
    //   cookies.set("loginToken", accessToken, {
    //     path: "/",
    //     secure: true,
    //     sameSite: "none",
    //   });
    //   // 성공시에만 홈으로 이동
    //   router.push("/");
    // } catch (e) {
    //   setPasswordError("비밀번호가 일치하지 않습니다.");
    // }
  };
  return (
    <SignInContainer>
      <Pernote>per.note</Pernote>
      <LoginForm>
        <div>
          <InputContainer>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              type="text"
              value={email}
              placeholder="example@pernote.com"
              onChange={inputEmail}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={inputPassword}
            />
          </InputContainer>
          {/* 비밀번호 에러처리 */}
          {userError ? <div>{userError}</div> : ""}
          {passwordError ? <div>{passwordError}</div> : ""}
          <OptionContainer>
            <div>Sign up</div>
            <div>Forget?</div>
          </OptionContainer>
          <LoginButton onClick={submitLogin}>Log in</LoginButton>
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
  height: 100vh;
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
