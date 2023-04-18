import React from "react";
import styled from "styled-components";
import Input from "./Input";
function NameForm({ userInfo, setUserInfo }) {
  const name = typeof userInfo === "object" ? userInfo.name : userInfo;

  const inputName = (e: any) => {
    if (typeof userInfo === "object") {
      setUserInfo({ ...userInfo, name: e.target.value });
    } else {
      setUserInfo(e.target.value);
    }
  };

  return (
    <FormItem>
      <Input
        htmlFor="name"
        labelContent="이름"
        type="text"
        value={name}
        setStateValue={inputName}
      />
    </FormItem>
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
