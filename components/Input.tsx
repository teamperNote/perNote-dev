import React from "react";
import styled from "styled-components";

interface InputProps {
  htmlFor: string;
  labelContent: string;
  type: string;
  value: string;
  setStateValue: (e: any) => void;
}
function Input({
  htmlFor,
  labelContent,
  type,
  value,
  setStateValue,
}: InputProps) {
  return (
    <div>
      <FormLabel htmlFor={htmlFor}>{labelContent}</FormLabel>
      <FormInput
        type={type}
        id={htmlFor}
        value={value}
        onChange={setStateValue}
        required
      />
    </div>
  );
}

export default Input;

const FormLabel = styled.label`
  display: inline-block;
  width: 300px;
  text-align: right;
  font-weight: 400;
  font-size: 35px;
  margin-right: 63px;
`;

// 에러 메세지 출력까지 구현하고 border-top 잘리는 거 수정하기
const FormInput = styled.input`
  border: 2px solid #d9d9d9;
  width: 460px;
  height: 70px;
  /* 텍스트 및 패딩 마진 디자인 추가하기 */
  padding: 8px 0 8px 4px;
  font-size: 30px;
`;
