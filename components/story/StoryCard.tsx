import styled from "styled-components";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { dateFormat } from "lib/numberFomat";
import { IStory } from "lib/types";
import NoteTag from "components/NoteTag";
import LikeButton from "components/LikeButton";

interface Props {
  data: IStory;
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
    tags,
  },
}: Props) {
  const router = useRouter();
  const [isShow, setIsShow] = useState<boolean>(false);

  const likeRef = useRef(null);
  const onLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (likeRef.current && !likeRef.current.contains(e.target)) {
      router.push(`story-detail/${id}`);
    }
  };

  return (
    <StoryCardContainer
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      onClick={onLinkClick}
    >
      <StoryCardImgBox>
        {/* <StoryCardImg src={imgUrl[0]} /> */}
        <ImageBox>
          <Image
            src={imgUrl[0]}
            alt={`${title} 대표 이미지`}
            layout="fill"
            objectFit={"cover"}
          />
        </ImageBox>
        <Filter className={isShow ? "show" : "hide"}>
          <HeartBox>
            <LikeButton
              content={"story"}
              id={id}
              likeRef={likeRef}
              direction={"column"}
              liked={liked}
              likeCount={likeCount}
            />
          </HeartBox>
        </Filter>
      </StoryCardImgBox>
      <InfoBox>
        <InfoFlex>
          <DateSpan className="regular f20">{dateFormat(createdAt)}</DateSpan>
          <ViewImageBox>
            <Image src={"/viewIcon.svg"} alt={"조회수 아이콘"} layout="fill" />
          </ViewImageBox>
          <ViewCountSpan className={"regular f20"}>{viewCount}</ViewCountSpan>
        </InfoFlex>
        <TitleSpan className="bold f40">{title}</TitleSpan>
        <DescSpan className={"regular f20"}>{body}</DescSpan>
        <InfoFlex className={"regular f20"}>
          {tags.map((tag, idx) => (
            <NoteTag key={idx} from={"StoryCard"} text={tag} />
          ))}
        </InfoFlex>
      </InfoBox>
    </StoryCardContainer>
  );
}

const StoryCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 28.75rem;
  cursor: pointer;
`;

const StoryCardImgBox = styled.div`
  position: relative;
  width: 28.75rem;
  height: 18.75rem;
  overflow: hidden;
  margin-bottom: 1.875rem;
`;

const ImageBox = styled.div`
  position: relative;
  width: 28.75rem;
  height: 18.75rem;
`;

const Filter = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem;
  background: rgba(0, 0, 0, 0.5);
  &.hide {
    display: none;
  }
`;

const HeartBox = styled.div`
  position: absolute;
  top: 0.875rem;
  right: 1rem;
  color: var(--white-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
`;

const InfoBox = styled.div`
  width: 26.25rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const InfoFlex = styled.ul`
  display: flex;
  align-items: center;
`;

const DateSpan = styled.time`
  color: var(--dark-gray-color);
  align-items: left;
  margin-right: 1.25rem;
`;

const ViewImageBox = styled.div`
  position: relative;
  width: 1.9375rem;
  height: 1.3125rem;
`;

const ViewCountSpan = styled.span`
  margin-left: 0.625rem;
  color: var(--third-color);
`;

const TitleSpan = styled.h3`
  align-items: left;
  margin-bottom: 0.625rem;
`;

const DescSpan = styled.h4`
  margin-right: 0;
  margin-bottom: 1.25rem;
`;
