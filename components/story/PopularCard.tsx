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
      <Image
        src={imgUrl[0]}
        alt={`인기 스토리 이미지`}
        width={566}
        height={590}
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
            size={60}
            countSize={30}
          />
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
    </PopularCardContainer>
  );
}

const PopularCardContainer = styled.div`
  position: relative;
  width: 566px;
  height: 590px;
  cursor: pointer;
`;

const Filter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 50px 35px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  &.hide {
    display: none;
  }
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
