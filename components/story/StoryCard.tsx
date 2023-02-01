import axios from "axios";
import NoteTag from "components/NoteTag";
import { dateFormat } from "lib/numberFomat";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  data: {
    id: string;
    imgUrl: string;
    liked: boolean;
    likeCount: number;
    createdAt: string;
    viewCount: string;
    title: string;
    body: string;
    // notes: string[];
  };
}

export default function StoryCard({
  data: {
    id,
    imgUrl,
    liked,
    likeCount,
    createdAt,
    viewCount,
    title,
    body,
    // notes,
  },
}: Props) {
  const router = useRouter();
  // TODO 아이콘 임시로 해둔 것 - 화질이 너무 떨어짐
  const [isLike, setIsLike] = useState(liked);
  const [likeCounts, setLikeCounts] = useState(likeCount);

  const onLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id.includes("heart")) {
      // onLikeClick();
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
        userId: "63ae968c0665ea07c7c07acb",
        storyId: id,
      })
      // .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    // <Link href={`story-detail/${id}`}>
    <StoryCardContainer
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      onClick={onLinkClick}
    >
      <StoryCardImgBox>
        <StoryCardImg src={imgUrl} />
        {isShow && (
          <Filter>
            <HeartBox onClick={onLikeClick}>
              <StoryCardOutlineHeart
                id={"heart"}
                src={isLike ? "/heartFillIcon.png" : "/heatIcon.png"}
              />
              <HeartCount id={"heart"}>{likeCounts}</HeartCount>
            </HeartBox>
          </Filter>
        )}
      </StoryCardImgBox>
      <InfoBox>
        <InfoFlex>
          <DateSpan>{dateFormat(createdAt)}</DateSpan>
          <ViewIcon src={"viewIcon.svg"} />
          <ViewCountSpan>{viewCount}</ViewCountSpan>
        </InfoFlex>
        <TitleSpan>{title}</TitleSpan>
        <DescSpan>{body}</DescSpan>
        <InfoFlex>
          {/* TODO 서지수 노트 목록 추가되면 수정하기 */}
          {["as", "asdfasd", "asdf"].map((note) => (
            <NoteTag key={note} from={"StoryCard"} text={note} />
          ))}
        </InfoFlex>
      </InfoBox>
    </StoryCardContainer>
    // </Link>
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
`;

const ViewIcon = styled.img`
  margin-right: 10px;
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
  margin-bottom: 10px;
`;

const DescSpan = styled(DateSpan)`
  margin-right: 0;
  margin-bottom: 20px;
`;
