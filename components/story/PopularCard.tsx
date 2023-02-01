import NoteTag from "components/NoteTag";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function PopularCard({ data }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <Link href={`story-detail/${data.id}`}>
      <PopularCardContainer
        onMouseOver={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
      >
        <PopularCardImg src={data.imgUrl} />
        {isShow && (
          <Filter>
            <DateSpan>{data.date}</DateSpan>
            <TitleSpan>{data.title}</TitleSpan>
            <DescSpan>{data.desc}</DescSpan>
            <NoteBox>
              {data.note.map((text) => (
                <NoteTag key={text} from={"PopularCard"} text={text} />
              ))}
            </NoteBox>
          </Filter>
        )}
      </PopularCardContainer>
    </Link>
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
