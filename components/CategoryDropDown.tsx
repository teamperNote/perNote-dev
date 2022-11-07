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
  border: 1px solid black;
  border-radius: 10px;
  padding-top: 41px;

  div {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    font-weight: 400;
    font-size: 20px;
  }
`;
