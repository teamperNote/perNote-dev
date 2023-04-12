import React from "react";
import styled from "styled-components";
import { InputType } from "lib/types";

function Input({
  htmlFor,
  labelContent,
  type,
  value,
  setStateValue,
}: InputType) {
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
  width: 130px;
  text-align: left;
  font-weight: 400;
  font-size: 1.25rem;
  margin-right: 63px;
  @media screen and (max-width: 1440px) {
    width: 120px;
  }
  @media screen and (max-width: 480px) {
    width: 50px;
    margin-right: 10px;
    font-size: 1rem;
  }
`;

const FormInput = styled.input`
  border: 2px solid #d9d9d9;
  width: 333px;
  height: 46px;
  padding: 8px 0 8px 4px;
  font-size: 1.25rem;
  @media screen and (max-width: 480px) {
    width: 160px;
  }
`;
