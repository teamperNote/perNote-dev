import styled from "styled-components";
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import NoteTag from "components/NoteTag";
import { dateFormat } from "lib/numberFomat";
import { IStory } from "lib/types";
import LikeButton from "components/LikeButton";

interface IProps {
  data: IStory;
}

export default function PopularCard({
  data: { id, imgUrl, liked, likeCount, createdAt, title, body, tags },
}: IProps) {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);

  const likeRef = useRef(null);
  const onLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (likeRef.current && !likeRef.current.contains(e.target)) {
      router.push(`story-detail/${id}`);
    }
  };

  return (
    <PopularCardContainer
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      onClick={onLinkClick}
    >
      <ImageBox>
        <Image
          src={imgUrl[0]}
          alt={`인기 스토리 이미지`}
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
            size={60}
            countSize={30}
          />
        </HeartBox>
        <DateSpan className="regular f20">{dateFormat(createdAt)}</DateSpan>
        <TitleSpan className="bold f40">{title}</TitleSpan>
        <DescSpan className={"regular f30"}>{body}</DescSpan>
        <NoteBox className={"regular f20"}>
          {tags.map((tag) => (
            <NoteTag key={tag} from={"PopularCard"} text={tag} />
          ))}
        </NoteBox>
      </Filter>
    </PopularCardContainer>
  );
}

const PopularCardContainer = styled.div`
  position: relative;
  width: 566px;
  height: 590px;
  cursor: pointer;
  @media screen and (max-width: 1440px) {
    width: 350px;
    height: 350px;
  }
  @media screen and (max-width: 480px) {
    width: 300px;
    height: 300px;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 566px;
  height: 590px;
  @media screen and (max-width: 1440px) {
    width: 350px;
    height: 350px;
  }
  @media screen and (max-width: 480px) {
    width: 300px;
    height: 300px;
  }
`;

const Filter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 3.125rem 2.1875rem;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  &.hide {
    display: none;
  }
  @media screen and (max-width: 1440px) {
    padding: 2.1875rem 1.25rem;
  }
`;

const HeartBox = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  color: var(--white-color);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DateSpan = styled.time`
  color: var(--white-color);
`;

export const TitleSpan = styled.h3`
  color: var(--white-color);
  margin-bottom: 0.625rem;
`;

export const DescSpan = styled.h4`
  color: var(--white-color);
  margin-bottom: 0.625rem;

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

export const NoteBox = styled.ul`
  display: flex;
`;
