import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function StoryCard({ data, url }) {
  // TODO 아이콘 임시로 해둔 것 - 화질이 너무 떨어짐
  // 채워진 하트 반영되게 할 것
  // mix-blend-mode 생각한 것과 다름
  // 배경 이미지 css 수정 해야함
  const [isLike, setIsLike] = useState(data.liked);
  const [likeCount, setLikeCount] = useState(data.likeCount);

  const onLikeClick = async () => {
    await axios
      .post("/api/story/user/like", {
        userId: "63ae968c0665ea07c7c07acb",
        storyId: data.id,
      })
      .then(() => {
        if (isLike) {
          setIsLike(false);
          setLikeCount(likeCount - 1);
        } else {
          setIsLike(true);
          setLikeCount(likeCount + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <StoryCardContainer background={url}>
      <HeartBox onClick={onLikeClick}>
        <StoryCardOutlineHeart
          src={isLike ? "/heartFillIcon.png" : "/heatIcon.png"}
        />
        <HeartCount>{likeCount}</HeartCount>
      </HeartBox>
    </StoryCardContainer>
  );
}

const StoryCardContainer = styled.div<{ background: string }>`
  position: relative;
  width: 460px;
  height: 300px;
  background: url(${({ background }) => background}) no-repeat center;
`;

const HeartBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: var(--white-color);
  /* mix-blend-mode: difference; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
`;

const StoryCardOutlineHeart = styled.img`
  width: 40px;
  height: 36.7px;
  margin-bottom: 5px;
`;

const HeartCount = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: var(--white-color);
  align-items: center;
`;
