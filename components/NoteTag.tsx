import styled from "styled-components";

export default function NoteTag({ from, text }) {
  return <TagContainer from={from}>{text}</TagContainer>;
}

const TagContainer = styled.li<{ from: string }>`
  background-color: ${({ from }) =>
    from === "PopularCard" ? "var(--white-color)" : "var(--secondary-color)"};
  padding: ${({ from }) =>
    from === "PopularCard" || from === "StoryCard"
      ? "0.375rem 0.9375rem"
      : from === "PersonalScent"
      ? "0.625rem 1.875rem"
      : from === "StoryDetail"
      ? "0.3125rem 1.5625rem"
      : "0.5rem .9375rem"};
  border-radius: 6.25rem;
  margin-right: ${({ from }) =>
    from === "PopularCard" || from === "StoryCard"
      ? "0.625rem"
      : from === "PersonalScent"
      ? "1.875rem"
      : "1.5625rem"};
  margin-bottom: ${({ from }) => from === "ProductDetailPage" && "0.9375rem"};

  text-align: center;
  color: ${({ from }) =>
    from === "PopularCard" ? "var(--secondary-color)" : "var(--white-color)"};
  :last-child {
    margin-right: 0;
  }
`;
