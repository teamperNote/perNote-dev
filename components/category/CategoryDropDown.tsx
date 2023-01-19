import Link from "next/link";
import styled from "styled-components";
import { categoryArray } from "lib/modules";

export default function CategoryDropDown({ openDropDown, closeDropDown }: any) {
  return (
    <DropDownContainer onMouseOver={openDropDown} onMouseLeave={closeDropDown}>
      {categoryArray.map((data) => (
        <Div key={data.id} onClick={closeDropDown}>
          <Link href={`/category/${data.url}`}>{data.text}</Link>
        </Div>
      ))}
    </DropDownContainer>
  );
}

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
