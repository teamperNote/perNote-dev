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
        <Image
          src={imgUrl[0]}
          alt={`${title} 대표 이미지`}
          width={460}
          height={300}
          objectFit={"cover"}
        />
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
          <DateSpan>{dateFormat(createdAt)}</DateSpan>
          <Image
            src={"/viewIcon.svg"}
            alt={"조회수 아이콘"}
            width={31}
            height={21}
          />
          <ViewCountSpan>{viewCount}</ViewCountSpan>
        </InfoFlex>
        <TitleSpan>{title}</TitleSpan>
        <DescSpan>{body}</DescSpan>
        <InfoFlex>
          {tags.map((tag, idx) => (
            <NoteTag key={idx} from={"StoryDetail"} text={tag} />
          ))}
        </InfoFlex>
      </InfoBox>
    </StoryCardContainer>
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

const Filter = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  &.hide {
    display: none;
  }
`;

const HeartBox = styled.div`
  position: absolute;
  top: 14px;
  right: 16px;
  color: var(--white-color);
  /* mix-blend-mode: difference; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
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

const ViewCountSpan = styled(DateSpan)`
  margin-left: 10px;
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
