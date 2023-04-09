import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { dateFormat } from "lib/numberFomat";
import { IStory } from "lib/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface IProps {
  data: IStory;
}

export default function RowStoryCard({
  data: { id, imgUrl, createdAt, title, liked, likeCount, viewCount, body },
}: IProps) {
  return (
    <Link href={`${id}`}>
      <RowStoryCardContainer>
        <ImgBox>
          <Image
            src={imgUrl[0]}
            alt={`${title} 대표 이미지`}
            layout="fill"
            objectFit={"cover"}
            style={{ borderRadius: "20px" }}
            unoptimized
          />
        </ImgBox>
        <InfoBox>
          <DateSpan className="regular f20">{dateFormat(createdAt)}</DateSpan>
          <TitleSpan className="bold f40">{title}</TitleSpan>
          <TextSpan className="regular f30">{body}</TextSpan>
          <IconContainer>
            <IconBox>
              {liked ? (
                <AiFillHeart size={48} color={"#9FAC9A"} />
              ) : (
                <AiOutlineHeart size={48} color={"#9FAC9A"} />
              )}
              <IconSpan className="regular f25">{likeCount}</IconSpan>
            </IconBox>
            <IconBox>
              <Image
                src={"/viewIcon.svg"}
                alt={"조회수 아이콘"}
                width={49}
                height={33}
                unoptimized
              />
              <IconSpan className="regular f25">{viewCount}</IconSpan>
            </IconBox>
          </IconContainer>
        </InfoBox>
      </RowStoryCardContainer>
    </Link>
  );
}

const RowStoryCardContainer = styled.div`
  width: 1420px;
  border: 3px solid var(--secondary-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-right: 2.9375rem;
  cursor: pointer;
  @media screen and (max-width: 1440px) {
    width: 80vw;
  }
  @media screen and (max-width: 480px) {
    flex-direction: column;
    width: 80vw;
    padding-right: 0;
  }
`;

const ImgBox = styled.div`
  position: relative;
  width: 40.625rem;
  height: 31.5625rem;
  margin-right: 4.1875rem;
  border-radius: 20px;
  @media screen and (max-width: 480px) {
    width: 80vw;
    height: 200px;
    margin-right: 0;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  @media screen and (max-width: 480px) {
    padding: 20px;
    width: 80vw;
  }
`;

const DateSpan = styled.time`
  color: var(--dark-gray-color);
`;

const TitleSpan = styled.h4`
  color: var(--black-color);
  margin-bottom: 0.625rem;
  @media screen and (max-width: 480px) {
    margin-bottom: 5px;
  }
`;

const TextSpan = styled.h5`
  color: var(--black-color);
  margin-bottom: 1.25rem;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  white-space: pre-line;
  @media screen and (max-width: 1440px) {
    -webkit-line-clamp: 4;
  }
  @media screen and (max-width: 480px) {
    -webkit-line-clamp: 2;
  }
`;

const IconContainer = styled.div`
  display: flex;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  :first-child {
    margin-right: 13px;
  }
`;

const IconSpan = styled.span`
  margin-left: 0.8125rem;
  color: var(--third-color);
`;
