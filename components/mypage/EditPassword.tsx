import React, { useState } from "react";
import styled from "styled-components";
import Input from "components/form/Input";
import ValidationButton from "components/form/ValidationButton";
import PhoneNumForm from "components/form/PhoneNumForm";

function EditPassword({ userInfo, setUserInfo }) {
  const [successAuth, setSuccessAuth] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);
  const [isPasswordDiff, setIsPasswordDiff] = useState<boolean>(false);

  const inputPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const inputPasswordCheck = (e: any) => {
    setPasswordCheck(e.target.value);
  };

  return (
    <>
      <PhoneNumForm
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        successAuth={successAuth}
        setSuccessAuth={setSuccessAuth}
      />
      {successAuth && (
        <>
          <FormItem>
            <Input
              htmlFor="password"
              labelContent="변경할 비밀번호"
              type="text"
              value={password}
              setStateValue={inputPassword}
            />
          </FormItem>

          <FormItem>
            <Input
              htmlFor="passwordCheck"
              labelContent="비밀번호 확인"
              type="text"
              value={passwordCheck}
              setStateValue={inputPasswordCheck}
            />
            <ValidationButton
              click={() => {
                console.log("비밀번호 일치 확인");
              }}
            >
              확인
            </ValidationButton>
          </FormItem>
        </>
      )}
    </>
  );
}

export default EditPassword;

const FormItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 35px;
`;
