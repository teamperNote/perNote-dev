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
  width: 120px;
  height: 44px;
  background: transparent;
  border: 2px solid #d9d9d9;
  font-weight: 400;
  font-size: 1rem;
  margin-left: 47px;
`;
