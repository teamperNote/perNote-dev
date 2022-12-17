import Link from "next/link";
import React from "react";
import styled from "styled-components";
const CategoryDropDown = ({ openDropDown, closeDropDown }: any) => {
  return (
    <DropDownContainer onMouseOver={openDropDown} onMouseLeave={closeDropDown}>
      {categoryUrl.map((data) => (
        <Div key={data.id} onClick={closeDropDown}>
          <Link href={data.value}>{data.text}</Link>
        </Div>
      ))}
    </DropDownContainer>
  );
};

export default CategoryDropDown;

const DropDownContainer = styled.div`
  width: 184px;
  height: 266px;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Div = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
  color: #000000; ;
`;

const categoryUrl = [
  {
    id: 0,
    value: "/category/note",
    text: "노트",
  },
  {
    id: 1,
    value: "/category/brand",
    text: "브랜드",
  },
  {
    id: 2,
    value: "/category/personality",
    text: "성격",
  },
  {
    id: 3,
    value: "/category/characteristics",
    text: "특징",
  },
];
