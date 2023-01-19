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
  ${({ category }) => (category === "brand" ? "" : "0 12.5px 25px 12.5px")};
  background: ${({ category }) => (category === "brand" ? "" : "#dfdfdf")};
  border-radius: ${({ category }) => (category === "brand" ? "" : "100px")};
  padding: ${({ category }) => (category === "brand" ? "" : "3px 15px")};
  margin: ${({ category }) =>
    category === "brand" ? "" : "0 12.5px 25px 12.5px"};
  cursor: pointer;
  display: ${({ category }) => (category === "brand" ? "flex" : "")};
  justify-content: ${({ category }) => (category === "brand" ? "center" : "")};
  align-items: ${({ category }) => (category === "brand" ? "center" : "")};
  width: ${({ category }) => (category === "brand" ? "51.16px" : "")};
  height: ${({ category }) => (category === "brand" ? "51.16px" : "")};
  margin-right: ${({ category }) => (category === "brand" ? "3.84px" : "")};
  &.focus {
    border-radius: ${({ category }) => (category === "brand" ? "100%" : "")};
    background: var(--primary-color);
  }
  &:last-child {
    margin-right: ${({ category }) => (category === "brand" ? "0" : "")};
  }
`;

const TextSpan = styled.div<{ category: string /*| string[] */ }>`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: ${({ category }) => (category === "brand" ? "30px" : "20px")};
  line-height: ${({ category }) => (category === "brand" ? "30px" : "40px")};
  color: #000000;

  &.focus {
    color: #ffffff;
    font-weight: ${({ category }) => (category === "brand" ? "700" : "")};
  }
`;
