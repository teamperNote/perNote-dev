import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { sortArray } from "lib/modules";

export default function SortDropDown({ sort, setSort }) {
  const [isShowDropDown, SetIsShowDropDown] = useState(false);

  const DropDownRef = useRef();
  useEffect(() => {
    // 모달 영역 외 클릭 시 종료
    const handleCloseModal = (e) => {
      if (!DropDownRef.current || !DropDownRef.current.contains(e.target)) {
        SetIsShowDropDown(false);
      }
    };
    window.addEventListener("click", handleCloseModal);
    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  }, []);
  return (
    <SortDropDownContainer ref={DropDownRef}>
      <SortBox onClick={() => SetIsShowDropDown(!isShowDropDown)}>
        <SortName>{sortArray.find((x) => x.id === sort).text}</SortName>
        <SortButton src={"/sortBtn.svg"} />
      </SortBox>
      {isShowDropDown && (
        <DropDownContainer>
          {sortArray.map((data) => (
            <DropDownBox
              key={data.id}
              onClick={() => {
                SetIsShowDropDown(false);
                setSort(data.id);
              }}
            >
              <DropDownSpan>{data.text}</DropDownSpan>
            </DropDownBox>
          ))}
        </DropDownContainer>
      )}
    </SortDropDownContainer>
  );
}

const SortDropDownContainer = styled.div`
  position: relative;
`;

const SortBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  cursor: pointer;
`;

const SortName = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: #000000;
  margin-right: 26px;
  width: 100px;
`;

const SortButton = styled.img`
  width: 20px;
  height: 20px;
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 164px;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 10px;
  position: absolute;
  left: -9px;
  z-index: 10;
`;

const DropDownBox = styled.div`
  padding: 15px;
  cursor: pointer;
`;

const DropDownSpan = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
  color: #000000;
`;
