import React from "react";
import styled from "styled-components";
const NoteTag = ({ children }: any) => {
  return <TagContainer>{children}</TagContainer>;
};

export default NoteTag;

const TagContainer = styled.span`
  height: 40px;
  background: #dfdfdf;
  border-radius: 100px;
  padding: 3px 15px;
  font-weight: 400;
  font-size: 20px;
  margin-right: 25px;
  line-height: 200%;
`;
