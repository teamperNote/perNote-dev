import styled from "styled-components";
import { useEffect, useState } from "react";
import axiosInstance from "lib/api/config";
import { sortArray } from "lib/arrays";
import PopularCard from "components/story/PopularCard";
import SortDropDown from "components/category/SortDropDown";
import StoryCard from "components/story/StoryCard";

export default function PerfumeStory() {
  const [bestStoryList, setBestStoryList] = useState({
    isLoading: false,
    data: [],
  });
  const getBestStoryList = async () => {
    await axiosInstance
      .get("/api/story/best")
      .then(({ data }) => {
        setBestStoryList({ ...bestStoryList, isLoading: true, data: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [sort, setSort] = useState(sortArray[0].value);
  const [storyList, setStoryList] = useState({ isLoading: false, data: [] });
  const getStoryList = async () => {
    await axiosInstance
      .get("/api/story/all", {
        params: {
          orderOpt: sort,
        },
      })
      .then(({ data }) => {
        setStoryList({ ...storyList, isLoading: true, data: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStoryList();
    getBestStoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PerfumeStoryContainer>
      <PerfumeStoryBox>
        <PopularTitle className="bold f40">인기 스토리</PopularTitle>
        <PopularStoryBox>
          {bestStoryList.data.map((story) => (
            <PopularCard key={story.id} data={story} />
          ))}
        </PopularStoryBox>
      </PerfumeStoryBox>
      <PerfumeStoryBox>
        <PurfumeTitle className="bold f40">퍼퓸 스토리</PurfumeTitle>
        <SortBox>
          <SortDropDown sort={sort} setSort={setSort} />
        </SortBox>
        <StoryBox>
          {storyList.isLoading &&
            storyList.data.map((story) => (
              <StoryCard key={story.id} data={story} />
            ))}
        </StoryBox>
      </PerfumeStoryBox>
    </PerfumeStoryContainer>
  );
}

export const PerfumeStoryContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 110px;
  @media screen and (max-width: 1440px) {
    padding-top: 90px;
  }
  @media screen and (max-width: 950px) {
    padding-top: 140px;
  }
`;

export const PerfumeStoryBox = styled.section`
  margin: 0 auto;
  margin-top: 8.125rem;
  margin-bottom: 2.1875rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  @media screen and (max-width: 1440px) {
    width: 100%;
  }
`;

export const PopularTitle = styled.h2`
  margin-bottom: 4.375rem;
  text-align: center;
`;

export const PopularStoryBox = styled.div`
  width: 1920px;
  height: 595px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  @media screen and (max-width: 1920px) {
    width: 100vw;
  }
  @media screen and (max-width: 1440px) {
    height: 350px;
  }
  @media screen and (max-width: 480px) {
    height: 300px;
  }
`;

export const PurfumeTitle = styled.h2`
  margin-bottom: 6.625rem;
  text-align: center;
`;

export const SortBox = styled.div`
  width: 1420px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  @media screen and (max-width: 1440px) {
    width: 100%;
    padding-right: 2.5rem;
  }
`;

export const StoryBox = styled.div`
  margin: 0 auto;
  width: 1420px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3.125rem 1.25rem;
  margin-bottom: 11.25rem;
  @media screen and (max-width: 1440px) {
    width: auto;
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 1242px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 823px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`;
