import styled from "styled-components";

export default function CategorySelect({ data, selected, setSelected }) {
  const onBtnClick = () => {
    setSelected(data.value);
  };
  return (
    <TextBox
      onClick={onBtnClick}
      className={selected == data.value ? "focus" : ""}
    >
      <TextSpan className={selected == data.value ? "focus" : ""}>
        {data.text}
      </TextSpan>
    </TextBox>
  );
}

const TextBox = styled.div`
  background: #dfdfdf;
  border-radius: 100px;
  padding: 3px 15px;
  margin: 0 12.5px 25px 12.5px;
  cursor: pointer;
  &.focus {
    background: var(--primary-color);
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
