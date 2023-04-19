import React, { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  isActive: boolean;
  click: (e: any) => void;
  children: ReactNode;
}
function ValidationButton({ isActive, click, children }: ButtonProps) {
  return (
    <FormButton onClick={click} isActive={isActive}>
      {children}
    </FormButton>
  );
}

export default ValidationButton;
const FormButton = styled.button<{ isActive: boolean }>`
  cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
  width: 120px;
  height: 44px;
  background: ${(props) => (props.isActive ? "#9fac9a" : "#d9d9d9")};
  font-weight: 400;
  font-size: 1rem;
  margin-left: 47px;
  color: ${(props) => (props.isActive ? "white" : "#616161")};
  @media screen and (max-width: 480px) {
    width: 60px;
    margin-left: 10px;
  }
`;
