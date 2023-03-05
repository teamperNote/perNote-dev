import RowStoryCard from "components/story/RowStoryCard";
import React, { useState } from "react";
import styled from "styled-components";
import SortDropDown from "components/category/SortDropDown";
import { sortArray } from "lib/arrays";
function Story() {
  const [sort, setSort] = useState(sortArray[0].value);

  return (
    <StoryContainer>
      <StoryTitle>찜한 스토리</StoryTitle>

      <SortBox>
        <SortDropDown sort={sort} setSort={setSort} />
      </SortBox>
      <StoryList>
        <StoryItem></StoryItem>
      </StoryList>
    </StoryContainer>
  );
}

export default Story;

const StoryContainer = styled.main`
  padding-top: 290px;
  max-width: 1420px;
  margin: 0 auto;
`;

const StoryTitle = styled.h2`
  margin: 0;
  margin-bottom: 110px;
  font-weight: 700;
  font-size: 50px;
`;
const SortBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StoryList = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const StoryItem = styled.li``;
