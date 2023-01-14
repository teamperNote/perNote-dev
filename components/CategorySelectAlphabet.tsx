import styled from "styled-components";

export default function CategorySelectAlphabet({
  data,
  selected,
  setSelected,
}) {
  const onBtnClick = () => {
    setSelected(data.value);
  };
  return (
    <AlphabetBox
      onClick={onBtnClick}
      className={selected == data.value ? "focus" : "noo"}
    >
      <AlphabetSpan className={selected == data.value ? "focus" : ""}>
        {data.text}
      </AlphabetSpan>
    </AlphabetBox>
  );
}

const AlphabetBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 51.16px;
  height: 51.16px;
  margin-right: 3.84px;
  cursor: pointer;
  &.focus {
    border-radius: 100%;
    background: var(--primary-color);
  }
  &:last-child {
    margin-right: 0;
  }
`;

const AlphabetSpan = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 30px;
  color: #000000;
  &.focus {
    font-weight: 700;
    color: #ffffff;
  }
`;
