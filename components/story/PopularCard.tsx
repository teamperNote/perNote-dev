import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import NoteTag from "components/NoteTag";
import { dateFormat } from "lib/numberFomat";
import { IStory } from "lib/types";
import axios from "axios";

interface IProps {
  data: IStory;
}

export default function PopularCard({
  data: { id, imgUrl, liked, likeCount, createdAt, title, body, tags },
}: IProps) {
  const router = useRouter();

  const [isShow, setIsShow] = useState(false);
  // TODO 아이콘 임시로 해둔 것 - 화질이 너무 떨어짐
  const [isLike, setIsLike] = useState(liked);
  const [likeCounts, setLikeCounts] = useState(likeCount);

  const onLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id.includes("heart")) {
      onLikeClick();
    } else {
      router.push(`story-detail/${id}`);
    }
  };

  const onLikeClick = async () => {
    if (isLike) {
      setIsLike(false);
      setLikeCounts(likeCounts - 1);
    } else {
      setIsLike(true);
      setLikeCounts(likeCounts + 1);
    }
    await axios
      .post("/api/story/like", {
        // TODO api 수정되면 삭제하기
        userId: "63b3de201f11b89b53489d7d",
        storyId: id,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PopularCardContainer
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      onClick={onLinkClick}
    >
      <PopularCardImg src={imgUrl[0]} />
      {isShow && (
        <Filter>
          <HeartBox>
            <StoryCardOutlineHeart
              id={"heart"}
              src={isLike ? "/heartFillIcon.png" : "/heartIcon.png"}
            />
            <HeartCount id={"heart"}>{likeCounts}</HeartCount>
          </HeartBox>
          <DateSpan>{dateFormat(createdAt)}</DateSpan>
          <TitleSpan>{title}</TitleSpan>
          <DescSpan>{body}</DescSpan>
          <NoteBox>
            {tags.map((tag) => (
              <NoteTag key={tag} from={"PopularCard"} text={tag} />
            ))}
          </NoteBox>
        </Filter>
      )}
    </PopularCardContainer>
  );
}

const PopularCardContainer = styled.div`
  position: relative;
  width: 566px;
  height: 590px;
  cursor: pointer;
`;

const PopularCardImg = styled.img`
  position: absolute;
  width: 100%;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Filter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 50px 35px;
  background: rgba(0, 0, 0, 0.5);
`;

const HeartBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: var(--white-color);
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

const HeartCount = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: var(--white-color);
  align-items: center;
`;

export const DateSpan = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: var(--white-color);
`;

export const TitleSpan = styled(DateSpan)`
  font-weight: 700;
  font-size: 40px;
  line-height: 58px;
  margin-bottom: 10px;
`;

export const DescSpan = styled(DateSpan)`
  font-size: 30px;
  line-height: 43px;
  margin-bottom: 10px;

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

export const NoteBox = styled.div`
  display: flex;
`;
