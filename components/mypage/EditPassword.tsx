import React, { useState } from "react";
import styled from "styled-components";
import PhoneNumForm from "components/form/PhoneNumForm";
import PasswordForm from "components/form/PasswordForm";

function EditPassword({ userInfo, setUserInfo }) {
  const [successAuth, setSuccessAuth] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);

  return (
    <>
      <PhoneNumForm
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        successAuth={successAuth}
        setSuccessAuth={setSuccessAuth}
      />
      {successAuth && (
        <PasswordForm
          password={password}
          setPassword={setPassword}
          isSame={isPasswordSame}
          setIsSame={setIsPasswordSame}
        />
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
