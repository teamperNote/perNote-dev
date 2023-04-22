import React, { useState } from "react";
import PhoneNumForm from "components/form/PhoneNumForm";
import PasswordForm from "components/form/PasswordForm";

function EditPassword({ userInfo, setUserInfo, password, setPassword }) {
  const [isValidNum, setIsValidNum] = useState<boolean>(true);
  const [successAuth, setSuccessAuth] = useState<boolean>(false);

  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);
  const [isValidPwd, setIsValidPwd] = useState(false);

  return (
    <>
      <PhoneNumForm
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        successAuth={successAuth}
        setSuccessAuth={setSuccessAuth}
        isValidNum={isValidNum}
        setIsValidNum={setIsValidNum}
      />
      {successAuth && (
        <PasswordForm
          password={password}
          setPassword={setPassword}
          isValidPwd={isValidPwd}
          setIsValidPwd={setIsValidPwd}
          isSame={isPasswordSame}
          setIsSame={setIsPasswordSame}
        />
      )}
    </>
  );
}

export default EditPassword;
