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
        <SortName className="regular f20">
          {sortArray.find((x) => x.value === sort).text}
        </SortName>
        <ImageBox>
          <Image src={"/sortBtn.svg"} alt={"정렬 아이콘"} layout="fill" />
        </ImageBox>
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
              <DropDownSpan className="regular f20">{data.text}</DropDownSpan>
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

const ImageBox = styled.div`
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
`;

const SortBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.9375rem;
  cursor: pointer;
`;

const SortName = styled.div`
  margin-right: 1.625rem;
  width: 6.25rem;
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10.25rem;
  background: var(--white-color);
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 0.625rem;
  position: absolute;
  left: -0.5625rem;
  z-index: 10;
`;

const DropDownBox = styled.div`
  padding: 0.9375rem;
  cursor: pointer;
`;

const DropDownSpan = styled.span`
  text-align: center;
`;
