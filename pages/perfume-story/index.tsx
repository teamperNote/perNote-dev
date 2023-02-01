import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import StoryCard from "components/story/StoryCard";
import PopularCard from "components/story/PopularCard";

export default function PerfumeStory() {
  const [storyList, setStoryList] = useState({ isLoading: false, data: [] });
  const getStory = async () => {
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
    getStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PerfumeStoryContainer>
      <PerfumeStoryBox>
        <PopularTitle>인기 스토리</PopularTitle>
        <PopularStoryBox>
          {storyArray.map((poppular) => (
            <PopularCard key={poppular.id} data={poppular} />
          ))}
        </PopularStoryBox>
      </PerfumeStoryBox>
      <PerfumeStoryBox>
        <PurfumeTitle>퍼퓸 스토리</PurfumeTitle>
        <StoryBox>
          {storyList.isLoading &&
            storyList.data.map((data) => (
              <StoryCard key={data.id} data={data} />
            ))}
        </StoryBox>
      </PerfumeStoryBox>
    </PerfumeStoryContainer>
  );
}

export const storyArray = [
  {
    id: "0",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShAKtZMoT88oF-bW7WuKaSAlbVHebgUfPEZjeQn07xA498U5R7uQSZ_OEcKthpRQUqqdI&usqp=CAU",
    date: "2022.11.01",
    view: "1023",
    title: "향수의 비밀",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sit malesuada pulvinar in nulla.",
    note: ["AQUATIC", "WOODY", "AQUATIC3"],
  },
  {
    id: "1",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrR4i932f2IX1LX84rypC6ox5pfdhFUHYo-g&usqp=CAU",
    date: "2022.11.02",
    view: "1023",
    title: "향수의 비밀2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sit malesuada pulvinar in nulla.",
    note: ["AQUATIC1", "WOODY1", "asd"],
  },
  {
    id: "2",
    imgUrl:
      "https://image.jtbcplus.kr/data/contents/jam_photo/202002/08/36a3a416-8b2f-4ef4-81a9-e383f717a6cc.jpg",
    date: "2022.11.03",
    view: "1023",
    title: "향수의 비밀3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sit malesuada pulvinar in nulla.",
    note: ["AQUATIC2", "WOODY2", "AQUATIC"],
  },
  {
    id: "3",
    imgUrl: "https://cdn.imweb.me/thumbnail/20220511/0125284249fd1.jpg",
    date: "2022.11.01",
    view: "1023",
    title: "향수의 비밀4",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sit malesuada pulvinar in nulla.",
    note: ["AQUATIC3", "WOODY3", "er"],
  },
  {
    id: "4",
    imgUrl:
      "https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/advices/167098330331694434.jpg?gif=1&w=480",
    date: "2022.11.01",
    view: "1023",
    title: "향수의 비밀5",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sit malesuada pulvinar in nulla.",
    note: ["AQUATIC4", "WOODY4", "ggr"],
  },
];

export const PerfumeStoryContainer = styled.div`
  width: 1920px;
  display: flex;
  flex-direction: column;
  padding-top: 110px;
`;

export const PerfumeStoryBox = styled.div`
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

export const StoryBox = styled.div`
  margin: 0 auto;
  width: 1420px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px 20px;
  margin-bottom: 180px;
`;
