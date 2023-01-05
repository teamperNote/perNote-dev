import styled from "styled-components";

export default function SortDropDown() {
  return (
    <SortDropDownContainer>
      <SortName>최신순</SortName>
      <SortButton src={"/sortBtn.svg"} />
    </SortDropDownContainer>
  );
}

const SortDropDownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SortName = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: #000000;
  margin-right: 26px;
`;

const SortButton = styled.img`
  width: 20px;
  height: 20px;
`;
