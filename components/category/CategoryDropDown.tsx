import Link from "next/link";
import styled from "styled-components";
import { categoryArray } from "lib/modules";

export default function CategoryDropDown({ setIsDropDownOpen }) {
  return (
    <DropDownContainer
      onMouseOver={() => setIsDropDownOpen(true)}
      onMouseLeave={() => setIsDropDownOpen(false)}
    >
      {categoryArray.map((category) => (
        <Div key={category.id} onClick={() => setIsDropDownOpen(false)}>
          <Link href={`/category/${category.url}`}>{category.text}</Link>
        </Div>
      ))}
    </DropDownContainer>
  );
}

const DropDownContainer = styled.div`
  width: 184px;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const Div = styled.div`
  width: 100%;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
  color: #000000;
  padding: 5px 0;
  margin: 10px 0;
  cursor: pointer;
`;
