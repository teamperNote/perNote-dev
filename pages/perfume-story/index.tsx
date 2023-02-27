import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
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
    await axios
      .get("/api/story/best")
      .then(({ data }) => {
        setBestStoryList({ ...bestStoryList, isLoading: true, data: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO 서지수 스토리 정렬 기능 추가하기
  const [sort, setSort] = useState(sortArray[0].value);
  const [storyList, setStoryList] = useState({ isLoading: false, data: [] });
  const getStoryList = async () => {
    await axios
      .get("/api/story/all", {
        params: { userId: "63ae968c0665ea07c7c07acb" },
      })
      .then((res) => {
        setStoryList({ ...storyList, isLoading: true, data: res.data });
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
        <PopularTitle>인기 스토리</PopularTitle>
        <PopularStoryBox>
          {bestStoryList.data.map((story) => (
            <PopularCard key={story.id} data={story} />
          ))}
        </PopularStoryBox>
      </PerfumeStoryBox>
      <PerfumeStoryBox>
        <PurfumeTitle>퍼퓸 스토리</PurfumeTitle>
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

export const PerfumeStoryContainer = styled.div`
  width: 1920px;
  display: flex;
  flex-direction: column;
  padding-top: 110px;
`;

export const PerfumeStoryBox = styled.div`
  margin: 0 auto;
  margin-top: 130px;
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

export const Span = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 58px;
  color: #000000;
  text-align: center;
`;

export const PopularTitle = styled(Span)`
  margin-bottom: 70px;
  text-align: center;
`;

export const PopularStoryBox = styled.div`
  width: 1920px;
  height: 590px;
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
`;

export const PurfumeTitle = styled(Span)`
  margin-bottom: 106px;
`;

export const SortBox = styled.div`
  width: 1420px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export const StoryBox = styled.div`
  margin: 0 auto;
  width: 1420px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px 20px;
  margin-bottom: 180px;
`;
