import styled from "styled-components";
import Link from "next/link";
import { dateFormat } from "lib/numberFomat";
import { IStory } from "lib/types";

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
          <Img src={imgUrl[0]} />
        </ImgBox>
        <InfoBox>
          <DateSpan>{dateFormat(createdAt)}</DateSpan>
          <TitleSpan>{title}</TitleSpan>
          <TextSpan>{body}</TextSpan>
          <IconContainer>
            <IconBox>
              <IconImg
                src={
                  liked ? "/heartFillIcon_green.svg" : "/heartIcon_green.svg"
                }
              />
              <IconSpan>{likeCount}</IconSpan>
            </IconBox>
            <IconBox>
              <IconImg src={"/viewIcon.svg"} />
              <IconSpan>{viewCount}</IconSpan>
            </IconBox>
          </IconContainer>
        </InfoBox>
      </RowStoryCardContainer>
    </Link>
  );
}

const RowStoryCardContainer = styled.div`
  width: 1420px;
  height: 505px;
  border: 3px solid var(--secondary-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-right: 47px;
  cursor: pointer;
`;

const ImgBox = styled.div`
  width: 650px;
  height: 100%;
  margin-right: 67px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  object-fit: cover;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
`;

const DateSpan = styled.span`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: var(--dark-gray-color);
`;

const TitleSpan = styled(DateSpan)`
  font-weight: 700;
  font-size: 40px;
  line-height: 58px;
  color: var(--black-color);
  margin-bottom: 10px;
`;

const TextSpan = styled(DateSpan)`
  font-size: 30px;
  line-height: 43px;
  color: var(--black-color);
  margin-bottom: 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  white-space: pre-line;
`;

const IconContainer = styled.div`
  display: flex;
`;

const IconBox = styled.div`
  display: flex;
  :first-child {
    margin-right: 13px;
  }
`;

const IconImg = styled.img`
  margin-right: 13px;
  height: 100%;
`;

const IconSpan = styled(DateSpan)`
  font-size: 25px;
  line-height: 36px;
  color: var(--third-color);
`;
