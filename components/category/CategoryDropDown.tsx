import Link from "next/link";
import styled from "styled-components";
import { categoryArray } from "lib/arrays";

export default function CategoryDropDown({ setIsDropDownOpen }) {
  return (
    <DropDownContainer
      onMouseOver={() => setIsDropDownOpen(true)}
      onMouseLeave={() => setIsDropDownOpen(false)}
    >
      {categoryArray.map((category) => (
        <Link href={`/category/${category.url}`} key={category.id}>
          <Div onClick={() => setIsDropDownOpen(false)}>{category.text}</Div>
        </Link>
      ))}
    </DropDownContainer>
  );
}

const DropDownContainer = styled.div`
  width: 184px;
  background-color: var(--white-color);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: default;

  position: absolute;
  top: 69px;
  left: -34.4px;
  z-index: 1000;
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
