import axios from "axios";
import NoteTag from "components/NoteTag";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function StoryCard({ data }) {
  // TODO 아이콘 임시로 해둔 것 - 화질이 너무 떨어짐

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

  const [isShow, setIsShow] = useState(false);

  return (
    <Link href={`story-detail/${data.id}`}>
      <StoryCardContainer
        onMouseOver={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
      >
        <StoryCardImgBox>
          <StoryCardImg src={data.imgUrl} />
          {isShow && (
            <Filter>
              <HeartBox onClick={onLikeClick}>
                <StoryCardOutlineHeart
                  src={isLike ? "/heartFillIcon.png" : "/heatIcon.png"}
                />
                <HeartCount>{likeCount}</HeartCount>
              </HeartBox>
            </Filter>
          )}
        </StoryCardImgBox>
        <InfoBox>
          <InfoFlex>
            <DateSpan>{data.date}</DateSpan>
            <ViewCountSpan>{data.view}</ViewCountSpan>
          </InfoFlex>
          <TitleSpan>{data.title}</TitleSpan>
          <DescSpan>{data.desc}</DescSpan>
          <InfoFlex>
            {data.note.map((note) => (
              <NoteTag key={note} from={"StoryCard"} text={note} />
            ))}
          </InfoFlex>
        </InfoBox>
      </StoryCardContainer>
    </Link>
  );
}

const StoryCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 460px;
  cursor: pointer;
`;

const StoryCardImgBox = styled.div`
  position: relative;
  width: 460px;
  height: 300px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const StoryCardImg = styled.img`
  position: absolute;
  width: 100%;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Filter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
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

const HeartCount = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: var(--white-color);
  align-items: center;
`;

const InfoBox = styled.div`
  width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const InfoFlex = styled.div`
  display: flex;
  align-items: center;
`;

const DateSpan = styled(HeartCount)`
  color: var(--dark-gray-color);
  align-items: left;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const ViewCountSpan = styled(DateSpan)`
  color: var(--third-color);
`;

const TitleSpan = styled(HeartCount)`
  font-weight: 700;
  font-size: 40px;
  line-height: 58px;
  color: var(--black-color);
  align-items: left;
`;

const DescSpan = styled(DateSpan)`
  margin-right: 0;
`;
