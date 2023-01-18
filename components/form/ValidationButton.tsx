import React, { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  click: (e: any) => void;
  children: ReactNode;
}
function ValidationButton({ click, children }: ButtonProps) {
  return <FormButton onClick={click}>{children}</FormButton>;
}

export default ValidationButton;
const FormButton = styled.button`
  width: 150px;
  height: 70px;
  background: transparent;
  border: 2px solid #d9d9d9;
  font-weight: 400;
  font-size: 30px;
  margin-left: 47px;
`;
