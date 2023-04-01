import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { sortArray } from "lib/arrays";

export default function SortDropDown({ sort, setSort }) {
  const router = useRouter();
  const { pathname } = router;

  // 드랍다운 표시 여부
  const [isShowDropDown, SetIsShowDropDown] = useState(false);
  const DropDownRef = useRef<HTMLDivElement>();
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
        <SortName>{sortArray.find((x) => x.value === sort).text}</SortName>
        <Image
          src={"/sortBtn.svg"}
          alt={"정렬 아이콘"}
          width={20}
          height={20}
        />
      </SortBox>
      {isShowDropDown && (
        <DropDownContainer>
          {(pathname == "/perfume-story"
            ? sortArray.slice(0, 3)
            : sortArray
          ).map((data) => (
            <DropDownBox
              key={data.id}
              onClick={() => {
                SetIsShowDropDown(false);
                setSort(data.value);
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

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 164px;
  background: var(--white-color);
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
