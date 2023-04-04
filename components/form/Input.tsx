import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

interface InputProps {
  htmlFor: string;
  labelContent: string;
  type: string;
  value: string;
  setStateValue: (e: any) => void;
}

interface MarginProps {
  marginProps: string;
}
function Input({
  htmlFor,
  labelContent,
  type,
  value,
  setStateValue,
}: InputProps) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div>
      <FormLabel htmlFor={htmlFor} marginProps={pathname}>
        {labelContent}
      </FormLabel>
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

const FormLabel = styled.label<MarginProps>`
  display: inline-block;
  width: 120px;
  text-align: left;
  font-weight: 400;
  font-size: 1.25rem;
  margin-right: 63px;
`;

const FormInput = styled.input`
  border: 2px solid #d9d9d9;
  width: 333px;
  height: 46px;
  padding: 8px 0 8px 4px;
  font-size: 1.25rem;
`;
