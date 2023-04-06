import Link from "next/link";
import styled from "styled-components";

export default function CategorySelect({ data, category, selected }) {
  return (
    <Link href={`${category}/${data.value}`}>
      <TextBox
        className={selected == data.value ? "focus" : ""}
        category={category}
      >
        <TextSpan
          className={selected == data.value ? "focus" : ""}
          category={category}
        >
          {data.text}
        </TextSpan>
      </TextBox>
    </Link>
  );
}

const TextBox = styled.div<{ category: string }>`
  background: ${({ category }) => (category === "brand" ? "" : "#dfdfdf")};
  border-radius: ${({ category }) => (category === "brand" ? "" : "6.25rem")};
  padding: ${({ category }) =>
    category === "brand" ? "" : "0.1875rem 0.9375rem"};
  margin: ${({ category }) =>
    category === "brand" ? "" : "0rem 0.7813rem 1.5625rem 0.7813rem"};
  cursor: pointer;
  display: ${({ category }) => (category === "brand" ? "flex" : "")};
  justify-content: ${({ category }) => (category === "brand" ? "center" : "")};
  align-items: ${({ category }) => (category === "brand" ? "center" : "")};
  width: ${({ category }) => (category === "brand" ? "3.1975rem" : "")};
  height: ${({ category }) => (category === "brand" ? "3.1975rem" : "")};
  margin-right: ${({ category }) => (category === "brand" ? "0.24rem" : "")};
  &.focus {
    border-radius: ${({ category }) => (category === "brand" ? "100%" : "")};
    background: var(--primary-color);
  }
  &:last-child {
    margin-right: ${({ category }) => (category === "brand" ? "0" : "")};
  }
  @media screen and (max-width: 630px) {
    margin: ${({ category }) =>
      category === "brand" ? "" : "0rem 0.4375rem 0.9375rem 0.4375rem"};
  }
`;

const TextSpan = styled.div<{ category: string }>`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: ${({ category }) =>
    category === "brand" ? "1.875rem" : "1.25rem"};
  line-height: ${({ category }) =>
    category === "brand" ? "1.875rem" : "2.5rem"};
  color: #000000;

  &.focus {
    color: var(--white-color);
    font-weight: ${({ category }) => (category === "brand" ? "700" : "")};
  }
`;
