import styled from "styled-components";

export default function NoteTag({ from, text }) {
  return <TagContainer from={from}>{text}</TagContainer>;
}

const TagContainer = styled.span<{ from: string }>`
  background-color: ${({ from }) =>
    from === "PopularCard" ? "var(--white-color)" : "var(--secondary-color)"};
  padding: ${({ from }) =>
    from === "PopularCard" || from === "StoryCard" ? " 1px 15px" : " 3px 15px"};
  border-radius: 100px;
  margin-right: ${({ from }) =>
    from === "PopularCard" || from === "StoryCard" ? "10px" : "25px"};

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: ${({ from }) =>
    from === "PopularCard" ? "var(--secondary-color)" : "var(--white-color)"};
  :last-child {
    margin-right: 0;
  }
`;
