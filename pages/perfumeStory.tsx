import axios from "axios";
import StoryCard from "components/StoryCard";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function PerfumeStory() {
  const [storyList, setStoryList] = useState([]);
  const getStory = async () => {
    await axios
      .get("/api/story/user", {
        params: { userId: "63ae968c0665ea07c7c07acb" },
      })
      .then((res) => {
        console.log(res);
        setStoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getStory();
  }, []);

  return (
    <PerfumeStoryContainer>
      {storyList.map((data) => (
        <StoryCard
          key={data.id}
          data={data}
          url={
            "https://post-phinf.pstatic.net/MjAxOTA5MDlfMTAz/MDAxNTY3OTk1NTUzNjE0.kRfgfTLQCUQIICJUfF045MyhGiqz3-uzyROcEcEANFcg.al06M1bjKYY1QGeFe0FwqsTVOv81vyw-as1sVB-ojdcg.JPEG/%EC%9A%B0%EB%93%9C%ED%96%A5%EC%88%98.jpg?type=w1200"
          }
        />
      ))}
    </PerfumeStoryContainer>
  );
}

export const PerfumeStoryContainer = styled.div`
  width: 1920px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110px;
`;

export const CategoryBox = styled.div`
  margin-top: 90px;
  margin-bottom: 80px;
  display: flex;
`;

export const CategoryTitle = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 43px;
  color: #b2b2b2;
  margin-right: 80px;
  cursor: pointer;
  &.focus {
    color: #000000;
  }
  :last-child {
    margin-right: 0;
  }
`;

export const SelectBox = styled.div<{ page?: string | string[] }>`
  width: ${({ page }) =>
    page === "note"
      ? "897px"
      : page === "brand"
      ? "1450px"
      : page === "personality"
      ? "1415px"
      : "880px"};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ page }) => (page === "brand" ? "154px" : "81px")};
`;

export const SortBox = styled.div`
  width: 1420px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export const BrandBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
