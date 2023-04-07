import RowStoryCard from "components/story/RowStoryCard";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SortDropDown from "components/category/SortDropDown";
import { sortArray } from "lib/arrays";
import axiosInstance from "lib/api/config";

export default function LikedStory() {
  const [sort, setSort] = useState(sortArray[0].value);
  const [likedStorys, setLikedStorys] = useState([]);

  useEffect(() => {
    const getLikedStorys = () => {
      axiosInstance
        .get("/api/mypage/story", {
          params: {
            orderOpt: sort,
          },
        })
        .then(({ data }) => {
          setLikedStorys(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getLikedStorys();
  }, [sort]);

  return (
    <StoryContainer>
      <StoryTitle className="bold f50">찜한 스토리</StoryTitle>
      <SortBox>
        <SortDropDown sort={sort} setSort={setSort} />
      </SortBox>
      <StoryList>
        {likedStorys.map((likedStory) => (
          <StoryItem key={likedStory.id}>
            <RowStoryCard data={likedStory} />
          </StoryItem>
        ))}
      </StoryList>
    </StoryContainer>
  );
}

const StoryContainer = styled.main`
  padding-top: 290px;
  width: 1420px;
  margin: 0 auto;
  margin-bottom: 9.375rem;
  @media screen and (max-width: 1440px) {
    padding-top: 210px;
    width: 80vw;
  }
`;

const StoryTitle = styled.h1`
  margin-bottom: 3.1875rem;
`;

const SortBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StoryList = styled.ul`
  margin-top: 1.875rem;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 3.125rem;
`;

const StoryItem = styled.li``;
