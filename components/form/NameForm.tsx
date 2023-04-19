import React from "react";
import styled from "styled-components";
import Input from "./Input";
import { checkValidation } from "utils/checkValidation";
function NameForm({ userInfo, setUserInfo, isValidName, setIsValidName }) {
  const regex = /^[가-힣]{2,10}$/;
  const name = typeof userInfo === "object" ? userInfo.name : userInfo;

  const inputName = (e: any) => {
    const isValid = checkValidation(regex, e.target.value);
    if (isValid) setIsValidName(true);
    else setIsValidName(false);

    if (typeof userInfo === "object") {
      setUserInfo({ ...userInfo, name: e.target.value });
    } else {
      setUserInfo(e.target.value);
    }
  };

  return (
    <>
      <FormItem>
        <Input
          htmlFor="name"
          labelContent="이름"
          type="text"
          value={name}
          setStateValue={inputName}
        />
      </FormItem>
      {!isValidName && <Message>한글 2-10자로 입력해 주세요.</Message>}
    </>
  );
}

export default NameForm;
const FormItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Message = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 1rem;
  padding-left: 184px;
  @media screen and (max-width: 480px) {
    padding-left: 60px;
    font-size: 0.8rem;
  }
`;
