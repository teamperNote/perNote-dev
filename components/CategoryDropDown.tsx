import React from "react";
import styled from "styled-components";
const CategoryDropDown = ({ openDropDown, closeDropDown }: any) => {
  return (
    <DropDownContainer onMouseOver={openDropDown} onMouseLeave={closeDropDown}>
      <div>노트</div>
      <div>브랜드</div>
      <div>성격</div>
      <div>특징</div>
    </DropDownContainer>
  );
};

export default CategoryDropDown;

const DropDownContainer = styled.div`
  width: 184px;
  height: 288px;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  div {
    font-weight: 400;
    font-size: 20px;
  }
`;
