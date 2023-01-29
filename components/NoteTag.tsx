import styled from "styled-components";

export default function NoteTag({ text }) {
  return <TagContainer>{text}</TagContainer>;
}

const TagContainer = styled.span`
  background: var(--secondary-color);
  padding: 3px 15px;
  border-radius: 100px;
  margin-right: 25px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
`;
