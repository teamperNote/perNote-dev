import styled from "styled-components";

export default function CategorySelect({ data, isFocus, setIsFocus }) {
  const onBtnClick = () => {
    setIsFocus(data.value);
  };
  return (
    <TextBox
      onClick={onBtnClick}
      className={isFocus == data.value ? "focus" : "noo"}
    >
      <TextSpan className={isFocus == data.value ? "focus" : ""}>
        {data.text}
      </TextSpan>
    </TextBox>
  );
}

const TextBox = styled.div`
  background: #dfdfdf;
  border-radius: 100px;
  padding: 3px 15px;
  margin: 12.5px;
  cursor: pointer;
  &.focus {
    background: #525d4d;
  }
`;

const TextSpan = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;
  &.focus {
    color: #ffffff;
  }
`;
